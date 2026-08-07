// Add the University of Phoenix education entry.
module.exports = async ({ evalJS, nav, clickEl, typeText, pressKey, sleep }) => {
  const out = {};
  await nav("https://www.linkedin.com/in/paulhenkelman/details/education/", 6000);

  const opened = await clickEl(`[...document.querySelectorAll('a,button')].find(x => /add education/i.test(x.getAttribute('aria-label')||x.innerText||''))`);
  if (!opened) return { error: "no Add education control" };

  let ready = false;
  for (let i = 0; i < 30; i++) {
    await sleep(800);
    if (await evalJS(`!!document.querySelector('input[placeholder*="Boston University"]')`)) { ready = true; break; }
  }
  if (!ready) return { error: "add-edu form never mounted", url: await evalJS("location.href") };
  out.formReady = true;

  const schoolSel = `document.querySelector('input[placeholder*="Boston University"]')`;
  await clickEl(schoolSel, 5);
  await typeText("University of Phoenix");
  await sleep(1800);
  await pressKey("Escape", 27);
  out.school = await evalJS(`(${schoolSel}).value`);

  const degSel = `document.querySelector('input[placeholder*="Bachelor of Science"]')`;
  if (await clickEl(degSel, 6)) {
    await typeText("Bachelor of Science - BS");
    await sleep(900);
    await pressKey("Escape", 27);
    out.degree = await evalJS(`(${degSel}).value`);
  }

  const fosSel = `document.querySelector('input[placeholder*="Ex: Business"]')`;
  if (await clickEl(fosSel, 6)) {
    await typeText("Information Technology, Software Development");
    await sleep(900);
    await pressKey("Escape", 27);
    out.field = await evalJS(`(${fosSel}).value`);
  }

  await sleep(700);
  const saved = await clickEl(`[...document.querySelectorAll('button')].filter(b => /^save$/i.test((b.innerText||'').trim()) && !b.disabled).pop()`, 8);
  out.saveClicked = saved;
  await sleep(5000);
  out.toast = await evalJS(`(document.body.innerText.match(/updated|saved|error|went wrong|required/i)||['none'])[0]`);
  out.url = await evalJS("location.href");
  return out;
};
