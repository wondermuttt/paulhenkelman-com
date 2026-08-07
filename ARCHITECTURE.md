# Architecture

Detail behind `CLAUDE.md`. Read that first.

## Stack

Next.js 16 App Router · TypeScript · Tailwind v4 · MDX via `next-mdx-remote` +
`gray-matter` + `remark-gfm`. Static-first; no CMS, no database, no runtime services.
Vercel builds and deploys every push to `main`.

## Content pipeline

Typed content files in `content/` are the single source of truth. Page components in
`app/` import them and render; they hold layout, not copy. When copy needs to change,
change the content file.

Essays are MDX in `content/writing/`. `lib/writing.ts` does the work:

- `getWritingEntries()` — reads every `.mdx`, parses frontmatter, sorts by date desc.
- `getWritingBySlug(slug)` — compiles one essay to React with `mdxComponents`.
- `getWritingListItems()` — merges local essays with the external entries declared in
  `content/writing.ts` (currently the Medium article) into one date-sorted list. This
  is what the Writing page and homepage render.

`components/mdx/mdx-components.tsx` maps every MDX element to Tailwind classes:
headings, paragraphs, lists, tables (GFM), inline code, images, blockquotes, `hr`.

### Adding an essay

1. Create `content/writing/your-slug.mdx` with frontmatter:

```md
---
title: "Title"
description: "One or two sentences; used for the card and meta description."
publishedAt: "2026-08-07"
status: "Essay"
---
```

2. Write the body. Tables work (GFM). Figures: put SVGs in
   `public/images/writing/` and reference with `![alt](/images/writing/name.svg)`.
3. It appears automatically on `/writing`, the homepage, and `/writing/your-slug`,
   and enters `sitemap.xml`.

Dates are formatted with `timeZone: "UTC"` in both the card and the article page — a
bare `new Date("2026-08-07")` renders as the previous day in US timezones. Keep that.

### Figures

Hand-authored SVG, not a chart library. Fixed `viewBox`, system font stack, dark ink
(`#171717`) for the series that matters and gray (`#a3a3a3`) for context, values
labeled directly. The MDX `img` mapping gives them a border and full width.

## Voice: the anti-AI-tell rules

Paul runs drafts through an anti-AI engine and hand-edits from the top. Anything the
scrub touches but he hasn't reviewed tends to carry artifacts — invented figure
references, inverted facts, repeated phrases. **Never restore an earlier AI-drafted
sentence verbatim to fix a corrupted one**; re-express the same fact in fresh wording,
because the wording difference is the entire point of the scrub.

Researched tells to avoid (sources: Wikipedia:Signs of AI writing, slopdetector.org,
tropes.fyi, Dead Language Society):

- Contrast-reframes: "not X but Y", "X, not Y", "no X, only Y", "stop asking X, start
  asking Y". The single most flagged pattern.
- Ornamental tricolons — three *crafted* phrases for rhythm. Three real things is fine.
- "from X to Y" / "ranging from X to Y" sweeps.
- Parallel paragraph-opener templates repeated three or more times.
- "serves as", "stands as", "marks a", "boasts" in place of plain "is".
- Stock vocabulary: delve, pivotal, robust, seamless, leverage, foster, tapestry,
  testament, landscape, journey, underscore, holistic, ever-evolving.
- Colon-setup headlines and fragment-for-drama pairs ("Not trivia. Leverage.").
- Mid-sentence bold for emphasis. Em-dashes.

One deliberate contrast per piece can stay if it earns its place. Density is the tell.

## SEO and metadata

- `lib/metadata.ts` — `baseMetadata` (defaults, OG, icons) and `buildMetadata()` for
  per-page title/description/canonical/OG. Every route exports its own metadata.
- `app/layout.tsx` — JSON-LD `Person` (jobTitle, worksFor Charter, knowsAbout) and
  `WebSite`.
- `app/sitemap.ts` — static routes plus every essay. **Add new routes here.**
- `app/robots.ts` — index/follow.
- OG image: `public/og/paulhenkelman-og.svg`.

## Routes

`/` · `/about` · `/systems` · `/speaking` · `/writing` · `/writing/[slug]` ·
`/contact` · `sitemap.xml` · `robots.txt`

`/writing/[slug]` is SSG via `generateStaticParams()`. Everything else is static.

## Deploy

Push to `main`; Vercel builds. Verify with `curl` against paulhenkelman.com rather
than the `*.vercel.app` URL — the apex domain is what recruiters hit. A deploy takes
roughly 40–60 seconds to go live.

Run `npm run lint && npm run build` before every push. The build catches MDX and type
errors that `dev` tolerates.
