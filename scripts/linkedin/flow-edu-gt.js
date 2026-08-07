// Update the Georgia Tech education entry.
module.exports = async ({ evalJS, nav, clickEl, typeText, pressKey, sleep }) => {
  const out = {};
  const LT = `(el) => { let l = el.getAttribute('aria-label')||''; if (!l && el.id) { const n = document.querySelector('label[for="'+CSS.escape(el.id)+'"]'); if (n) l = n.innerText.trim().split('\\n')[0]; } if (!l) { const lb = el.getAttribute('aria-labelledby'); if (lb) { const t = document.getElementById(lb); if (t) l = t.innerText.trim().split('\\n')[0]; } } return l; }`;

  await nav("https://www.linkedin.com/in/paulhenkelman/details/education/", 6000);

  const opened = await clickEl(`[...document.querySelectorAll('a[href]')].find(x => (x.getAttribute('href')||'').includes('1189155168'))`);
  if (!opened) return { error: "could not click edu anchor" };

  // wait for form
  let ready = false;
  for (let i = 0; i < 30; i++) {
    await sleep(800);
    const has = await evalJS(`!!document.querySelector('input[placeholder*="Bachelor of Science"]')`);
    if (has) { ready = true; break; }
  }
  if (!ready) return { error: "edu form never mounted", url: await evalJS("location.href") };
  out.formReady = true;

  // Degree: select-all then retype
  const degSel = `document.querySelector('input[placeholder*="Bachelor of Science"]')`;
  await clickEl(degSel, 5);
  await evalJS(`(${degSel}).select()`);
  await typeText("Master of Science - MS");
  await sleep(900);
  await pressKey("Escape", 27);
  out.degree = await evalJS(`(${degSel}).value`);

  // Field of study
  const fosSel = `document.querySelector('input[placeholder*="Ex: Business"]')`;
  await clickEl(fosSel, 5);
  await evalJS(`(${fosSel}).select()`);
  await typeText("Computer Science, Specialization: Artificial Intelligence");
  await sleep(900);
  await pressKey("Escape", 27);
  out.field = await evalJS(`(${fosSel}).value`);

  // Grade
  const gradeSel = `[...document.querySelectorAll('input[type=text]')].find(e => /grade/i.test((${LT})(e)))`;
  const gradeOk = await clickEl(gradeSel, 5);
  if (gradeOk) {
    await typeText("4.0");
    await sleep(500);
    out.grade = await evalJS(`(${gradeSel}).value`);
  }

  // Dates via select setters
  out.dates = await evalJS(`(() => {
    const lt = ${LT};
    const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set;
    const ds = [...document.querySelectorAll('select')].filter(s => /month|year/i.test(lt(s)));
    const vals = ['8','2025','5','2027'];
    const res = [];
    ds.slice(0,4).forEach((s, i) => {
      setter.call(s, vals[i]);
      s.dispatchEvent(new Event('change', {bubbles:true}));
      res.push(lt(s) + '=' + (s.options[s.selectedIndex] ? s.options[s.selectedIndex].text : '?'));
    });
    return JSON.stringify(res);
  })()`);

  await sleep(800);
  const saved = await clickEl(`[...document.querySelectorAll('button')].filter(b => /^save$/i.test((b.innerText||'').trim()) && !b.disabled).pop()`, 8);
  out.saveClicked = saved;
  await sleep(5000);
  out.toast = await evalJS(`(document.body.innerText.match(/updated|saved|error|went wrong|required/i)||['none'])[0]`);
  return out;
};
