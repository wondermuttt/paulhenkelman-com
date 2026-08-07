// Add skills using real OS mouse + keyboard. Env: SKILLS (comma separated)
module.exports = async (ctx) => {
  const { evalJS, nav, front, clickReal, screenRect, osClick, osType, osKey, sleep } = ctx;
  const SKILLS = (process.env.SKILLS || "").split(",").map((s) => s.trim()).filter(Boolean);
  const results = [];

  const INPUT = `document.querySelector('input[placeholder*="Skill (ex"]')`;
  const SAVE = `[...document.querySelectorAll('button')].filter(b => /^save$/i.test((b.innerText||'').trim()) && !b.disabled).pop()`;

  for (const skill of SKILLS) {
    const r = { skill };
    try {
      await nav("https://www.linkedin.com/in/paulhenkelman/details/skills/", 4500);
      await front();

      // open the modal with a real click
      const opened = await clickReal(`[...document.querySelectorAll('a,button')].find(x => /add a skill/i.test(x.getAttribute('aria-label')||x.innerText||''))`, 10);
      if (!opened) { r.error = "add button not found"; results.push(r); continue; }

      // wait for the modal input
      let ready = false;
      for (let i = 0; i < 20; i++) {
        await sleep(700);
        if (await evalJS(`!!${INPUT}`)) { ready = true; break; }
      }
      if (!ready) { r.error = "modal never opened"; results.push(r); continue; }

      // click into the field and type for real
      const ip = await screenRect(INPUT, 6);
      if (!ip) { r.error = "input has no rect"; results.push(r); continue; }
      osClick(ip.x, ip.y);
      await sleep(500);
      osType(skill);
      await sleep(2600);

      // pick the first typeahead suggestion
      osKey(125); // down
      await sleep(400);
      osKey(36);  // return
      await sleep(1200);
      r.fieldValue = await evalJS(`(${INPUT} ? ${INPUT}.value : null)`);

      // save
      const sp = await screenRect(SAVE, 6);
      if (!sp) { r.error = "save not enabled"; r.stillOpen = true; results.push(r); continue; }
      osClick(sp.x, sp.y);
      await sleep(3500);
      r.url = await evalJS("location.href");
      r.ok = !/edit\/forms\/new/.test(r.url);
    } catch (e) {
      r.error = e.message.slice(0, 120);
    }
    results.push(r);
  }
  return results;
};
