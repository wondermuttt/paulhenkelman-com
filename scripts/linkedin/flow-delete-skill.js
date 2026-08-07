// Delete a skill by name. Env: SKILL_NAME
module.exports = async (ctx) => {
  const { evalJS, nav, front, clickReal, screenRect, osClick, sleep } = ctx;
  const NAME = process.env.SKILL_NAME;
  const out = { skill: NAME };
  await nav("https://www.linkedin.com/in/paulhenkelman/details/skills/", 5000);
  await front();

  const opened = await clickReal(`[...document.querySelectorAll('a[aria-label],button[aria-label]')].find(e => (e.getAttribute('aria-label')||'') === ${JSON.stringify("Edit " + NAME + " skill")})`, 15);
  if (!opened) { out.error = "edit control not found"; return out; }

  for (let i = 0; i < 20; i++) {
    await sleep(700);
    if (await evalJS(`[...document.querySelectorAll('button')].some(b => /delete skill/i.test((b.innerText||'')))`)) break;
  }
  out.buttons = JSON.parse(await evalJS(`JSON.stringify([...document.querySelectorAll('button')].map(b => (b.innerText||'').trim()).filter(t => t && t.length < 30).slice(0,12))`));

  const del = await screenRect(`[...document.querySelectorAll('button')].find(b => /delete skill/i.test((b.innerText||'')))`, 8);
  if (!del) { out.error = "no delete button"; return out; }
  osClick(del.x, del.y);
  await sleep(2000);

  // confirmation dialog
  const confirm = await screenRect(`[...document.querySelectorAll('button')].find(b => /^delete$/i.test((b.innerText||'').trim()))`, 6);
  if (confirm) { osClick(confirm.x, confirm.y); out.confirmed = true; await sleep(3000); }

  await sleep(2000);
  out.stillPresent = await evalJS(`[...document.querySelectorAll('a[aria-label],button[aria-label]')].some(e => (e.getAttribute('aria-label')||'') === ${JSON.stringify("Edit " + NAME + " skill")})`);
  return out;
};
