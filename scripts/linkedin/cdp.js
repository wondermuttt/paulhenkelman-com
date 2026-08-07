#!/usr/bin/env node
// Minimal direct-CDP client: evaluate a JS expression in a page target.
// Usage: node cdp.js <targetId|url-substring> <js-file-or-expression> [--nav <url>]
const WebSocket = require("ws");
const fs = require("fs");
const http = require("http");

function listTargets() {
  return new Promise((resolve, reject) => {
    http.get("http://localhost:9222/json/list", (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => resolve(JSON.parse(d)));
    }).on("error", reject);
  });
}

async function main() {
  const [, , sel, exprArg, ...rest] = process.argv;
  const navIdx = rest.indexOf("--nav");
  const navUrl = navIdx >= 0 ? rest[navIdx + 1] : null;

  const targets = await listTargets();
  const page = targets.find(
    (t) => t.type === "page" && (t.id === sel || (t.url || "").includes(sel)),
  );
  if (!page) {
    console.error("No page target matching:", sel);
    console.error("Targets:", targets.filter((t) => t.type === "page").map((t) => t.url));
    process.exit(1);
  }

  const expression = fs.existsSync(exprArg) ? fs.readFileSync(exprArg, "utf8") : exprArg;
  const ws = new WebSocket(page.webSocketDebuggerUrl, { maxPayload: 64 * 1024 * 1024 });
  let id = 0;
  const pending = new Map();
  const send = (method, params) =>
    new Promise((resolve, reject) => {
      const mid = ++id;
      pending.set(mid, { resolve, reject });
      ws.send(JSON.stringify({ id: mid, method, params }));
    });

  ws.on("message", (raw) => {
    const msg = JSON.parse(raw);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
    }
  });

  await new Promise((r) => ws.on("open", r));

  if (navUrl) {
    await send("Page.enable", {});
    await send("Page.navigate", { url: navUrl });
    // wait for load-ish: poll readyState
    for (let i = 0; i < 60; i++) {
      await new Promise((r) => setTimeout(r, 500));
      try {
        const st = await send("Runtime.evaluate", {
          expression: "document.readyState",
          returnByValue: true,
        });
        if (st.result.value === "complete") break;
      } catch {}
    }
    await new Promise((r) => setTimeout(r, 1500)); // SPA settle
  }

  const res = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (res.exceptionDetails) {
    console.error("EXCEPTION:", JSON.stringify(res.exceptionDetails, null, 2).slice(0, 2000));
  } else {
    const v = res.result.value;
    console.log(typeof v === "string" ? v : JSON.stringify(v, null, 2));
  }
  ws.close();
}

main().catch((e) => {
  console.error("FATAL:", e.message);
  process.exit(1);
});
