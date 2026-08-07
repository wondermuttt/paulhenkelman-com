#!/usr/bin/env node
// Persistent-session CDP runner: keeps one connection open for the whole flow.
// Usage: node session.js <targetId> <flow.js>
// The flow file exports async (ctx) => result, with ctx = {evalJS, rectOf, clickAt, typeText, pressKey, nav, sleep}
const WebSocket = require("ws");
const fs = require("fs");
const http = require("http");
const path = require("path");

const listTargets = () =>
  new Promise((res, rej) => {
    http.get("http://localhost:9222/json/list", (r) => {
      let d = "";
      r.on("data", (c) => (d += c));
      r.on("end", () => res(JSON.parse(d)));
    }).on("error", rej);
  });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const [, , targetId, flowPath] = process.argv;
  const flow = require(path.resolve(flowPath));

  const targets = await listTargets();
  const page = targets.find((t) => t.type === "page" && t.id === targetId);
  if (!page) { console.error("no target " + targetId); process.exit(1); }

  const ws = new WebSocket(page.webSocketDebuggerUrl, { maxPayload: 64 * 1024 * 1024 });
  let id = 0;
  const pending = new Map();
  const send = (m, p) =>
    new Promise((res, rej) => {
      const i = ++id;
      pending.set(i, { res, rej });
      ws.send(JSON.stringify({ id: i, method: m, params: p }));
    });
  ws.on("message", (raw) => {
    const m = JSON.parse(raw);
    if (m.id && pending.has(m.id)) {
      const { res, rej } = pending.get(m.id);
      pending.delete(m.id);
      m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result);
    }
  });
  await new Promise((r) => ws.on("open", r));
  await send("Page.enable", {});

  const evalJS = async (expr, awaitPromise = false) => {
    const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise });
    if (r.exceptionDetails) throw new Error("JS: " + JSON.stringify(r.exceptionDetails).slice(0, 250));
    return r.result.value;
  };
  const nav = async (url, settle = 5000) => {
    await send("Page.navigate", { url });
    for (let i = 0; i < 40; i++) {
      await sleep(500);
      if ((await evalJS("document.readyState")) === "complete") break;
    }
    await sleep(settle);
  };
  const rectOf = async (finder, tries = 25) => {
    for (let i = 0; i < tries; i++) {
      const v = await evalJS(`(() => { const el = (${finder}); if (!el) return null; el.scrollIntoView({block:'center'}); const r = el.getBoundingClientRect(); if (!r.width || !r.height) return null; return JSON.stringify({x: r.left + r.width/2, y: r.top + r.height/2}); })()`);
      if (v) return JSON.parse(v);
      await sleep(800);
    }
    return null;
  };
  const clickAt = async (pt) => {
    await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: pt.x, y: pt.y, buttons: 0 });
    await sleep(110);
    await send("Input.dispatchMouseEvent", { type: "mousePressed", x: pt.x, y: pt.y, button: "left", buttons: 1, clickCount: 1 });
    await sleep(80);
    await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: pt.x, y: pt.y, button: "left", buttons: 0, clickCount: 1 });
    await sleep(450);
  };
  const clickEl = async (finder, tries = 20) => {
    const pt = await rectOf(finder, tries);
    if (!pt) return false;
    await clickAt(pt);
    return true;
  };
  const typeText = async (text) => {
    for (const ch of text) {
      if (ch === "\n") {
        await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
        await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
      } else {
        await send("Input.dispatchKeyEvent", { type: "keyDown", key: ch, text: ch, unmodifiedText: ch });
        await send("Input.dispatchKeyEvent", { type: "keyUp", key: ch });
      }
      await sleep(5);
    }
  };
  const insertText = async (text) => await send("Input.insertText", { text });
  const pressKey = async (key, vk) => {
    await send("Input.dispatchKeyEvent", { type: "rawKeyDown", key, code: key, windowsVirtualKeyCode: vk });
    await send("Input.dispatchKeyEvent", { type: "keyUp", key, code: key, windowsVirtualKeyCode: vk });
    await sleep(280);
  };

  try {
    const result = await flow({ evalJS, nav, rectOf, clickAt, clickEl, typeText, insertText, pressKey, sleep, send });
    console.log(typeof result === "string" ? result : JSON.stringify(result, null, 1));
  } catch (e) {
    console.log(JSON.stringify({ FLOW_ERROR: e.message }, null, 1));
  }
  ws.close();
}
main().catch((e) => { console.error("FATAL:", e.message); process.exit(1); });
