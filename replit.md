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
- Routes: `src/routes/index.ts` mounts sub-routers; `src/routes/health.ts` exposes `GET /health` (full path: `/api/health`); `src/routes/generate.ts` exposes `POST /generate` (Attenborough) and `POST /generate1` (Santa) — AI script generators using OpenAI via Replit AI integrations
- Depends on: `@workspace/db`, `@workspace/api-zod`, `openai`
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

**Goal:** Faithful Next.js 14 (App Router) rebuild of voiceoverguy.co.uk — Guy Harris, professional British male voiceover artist. All content sourced from the original SQL database to preserve exact wording and Google rankings.

### Architecture

- **Framework:** Next.js 14.2.29 (App Router, Server Components)
- **Port:** 22333 (dev and start scripts bind to `0.0.0.0:22333`)
- **Styling:** Custom CSS in `src/app/globals.css` (no Tailwind — vanilla CSS with CSS variables)
- **Fonts:** Century Gothic (GOTHIC.TTF, GOTHICB.TTF, GOTHICBI.TTF, GOTHICI.TTF) via `@font-face` in globals.css. Files in `public/fonts/`.
- **Brand colours:** Primary red `#9C060B`, dark crimson `#7a0508`, black, white
- **Content source:** `src/data/pages.json` — all 1,067 SQL rows parsed from `attached_assets/cl10-admin2_1773602381109.sql`

### Key Files

- `src/app/layout.tsx` — Root layout with Navbar + Footer
- `src/app/globals.css` — All global styles + CSS variables + @font-face
- `src/app/page.tsx` — Homepage
- `src/components/Navbar.tsx` — Full navbar with all dropdowns (client component)
- `src/components/Footer.tsx` — Footer with social links
- `src/components/InnerPage.tsx` — Shared inner page layout: alternating two-column rows with text, YouTube embeds, Vimeo embeds, images; fullWidth support
- `src/components/ContactForm.tsx` — Contact form with live pricing calculator (client component)
- `src/components/NewsSection.tsx` — Latest news with show-more toggle (client component)
- `src/app/attenborough-script-generator/` — AI-powered Attenborough script generator (client component, dark theme, calls `/api/generate`)
- `src/app/santa-script-generator/` — AI-powered Santa message generator (client component, dark theme, calls `/api/generate1`)
- `src/data/pages.json` — All SQL content (1,067 rows) decoded from HTML entities, with real CR+LF characters
- `src/data/news.ts` — News item data

### SQL Group → Page Mapping

| SQL Group | Page Slug |
|-----------|-----------|
| seo | Homepage |
| seo2 | /voiceoverguy (Who) — s7=meta title, s8=meta desc, s9=YouTube URL |
| seo4 | /commercial-voiceover |
| seo5 | /apple-voice-style |
| seo6 | /narration-voice |
| seo7 | /voice-of-god |
| seo8 | /on-hold-voice |
| seo9 | /voiceover-imaging |
| seo10 | /movie-trailer-voice (s5,s7,s8,s9,s11 are YouTube IDs) |
| seo11 | /character-voiceover |
| seo12 | /santa-voice |
| seo13 | /football-commentator-voice |
| seo14 | /pirate-voice |
| seo15 | /gameshow-host |
| seo16 | /pathe-news-voice |
| seo17 | /halloween-voice |
| seo18 | /david-attenborough-voice |
| seo19 | /explainer-video-voice (Vimeo IDs, not YouTube) |
| seo20 | /contact-guy |
| seo21 | /voiceover-videos (v1-v21 = captions) |
| seo24 | /voiceover-cartoons |
| seo25 | /voiceover-studio (PHP template layout) |
| seo26 | /game-trailer-voice |
| faqseo2 | /faq (faqs7=title, faqs8=desc, faqs2-faqs13=Q&A) |

### SEO Infrastructure

- **robots.txt:** `public/robots.txt` — allows all crawlers, points to sitemap
- **sitemap.xml:** `public/sitemap.xml` — 272 URLs with priority tiers (homepage 1.00, core services 0.80, blog posts 0.64)
- **Canonical tags:** All pages have `alternates.canonical` set — layout.tsx has `metadataBase`, static pages set it in `export const metadata`, dynamic [slug] pages set it in `generateMetadata`
- **Title template:** Layout uses `template: '%s | VoiceoverGuy'` — page-level titles must NOT include "VoiceoverGuy" suffix (layout adds it automatically)
- **JSON-LD:** Blog posts get BlogPosting + BreadcrumbList + VideoObject/AudioObject schemas via `buildSchema.ts`, rendered in `BlogPost.tsx`
- **Privacy Policy:** `src/app/privacy-policy/page.tsx` — linked from Footer on every page
- **Redirects:** `vercel.json` has 301 redirects for legacy slugs (arabella-harris-voiceover-kid, studiotour, maskedsinger-voiceover, british-voiceover, news-blog)
- **OG image:** `/assets/images/og-image-guy-harris.jpg`

### Pages Built (24 total, including privacy-policy)

- `/` — Homepage with audio showreels, video thumbnails, client logos, news
- `/voiceoverguy` — Who page with profile photos and YouTube embed
- `/commercial-voiceover`, `/apple-voice-style` — with dual YouTube embeds
- `/narration-voice`, `/voice-of-god`, `/on-hold-voice`, `/voiceover-imaging` — standard demo pages
- `/character-voiceover`, `/santa-voice`, `/football-commentator-voice`, `/pirate-voice` — character pages
- `/gameshow-host`, `/pathe-news-voice`, `/halloween-voice`, `/david-attenborough-voice` — specialty pages
- `/movie-trailer-voice` — 5 YouTube embeds in alternating layout
- `/explainer-video-voice` — Vimeo embeds (8-9 digit IDs)
- `/game-trailer-voice` — extended layout with 6 YouTube embeds
- `/voiceover-studio` — follows PHP exactly: s3+360° tour iframe, then 7 alternating image+text rows
- `/voiceover-videos` — 21-item thumbnail grid with SQL captions (v1-v21)
- `/voiceover-cartoons` — 76 cartoon images in responsive grid
- `/faq` — FAQ list from SQL faqseo2 group
- `/contact-guy` — Contact form with pricing table

Dynamic route: `/[slug]` — handles both project pages (`src/data/projects.ts`) and blog posts (`src/data/blog-posts.ts`). Blog posts are excluded if `conflictsWithCorePage: true`.

Blog index: `/voiceover-news` — 3-column card grid of 246 publishable posts, sorted newest-first.

404: `src/app/not-found.tsx`

### Blog System

- **Data layer:** `src/data/blog-posts.ts` — 262 posts from SQL dump, auto-generated by `scripts/parse-blog-sql.mjs`
- **Flags report:** `src/data/blog-flags.md` — 38 null dates, 16 route conflicts, 1 broken link
- **BlogPost component:** `src/components/BlogPost.tsx` — renders all SQL fields with correct media types (YouTube/Vimeo/SoundCloud/image), alternating ntext/nimage sections, sidebar, back link
- **Blog index:** `src/app/voiceover-news/page.tsx` — 3-column grid with thumbnail, date, title, excerpt
- **Images:** 567 thumbnail files in `public/assets/img/blog/`
- **Encoding:** SQL file is UTF-8 with cp1252 double-encoding; `fixEncoding()` reverses it via explicit Unicode escape patterns covering all common cp1252 mojibake sequences
- **Key constraints:** rawDate preserved alongside normalised date; slugs never altered; conflicting slugs excluded from static params
- **Google Reviews:** Live rating + count via `/api/reviews` (Express route in `api-server/src/routes/reviews.ts`); calls legacy Google Places API, 24hr cache, silent fallback to defaults; `ReviewBlock.tsx` is a client component that fetches on mount
- **JSON-LD Schema:** `src/lib/buildSchema.ts` — generates per-post BlogPosting, BreadcrumbList, VideoObject (YouTube/Vimeo), AudioObject (local MP3) structured data; injected automatically in BlogPost component; sitewide author (Guy Harris) and publisher (VoiceoverGuy) constants; validates video IDs to reject iframe HTML; skips schema for posts with empty pageTitle

### Static Assets (1,533 files extracted from zip)

All in `artifacts/web/public/assets/`:
- `assets/images/` — page hero images, OG images, who photos, client logos
- `assets/images/studio/` — 7 studio photos (voiceoverguy-voicover-studio1-7.jpg)
- `assets/images/cartoons/` — 76 cartoon PNG images by George Raggett
- `assets/audio/` — 44 MP3 files (showreels + client demos)
- `assets/fonts/` — see `public/fonts/` for Century Gothic TTFs

### InnerPage Component Contract

`InnerPage` takes a `sections: Section[]` array. Each section can have:
- `text?: string` — rendered as HTML via `dangerouslySetInnerHTML`
- `youtubeId?: string` — 11-char YouTube ID → responsive iframe embed
- `vimeoId?: string` — 7-10 digit Vimeo ID → responsive iframe embed  
- `imageSrc?: string` — image URL
- `imageAlt?: string` — image alt text
- `fullWidth?: boolean` — renders full-width instead of half-column

Sections are paired into 2-column rows (alternating reversed for visual balance). Odd-count sections render full-width.

### Important Notes

- **pages.json**: Contains real CR+LF characters (char codes 13, 10), not literal `\r\n`. The parser properly converts SQL escape sequences to actual characters.
- **seo2 field anomaly**: s1 contains H1 HTML, s7 is the meta title, s8 is meta description (reversed from standard pattern)
- **Vimeo IDs**: seo19 uses 8-9 digit Vimeo IDs in s7-s15
- **Studio page layout**: Follows the PHP template exactly — `s3 + 360° iframe, s4+studio1, studio7+s5, s6+studio3, studio4+s7, s8+studio5, studio6+s9, s10+studio2`
- **Audio**: SQL stores native HTML5 `<audio>` tags pointing to `/assets/audio/*.mp3`

### React Version Note

React 19.1.0 is used (from workspace catalog). Next.js 14 expects React 18 but works correctly with React 19 despite peer warning. Do not downgrade React — it is pinned at 19.1.0 for the Expo mobile artifact.
