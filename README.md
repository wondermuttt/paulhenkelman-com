# PaulHenkelman.com

Production-ready personal authority platform for **Paul Henkelman** — focused on AI architecture, distributed systems, and production-scale operational systems.

## Purpose

This site is designed as a long-horizon professional platform:

- serious, restrained, executive-adjacent tone
- architecture-first positioning (not a résumé dump)
- structured for accumulating writing, systems perspective, and public technical credibility over time

## Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **MDX-ready writing pipeline** (local content files + compiled MDX)
- Static-first architecture suitable for deployment on **Vercel**

## Local development

```bash
npm install
npm run dev
```

Open: <http://localhost:3000>

## Build and verification

```bash
npm run lint
npm run build
npm run start
```

## Content architecture

Main editable content lives in:

- `content/site.ts` → global site config, social links, nav, email placeholder
- `content/home.ts` → homepage copy
- `content/about.ts` → about page narrative and sections
- `content/systems.ts` → systems domain map
- `content/writing.ts` → writing page intro/status copy
- `content/writing/*.mdx` → individual writing entries

## Adding future MDX writing

1. Create a new file in `content/writing/` named `your-slug.mdx`
2. Include frontmatter:

```md
---
title: "Your Title"
description: "One sentence summary"
publishedAt: "2026-03-06"
status: "Essay" # or "Forthcoming note"
---
```

3. Add body content in Markdown/MDX.
4. Entry will automatically appear on `/writing` and generate at `/writing/your-slug`.

## SEO and metadata

- Global metadata defaults: `lib/metadata.ts`
- Per-page metadata: each route file exports metadata
- `app/robots.ts` and `app/sitemap.ts` included
- JSON-LD structured data (Person + WebSite) included in `app/layout.tsx`

### Placeholder assets to replace

- Social preview image: `public/og/paulhenkelman-og.svg`
- Favicons:
  - `public/favicon-16x16.png`
  - `public/favicon-32x32.png`
  - `public/apple-touch-icon.png`
  - `app/favicon.ico`

## Deployment to Vercel

### 1) Connect GitHub repository

- Push this repo to GitHub
- In Vercel: **Add New → Project → Import Git Repository**
- Select this repository

### 2) Project settings

- Framework preset: **Next.js** (auto-detected)
- Root directory: repository root
- Production branch: `main`
- Environment variables: none required for v1

### 3) Domain setup for `paulhenkelman.com`

In Vercel Project → **Settings → Domains**:

- Add `paulhenkelman.com` (apex/root)
- Add `www.paulhenkelman.com`
- Set redirect so only one canonical domain is primary (recommended: apex as primary, `www` redirect to apex)

Update DNS records as shown by Vercel (typically A/ALIAS for apex + CNAME for `www`).

## Notes

- The site is intentionally minimal and maintainable: no CMS, no DB, no unnecessary runtime dependencies.
- The content model is designed for easy iteration by editing typed content files and MDX entries.
