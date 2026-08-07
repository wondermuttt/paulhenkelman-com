# CLAUDE.md

## What this repo is

**paulhenkelman.com** — Paul Henkelman's professional site. Next.js 16 (App Router),
TypeScript, Tailwind v4, MDX essays. Deploys to Vercel on push to `main`.

Its job: be the standing professional presence a recruiter finds when they Google
Paul between a screen and a loop. It is evidence of someone who was already an
authority, already writing, already publishing code, before any application existed.
Application materials point at the site; **the site never points back.**

## Hard rules

- **No job-seeking signals.** No "open to opportunities", no résumé download, no
  relocation notes. Ever.
- **No injector-vault / patent mechanism detail.** The patent disclosure is filed but
  the USPTO application is incomplete; public disclosure starts statutory clocks and
  can destroy foreign filing rights. The site may say "patent disclosure filed" and
  nothing more. This waits on counsel's green light, full stop.
- **One story, verbatim-consistent** across site, résumé, and LinkedIn. Recruiters
  cross-reference; identical claims compound, divergent ones raise questions.
- **Voice: no AI tells.** See `ARCHITECTURE.md` for the full researched list. Short
  version: bold only section headers and key-before-value bullet leads; no em-dashes;
  no "not X but Y" contrast-reframes; no ornamental triplets; no "from X to Y" sweeps.
  Impressive without trying — strained phrasing reads as someone who wants to be an
  executive rather than one who is.

## Where content lives

Edit `content/`, not the page components. Pages are thin renderers.

| File | Drives |
|---|---|
| `content/site.ts` | nav, socials, email, meta description |
| `content/home.ts` | homepage hero, pillars, section intros |
| `content/about.ts` | career arc, education, approach |
| `content/systems.ts` | the named-systems evidence cards |
| `content/speaking.ts` | invited talks |
| `content/writing.ts` | writing page copy + external (Medium) entries |
| `content/writing/*.mdx` | essays; frontmatter drives listing and routing |

## Commands

```bash
npm install
npm run dev      # localhost:3000
npm run lint
npm run build    # always run before pushing
```

## Deeper detail

- **`ARCHITECTURE.md`** — content pipeline, adding essays/figures, voice rules in
  full, SEO/metadata, deploy.
- **`LINKEDIN.md`** — automating LinkedIn profile edits over Chrome DevTools
  Protocol. Hard-won; read it before touching LinkedIn again.
