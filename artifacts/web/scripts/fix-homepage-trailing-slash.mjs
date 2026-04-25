#!/usr/bin/env node
/*
 * Workaround for Next.js 14.2.x metadata behaviour:
 *   node_modules/next/dist/lib/metadata/resolvers/resolve-url.js
 *   resolveAbsoluteUrlWithPathname: result.pathname === "/" ? result.origin : result.href
 * Strips the trailing slash from any metadata URL that resolves to the
 * site root, so alternates.canonical and openGraph.url both lose their
 * trailing slash on the homepage even though the source values include it.
 *
 * The live site URL is https://www.voiceoverguy.co.uk/ (with slash).
 * Strict canonicalisation requires the canonical href to match exactly.
 *
 * This script rewrites only the homepage HTML (out/index.html). It is
 * idempotent and fails the build if the post-rewrite output does not
 * contain exactly one canonical and one og:url tag, both with trailing
 * slash. Re-evaluate when upgrading Next.js.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexHtml = join(__dirname, '..', 'out', 'index.html');

if (!existsSync(indexHtml)) {
  console.error(`fix-homepage-trailing-slash: ${indexHtml} not found. Did 'next build' run successfully?`);
  process.exit(1);
}

const ROOT_WITH_SLASH = 'https://www.voiceoverguy.co.uk/';

const html = readFileSync(indexHtml, 'utf8');

let fixed = html
  .replace(
    /<link rel="canonical" href="https:\/\/www\.voiceoverguy\.co\.uk"\/>/g,
    `<link rel="canonical" href="${ROOT_WITH_SLASH}"/>`,
  )
  .replace(
    /<meta property="og:url" content="https:\/\/www\.voiceoverguy\.co\.uk"\/>/g,
    `<meta property="og:url" content="${ROOT_WITH_SLASH}"/>`,
  );

if (fixed !== html) {
  writeFileSync(indexHtml, fixed, 'utf8');
}

const canonicalCount = (fixed.match(/<link rel="canonical"/g) || []).length;
const ogUrlCount = (fixed.match(/<meta property="og:url"/g) || []).length;
const canonicalSlash = /<link rel="canonical" href="https:\/\/www\.voiceoverguy\.co\.uk\/"\/>/.test(fixed);
const ogUrlSlash = /<meta property="og:url" content="https:\/\/www\.voiceoverguy\.co\.uk\/"\/>/.test(fixed);

const errors = [];
if (canonicalCount !== 1) errors.push(`expected exactly 1 canonical, found ${canonicalCount}`);
if (ogUrlCount !== 1) errors.push(`expected exactly 1 og:url, found ${ogUrlCount}`);
if (!canonicalSlash) errors.push('canonical does not match the expected trailing-slash form');
if (!ogUrlSlash) errors.push('og:url does not match the expected trailing-slash form');

if (errors.length > 0) {
  console.error('fix-homepage-trailing-slash: post-fix verification failed:');
  for (const e of errors) console.error(`  - ${e}`);
  console.error('Next may have changed its serialization. Re-check the regexes above.');
  process.exit(1);
}

console.log('fix-homepage-trailing-slash: homepage canonical and og:url verified with trailing slash.');
