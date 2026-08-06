# Agent Guidance

This file provides guidance when working with code in this repository.

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

Run `wrangler types` after changing bindings in `wrangler.json`.

## Architecture

This is an **Astro 6 + Cloudflare Workers** portfolio/blog. Astro runs server-side via the `@astrojs/cloudflare` adapter; the built output is served by Cloudflare Workers.

**Two wrangler configs:**
- `wrangler.dev.json` — used by the Astro adapter's `platformProxy` during dev/preview (no `main`, just assets + flags)
- `wrangler.json` — production config, points `main` at the built worker

**Content layer:** Blog posts live in `src/content/blog/` as `.md` or `.mdx`. The schema (`src/content.config.ts`) requires `title`, `description`, and `pubDate`; `updatedDate` and `heroImage` are optional. Dynamic routes at `src/pages/blog/[...slug].astro` render posts at build time.

**Global site metadata** is in `src/consts.ts` (`SITE_TITLE`, `SITE_DESCRIPTION`).

## Cloudflare Workers

STOP. Your knowledge of Cloudflare Workers APIs and limits may be outdated. Always retrieve current documentation before any Workers, KV, R2, D1, Durable Objects, Queues, Vectorize, AI, or Agents SDK task.

### Docs

- https://developers.cloudflare.com/workers/
- MCP: `https://docs.mcp.cloudflare.com/mcp`

For all limits and quotas, retrieve from the product's `/platform/limits/` page. eg. `/workers/platform/limits`

### Node.js Compatibility

https://developers.cloudflare.com/workers/runtime-apis/nodejs/

### Errors

- **Error 1102** (CPU/Memory exceeded): Retrieve limits from `/workers/platform/limits/`
- **All errors**: https://developers.cloudflare.com/workers/observability/errors/

### Product Docs

Retrieve API references and limits from:
`/kv/` · `/r2/` · `/d1/` · `/durable-objects/` · `/queues/` · `/vectorize/` · `/workers-ai/` · `/agents/`

### Best Practices (conditional)

If the application uses Durable Objects or Workflows, refer to the relevant best practices:

- Durable Objects: https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/
- Workflows: https://developers.cloudflare.com/workflows/build/rules-of-workflows/
