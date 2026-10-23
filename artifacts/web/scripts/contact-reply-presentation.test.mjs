import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

// Render real contact components and the shared article template. Unchanged
// media/schema helpers are stubbed so these tests don't load external providers.
function presentation(awayMessage = null) {
  const cache = new Map();
  function load(path) {
    if (cache.has(path)) return cache.get(path);
    const exports = {};
    cache.set(path, exports);
    const localRequire = name => {
      if (name === '@/data/contactReplySettings') return { contactReplySettings: { awayMessage } };
      if (name === 'next/link') {
        return { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) };
      }
      if (name === '@/lib/buildSchema') return { buildAllBlogSchemas: () => [] };
      if (name === '@/lib/normaliseHtml') return { normaliseHtml: value => value };
      if (name === '@/components/ThirdPartyConsent') return { ConsentGate: ({ children }) => children };
      if (['MiniPlayer', 'WaveSurferPlayer', 'YouTubePauseCoordinator'].some(part => name.endsWith(`/${part}`))) {
        return { __esModule: true, default: () => null };
      }
      if (name.startsWith('@/')) {
        const base = resolve(root, 'src', name.slice(2));
        return load(existsSync(`${base}.tsx`) ? `${base}.tsx` : `${base}.ts`);
      }
      return require(name);
    };
    const code = ts.transpileModule(readFileSync(path, 'utf8'), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    }).outputText;
    vm.runInNewContext(code, { exports, require: localRequire, URLSearchParams }, { filename: path });
    return exports;
  }
  const { default: posts, getAllBlogSlugs } = load(resolve(root, 'src/data/blog-posts.ts'));
  return {
    posts: posts.filter(post => getAllBlogSlugs().includes(post.url)),
    BlogPost: load(resolve(root, 'src/components/BlogPost.tsx')).default,
    HomepageContact: load(resolve(root, 'src/components/HomepageContact.tsx')).default,
    BlogEnquiryForm: load(resolve(root, 'src/components/BlogEnquiryForm.tsx')).default,
  };
}

const render = (Component, props = {}) => renderToStaticMarkup(React.createElement(Component, props));
const countEstimates = html => (html.match(/Typical reply time/g) || []).length;

test('every published article receives exactly one estimate through the shared template', () => {
  const { posts, BlogPost } = presentation();
  assert.ok(posts.length > 100);
  for (const post of posts) {
    const html = render(BlogPost, { post });
    assert.equal(countEstimates(html), 1, post.url);
    assert.ok(html.indexOf('blog-enquiry-intro') < html.indexOf('Typical reply time'), post.url);
    assert.ok(html.indexOf('Typical reply time') < html.indexOf('class="blog-enquiry-form"'), post.url);
    assert.ok(html.includes('id="enq-name"') && html.includes('id="enq-email"'), post.url);
  }
  console.log(`Covered ${posts.length} published articles via the real shared template.`);
});

test('new articles inherit the estimate without adding it to article content', () => {
  const { posts, BlogPost } = presentation();
  const post = { ...posts[0], id: 999999, url: 'future-test-article', pageTitle: 'Future test article' };
  assert.equal(countEstimates(render(BlogPost, { post })), 1);
});

test('homepage and blogs share the same single optional away override', () => {
  const awayMessage = 'I’m away this week. I’ll reply when I’m back on Monday.';
  const { HomepageContact, BlogPost, posts } = presentation(awayMessage);
  for (const html of [
    render(HomepageContact),
    render(BlogPost, { post: posts[0] }),
    render(BlogPost, { post: posts.at(-1) }),
  ]) {
    assert.equal(countEstimates(html), 1);
    assert.ok(html.includes(awayMessage));
    assert.ok(html.includes('An estimate, not a guaranteed response time.'));
  }
});

test('service-only forms retain their existing presentation unless opted in', () => {
  const { BlogEnquiryForm } = presentation();
  const props = { pageTitle: 'Example service', pageUrl: '/example-service', intro: 'Custom introduction.' };
  assert.equal(countEstimates(render(BlogEnquiryForm, props)), 0);
  const html = render(BlogEnquiryForm, { ...props, showReplyEstimate: true });
  assert.equal(countEstimates(html), 1);
  assert.ok(html.includes('Custom introduction.'));
});

test('homepage copy and shared blog placeholder match the approved wording', () => {
  const { HomepageContact, BlogEnquiryForm } = presentation();
  const home = render(HomepageContact);
  const blog = render(BlogEnquiryForm, {
    pageTitle: 'Example article', pageUrl: '/example-article', showReplyEstimate: true,
  });
  const placeholder = 'Tell me about your project, where the audio will be used and any deadline.';
  const heading = home.match(/<h2 class="homepage-contact-heading">([\s\S]*?)<\/h2>/)?.[1];
  assert.equal(heading?.replace(/<br\s*\/?>/g, ' '), 'Like what you’ve heard? Let’s talk.');
  assert.ok(home.includes('Tell me about your project and the voice you have in mind. Whether you have a finished script or are still exploring ideas, I’m happy to help. Send me a message and I’ll get back to you as quickly as I can.'));
  assert.ok(blog.includes('Need a voice for something similar? Send me a quick message and I&#x27;ll get back to you.'));
  for (const html of [home, blog]) {
    assert.ok(html.includes(`placeholder="${placeholder}"`));
    assert.equal(countEstimates(html), 1);
    assert.ok(!html.includes('impressively quick'));
  }
});
