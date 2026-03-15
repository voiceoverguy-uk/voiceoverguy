# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   └── api-server/         # Express API server
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts, run via `pnpm --filter @workspace/scripts run <script>`
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- App setup: `src/app.ts` — mounts CORS, JSON/urlencoded parsing, routes at `/api`
- Routes: `src/routes/index.ts` mounts sub-routers; `src/routes/health.ts` exposes `GET /health` (full path: `/api/health`)
- Depends on: `@workspace/db`, `@workspace/api-zod`
- `pnpm --filter @workspace/api-server run dev` — run the dev server
- `pnpm --filter @workspace/api-server run build` — production esbuild bundle (`dist/index.cjs`)
- Build bundles an allowlist of deps (express, cors, pg, drizzle-orm, zod, etc.) and externalizes the rest

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL. Exports a Drizzle client instance and schema models.

- `src/index.ts` — creates a `Pool` + Drizzle instance, exports schema
- `src/schema/index.ts` — barrel re-export of all models
- `src/schema/<modelname>.ts` — table definitions with `drizzle-zod` insert schemas (no models definitions exist right now)
- `drizzle.config.ts` — Drizzle Kit config (requires `DATABASE_URL`, automatically provided by Replit)
- Exports: `.` (pool, db, schema), `./schema` (schema only)

Production migrations are handled by Replit when publishing. In development, we just use `pnpm --filter @workspace/db run push`, and we fallback to `pnpm --filter @workspace/db run push-force`.

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`). Running codegen produces output into two sibling packages:

1. `lib/api-client-react/src/generated/` — React Query hooks + fetch client
2. `lib/api-zod/src/generated/` — Zod schemas

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec (e.g. `HealthCheckResponse`). Used by `api-server` for response validation.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec (e.g. `useHealthCheck`, `healthCheck`).

### `scripts` (`@workspace/scripts`)

Utility scripts package. Each script is a `.ts` file in `src/` with a corresponding npm script in `package.json`. Run scripts via `pnpm --filter @workspace/scripts run <script>`. Scripts can import any workspace package (e.g., `@workspace/db`) by adding it as a dependency in `scripts/package.json`.

---

## VoiceoverGuy Website (`artifacts/web`)

**Goal:** Faithful Next.js 14 (App Router) rebuild of voiceoverguy.co.uk — Guy Harris, professional British male voiceover artist.

### Architecture

- **Framework:** Next.js 14.2.29 (App Router, Server Components)
- **Port:** 22333 (dev and start scripts bind to `0.0.0.0:22333`)
- **Styling:** Custom CSS in `src/app/globals.css` (no Tailwind — vanilla CSS with CSS variables)
- **Fonts:** Ubuntu (headings) + Open Sans (body) via Google Fonts `@import` in CSS
- **Brand colours:** Primary red `#9C060B`, dark crimson `#7a0508`, black, white

### Key Files

- `src/app/layout.tsx` — Root layout with Navbar + Footer
- `src/app/globals.css` — All global styles + CSS variables
- `src/app/page.tsx` — Homepage
- `src/components/Navbar.tsx` — Full navbar with all dropdowns (client component)
- `src/components/Footer.tsx` — Footer with social links
- `src/components/FaqAccordion.tsx` — Interactive FAQ accordion (client component)
- `src/components/ContactForm.tsx` — Contact form with live pricing calculator (client component)
- `src/components/NewsSection.tsx` — Latest news with show-more toggle (client component)
- `src/data/news.ts` — All 34 news items from live site
- `src/data/projects.ts` — Portfolio project data for dynamic [slug] route

### Pages Built

Core pages: `/`, `/voiceoverguy`, `/commercial-voiceover`, `/apple-voice-style`, `/voice-of-god`, `/santa-voice`, `/david-attenborough-voice`, `/football-commentator-voice`, `/FAQ`, `/contact-guy`, `/voiceover-studio`

Dynamic route: `/[slug]` — serves portfolio/project pages from `src/data/projects.ts`

404: `src/app/not-found.tsx`

### Static Assets (extracted from zip)

All assets extracted from `attached_assets/assets_1773447812268.zip` into `artifacts/web/public/assets/`:
- **Logo:** `assets/images/guy-harris-voiceover.png` (+ `.webp`)
- **Audio showreels:** `assets/audio/guy-harris-voiceoverguy-commercial-showreel.mp3`, `-character-showreel.mp3`, `-explainer-video-showreel.mp3`
- **Arabella Harris audio:** `assets/audio/arabella-harris-age-9-showreel-2025.mp3`
- **Homepage video thumbnails:** `assets/images/voiceoverguy-home-*.jpg` (6 custom illustrated thumbnails)
- **Client logos:** `assets/images/clients/` (115 PNG logos — Apple, Disney, BBC, Microsoft, etc.)

### Homepage Content (verbatim from live site)

The homepage uses exact verbatim text from the original voiceoverguy.co.uk. Key sections in order:
1. Hero (light grey background, native audio player, star rating)
2. Awards / credentials paragraph with links
3. Event or Awards Night Voiceover?
4. Why Clients Choose Me + "Read the full story →"
5. Need a British Child Voiceover? (Arabella Harris)
6. Ready to book CTA
7. Three showreel audio players (Commercial, Character, Explainer)
8. Six video tiles with custom illustrated thumbnails
9. Client logos strip (greyscale → colour on hover)
10. Six feature blocks (Heard Worldwide, Same Day Delivery, Location, Pro vs Cheaper Alternative?, Bespoke Demos, Studio Tech)
11. Latest News section

### React Version Note

React 19.1.0 is used (from workspace catalog). Next.js 14 expects React 18 but works correctly with React 19 despite peer warning. Do not downgrade React — it is pinned at 19.1.0 for the Expo mobile artifact.
