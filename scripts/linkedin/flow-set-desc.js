// Replace a position's description. Env: POS_ID, DESC_FILE
const fs = require("fs");
module.exports = async ({ evalJS, nav, clickEl, insertText, sleep }) => {
  const POS = process.env.POS_ID;
  const DESC = fs.readFileSync(process.env.DESC_FILE, "utf8").replace(/\s+$/, "");
  const out = { posId: POS, descLen: DESC.length };
  if (DESC.length > 2000) return { error: "description too long", len: DESC.length };

  await nav("https://www.linkedin.com/in/paulhenkelman/details/experience/", 6000);
  // scroll so the entry mounts, then DOM-click the edit anchor (SPA route)
  let found = false;
  for (let r = 0; r < 15; r++) {
    found = await evalJS(`(() => { const ws = document.getElementById('workspace') || document.scrollingElement; ws.scrollTo(0, ${"${r}"} * 500); return !!document.querySelector('a[href*="${POS}"]'); })()`.replace("${r}", String(r)));
    if (found) break;
    await sleep(700);
  }
  if (!found) return { error: "anchor not found after scrolling" };
  await evalJS(`document.querySelector('a[href*="${POS}"]').click()`);
  out.clickedAnchor = true;

  let ready = false;
  for (let i = 0; i < 30; i++) {
    await sleep(900);
    if (await evalJS(`!!document.querySelector('div[contenteditable=true]')`)) { ready = true; break; }
  }
  if (!ready) return { error: "form never mounted", url: await evalJS("location.href") };

  const DSEL = `([...document.querySelectorAll('div[contenteditable=true]')].find(d => /description/i.test(d.getAttribute('aria-label')||'')) || document.querySelector('div[contenteditable=true]'))`;
  await clickEl(DSEL, 6);
  await sleep(400);
  // select all existing content, then replace
  await evalJS(`(() => { const d = ${DSEL}; d.focus(); const r = document.createRange(); r.selectNodeContents(d); const s = getSelection(); s.removeAllRanges(); s.addRange(r); return true; })()`);
  await sleep(300);
  await insertText(DESC);
  await sleep(1500);
  out.after = await evalJS(`${DSEL}.innerText.length`);
  out.head = await evalJS(`${DSEL}.innerText.slice(0,80)`);

  await sleep(800);
  out.saveClicked = await evalJS(`(() => { const b = [...document.querySelectorAll('button')].filter(x => /^save$/i.test((x.innerText||'').trim()) && !x.disabled).pop(); if (!b) return false; b.click(); return true; })()`);
  await sleep(6000);
  out.toast = await evalJS(`(document.body.innerText.match(/updated|saved|error|went wrong|required/i)||['none'])[0]`);
  return out;
};
