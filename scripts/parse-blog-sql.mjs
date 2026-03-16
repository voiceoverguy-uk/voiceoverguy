#!/usr/bin/env node
/**
 * Parses cl10-nreblog-2 SQL dump → blog-posts.ts + blog-flags.md
 * Run: node scripts/parse-blog-sql.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ─── Column order in the INSERT statement ────────────────────────────────────
const COLS = [
  'id', 'url', 'page_title', 'info', 'search_terms', 'page_desc',
  'text1', 'text2', 'image', 'video', 'meta_title', 'bottomtext',
  'date', 'whatvideo', 'alt', 'rating', 'twitter', 'hometext', 'santa',
  'ntext1', 'ntext2', 'ntext3', 'ntext4',
  'nimage1', 'nimage2', 'nimage3', 'nimage4',
];

// ─── Core routes that must not be shadowed ───────────────────────────────────
const CORE_ROUTES = new Set([
  'voiceoverguy', 'santa-voice', 'voice-of-god', 'apple-voice-style',
  'commercial-voiceover', 'narration-voice', 'character-voiceover',
  'explainer-video-voice', 'football-commentator-voice', 'gameshow-host',
  'game-trailer-voice', 'halloween-voice', 'movie-trailer-voice',
  'on-hold-voice', 'pathe-news-voice', 'pirate-voice', 'voiceover-imaging',
  'voiceover-studio', 'voiceover-cartoons', 'voiceover-videos',
  'david-attenborough-voice', 'FAQ', 'contact-guy',
  // Index pages that will exist after Task #30
  'voiceover-news',
]);

// ─── Encoding repair: reverse cp1252 double-encoding ─────────────────────────
// The SQL file is UTF-8 but was written from a MySQL latin1-declared table.
// WordPress/MySQL stored UTF-8 bytes treating them as individual cp1252 chars,
// then mysqldump re-encoded those cp1252 chars as UTF-8. This function reverses
// that double-encoding by matching the known cp1252 mojibake patterns.
//
// Pattern construction: original UTF-8 byte sequence → read as cp1252 codepoints
// → those codepoints re-encoded as UTF-8 → what we see in the file.
function fixEncoding(str) {
  if (!str) return str;
  return str
    // 3-byte UTF-8 sequences starting 0xE2 0x80 xx (common punctuation U+2000-U+27FF)
    // Format in file: â (U+E2) + € (U+20AC = cp1252 0x80) + [cp1252(0xNN)]
    .replace(/\u00e2\u20ac\u2122/g, '\u2019')   // E2 80 99 → ' right single quote
    .replace(/\u00e2\u20ac\u0153/g, '\u201c')   // E2 80 9C → " left double quote
    .replace(/\u00e2\u20ac\u009d/g, '\u201d')   // E2 80 9D → " right double quote (0x9D undef in cp1252 → U+009D)
    .replace(/\u00e2\u20ac\u201c/g, '\u2013')   // E2 80 93 → – en dash
    .replace(/\u00e2\u20ac\u201d/g, '\u2014')   // E2 80 94 → — em dash
    .replace(/\u00e2\u20ac\u00a6/g, '\u2026')   // E2 80 A6 → … ellipsis
    .replace(/\u00e2\u20ac\u00a2/g, '\u2022')   // E2 80 A2 → • bullet
    .replace(/\u00e2\u20ac\u02dc/g, '\u2018')   // E2 80 98 → ' left single quote
    .replace(/\u00e2\u20ac\u2018/g, '\u2011')   // E2 80 91 → ‑ non-breaking hyphen
    .replace(/\u00e2\u20ac\u2019/g, '\u2012')   // E2 80 92 → ‒ figure dash
    .replace(/\u00e2\u20ac\u0160/g, '\u203a')   // E2 80 9B → › single right angle quote
    .replace(/\u00e2\u20ac\u017e/g, '\u201e')   // E2 80 9E → „ double low-9 quotation
    .replace(/\u00e2\u20ac\u0192/g, '\u201a')   // E2 80 9A → ‚ single low-9 quotation
    .replace(/\u00e2\u20ac\u02c6/g, '\u2020')   // E2 80 86 → † dagger
    .replace(/\u00e2\u20ac\u2030/g, '\u2030')   // E2 80 89 → ‰ per mille
    // 3-byte starting 0xE2 0x84/0x85/0x86... (other common ranges)
    .replace(/\u00e2\u0084\u00a2/g, '\u2122')   // E2 84 A2 → ™ trademark (legitimate, keep)
    // 2-byte sequences starting 0xC3 (chars U+00C0-U+00FF)
    // Format: Ã (U+C3) + [cp1252(0xNN)] where 0xNN >= 0xA0
    .replace(/\u00c3\u00a0/g, '\u00e0')         // C3 A0 → à
    .replace(/\u00c3\u00a1/g, '\u00e1')         // C3 A1 → á
    .replace(/\u00c3\u00a2/g, '\u00e2')         // C3 A2 → â
    .replace(/\u00c3\u00a3/g, '\u00e3')         // C3 A3 → ã
    .replace(/\u00c3\u00a4/g, '\u00e4')         // C3 A4 → ä
    .replace(/\u00c3\u00a5/g, '\u00e5')         // C3 A5 → å
    .replace(/\u00c3\u00a6/g, '\u00e6')         // C3 A6 → æ
    .replace(/\u00c3\u00a7/g, '\u00e7')         // C3 A7 → ç
    .replace(/\u00c3\u00a8/g, '\u00e8')         // C3 A8 → è
    .replace(/\u00c3\u00a9/g, '\u00e9')         // C3 A9 → é
    .replace(/\u00c3\u00aa/g, '\u00ea')         // C3 AA → ê
    .replace(/\u00c3\u00ab/g, '\u00eb')         // C3 AB → ë
    .replace(/\u00c3\u00ac/g, '\u00ec')         // C3 AC → ì
    .replace(/\u00c3\u00ad/g, '\u00ed')         // C3 AD → í
    .replace(/\u00c3\u00ae/g, '\u00ee')         // C3 AE → î
    .replace(/\u00c3\u00af/g, '\u00ef')         // C3 AF → ï
    .replace(/\u00c3\u00b0/g, '\u00f0')         // C3 B0 → ð
    .replace(/\u00c3\u00b1/g, '\u00f1')         // C3 B1 → ñ
    .replace(/\u00c3\u00b2/g, '\u00f2')         // C3 B2 → ò
    .replace(/\u00c3\u00b3/g, '\u00f3')         // C3 B3 → ó
    .replace(/\u00c3\u00b4/g, '\u00f4')         // C3 B4 → ô
    .replace(/\u00c3\u00b5/g, '\u00f5')         // C3 B5 → õ
    .replace(/\u00c3\u00b6/g, '\u00f6')         // C3 B6 → ö
    .replace(/\u00c3\u00b8/g, '\u00f8')         // C3 B8 → ø
    .replace(/\u00c3\u00b9/g, '\u00f9')         // C3 B9 → ù
    .replace(/\u00c3\u00ba/g, '\u00fa')         // C3 BA → ú
    .replace(/\u00c3\u00bb/g, '\u00fb')         // C3 BB → û
    .replace(/\u00c3\u00bc/g, '\u00fc')         // C3 BC → ü
    .replace(/\u00c3\u00bd/g, '\u00fd')         // C3 BD → ý
    .replace(/\u00c3\u00bf/g, '\u00ff')         // C3 BF → ÿ
    .replace(/\u00c3\u0080/g, '\u00c0')         // C3 80 → À
    .replace(/\u00c3\u0081/g, '\u00c1')         // C3 81 → Á
    .replace(/\u00c3\u0082/g, '\u00c2')         // C3 82 → Â
    .replace(/\u00c3\u0083/g, '\u00c3')         // C3 83 → Ã
    .replace(/\u00c3\u0084/g, '\u00c4')         // C3 84 → Ä
    .replace(/\u00c3\u0085/g, '\u00c5')         // C3 85 → Å
    .replace(/\u00c3\u0086/g, '\u00c6')         // C3 86 → Æ
    .replace(/\u00c3\u0087/g, '\u00c7')         // C3 87 → Ç
    .replace(/\u00c3\u0088/g, '\u00c8')         // C3 88 → È
    .replace(/\u00c3\u0089/g, '\u00c9')         // C3 89 → É
    .replace(/\u00c3\u008a/g, '\u00ca')         // C3 8A → Ê
    .replace(/\u00c3\u008b/g, '\u00cb')         // C3 8B → Ë
    .replace(/\u00c3\u008c/g, '\u00cc')         // C3 8C → Ì
    .replace(/\u00c3\u008d/g, '\u00cd')         // C3 8D → Í
    .replace(/\u00c3\u008e/g, '\u00ce')         // C3 8E → Î
    .replace(/\u00c3\u008f/g, '\u00cf')         // C3 8F → Ï
    .replace(/\u00c3\u0090/g, '\u00d0')         // C3 90 → Ð
    .replace(/\u00c3\u0091/g, '\u00d1')         // C3 91 → Ñ
    .replace(/\u00c3\u0092/g, '\u00d2')         // C3 92 → Ò
    .replace(/\u00c3\u0093/g, '\u00d3')         // C3 93 → Ó
    .replace(/\u00c3\u0094/g, '\u00d4')         // C3 94 → Ô
    .replace(/\u00c3\u0095/g, '\u00d5')         // C3 95 → Õ
    .replace(/\u00c3\u0096/g, '\u00d6')         // C3 96 → Ö
    .replace(/\u00c3\u0098/g, '\u00d8')         // C3 98 → Ø
    .replace(/\u00c3\u0099/g, '\u00d9')         // C3 99 → Ù
    .replace(/\u00c3\u009a/g, '\u00da')         // C3 9A → Ú
    .replace(/\u00c3\u009b/g, '\u00db')         // C3 9B → Û
    .replace(/\u00c3\u009c/g, '\u00dc')         // C3 9C → Ü
    .replace(/\u00c3\u009d/g, '\u00dd')         // C3 9D → Ý
    .replace(/\u00c3\u009e/g, '\u00de')         // C3 9E → Þ
    .replace(/\u00c3\u009f/g, '\u00df')         // C3 9F → ß
    // 2-byte sequences starting 0xC2 (chars U+0080-U+00BF: Â-prefix)
    .replace(/\u00c2\u00a0/g, '\u00a0')         // C2 A0 → nbsp (keep as-is technically)
    .replace(/\u00c2\u00a3/g, '\u00a3')         // C2 A3 → £
    .replace(/\u00c2\u00ae/g, '\u00ae')         // C2 AE → ®
    .replace(/\u00c2\u00a9/g, '\u00a9')         // C2 A9 → ©
    .replace(/\u00c2\u00b0/g, '\u00b0')         // C2 B0 → °
    .replace(/\u00c2\u00b1/g, '\u00b1')         // C2 B1 → ±
    .replace(/\u00c2\u00b2/g, '\u00b2')         // C2 B2 → ²
    .replace(/\u00c2\u00b3/g, '\u00b3')         // C2 B3 → ³
    .replace(/\u00c2\u00b7/g, '\u00b7')         // C2 B7 → ·
    .replace(/\u00c2\u00bd/g, '\u00bd')         // C2 BD → ½
    .replace(/\u00c2\u00a2/g, '\u00a2')         // C2 A2 → ¢
    .replace(/\u00c2\u00ab/g, '\u00ab')         // C2 AB → «
    .replace(/\u00c2\u00bb/g, '\u00bb')         // C2 BB → »
    // Strip lone spurious Â that got left behind after fixing sequences
    .replace(/\u00c2(?![\u0080-\u00bf])/g, '')
    ;
}

// ─── MySQL value parser (state machine) ──────────────────────────────────────
function parseMySQLRow(src, start) {
  let i = start;
  const values = [];

  // skip opening (
  while (i < src.length && src[i] !== '(') i++;
  if (i >= src.length) return null;
  i++; // skip (

  while (i < src.length) {
    // skip commas and whitespace between values
    while (i < src.length && (src[i] === ',' || src[i] === ' ')) i++;

    if (src[i] === ')') {
      i++; // skip )
      break;
    }

    if (src[i] === "'") {
      // quoted string
      i++;
      let val = '';
      while (i < src.length) {
        if (src[i] === '\\') {
          i++;
          if (i >= src.length) break;
          switch (src[i]) {
            case "'":  val += "'";  break;
            case '\\': val += '\\'; break;
            case 'n':  val += '\n'; break;
            case 'r':  val += '\r'; break;
            case 't':  val += '\t'; break;
            case '"':  val += '"';  break;
            default:   val += src[i]; break;
          }
          i++;
        } else if (src[i] === "'") {
          i++; // closing quote
          break;
        } else {
          val += src[i++];
        }
      }
      values.push(val);
    } else {
      // unquoted value (number, NULL)
      let val = '';
      while (i < src.length && src[i] !== ',' && src[i] !== ')') {
        val += src[i++];
      }
      values.push(val.trim() === 'NULL' ? null : val.trim());
    }
  }

  return { values, end: i };
}

// ─── Date normalisation ───────────────────────────────────────────────────────
const MONTH_MAP = {
  january: '01', jan: '01',
  february: '02', feb: '02',
  march: '03', mar: '03',
  april: '04', apr: '04',
  may: '05',
  june: '06', jun: '06',
  july: '07', jul: '07',
  august: '08', aug: '08',
  september: '09', sep: '09', sept: '09',
  october: '10', oct: '10',
  november: '11', nov: '11',
  december: '12', dec: '12',
};

function normaliseDate(raw) {
  if (!raw || !raw.trim()) return null;
  const s = raw.trim();

  // Already YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;

  // "Month YYYY" e.g. "June 2014", "Aug 2014"
  const m1 = s.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (m1) {
    const mo = MONTH_MAP[m1[1].toLowerCase()];
    if (mo) return `${m1[2]}-${mo}-01`;
  }

  // "Month YY" e.g. "Oct 16", "July 13", "Nov 16" — assume 2000s
  const m2 = s.match(/^([A-Za-z]+)\s+(\d{2})$/);
  if (m2) {
    const mo = MONTH_MAP[m2[1].toLowerCase()];
    if (mo) return `20${m2[2]}-${mo}-01`;
  }

  // "YYYY" only
  if (/^\d{4}$/.test(s)) return `${s}-01-01`;

  return null; // unparseable — preserve rawDate, set date: null
}

// ─── Internal link extraction & validation ────────────────────────────────────
const SKIP_SCHEMES = /^(mailto:|tel:|javascript:|#)/i;

function extractRelativeHrefs(html) {
  if (!html) return [];
  const hrefs = [];
  const re = /href=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const h = m[1].trim();
    if (SKIP_SCHEMES.test(h)) continue;
    if (h.startsWith('http://') || h.startsWith('https://')) continue;
    hrefs.push(h);
  }
  return hrefs;
}

function normaliseSlug(href) {
  return href
    .replace(/#.*$/, '')   // strip #fragment
    .replace(/^\/+/, '')   // strip leading slashes
    .replace(/\/+$/, '')   // strip trailing slashes
    .trim();
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const sqlPath = join(ROOT, 'attached_assets', 'cl10-nreblog-2_1773620547919.sql');
const sql = readFileSync(sqlPath, 'utf8');

// Collect all INSERT rows
const posts = [];
let pos = 0;

// Find all VALUES blocks
const valuesMarker = ') VALUES\n';
let searchFrom = 0;
while (true) {
  const vmIdx = sql.indexOf(valuesMarker, searchFrom);
  if (vmIdx === -1) break;

  // Parse rows starting after the VALUES keyword
  let cur = vmIdx + valuesMarker.length;

  while (cur < sql.length) {
    // Skip whitespace and commas between rows
    while (cur < sql.length && /[\s,]/.test(sql[cur])) cur++;

    if (cur >= sql.length) break;
    if (sql[cur] !== '(') break; // end of this VALUES block

    const result = parseMySQLRow(sql, cur);
    if (!result) break;

    const { values, end } = result;
    cur = end;

    if (values.length !== COLS.length) {
      console.warn(`Row with ${values.length} cols (expected ${COLS.length}), id=${values[0]}`);
      continue;
    }

    const row = {};
    COLS.forEach((col, i) => { row[col] = values[i] ?? ''; });

    // Apply encoding repair to all string fields
    for (const key of Object.keys(row)) {
      if (typeof row[key] === 'string') {
        row[key] = fixEncoding(row[key]);
      }
    }

    posts.push(row);
  }

  searchFrom = vmIdx + 1;
}

console.log(`Parsed ${posts.length} blog posts`);

// ─── Build flags ──────────────────────────────────────────────────────────────
const flagsMissingDate = [];
const flagsConflicts = [];
const flagsBrokenLinks = [];

// Build slug sets for link validation
const allBlogSlugs = new Set(posts.map(p => p.url));
const allKnownSlugs = new Set([...allBlogSlugs, ...CORE_ROUTES]);

const blogPosts = posts.map(post => {
  const rawDate = post.date ?? '';
  const date = normaliseDate(rawDate);

  if (!date) {
    flagsMissingDate.push({ slug: post.url, rawDate });
  }

  const conflictsWithCorePage = CORE_ROUTES.has(post.url);
  if (conflictsWithCorePage) {
    flagsConflicts.push(post.url);
  }

  // Internal link validation
  const contentFields = ['text1', 'text2', 'bottomtext', 'ntext1', 'ntext2', 'ntext3', 'ntext4'];
  const unresolvedLinks = [];
  for (const field of contentFields) {
    const hrefs = extractRelativeHrefs(post[field]);
    for (const href of hrefs) {
      const slug = normaliseSlug(href);
      if (slug && !allKnownSlugs.has(slug)) {
        unresolvedLinks.push({ field, href, slug });
      }
    }
  }
  if (unresolvedLinks.length > 0) {
    flagsBrokenLinks.push({ slug: post.url, links: unresolvedLinks });
  }

  return {
    id: parseInt(post.id, 10),
    url: post.url,
    pageTitle: post.page_title,
    info: post.info,
    searchTerms: post.search_terms,
    pageDesc: post.page_desc,
    text1: post.text1,
    text2: post.text2,
    image: post.image,
    video: post.video,
    metaTitle: post.meta_title,
    bottomText: post.bottomtext,
    rawDate,
    date,
    whatVideo: post.whatvideo,
    alt: post.alt,
    rating: post.rating,
    twitter: post.twitter,
    homeText: post.hometext,
    santa: post.santa,
    ntext1: post.ntext1,
    ntext2: post.ntext2,
    ntext3: post.ntext3,
    ntext4: post.ntext4,
    nimage1: post.nimage1,
    nimage2: post.nimage2,
    nimage3: post.nimage3,
    nimage4: post.nimage4,
    conflictsWithCorePage,
  };
});

// ─── Emit blog-posts.ts ───────────────────────────────────────────────────────
const tsContent = `// AUTO-GENERATED from SQL dump — do not edit by hand
// Source: cl10-nreblog-2_1773620547919.sql
// Generated: ${new Date().toISOString()}

export interface BlogPost {
  id: number;
  url: string;               // exact slug, never altered
  pageTitle: string;         // H1 on the post page
  info: string;              // subtitle / main statement
  searchTerms: string;       // comma-separated SEO keywords
  pageDesc: string;          // meta description
  text1: string;             // Text Box 1 (left col, row 1)
  text2: string;             // Text Box 2 (right col, row 2)
  image: string;             // thumbnail filename (in /assets/img/blog/)
  video: string;             // YouTube ID, Vimeo ID, or raw SoundCloud iframe HTML
  metaTitle: string;         // <title> tag
  bottomText: string;        // Last Text — full-width bottom section
  rawDate: string;           // original SQL date string, verbatim
  date: string | null;       // normalised YYYY-MM-DD, or null if unparseable
  whatVideo: string;         // '1'=YouTube, '2'=Vimeo, '3'=Audio/SC, '4'=Image, ''=none
  alt: string;               // image alt / title tag
  rating: string;            // star rating (0–5)
  twitter: string;           // twitter hashtags
  homeText: string;          // short excerpt shown on /voiceover-news index
  santa: string;             // category flag
  ntext1: string;            // Text Box 3
  ntext2: string;            // Text Box 4
  ntext3: string;            // Text Box 5
  ntext4: string;            // Text Box 6
  nimage1: string;           // image paired with ntext1
  nimage2: string;           // image paired with ntext2
  nimage3: string;           // image paired with ntext3
  nimage4: string;           // image paired with ntext4
  conflictsWithCorePage: boolean; // true = slug already handled by a core Next.js page
}

const blogPosts: BlogPost[] = ${JSON.stringify(blogPosts, null, 2)};

export default blogPosts;

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.url === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts
    .filter(p => !p.conflictsWithCorePage)
    .map(p => p.url);
}
`;

const outPath = join(ROOT, 'artifacts', 'web', 'src', 'data', 'blog-posts.ts');
writeFileSync(outPath, tsContent, 'utf8');
console.log(`Written: ${outPath}`);

// ─── Emit blog-flags.md ───────────────────────────────────────────────────────
const flagsLines = [
  '# Blog Migration Flags',
  '',
  '> Auto-generated by `scripts/parse-blog-sql.mjs`',
  `> ${new Date().toISOString()}`,
  '',
  '---',
  '',
  `## 1. Missing / Unparseable Dates (${flagsMissingDate.length} posts)`,
  '',
  'These posts have \`date: null\` — their \`rawDate\` is preserved verbatim.',
  'Review and supply a correct date if known.',
  '',
  '| Slug | rawDate value |',
  '|------|--------------|',
  ...flagsMissingDate.map(f => `| \`${f.slug}\` | \`${f.rawDate || '(empty)'}\` |`),
  '',
  '---',
  '',
  `## 2. Route Conflicts with Core Pages (${flagsConflicts.length} posts)`,
  '',
  'These blog SQL entries have slugs that match an existing core Next.js page.',
  'The slug has NOT been altered. The core page takes precedence.',
  'These posts are excluded from static generation via \`conflictsWithCorePage: true\`.',
  '',
  ...flagsConflicts.map(s => `- \`${s}\``),
  '',
  '---',
  '',
  `## 3. Unresolved Internal Links (${flagsBrokenLinks.length} posts)`,
  '',
  'These posts contain relative \`href\` values whose target slug could not be',
  'matched against the blog post list or known core routes.',
  '`mailto:`, `tel:`, `javascript:`, and `#`-only links are excluded.',
  '',
  ...flagsBrokenLinks.map(f => [
    `### \`${f.slug}\``,
    '',
    '| Field | href | Normalised slug |',
    '|-------|------|-----------------|',
    ...f.links.map(l => `| ${l.field} | \`${l.href}\` | \`${l.slug}\` |`),
    '',
  ].join('\n')),
];

const flagsPath = join(ROOT, 'artifacts', 'web', 'src', 'data', 'blog-flags.md');
writeFileSync(flagsPath, flagsLines.join('\n'), 'utf8');
console.log(`Written: ${flagsPath}`);

// ─── Summary ──────────────────────────────────────────────────────────────────
console.log('\n=== SUMMARY ===');
console.log(`Total posts parsed:          ${blogPosts.length}`);
console.log(`Posts with null date:        ${flagsMissingDate.length}`);
console.log(`Core route conflicts:        ${flagsConflicts.length}`);
console.log(`Posts with broken links:     ${flagsBrokenLinks.length}`);
console.log(`Publishable (no conflicts):  ${blogPosts.filter(p => !p.conflictsWithCorePage).length}`);
