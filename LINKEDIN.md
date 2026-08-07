# Automating LinkedIn profile edits (Chrome DevTools Protocol)

Paul's employer does not permit Chrome extensions, so the Claude-in-Chrome MCP is
unavailable and computer-use grants browsers **read tier only** (screenshots yes,
clicks and typing no). CDP against a debug-enabled Chrome is the only working path.

Assume a Chrome already running with `--remote-debugging-port=9222` and logged into
LinkedIn. Verify: `curl -s http://localhost:9222/json/version`.

## The four rules that make this work

Everything below was learned the hard way. Ignore any of it and the forms fail
silently.

### 1. Kill update broadcasting FIRST

Settings → Visibility → "Share profile updates with your network" → **off**, before
any edit. Otherwise every change notifies the user's current colleagues.

```
https://www.linkedin.com/mypreferences/d/settings/notify-network-for-updates
```
Click the toggle and confirm the page reads "Off" before proceeding.

### 2. One persistent CDP session per flow

**This is the big one.** LinkedIn's SPA unmounts an open edit form when the CDP
WebSocket disconnects. A sequence of separate `node script.js` invocations will open a
form in call 1 and find it gone in call 2. Everything for one form — navigate, click,
fill, save — must happen inside a single connection that stays open.

`scratchpad/session.js` implements a runner: it connects once and hands a flow module
`{evalJS, nav, rectOf, clickAt, clickEl, typeText, insertText, pressKey, sleep}`.

### 3. Real keystrokes, not `.value =`

React-controlled inputs reject programmatic value assignment; the field looks filled
and submits empty. Use `Input.dispatchKeyEvent` per character:

```js
await send("Input.dispatchKeyEvent", {type:"keyDown", key:ch, text:ch, unmodifiedText:ch});
await send("Input.dispatchKeyEvent", {type:"keyUp", key:ch});
```

`Input.insertText` is fine for long bodies (descriptions) where per-char is too slow.
For `contenteditable` descriptions: click it, select all via `Range`, then insert.

`<select>` elements are the exception — the native value setter plus a `change` event
works, and is far faster than keyboard navigation:

```js
const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,'value').set;
setter.call(sel, "3"); sel.dispatchEvent(new Event('change',{bubbles:true}));
```

### 4. Navigation must be in-app

Direct `Page.navigate` to an edit-form URL (`/edit/forms/position/<id>/`) loads the
route but **never hydrates the form**. Only SPA navigation works: load a real page,
then click the anchor. Edit anchors respond to a plain DOM `.click()`; the
"Add a position or career break" button needs a *trusted* `Input.dispatchMouseEvent`.

## Page-by-page notes

| Target | Entry point | Notes |
|---|---|---|
| Headline | `/in/<vanity>/edit/intro/` | Headline is a `contenteditable` div, not an input. 220 char limit. |
| About | "Edit about" → `/edit/forms/summary/new/` | `contenteditable`. 2,600 char limit. |
| Edit a position | `/details/experience/` → DOM-click `a[href*="<positionId>"]` | Most reliable form in the product. |
| Add a position | `/details/experience/` → trusted-click "Add a position or career break" → click **"Add role"** in the menu | Two-step. Fields identify by placeholder (`Ex: Retail Sales Manager`, `Ex: Microsoft`), not label. |
| Education | `/details/education/` → click entry anchor, or "Add education" | Degree placeholder `Ex: Bachelor of Science`, field `Ex: Business`. |
| Skills | `/details/skills/` → "Add a skill" | **Unreliable under automation.** Form often refuses to mount. Do by hand. |
| Contact info | `/overlay/contact-info/` → "Edit contact info" | **Unreliable.** The edit form does not hydrate. Do by hand. |

### Gotchas

- **Element labels come from three places.** Check `aria-label`, then
  `label[for=id]`, then `aria-labelledby`. A lookup missing the third silently finds
  nothing. Prefer `placeholder` when one exists — it lives on the input itself and
  appears before the label does.
- **The add-position form reuses stale select values.** A month left over from the
  previous entry gets applied silently. After adding a role with year-only dates,
  re-open it and clear both month selects (`value = ""`).
- **The add form labels dates "Month"/"Year\*"** while "I am currently working in this
  role" is checked; unchecking it re-labels them "Start month"/"End month" and reveals
  the end pair. Match both spellings, or select date fields positionally.
- **Never click the checkbox reading "End current position as of now."** It terminates
  the *current* job. The one to uncheck reads "I am currently working in this role".
- **Tabs go stale.** After many automated navigations a tab renders skeletons forever
  and `scrollHeight` freezes. Fix: open a fresh tab
  (`curl -X PUT "http://localhost:9222/json/new?<url>"`) and use its target id.
- **Scroll to mount.** Profile sections lazy-load. Scroll the `#workspace` container
  in rounds until `scrollHeight` stops growing *and* the element you want exists.
- **Ad-feedback junk pollutes queries.** `input[type=radio]` with
  "It's annoying or not interesting" belongs to an ad widget, not the form. Filter it.
- **Saves are quiet.** A toast is not reliably detectable. Verify by re-reading the
  rendered profile, never by trusting the click.

## There is no API

LinkedIn offers no write API for member profiles. The Marketing API covers ads and
org pages; Sign In with LinkedIn (OIDC) returns name/photo/email read-only; the
profile-edit endpoints were retired years ago. The internal "Voyager" endpoints the
web app uses are off-limits — hitting them violates the User Agreement's automation
ban and risks account restriction, which is an unacceptable trade on the account
being used for a job search. UI automation is the only route.
