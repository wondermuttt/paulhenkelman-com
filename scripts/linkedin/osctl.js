#!/usr/bin/env node
// OS-level control layer: CDP locates elements, macOS posts real mouse/keyboard events.
// Bridges viewport coords -> screen coords, then drives via osascript/System Events.
const WebSocket = require("ws");
const http = require("http");
const { execFileSync } = require("child_process");

const listTargets = () =>
  new Promise((res, rej) => {
    http.get("http://localhost:9222/json/list", (r) => {
      let d = "";
      r.on("data", (c) => (d += c));
      r.on("end", () => res(JSON.parse(d)));
    }).on("error", rej);
  });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// --- macOS primitives (identical to what macos-automator-mcp executes) ---
const osa = (script) =>
  execFileSync("osascript", ["-e", script], { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 }).trim();

const JXA_CLICK = require("path").join(__dirname, "click.jxa");
const osClick = (x, y) =>
  execFileSync("osascript", ["-l", "JavaScript", JXA_CLICK, String(Math.round(x)), String(Math.round(y)), "click"], { encoding: "utf8" }).trim();
const osMove = (x, y) =>
  execFileSync("osascript", ["-l", "JavaScript", JXA_CLICK, String(Math.round(x)), String(Math.round(y)), "move"], { encoding: "utf8" }).trim();

const osType = (text) => {
  // chunk to avoid arg-length and keystroke buffer issues
  const esc = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  for (let i = 0; i < text.length; i += 180) {
    const chunk = text.slice(i, i + 180);
    osa(`tell application "System Events" to keystroke "${esc(chunk)}"`);
  }
};

const osKey = (keyName) =>
  osa(`tell application "System Events" to key code ${keyName}`);
// key codes: 53=esc, 36=return, 48=tab, 125=down, 126=up

const activateChrome = () => osa(`tell application "Google Chrome" to activate`);

async function connect(targetId) {
  const targets = await listTargets();
  const page = targets.find((t) => t.type === "page" && t.id === targetId);
  if (!page) throw new Error("no target " + targetId);
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

  // viewport -> screen offset, measured from the page itself
  const offsets = async () => {
    const o = JSON.parse(
      await evalJS(`JSON.stringify({sx: window.screenX, sy: window.screenY, oh: window.outerHeight, ih: window.innerHeight, ow: window.outerWidth, iw: window.innerWidth, dpr: devicePixelRatio})`),
    );
    return { x: o.sx + (o.ow - o.iw) / 2, y: o.sy + (o.oh - o.ih), raw: o };
  };

  const nav = async (url, settle = 5000) => {
    await send("Page.navigate", { url });
    for (let i = 0; i < 40; i++) {
      await sleep(500);
      if ((await evalJS("document.readyState")) === "complete") break;
    }
    await sleep(settle);
  };

  const front = async () => {
    await send("Page.bringToFront", {});
    activateChrome();
    await sleep(700);
  };

  // Find element, scroll into view, return SCREEN coords
  const screenRect = async (finder, tries = 20) => {
    const off = await offsets();
    for (let i = 0; i < tries; i++) {
      const v = await evalJS(`(() => { const el = (${finder}); if (!el) return null; el.scrollIntoView({block:'center'}); const r = el.getBoundingClientRect(); if (!r.width || !r.height) return null; return JSON.stringify({x: r.left + r.width/2, y: r.top + r.height/2}); })()`);
      if (v) {
        const p = JSON.parse(v);
        return { x: off.x + p.x, y: off.y + p.y, viewport: p, off };
      }
      await sleep(700);
    }
    return null;
  };

  // Real OS click on a page element
  const clickReal = async (finder, tries = 20) => {
    const pt = await screenRect(finder, tries);
    if (!pt) return false;
    await front();
    osClick(pt.x, pt.y);
    await sleep(600);
    return pt;
  };

  return { send, evalJS, nav, front, offsets, screenRect, clickReal, sleep, ws,
           osClick, osMove, osType, osKey, activateChrome };
}

module.exports = { connect, sleep, osa, osClick, osMove, osType, osKey, activateChrome, listTargets };

// CLI: node osctl.js <targetId> <flow.js>
if (require.main === module) {
  const [, , targetId, flowPath] = process.argv;
  const flow = require(require("path").resolve(flowPath));
  connect(targetId)
    .then(async (ctx) => {
      try {
        const r = await flow(ctx);
        console.log(typeof r === "string" ? r : JSON.stringify(r, null, 1));
      } catch (e) {
        console.log(JSON.stringify({ FLOW_ERROR: e.message }, null, 1));
      }
      ctx.ws.close();
    })
    .catch((e) => { console.error("FATAL:", e.message); process.exit(1); });
}
