# Replit Workspace Summary

## Overview

This project is a pnpm monorepo using TypeScript, designed to rebuild the voiceoverguy.co.uk website with a modern stack and enhance its capabilities. The core purpose is to faithfully replicate the existing website's content and SEO while adding new features like AI-powered script generation. The project aims to improve performance, maintainability, and user experience for a professional British male voiceover artist's online presence. Key capabilities include a Next.js frontend, an Express API for backend services, and robust content management derived from an original SQL database.

## User Preferences

I prefer detailed explanations.
Do not make changes to the folder `lib/api-spec`.
Do not make changes to the folder `lib/api-zod`.
Do not make changes to the files `src/data/pages.json` and `src/data/news.ts` in the `artifacts/web` package.
Do not downgrade React, it is pinned at 19.1.0 for the Expo mobile artifact.
I want iterative development.

## System Architecture

The project is structured as a pnpm monorepo with several packages: `artifacts` for deployable applications (API server, web frontend), `lib` for shared libraries (API spec, database, generated API clients), and `scripts` for utility tasks.

**Monorepo and TypeScript:**
- Uses pnpm workspaces and TypeScript 5.9.
- All packages are TypeScript composite projects, extending `tsconfig.base.json`.
- Typechecking for the entire monorepo is done from the root.
- `emitDeclarationOnly` is used for `.d.ts` files; actual JS bundling is handled by esbuild/tsx/vite.

**API Server (`artifacts/api-server`):**
- Express 5 server handling API requests (used for local Replit dev).
- Features AI script generators (`/api/generate` for Attenborough, `/api/generate1` for Santa) using OpenAI via Replit AI integrations.
- Built using esbuild into a CJS bundle.

**Web Frontend (`artifacts/web`):**
- Next.js 14 (App Router, Server Components) serving the voiceoverguy.co.uk website.
- **UI/UX:** Custom CSS with vanilla CSS variables, Century Gothic fonts. Primary brand colors are `#9C060B`, `#7a0508`, black, and white.
- **Content:** All content (1,067 SQL rows, news items) is sourced from `src/data/pages.json` and `src/data/news.ts` to maintain original wording and SEO.
- **Key Features:**
    - Dynamic page rendering based on SQL data.
    - Contact form with live pricing calculator.
    - AI-powered script generators (Attenborough and Santa) with dark themes.
    - Responsive components for various content types (YouTube/Vimeo embeds, images, text).
    - Comprehensive SEO infrastructure: `robots.txt`, `sitemap.xml`, canonical tags, title templating, JSON-LD for blog posts.
    - Canonical URL hygiene: `getBlogPost`, `getAllBlogSlugs` (`src/data/blog-posts.ts`), `getCanonical` (`src/lib/buildSchema.ts`), and `[slug]/page.tsx` defensively trim slugs and skip any with internal whitespace or URL-reserved characters, preventing accidental `%20` in canonical / OG / Twitter / JSON-LD URLs.
    - Blog system with 262 posts, parsed from SQL, supporting various media types and structured data.
    - Integration of Google Reviews (live rating + count via `/api/reviews`).
- **Design Patterns:** Uses a shared `InnerPage` component for consistent layout of content sections.
- **Blog post audio player layout:** When a blog post has `audioSrc`, the WaveSurfer player renders inside `.blog-audio-row` (BlogPost.tsx). That row is a 2-col grid (1fr 1fr, 32px gap) so the player sits in the left column at the same width as the text above and the image below it (matching `/movie-trailer-voice`, `/apple-voice-style`, `/commercial-voiceover`). Collapses to single column under 768px. Do not re-centre or full-width it.

**API Codegen (`lib/api-spec`):**
- Defines the OpenAPI 3.1 specification.
- Uses Orval to generate:
    - Zod schemas for API validation (`lib/api-zod`).

## Vercel Deployment Notes

The web frontend is deployed as a Next.js static export to Vercel (voiceoverguy.co.uk). The API server runs on Replit for local dev.

The script generators (Attenborough & Santa) use Vercel serverless functions (`api/generate.ts`, `api/generate1.ts`) for AI generation on production. The contact form uses `api/enquiry.ts`. All use relative `/api/` paths which resolve to Vercel serverless functions in production.

**Canonical domain policy (Vercel → Domains):**
- `www.voiceoverguy.co.uk` is the ONLY Production hostname — all pages, sitemap, canonicals, OG/Twitter URLs use this.
- The bare apex `voiceoverguy.co.uk` and the typo subdomains `w.`, `ww.`, `wwww.` voiceoverguy.co.uk are all set to **Permanent Redirect (308)** → `www.voiceoverguy.co.uk`. Never set them to "Temporary (307)" — Google needs permanent for link equity.
- `voiceoverguy-api-server.vercel.app` (Vercel default) stays as Production but is irrelevant for SEO (auto-noindexed by Vercel).
- If a new typo/legacy hostname appears in Search Console "Page with redirect", add it as a permanent 308 redirect rather than a Production domain.

**Vercel environment variables:** All API keys/secrets (`AI_INTEGRATIONS_OPENAI_API_KEY`, `RESEND_API_KEY`, `GOOGLE_PLACES_API_KEY`, etc.) must be saved with the **Sensitive** flag, not as plain env vars. Non-secret config like `AI_INTEGRATIONS_OPENAI_BASE_URL` and the `CONTACT_*` emails can stay as plain. After changing any var, trigger a redeploy — running deployments keep the old values.

## External Dependencies

- **AI Integrations:** OpenAI (via Replit AI integrations)
- **Google Services:** Google Places API (for Google Reviews)
- **Content Embeds:** YouTube, Vimeo, SoundCloud