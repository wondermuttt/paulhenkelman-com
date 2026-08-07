#!/usr/bin/env node
// Trusted-input CDP driver: real mouse events + real keystrokes.
// Usage: node native.js <targetId> <params.json>
const WebSocket = require("ws");
const fs = require("fs");
const http = require("http");

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
  const [, , targetId, paramsPath] = process.argv;
  const P = JSON.parse(fs.readFileSync(paramsPath, "utf8"));

  const targets = await listTargets();
  const page = targets.find((t) => t.type === "page" && (t.id === targetId || (t.url || "").includes(targetId)));
  if (!page) { console.error("no target"); process.exit(1); }

  const ws = new WebSocket(page.webSocketDebuggerUrl, { maxPayload: 64 * 1024 * 1024 });
  let id = 0;
  const pending = new Map();
  const send = (method, params) =>
    new Promise((res, rej) => {
      const mid = ++id;
      pending.set(mid, { res, rej });
      ws.send(JSON.stringify({ id: mid, method, params }));
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

  const evalJS = async (expr, awaitPromise = false) => {
    const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise });
    if (r.exceptionDetails) throw new Error("JS: " + JSON.stringify(r.exceptionDetails).slice(0, 300));
    return r.result.value;
  };

  // Locate an element and return its viewport-center coords. finder = JS expr returning an Element.
  const rectOf = async (finder, tries = 25) => {
    for (let i = 0; i < tries; i++) {
      const v = await evalJS(`(() => {
        const el = (${finder});
        if (!el) return null;
        el.scrollIntoView({block: 'center', behavior: 'instant'});
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return null;
        return JSON.stringify({x: r.left + r.width/2, y: r.top + r.height/2});
      })()`);
      if (v) return JSON.parse(v);
      await sleep(800);
    }
    return null;
  };

  const clickAt = async (pt) => {
    await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: pt.x, y: pt.y, buttons: 0 });
    await sleep(120);
    await send("Input.dispatchMouseEvent", { type: "mousePressed", x: pt.x, y: pt.y, button: "left", buttons: 1, clickCount: 1 });
    await sleep(80);
    await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: pt.x, y: pt.y, button: "left", buttons: 0, clickCount: 1 });
    await sleep(400);
  };

  const typeText = async (text) => {
    // real keystrokes, char by char (slower but triggers every handler)
    for (const ch of text) {
      if (ch === "\n") {
        await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
        await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
      } else {
        await send("Input.dispatchKeyEvent", { type: "keyDown", key: ch, text: ch, unmodifiedText: ch });
        await send("Input.dispatchKeyEvent", { type: "keyUp", key: ch });
      }
      await sleep(6);
    }
  };
  const pressKey = async (key, vk) => {
    await send("Input.dispatchKeyEvent", { type: "rawKeyDown", key, code: key, windowsVirtualKeyCode: vk });
    await send("Input.dispatchKeyEvent", { type: "keyUp", key, code: key, windowsVirtualKeyCode: vk });
    await sleep(300);
  };

  const out = { role: P.title };

  // 1. land on the experience details page
  await send("Page.enable", {});
  await send("Page.navigate", { url: "https://www.linkedin.com/in/paulhenkelman/details/experience/" });
  for (let i = 0; i < 40; i++) {
    await sleep(500);
    if ((await evalJS("document.readyState")) === "complete") break;
  }
  await sleep(5000);

  // 2. click "Add a position or career break"
  const addPt = await rectOf(`[...document.querySelectorAll('button,a')].find(b => /add a position or career break/i.test(b.getAttribute('aria-label')||b.innerText||''))`);
  if (!addPt) { console.log(JSON.stringify({ error: "add button not found" })); ws.close(); return; }
  await clickAt(addPt);
  await sleep(1500);

  // 3. click "Add role"
  const rolePt = await rectOf(`[...document.querySelectorAll('a,button,[role=menuitem]')].find(b => /^add role$/i.test((b.innerText||'').trim()))`, 15);
  if (!rolePt) { console.log(JSON.stringify({ error: "Add role not found" })); ws.close(); return; }
  await clickAt(rolePt);
  await sleep(6000);

  // 4. title: click then type
  const titlePt = await rectOf(`document.querySelector('input[placeholder*="Retail Sales Manager"]')`, 30);
  if (!titlePt) {
    const dbg = await evalJS(`JSON.stringify({url: location.href, inputs: [...document.querySelectorAll('input')].map(e=>e.placeholder||e.type)})`);
    console.log(JSON.stringify({ error: "title field never appeared", dbg: JSON.parse(dbg) }, null, 1));
    ws.close();
    return;
  }
  await clickAt(titlePt);
  await typeText(P.title);
  await sleep(1200);
  await pressKey("Escape", 27);
  out.titleSet = await evalJS(`(document.querySelector('input[placeholder*="Retail Sales Manager"]')||{}).value`);

  // 5. company
  const compPt = await rectOf(`document.querySelector('input[placeholder*="Microsoft"]')`, 20);
  if (compPt) {
    await clickAt(compPt);
    await typeText(P.company);
    await sleep(1800);
    await pressKey("Escape", 27);
    out.companySet = await evalJS(`(document.querySelector('input[placeholder*="Microsoft"]')||{}).value`);
  } else out.companyError = "no company field";

  // 6. uncheck "currently working"
  if (P.endYear) {
    const cbFinder = `[...document.querySelectorAll('input[type=checkbox]')].find(c => c.checked && /current|working/i.test((c.closest('div')||{innerText:''}).innerText.slice(0,120)))`;
    const has = await evalJS(`!!(${cbFinder})`);
    if (has) {
      const pt = await rectOf(cbFinder, 5);
      if (pt) { await clickAt(pt); await sleep(1200); out.uncheckedCurrent = true; }
    }
  }

  // 7. selects (DOM setter is reliable for <select>)
  const setSel = async (labelRe, val) => {
    return await evalJS(`(() => {
      const lt = (el) => {
        let l = el.getAttribute('aria-label') || '';
        if (!l && el.id) { const n = document.querySelector('label[for="' + CSS.escape(el.id) + '"]'); if (n) l = n.innerText.trim().split('\\n')[0]; }
        if (!l) { const lb = el.getAttribute('aria-labelledby'); if (lb) { const t = document.getElementById(lb); if (t) l = t.innerText.trim().split('\\n')[0]; } }
        return l;
      };
      const s = [...document.querySelectorAll('select')].find(x => ${labelRe}.test(lt(x)));
      if (!s) return null;
      const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set;
      setter.call(s, ${JSON.stringify(val)});
      s.dispatchEvent(new Event('change', {bubbles:true}));
      return s.options[s.selectedIndex] ? s.options[s.selectedIndex].text : null;
    })()`);
  };
  if (P.employmentType) {
    out.employmentType = await evalJS(`(() => {
      const lt = (el) => { let l = el.getAttribute('aria-label')||''; if (!l && el.id) { const n = document.querySelector('label[for="'+CSS.escape(el.id)+'"]'); if (n) l = n.innerText.trim().split('\\n')[0]; } return l; };
      const s = [...document.querySelectorAll('select')].find(x => /employment type/i.test(lt(x)));
      if (!s) return null;
      const o = [...s.options].find(o => o.text.trim() === ${JSON.stringify(P.employmentType)});
      if (!o) return null;
      const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set;
      setter.call(s, o.value); s.dispatchEvent(new Event('change', {bubbles:true}));
      return s.options[s.selectedIndex].text;
    })()`);
  }
  await sleep(500);
  if (P.startMonth) out.startMonth = await setSel("/^(start )?month\\*?$/i", P.startMonth);
  if (P.startYear) out.startYear = await setSel("/^(start )?year\\*?$/i", P.startYear);
  await sleep(400);
  if (P.endMonth) out.endMonth = await setSel("/end month/i", P.endMonth);
  if (P.endYear) out.endYear = await setSel("/end year/i", P.endYear);

  // 8. description: click then insert (bulk insert to avoid thousands of keystrokes)
  if (P.description) {
    const dPt = await rectOf(`[...document.querySelectorAll('div[contenteditable=true]')].find(d => /description/i.test(d.getAttribute('aria-label')||'')) || document.querySelector('div[contenteditable=true]')`, 10);
    if (dPt) {
      await clickAt(dPt);
      await sleep(400);
      await send("Input.insertText", { text: P.description });
      await sleep(1200);
      out.descLen = await evalJS(`(() => { const d = [...document.querySelectorAll('div[contenteditable=true]')].find(x => /description/i.test(x.getAttribute('aria-label')||'')) || document.querySelector('div[contenteditable=true]'); return d ? d.innerText.length : 0; })()`);
    } else out.descError = "no description editor";
  }

  // 9. save
  await sleep(800);
  const savePt = await rectOf(`[...document.querySelectorAll('button')].filter(b => /^save$/i.test((b.innerText||'').trim()) && !b.disabled).pop()`, 8);
  if (!savePt) {
    out.saveError = "no enabled Save";
    console.log(JSON.stringify(out, null, 1));
    ws.close();
    return;
  }
  await clickAt(savePt);
  await sleep(6000);
  out.afterUrl = await evalJS("location.href");
  out.toast = await evalJS(`(document.body.innerText.match(/updated|saved|error|went wrong|required/i)||['none'])[0]`);
  console.log(JSON.stringify(out, null, 1));
  ws.close();
}
main().catch((e) => { console.error("FATAL:", e.message); process.exit(1); });
