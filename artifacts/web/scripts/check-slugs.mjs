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
 *  4. Every <lastmod> in each public/sitemap*.xml file matches the W3C
 *     datetime format (YYYY-MM-DD or full date+time with timezone) and
 *     represents a real calendar date.
 *  5. Every <priority> in each public/sitemap*.xml file is a decimal
 *     number between 0.0 and 1.0 inclusive (per the sitemap spec).
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

/** <lastmod>…</lastmod> extractor */
const LASTMOD_RE = /<lastmod>([^<]*)<\/lastmod>/g;

/** <priority>…</priority> extractor */
const PRIORITY_RE = /<priority>([^<]*)<\/priority>/g;

/**
 * Numeric pattern accepted in <priority>: an optional leading digit,
 * an optional decimal point and fractional part. Examples that match:
 *   0, 1, 0.0, 0.5, 0.64, 1.0, .5
 * Examples that do NOT match:
 *   "0,64" (comma), "1.50abc", "" (empty), " 0.5" (whitespace), "1." with no digits
 */
const PRIORITY_RE_FORMAT = /^(?:\d+(?:\.\d+)?|\.\d+)$/;

/**
 * W3C datetime formats accepted in <lastmod>:
 *   YYYY-MM-DD
 *   YYYY-MM-DDThh:mmTZD
 *   YYYY-MM-DDThh:mm:ssTZD
 *   YYYY-MM-DDThh:mm:ss.sTZD
 * where TZD is "Z" or "+hh:mm" / "-hh:mm" with hh in 00–23 and mm in 00–59.
 */
const LASTMOD_RE_FORMAT =
  /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?(Z|[+-](?:[01]\d|2[0-3]):[0-5]\d))?$/;

/** Canonical origin every <loc> URL must start with */
const CANONICAL_ORIGIN = 'https://www.voiceoverguy.co.uk/';

let errors = 0;

function fail(msg) {
  console.error(`  FAIL  ${msg}`);
  errors++;
}

/**
 * Validate a <lastmod> string. Returns null on success, or an error reason.
 * Accepts W3C datetime (date-only or full date+time with TZD) and verifies
 * that the date components form a real calendar date.
 */
function validateLastmod(value) {
  if (value !== value.trim()) {
    return 'contains leading or trailing whitespace';
  }
  const m = LASTMOD_RE_FORMAT.exec(value);
  if (!m) {
    return 'does not match W3C datetime (YYYY-MM-DD or YYYY-MM-DDThh:mm[:ss[.s]]TZD)';
  }
  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  if (month < 1 || month > 12) return `month out of range: ${m[2]}`;
  if (day < 1 || day > 31) return `day out of range: ${m[3]}`;

  // Verify real calendar date (catches 2026-02-30, 2026-04-31, etc.)
  const utc = Date.UTC(year, month - 1, day);
  const d = new Date(utc);
  if (
    d.getUTCFullYear() !== year ||
    d.getUTCMonth() !== month - 1 ||
    d.getUTCDate() !== day
  ) {
    return 'is not a real calendar date';
  }

  if (m[4] !== undefined) {
    const hh = Number(m[4]);
    const mm = Number(m[5]);
    if (hh > 23) return `hour out of range: ${m[4]}`;
    if (mm > 59) return `minute out of range: ${m[5]}`;
    if (m[6] !== undefined) {
      const ss = Number(m[6]);
      if (ss > 59) return `second out of range: ${m[6]}`;
    }
  }

  return null;
}

/**
 * Validate a <priority> string. Returns null on success, or an error reason.
 * Accepts a decimal number in [0.0, 1.0]. Rejects whitespace, commas,
 * non-numeric characters, empty strings, and out-of-range values.
 */
function validatePriority(value) {
  if (value !== value.trim()) {
    return 'contains leading or trailing whitespace';
  }
  if (value === '') {
    return 'is empty';
  }
  if (!PRIORITY_RE_FORMAT.test(value)) {
    return 'is not a decimal number (e.g. 0.5, 0.64, 1.0)';
  }
  const n = Number(value);
  if (!Number.isFinite(n)) {
    return 'is not a finite number';
  }
  if (n < 0 || n > 1) {
    return 'is out of range (must be between 0.0 and 1.0 inclusive)';
  }
  return null;
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

  let lastmodMatch;
  let lastmodCount = 0;
  LASTMOD_RE.lastIndex = 0;
  while ((lastmodMatch = LASTMOD_RE.exec(sitemap)) !== null) {
    lastmodCount++;
    const value = lastmodMatch[1];
    const reason = validateLastmod(value);
    if (reason !== null) {
      fail(`${file} <lastmod> "${value}" ${reason}`);
    }
  }
  console.log(`check-slugs: scanned ${lastmodCount} <lastmod> entries in ${file}`);

  let priorityMatch;
  let priorityCount = 0;
  PRIORITY_RE.lastIndex = 0;
  while ((priorityMatch = PRIORITY_RE.exec(sitemap)) !== null) {
    priorityCount++;
    const value = priorityMatch[1];
    const reason = validatePriority(value);
    if (reason !== null) {
      fail(`${file} <priority> "${value}" ${reason}`);
    }
  }
  console.log(`check-slugs: scanned ${priorityCount} <priority> entries in ${file}`);
}

// ─── Summary ─────────────────────────────────────────────────────────────────

if (errors > 0) {
  console.error(`\ncheck-slugs: FAILED with ${errors} error(s). See above for details.`);
  process.exit(1);
} else {
  console.log('\ncheck-slugs: all checks passed.');
}
