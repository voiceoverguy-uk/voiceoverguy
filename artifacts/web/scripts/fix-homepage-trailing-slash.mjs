#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexHtml = join(__dirname, '..', 'out', 'index.html');

if (!existsSync(indexHtml)) {
  console.error(`fix-homepage-trailing-slash: ${indexHtml} not found, skipping.`);
  process.exit(0);
}

const ROOT_NO_SLASH = 'https://www.voiceoverguy.co.uk';
const ROOT_WITH_SLASH = 'https://www.voiceoverguy.co.uk/';

const html = readFileSync(indexHtml, 'utf8');

const before = {
  canonical: (html.match(/<link rel="canonical"[^>]*>/g) || []).join('\n'),
  ogUrl: (html.match(/<meta property="og:url"[^>]*>/g) || []).join('\n'),
};

let fixed = html;

fixed = fixed.replace(
  /<link rel="canonical" href="https:\/\/www\.voiceoverguy\.co\.uk"\/>/g,
  `<link rel="canonical" href="${ROOT_WITH_SLASH}"/>`,
);

fixed = fixed.replace(
  /<meta property="og:url" content="https:\/\/www\.voiceoverguy\.co\.uk"\/>/g,
  `<meta property="og:url" content="${ROOT_WITH_SLASH}"/>`,
);

if (fixed === html) {
  console.log('fix-homepage-trailing-slash: nothing to change (already correct or pattern not found).');
} else {
  writeFileSync(indexHtml, fixed, 'utf8');
  console.log('fix-homepage-trailing-slash: rewrote homepage canonical and og:url to use trailing slash.');
}

const canonicalCount = (fixed.match(/<link rel="canonical"/g) || []).length;
const ogUrlCount = (fixed.match(/<meta property="og:url"/g) || []).length;
const canonicalSlash = /<link rel="canonical" href="https:\/\/www\.voiceoverguy\.co\.uk\/"\/>/.test(fixed);
const ogUrlSlash = /<meta property="og:url" content="https:\/\/www\.voiceoverguy\.co\.uk\/"\/>/.test(fixed);

const errors = [];
if (canonicalCount !== 1) errors.push(`expected exactly 1 canonical, found ${canonicalCount}`);
if (ogUrlCount !== 1) errors.push(`expected exactly 1 og:url, found ${ogUrlCount}`);
if (!canonicalSlash) errors.push('canonical does not end with trailing slash');
if (!ogUrlSlash) errors.push('og:url does not end with trailing slash');

if (errors.length > 0) {
  console.error('fix-homepage-trailing-slash: post-fix verification failed:');
  for (const e of errors) console.error(`  - ${e}`);
  console.error('  Before canonical:', before.canonical || '(none)');
  console.error('  Before og:url:   ', before.ogUrl || '(none)');
  process.exit(1);
}

console.log('fix-homepage-trailing-slash: verified 1 canonical and 1 og:url, both with trailing slash.');
