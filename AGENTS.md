<!-- BEGIN:nextjs-agent-rules -->

# Next.js 16 — read bundled docs before coding

Before writing any Next.js code, read the relevant guide in `node_modules/next/dist/docs/`. Your training data is outdated — the version-matched docs are the source of truth.

## Next.js 16 breaking changes (won't guess correctly)

- **Turbopack is default** — no `--turbopack` flag needed. Use `--webpack` to opt out.
- **Async Request APIs are mandatory** — `params`, `searchParams`, `cookies()`, `headers()`, `draftMode()` are all async only. Synchronous access is removed.
- **`middleware` → `proxy`** — both the filename (`proxy.ts`) and the exported function name must be `proxy`. The `edge` runtime is NOT supported in `proxy`; use `middleware` for edge.
- **`next lint` removed** — use `eslint` directly. `next build` no longer runs linting.
- **`cacheLife` / `cacheTag` are stable** — no `unstable_` prefix needed.
- **`revalidateTag` requires a second argument** (a `cacheLife` profile). Use `updateTag` for immediate invalidation.
- **Parallel routes require explicit `default.js`** — builds fail without them.
- **AMP, `next/legacy/image`, `images.domains`, `serverRuntimeConfig`, `next/config`** — all removed or deprecated.
- **Dev output at `.next/dev`** — separate from build output.

## Project setup

- **Stack:** Next.js 16.2.7 + React 19.2 + TypeScript 5 + Tailwind CSS v4
- **App Router** with `src/` directory — pages in `src/app/`
- **Import alias:** `@/*` → `./src/*`
- **ESLint flat config** — in `eslint.config.mjs`
- **Tailwind v4** — uses `@import "tailwindcss"` and `@theme` directives (NOT v3 `@tailwind` directives)
- **Package manager:** npm
- **No test framework installed yet**

## Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Start production | `npm start` |
| Lint | `npm run lint` (calls `eslint`) |

<!-- END:nextjs-agent-rules -->

## Custom conventions (outside Next.js section)

- Landing page project — single-page focus
- Geist font via `next/font/google` (Geist Sans + Geist Mono)
- `<html>` has `h-full`, `<body>` gets `min-h-full flex flex-col` — layout is full-height by default
