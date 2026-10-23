import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
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
function presentation(awayMessage = null, visitorGreeting = '') {
  const cache = new Map();
  function load(path) {
    if (cache.has(path)) return cache.get(path);
    const exports = {};
    cache.set(path, exports);
    const localRequire = name => {
      // Simulate the post-mount greeting for shared-presentation assertions.
      if (name === 'react' && path.endsWith('/VisitorLocalGreeting.tsx') && visitorGreeting) {
        return { ...React, useState: () => [visitorGreeting, () => {}] };
      }
      if (name === '@/data/contactReplySettings') return { contactReplySettings: { awayMessage } };
      if (name === 'next/link') {
        return { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) };
      }
      if (name === '@/lib/buildSchema') return { buildAllBlogSchemas: () => [] };
      if (name === '@/lib/normaliseHtml') return { normaliseHtml: value => value };
      if (name === '@/components/ThirdPartyConsent') return { ConsentGate: ({ children }) => children };
      if (['MiniPlayer', 'WaveSurferPlayer', 'YouTubePauseCoordinator', 'YouTubeEmbed'].some(part => name.endsWith(`/${part}`))) {
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
    InnerPage: load(resolve(root, 'src/components/InnerPage.tsx')).default,
    ContactForm: load(resolve(root, 'src/components/ContactForm.tsx')).default,
    CalculatorQuoteForm: load(resolve(root, 'src/app/voice-over-word-count-calculator/CalculatorQuoteForm.tsx')).default,
  };
}

const render = (Component, props = {}) => renderToStaticMarkup(React.createElement(Component, props));
const countEstimates = html => (html.match(/Currently:/g) || []).length;

// Discover actual static form declarations, rather than a hand-maintained route list.
function staticFormPages() {
  const results = [];
  function walk(folder) {
    for (const entry of readdirSync(folder, { withFileTypes: true })) {
      const path = resolve(folder, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (entry.name === 'page.tsx') {
        const source = ts.createSourceFile(path, readFileSync(path, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
        const visit = node => {
          if ((ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) &&
              node.tagName.getText(source) === 'InnerPage') {
            const props = {};
            for (const prop of node.attributes.properties) {
              if (ts.isJsxAttribute(prop) && prop.initializer && ts.isStringLiteral(prop.initializer)) {
                props[prop.name.getText(source)] = prop.initializer.text;
              }
            }
            if (props.pageSlug) results.push(props);
          }
          ts.forEachChild(node, visit);
        };
        visit(source);
      }
    }
  }
  walk(resolve(root, 'src/app'));
  return results;
}

test('every published article receives one inline greeting and estimate through the shared template', () => {
  const { posts, BlogPost } = presentation(null, 'Good afternoon.');
  assert.ok(posts.length > 100);
  for (const post of posts) {
    const html = render(BlogPost, { post });
    assert.equal(countEstimates(html), 1, post.url);
    assert.ok(html.includes('<p class="blog-enquiry-intro">Good afternoon. '), post.url);
    assert.ok(html.indexOf('blog-enquiry-intro') < html.indexOf('Currently:'), post.url);
    assert.ok(html.indexOf('Currently:') < html.indexOf('class="blog-enquiry-form"'), post.url);
    assert.ok(html.includes('id="enq-name"') && html.includes('id="enq-email"'), post.url);
  }
  console.log(`Covered ${posts.length} published articles via the real shared template.`);
});

test('new articles inherit the greeting and estimate without changing article content', () => {
  const { posts, BlogPost } = presentation(null, 'Good afternoon.');
  const post = { ...posts[0], id: 999999, url: 'future-test-article', pageTitle: 'Future test article' };
  const html = render(BlogPost, { post });
  assert.equal(countEstimates(html), 1);
  assert.ok(html.includes('<p class="blog-enquiry-intro">Good afternoon. '));
});

test('homepage and blogs share the same single optional away override', () => {
  const awayMessage = 'I’m away this week. I’ll reply when I’m back on Monday.';
  const { HomepageContact, BlogPost, posts } = presentation(awayMessage, 'Good evening.');
  for (const html of [
    render(HomepageContact),
    render(BlogPost, { post: posts[0] }),
    render(BlogPost, { post: posts.at(-1) }),
  ]) {
    assert.equal(countEstimates(html), 1);
    assert.ok(html.includes(awayMessage));
    assert.ok(html.includes('>Good evening. '));
    assert.ok(!html.includes('An estimate, not a guaranteed response time.'));
    assert.ok(!html.includes('contact-reply-time-local'));
  }
});

test('homepage greeting is inline with approved introduction; SSR has no clock-dependent text', () => {
  const hydrated = presentation(null, 'Good morning.');
  const home = render(hydrated.HomepageContact);
  assert.ok(home.includes('<p class="homepage-contact-intro">Good morning. Tell me about your project'));
  const initial = presentation();
  for (const html of [
    render(initial.HomepageContact),
    render(initial.BlogEnquiryForm, { pageTitle: 'Example', pageUrl: '/example' }),
  ]) {
    assert.doesNotMatch(html, /Good (?:morning|afternoon|evening)\./);
    assert.equal(countEstimates(html), 1);
  }
});

test('all enquiry forms receive the shared behaviour by default, preserving custom copy', () => {
  const { BlogEnquiryForm } = presentation(null, 'Good afternoon.');
  const props = { pageTitle: 'Example service', pageUrl: '/example-service', intro: 'Custom introduction.' };
  const html = render(BlogEnquiryForm, props);
  assert.equal(countEstimates(html), 1);
  assert.ok(html.includes('<p class="blog-enquiry-intro">Good afternoon. Custom introduction.</p>'));
});

test('homepage copy and shared blog placeholder match the approved wording', () => {
  const { HomepageContact, BlogEnquiryForm } = presentation();
  const home = render(HomepageContact);
  const blog = render(BlogEnquiryForm, {
    pageTitle: 'Example article', pageUrl: '/example-article',
  });
  const placeholder = 'Your project, where the audio will be used, and any deadline…';
  const heading = home.match(/<h2 class="homepage-contact-heading">([\s\S]*?)<\/h2>/)?.[1];
  assert.equal(heading?.replace(/<br\s*\/?>/g, ' '), 'Like what you’ve heard? Let’s talk.');
  assert.ok(home.includes('Tell me about your project and the voice you have in mind. Finished script or early ideas — I’m happy to help.'));
  assert.ok(blog.includes('Need a voice for something similar? Send me a quick message and I&#x27;ll get back to you.'));
  for (const html of [home, blog]) {
    assert.ok(html.includes(`placeholder="${placeholder}"`));
    assert.equal(countEstimates(html), 1);
    assert.ok(!html.includes('impressively quick'));
    assert.ok(html.includes('Currently:</span> <span class="contact-reply-time-estimate">'));
    assert.ok(!html.includes('Typical reply time'));
    assert.ok(!html.includes('contact-reply-time-note'));
  }
});

test('actual static declarations cover 18 static pages plus biography with one shared introduction', () => {
  const { InnerPage, ContactForm } = presentation(null, 'Good afternoon.');
  const pages = staticFormPages();
  const servicePages = pages.filter(page => page.pageSlug !== 'voiceoverguy');
  assert.equal(servicePages.length + 1, 18, '17 service routes plus the separate Contact Guy page');
  assert.equal(pages.filter(page => page.pageSlug === 'voiceoverguy').length, 1);
  for (const props of pages) {
    const html = render(InnerPage, {
      ...props, pageTitle: props.pageSlug, sections: [],
      afterMessageNode: React.createElement('span', { 'data-test': 'after-message' }, 'Retained page extra'),
    });
    assert.equal(countEstimates(html), 1, props.pageSlug);
    const intro = html.match(/<p class="blog-enquiry-intro">([\s\S]*?)<\/p>/)?.[1].replace(/&#x27;/g, "'");
    assert.equal(intro, `Good afternoon. ${props.formIntro}`, props.pageSlug);
    assert.ok(html.includes('data-test="after-message"'), props.pageSlug);
    if (props.formSideImage) assert.ok(html.includes(`src="${props.formSideImage}"`), props.pageSlug);
  }
  const contactPage = readFileSync(resolve(root, 'src/app/contact-guy/page.tsx'), 'utf8');
  assert.equal((contactPage.match(/<ContactForm\b/g) || []).length, 1);
  assert.ok(!contactPage.includes('It&#39;s always great to hear'), 'intro moved into form, not duplicated');
  const contact = render(ContactForm, { compact: true });
  assert.equal(countEstimates(contact), 1);
  assert.ok(contact.includes('Good afternoon. It&#x27;s always great to hear from new clients'));
  console.log(`Static coverage: ${servicePages.length} service pages + Contact Guy = 18 static pages; biography explicitly covered.`);
  console.log(`Audited InnerPage routes: ${pages.map(page => `/${page.pageSlug}`).sort().join(', ')}`);
});

test('distinct compact contact and calculator quote forms share greeting, override and placeholder', () => {
  const message = 'I’m away this week. I’ll reply when I’m back on Monday.';
  const { ContactForm, CalculatorQuoteForm } = presentation(message, 'Good evening.');
  const placeholder = 'Your project, where the audio will be used, and any deadline…';
  const calculatorPage = readFileSync(resolve(root, 'src/app/voice-over-word-count-calculator/CalculatorPage.tsx'), 'utf8');
  assert.match(calculatorPage, /<CalculatorQuoteForm wordCount=\{wordCount\}/);
  for (const html of [
    render(ContactForm, { compact: true }),
    render(ContactForm, { intro: 'Custom contact copy.' }),
    render(CalculatorQuoteForm, { wordCount: 123 }),
  ]) {
    assert.equal(countEstimates(html), 1);
    assert.ok(html.includes(message));
    assert.ok(html.includes('Good evening.'));
    assert.ok(html.includes(`placeholder="${placeholder}"`));
    assert.ok(!html.includes('contact-reply-time-local'));
  }
  const quote = render(CalculatorQuoteForm, { wordCount: 123 });
  assert.ok(quote.includes('Need an accurate voiceover quote?'));
  assert.ok(quote.includes('Good evening. Send over the details below'));
  assert.ok(quote.includes('value="123"'), 'live calculator word count still reaches quote form');
  console.log('Additional site-wide form: /voice-over-word-count-calculator (distinct quote form).');
});

test('static pages and biography use the same away override without suppressing their greeting', () => {
  const message = 'I’m away until Monday. Thanks for your patience.';
  const { InnerPage } = presentation(message, 'Good morning.');
  for (const props of staticFormPages()) {
    const html = render(InnerPage, { ...props, pageTitle: props.pageSlug, sections: [] });
    assert.equal(countEstimates(html), 1, props.pageSlug);
    assert.ok(html.includes(message), props.pageSlug);
    assert.ok(html.includes('Good morning.'), props.pageSlug);
    assert.ok(!html.includes('contact-reply-time-local'), props.pageSlug);
  }
});

test('label is site red; estimate is regular dark grey, with no obsolete label or disclaimer', () => {
  const css = readFileSync(resolve(root, 'src/app/globals.css'), 'utf8');
  assert.match(css, /\.contact-reply-time-label\s*\{[^}]*color:\s*var\(--red\)/);
  assert.match(css, /\.contact-reply-time-estimate\s*\{[^}]*color:\s*var\(--grey-dark\)/);
  assert.match(css, /\.contact-reply-time-estimate\s*\{[^}]*font-weight:\s*400/);
});
