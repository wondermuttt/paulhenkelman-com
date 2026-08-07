const { execFileSync } = require("child_process");
const osa = (s) => execFileSync("osascript", ["-e", s], { encoding: "utf8" }).trim();
const selectAll = () => osa(`tell application "System Events" to keystroke "a" using command down`);
const pressDelete = () => osa(`tell application "System Events" to key code 51`);

module.exports = async (ctx) => {
  const { evalJS, nav, front, clickReal, screenRect, osClick, osType, sleep } = ctx;
  const out = {};
  await nav("https://www.linkedin.com/in/paulhenkelman/", 6000);
  await front();
  await clickReal(`[...document.querySelectorAll('a,button')].find(x => /^contact info$/i.test((x.innerText||'').trim()))`, 12);
  await sleep(3000);
  await clickReal(`[...document.querySelectorAll('a,button')].find(x => /edit contact info/i.test(x.getAttribute('aria-label')||x.innerText||''))`, 12);
  for (let i = 0; i < 25; i++) {
    await sleep(900);
    if (await evalJS(`[...document.querySelectorAll('input')].some(e => /x\\.com/i.test(e.value||''))`)) break;
  }
  out.opened = await evalJS("location.href");

  // full field inventory including email
  out.fields = JSON.parse(await evalJS(`JSON.stringify([...document.querySelectorAll('input')].map((e,i)=>({i, t:e.type, v:(e.value||'').slice(0,50)})).filter(x=>x.t==='text'||x.t==='email'))`));

  // 1. clear the x.com website field
  const xf = `[...document.querySelectorAll('input')].find(e => /x\\.com/i.test(e.value||''))`;
  const xp = await screenRect(xf, 6);
  if (xp) {
    osClick(xp.x, xp.y); await sleep(400);
    selectAll(); await sleep(250);
    pressDelete(); await sleep(600);
    out.xCleared = await evalJS(`(() => { const e = [...document.querySelectorAll('input')].find(i => /x\\.com/i.test(i.value||'')); return e ? e.value : 'cleared'; })()`);
  } else out.xNotFound = true;

  // 2. replace the email
  const ef = `[...document.querySelectorAll('input')].find(e => /@henkelman\\.net/i.test(e.value||''))`;
  const ep = await screenRect(ef, 6);
  if (ep) {
    osClick(ep.x, ep.y); await sleep(400);
    selectAll(); await sleep(250);
    osType("contact@henkelman.net");
    await sleep(800);
    out.emailNow = await evalJS(`(() => { const e = [...document.querySelectorAll('input')].find(i => /henkelman\\.net/i.test(i.value||'')); return e ? e.value : null; })()`);
  } else out.emailNotFound = true;

  // 3. save
  const sp = await screenRect(`[...document.querySelectorAll('button')].filter(b => /^save$/i.test((b.innerText||'').trim()) && !b.disabled).pop()`, 8);
  if (sp) { osClick(sp.x, sp.y); out.saved = true; await sleep(4500); }
  out.url = await evalJS("location.href");
  return out;
};
