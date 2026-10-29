#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkLinks, getPublishedBlogLinks } from './blog-link-checker.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = await readFile(join(root, 'src', 'data', 'blog-posts.ts'), 'utf8');
const links = getPublishedBlogLinks(source);

if (links.length === 0) {
  console.log('check:blog-links: no external links found in published blog content.');
  process.exit(0);
}

console.log(
  `check:blog-links: checking ${links.length} external destinations from published articles...`,
);
const results = await checkLinks(links);
const unavailable = results.filter(result => !result.ok);

if (unavailable.length === 0) {
  console.log(`check:blog-links: all ${results.length} destinations responded successfully.`);
} else {
  console.log(`\n${unavailable.length} destination(s) need editorial review:\n`);
  for (const result of unavailable) {
    const response = result.status
      ? `HTTP ${result.status}${result.statusText ? ` ${result.statusText}` : ''}`
      : `ERROR ${result.error}`;
    console.log(`- ${result.title} (/ ${result.slug}; post ${result.id})`);
    console.log(`  ${result.url}`);
    console.log(`  ${response}`);
    if (result.finalUrl && result.finalUrl !== result.url) {
      console.log(`  Final URL: ${result.finalUrl}`);
    }
  }
  console.log(
    '\nNetwork and HTTP failures are reported for review; blog content was not changed.',
  );
}

// This opt-in report is advisory: transient external failures never fail builds.
process.exit(0);
