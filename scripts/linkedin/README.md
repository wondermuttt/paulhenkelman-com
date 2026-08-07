# LinkedIn CDP scripts

Working tooling from the Aug 2026 profile overhaul. Read `../../LINKEDIN.md` first.

Requires a Chrome running with `--remote-debugging-port=9222`, logged into LinkedIn,
and `npm i ws` somewhere on NODE_PATH (or run from a dir with `ws` installed).

## session.js — the one to use

Holds a single CDP connection open for an entire flow, which is what keeps LinkedIn's
forms from unmounting mid-edit.

```bash
node session.js <targetId> <flow.js>
```

Get `<targetId>` from `curl -s http://localhost:9222/json/list`. A flow module exports
`async ({evalJS, nav, rectOf, clickAt, clickEl, typeText, insertText, pressKey, sleep, send}) => result`.

## Flows included

| File | Does |
|---|---|
| `flow-set-desc.js` | Replaces a position's description. Env: `POS_ID`, `DESC_FILE`. |
| `flow-edu-gt.js` | Updates an education entry (degree, field, grade, dates). |
| `flow-edu-uop.js` | Adds an education entry. |
| `native.js` | Standalone: adds a position end-to-end. `node native.js <targetId> <params.json>` |
| `cdp.js` | One-shot evaluate helper. Fine for reading; unreliable for multi-step edits. |

## Reading the profile

```bash
node cdp.js <targetId> extract.js --nav "https://www.linkedin.com/in/<vanity>/"
```
where `extract.js` scrolls the `#workspace` container in rounds until the height
stops growing, then returns `innerText`. Sections lazy-load; a single scroll pass
misses them.
