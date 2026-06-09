# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server (Astro HMR, no Workers runtime) |
| `npm run preview` | Build + run via wrangler dev (simulates Workers runtime) |
| `npm run build` | Production build to `dist/` |
| `npm run deploy` | Build + deploy to Cloudflare Workers via wrangler |
| `npm run check` | Full validation: build + tsc + wrangler dry-run deploy |
| `npm run cf-typegen` | Regenerate `worker-configuration.d.ts` after changing wrangler bindings |

Use `npm run preview` (not `npm run dev`) when testing Cloudflare-specific behavior like Workers bindings or runtime APIs.

## Architecture

This is an **Astro 6 + Cloudflare Workers** portfolio/blog. Astro runs server-side via the `@astrojs/cloudflare` adapter; the built output is a single `dist/_worker.js/index.js` entry served by Cloudflare.

**Two wrangler configs:**
- `wrangler.dev.json` — used by the Astro adapter's `platformProxy` during dev/preview (no `main`, just assets + flags)
- `wrangler.json` — production config, points `main` at the built worker

**Content layer:** Blog posts live in `src/content/blog/` as `.md` or `.mdx`. The schema (`src/content.config.ts`) requires `title`, `description`, and `pubDate`; `updatedDate` and `heroImage` are optional. Dynamic routes at `src/pages/blog/[...slug].astro` render posts at build time.

**Global site metadata** is in `src/consts.ts` (`SITE_TITLE`, `SITE_DESCRIPTION`).

**Cloudflare Workers guidance** is in `AGENTS.md` — always consult current docs before touching Workers/KV/R2/D1/etc., as APIs and limits change frequently.
