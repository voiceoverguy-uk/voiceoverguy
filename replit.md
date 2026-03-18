# Replit Workspace Summary

## Overview

This project is a pnpm monorepo using TypeScript, designed to rebuild the voiceoverguy.co.uk website with a modern stack and enhance its capabilities. The core purpose is to faithfully replicate the existing website's content and SEO while adding new features like AI-powered script generation. The project aims to improve performance, maintainability, and user experience for a professional British male voiceover artist's online presence. Key capabilities include a Next.js frontend, an Express API for backend services, and robust content management derived from an original SQL database.

## User Preferences

I prefer detailed explanations.
Do not make changes to the folder `lib/api-spec`.
Do not make changes to the folder `lib/api-zod`.
Do not make changes to the folder `lib/api-client-react`.
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
    - Blog system with 262 posts, parsed from SQL, supporting various media types and structured data.
    - Integration of Google Reviews (live rating + count via `/api/reviews`).
- **Design Patterns:** Uses a shared `InnerPage` component for consistent layout of content sections.

**API Codegen (`lib/api-spec`):**
- Defines the OpenAPI 3.1 specification.
- Uses Orval to generate:
    - React Query hooks and a fetch client (`lib/api-client-react`).
    - Zod schemas for API validation (`lib/api-zod`).

## Vercel Deployment Notes

The web frontend is deployed as a Next.js static export to Vercel (voiceoverguy.co.uk). The API server runs on Replit for local dev.

The script generators (Attenborough & Santa) use Vercel serverless functions (`api/generate.ts`, `api/generate1.ts`) for AI generation on production. The contact form uses `api/enquiry.ts`. All use relative `/api/` paths which resolve to Vercel serverless functions in production.

## External Dependencies

- **AI Integrations:** OpenAI (via Replit AI integrations)
- **Google Services:** Google Places API (for Google Reviews)
- **Content Embeds:** YouTube, Vimeo, SoundCloud