import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { after, test } from 'node:test';
import {
  checkExternalLink,
  checkLinks,
  getPublishedBlogLinks,
} from './blog-link-checker.mjs';

const server = createServer((request, response) => {
  if (request.url === '/missing') {
    response.writeHead(404, 'Not Found');
  } else if (request.url === '/redirect') {
    response.writeHead(302, { Location: '/ok' });
  } else {
    response.writeHead(200, 'OK');
  }
  response.end();
});

await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
after(() => server.close());

const origin = `http://127.0.0.1:${server.address().port}`;

test('collects deduplicated HTTP(S) links from published blog content only', () => {
  const source = `
const blogPosts = [
 {
  "id": 1,
  "url": "published-post",
  "pageTitle": "Published Post",
  "rating": "3",
  "text1": "<a href=\\"https://example.com/path?a=1&amp;b=2\\">one</a><a href='https://example.com/path?a=1&amp;b=2'>again</a><a href=\\"/internal\\">internal</a>",
  "ntext2": "<a href=\\"mailto:editor@example.com\\">email</a>",
  "conflictsWithCorePage": false
 },
 {
  "id": 2,
  "url": "not-a-blog",
  "pageTitle": "Not a blog",
  "rating": "0",
  "text1": "<a href=\\"https://example.net\\">excluded</a>",
  "conflictsWithCorePage": false
 },
 {
  "id": 3,
  "url": "core-conflict",
  "pageTitle": "Core conflict",
  "rating": "3",
  "text1": "<a href=\\"https://example.org\\">excluded</a>",
  "conflictsWithCorePage": true
 }
];
`;

  assert.deepEqual(getPublishedBlogLinks(source), [
    {
      id: '1',
      slug: 'published-post',
      title: 'Published Post',
      url: 'https://example.com/path?a=1&b=2',
    },
  ]);
});

test('reports HTTP errors, follows redirects, and treats request failures as results', async () => {
  const missing = await checkExternalLink(`${origin}/missing`);
  assert.equal(missing.ok, false);
  assert.equal(missing.status, 404);

  const redirected = await checkExternalLink(`${origin}/redirect`);
  assert.equal(redirected.ok, true);
  assert.equal(redirected.status, 200);
  assert.equal(redirected.finalUrl, `${origin}/ok`);

  const networkFailure = await checkExternalLink('http://127.0.0.1:1/unavailable');
  assert.equal(networkFailure.ok, false);
  assert.equal(typeof networkFailure.error, 'string');
});

test('checks destinations with bounded concurrency and preserves article details', async () => {
  const results = await checkLinks(
    [
      { id: '1', slug: 'post', title: 'Post title', url: `${origin}/ok` },
      { id: '2', slug: 'other-post', title: 'Other title', url: `${origin}/missing` },
    ],
    { concurrency: 1 },
  );

  assert.equal(results[0].ok, true);
  assert.equal(results[1].status, 404);
  assert.equal(results[1].title, 'Other title');
});
