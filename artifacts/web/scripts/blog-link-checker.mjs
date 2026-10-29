const CONTENT_FIELDS = [
  'info',
  'text1',
  'text2',
  'bottomText',
  'ntext1',
  'ntext2',
  'ntext3',
  'ntext4',
];

function extractEntryBlocks(source) {
  const blocks = [];
  let inEntry = false;
  let current = [];

  for (const line of source.split('\n')) {
    if (!inEntry && line.trim() === '{') {
      inEntry = true;
      current = [line];
    } else if (inEntry) {
      current.push(line);
      if (/^\s*\}[,]?\s*$/.test(line)) {
        blocks.push(current.join('\n'));
        current = [];
        inEntry = false;
      }
    }
  }

  return blocks;
}

function extractStringFields(block) {
  const fields = new Map();
  const pattern = /"(\w+)":\s*"((?:[^"\\]|\\.)*)"/g;
  let match;

  while ((match = pattern.exec(block)) !== null) {
    fields.set(match[1], JSON.parse(`"${match[2]}"`));
  }

  return fields;
}

export function getPublishedBlogLinks(source) {
  const linksByArticleAndUrl = new Map();

  for (const block of extractEntryBlocks(source)) {
    const fields = extractStringFields(block);
    const id = block.match(/"id":\s*(\d+)/)?.[1];
    const slug = fields.get('url');
    const title = fields.get('pageTitle');
    const rating = fields.get('rating');
    const hasCorePageConflict = /"conflictsWithCorePage":\s*true\b/.test(block);

    // Match the blog index: exclude core-page conflicts and non-blog entries.
    if (!id || !slug || !title || rating === '0' || hasCorePageConflict) continue;

    for (const field of CONTENT_FIELDS) {
      const html = fields.get(field) ?? '';
      const hrefPattern = /\bhref\s*=\s*(["'])(.*?)\1/gi;
      let match;

      while ((match = hrefPattern.exec(html)) !== null) {
        const href = match[2].replace(/&amp;/gi, '&').trim();
        let destination;
        try {
          destination = new URL(href);
        } catch {
          continue;
        }
        if (destination.protocol !== 'http:' && destination.protocol !== 'https:') {
          continue;
        }

        const key = `${slug}\n${destination.href}`;
        if (!linksByArticleAndUrl.has(key)) {
          linksByArticleAndUrl.set(key, { id, slug, title, url: destination.href });
        }
      }
    }
  }

  return [...linksByArticleAndUrl.values()];
}

export async function checkExternalLink(url, fetchImpl = fetch, timeoutMs = 12_000) {
  try {
    const response = await fetchImpl(url, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'User-Agent': 'VoiceoverGuyBlogLinkCheck/1.0',
        Range: 'bytes=0-0',
      },
      signal: AbortSignal.timeout(timeoutMs),
    });
    await response.body?.cancel();
    return {
      ok: response.status >= 200 && response.status < 400,
      status: response.status,
      statusText: response.statusText,
      finalUrl: response.url,
    };
  } catch (error) {
    const cause = error?.cause?.code;
    return {
      ok: false,
      error: cause ? `${cause}: ${error.message}` : error.message,
    };
  }
}

export async function checkLinks(links, { concurrency = 6, fetchImpl = fetch } = {}) {
  const results = new Array(links.length);
  let nextIndex = 0;

  async function worker() {
    while (true) {
      const index = nextIndex++;
      if (index >= links.length) return;
      results[index] = {
        ...links[index],
        ...(await checkExternalLink(links[index].url, fetchImpl)),
      };
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, links.length) }, () => worker()),
  );
  return results;
}
