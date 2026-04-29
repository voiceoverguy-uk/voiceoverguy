#!/usr/bin/env node
/**
 * check-slugs.mjs
 *
 * Build-time guard that fails fast if any blog URL is malformed.
 *
 * Checks performed:
 *  1. Every `url` field in blogPosts matches ^[a-z0-9-]+$
 *  2. No string field in any blog post contains href=" followed by whitespace
 *     (leading-space href) or href="…%20…" (encoded space inside href)
 *  3. Every public/sitemap*.xml file contains no %20 and no whitespace inside
 *     any <loc>, and every <loc> starts with the canonical origin
 *     https://www.voiceoverguy.co.uk/
 *
 * Run via: pnpm --filter @workspace/web run check:slugs
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ─── helpers ────────────────────────────────────────────────────────────────

const SLUG_RE = /^[a-z0-9-]+$/;

/** href=" followed by one or more whitespace characters */
const LEADING_SPACE_HREF_RE = /href="\s/g;

/** href="…%20…" — encoded space inside an href value */
const ENCODED_SPACE_HREF_RE = /href="[^"]*%20/g;

/** <loc>…</loc> extractor */
const LOC_RE = /<loc>([^<]*)<\/loc>/g;

/** Canonical origin every <loc> URL must start with */
const CANONICAL_ORIGIN = 'https://www.voiceoverguy.co.uk/';

let errors = 0;

function fail(msg) {
  console.error(`  FAIL  ${msg}`);
  errors++;
}

// ─── 1 & 2. Parse blog-posts.ts as text ─────────────────────────────────────

const blogPostsSrc = readFileSync(
  join(ROOT, 'src', 'data', 'blog-posts.ts'),
  'utf8',
);

// Extract each blog post object as a raw text block between consecutive { … }
// at the top level of the blogPosts array.  We collect key/value pairs from
// each block using a simple regex – sufficient because values are JSON strings.

// Split on opening braces that are at the start of a blog post entry.
// The file uses the pattern:
//   {
//   "id": <number>,
//   "url": "<slug>",
//   …
//   }
// We split on lines that are exactly " {" (start of entry) and re-group.

const lines = blogPostsSrc.split('\n');

// Collect all entries: each entry is a block of lines between " {" and " },"
// (or " }" for the last entry).
const entries = [];
let inEntry = false;
let current = [];

for (const line of lines) {
  if (!inEntry) {
    if (line.trim() === '{') {
      inEntry = true;
      current = [line];
    }
  } else {
    current.push(line);
    if (/^\s*\}[,]?\s*$/.test(line)) {
      inEntry = false;
      entries.push(current.join('\n'));
      current = [];
    }
  }
}

if (entries.length === 0) {
  console.error('check-slugs: could not parse any blog post entries from blog-posts.ts');
  process.exit(1);
}

console.log(`check-slugs: found ${entries.length} blog post entries`);

// Extract the id from an entry block
function extractId(block) {
  const m = block.match(/"id":\s*(\d+)/);
  return m ? m[1] : '(unknown)';
}

// Extract all key: "value" pairs from a block
function extractStringFields(block) {
  const fields = [];
  // Match "key": "value" — values may contain escaped quotes
  const re = /"(\w+)":\s*"((?:[^"\\]|\\.)*)"/g;
  let m;
  while ((m = re.exec(block)) !== null) {
    fields.push({ key: m[1], value: m[2] });
  }
  return fields;
}

// ─── Check 1: url slug policy ────────────────────────────────────────────────

console.log('\ncheck-slugs: [1] Validating url slugs match ^[a-z0-9-]+$ …');

for (const block of entries) {
  const id = extractId(block);
  const urlMatch = block.match(/"url":\s*"([^"]*)"/);
  if (!urlMatch) {
    fail(`post id=${id} — missing "url" field`);
    continue;
  }
  const slug = urlMatch[1];
  if (!SLUG_RE.test(slug)) {
    fail(`post id=${id} — url "${slug}" does not match ^[a-z0-9-]+$`);
  }
}

// ─── Check 2: no dirty hrefs in any string field ─────────────────────────────

console.log('check-slugs: [2] Scanning all string fields for dirty hrefs …');

for (const block of entries) {
  const id = extractId(block);
  const fields = extractStringFields(block);

  for (const { key, value } of fields) {
    // Unescape \" → " so the regex sees the real characters
    const unescaped = value.replace(/\\"/g, '"');

    if (LEADING_SPACE_HREF_RE.test(unescaped)) {
      LEADING_SPACE_HREF_RE.lastIndex = 0;
      fail(`post id=${id}, field "${key}" — leading-space href detected`);
    }
    LEADING_SPACE_HREF_RE.lastIndex = 0;

    if (ENCODED_SPACE_HREF_RE.test(unescaped)) {
      ENCODED_SPACE_HREF_RE.lastIndex = 0;
      fail(`post id=${id}, field "${key}" — %20-encoded space inside href detected`);
    }
    ENCODED_SPACE_HREF_RE.lastIndex = 0;
  }
}

// ─── Check 3: sitemap*.xml ───────────────────────────────────────────────────

console.log('check-slugs: [3] Validating sitemap*.xml <loc> entries …');

const publicDir = join(ROOT, 'public');

let sitemapFiles = [];
try {
  sitemapFiles = readdirSync(publicDir)
    .filter((name) => /^sitemap.*\.xml$/i.test(name))
    .sort();
} catch {
  fail(`could not read directory ${publicDir}`);
}

if (sitemapFiles.length === 0) {
  fail(`no sitemap*.xml files found in ${publicDir}`);
}

for (const file of sitemapFiles) {
  const sitemapPath = join(publicDir, file);
  let sitemap;
  try {
    sitemap = readFileSync(sitemapPath, 'utf8');
  } catch {
    fail(`could not read ${sitemapPath}`);
    continue;
  }

  let locMatch;
  let locCount = 0;
  LOC_RE.lastIndex = 0;
  while ((locMatch = LOC_RE.exec(sitemap)) !== null) {
    locCount++;
    const loc = locMatch[1];
    if (loc.includes('%20')) {
      fail(`${file} <loc> contains %20: "${loc}"`);
    }
    if (/\s/.test(loc)) {
      fail(`${file} <loc> contains whitespace: "${loc}"`);
    }
    if (!loc.startsWith(CANONICAL_ORIGIN)) {
      fail(
        `${file} <loc> does not start with ${CANONICAL_ORIGIN}: "${loc}"`,
      );
    }
  }
  console.log(`check-slugs: scanned ${locCount} <loc> entries in ${file}`);
}

// ─── Summary ─────────────────────────────────────────────────────────────────

if (errors > 0) {
  console.error(`\ncheck-slugs: FAILED with ${errors} error(s). See above for details.`);
  process.exit(1);
} else {
  console.log('\ncheck-slugs: all checks passed.');
}
