import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';
import vm from 'node:vm';

const require = createRequire(new URL('../package.json', import.meta.url));
const ts = require('typescript');
const source = readFileSync(new URL('../src/data/blog-posts.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const exports = {};

vm.runInNewContext(compiled, {
  exports,
  require(name) {
    if (name === '@/lib/blogRating') return { fromLegacyRating: value => value };
    if (name === '@/lib/slug') return { getCleanSlug: slug => slug };
    return require(name);
  },
});

const blogPosts = exports.default;
const articles = {
  penarium: blogPosts.find(post => post.url === 'penarium-opening-credits'),
  starWars: blogPosts.find(post => post.url === 'star-wars-character-voices'),
  hideTheCorpse: blogPosts.find(post => post.url === 'hide-the-corpse-promo-voiceover'),
};
const contentFields = [
  'info', 'text1', 'text2', 'bottomText',
  'ntext1', 'ntext2', 'ntext3', 'ntext4',
];

function articleHtml(article) {
  return contentFields.map(field => article[field] ?? '').join('\n');
}

function anchors(html) {
  return [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map(([, attributes, innerHtml]) => ({
    href: attributes.match(/\bhref="([^"]+)"/i)?.[1],
    text: innerHtml.replace(/<[^>]*>/g, '').trim(),
  }));
}

function expectPlainText(article, label) {
  const html = articleHtml(article);
  const visibleText = html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ');
  assert.ok(visibleText.includes(label), `${label} should remain visible in ${article.url}`);
  assert.ok(
    !anchors(html).some(anchor => anchor.text.includes(label)),
    `${label} should not be inside a link in ${article.url}`,
  );
}

test('retired destinations stay absent while article names remain plain text', () => {
  for (const [name, article] of Object.entries(articles)) {
    assert.ok(article, `Expected the ${name} article route to exist`);
  }

  expectPlainText(articles.penarium, 'Self Made Miracle');
  expectPlainText(articles.starWars, 'Magic Kingdom');
  expectPlainText(articles.hideTheCorpse, 'Realcast');

  const allArticleText = Object.values(articles)
    .map(article => articleHtml(article))
    .join('\n');
  for (const retiredDestination of [
    'https://www.selfmademiracle.nl',
    'https://disneyparksblog.com',
    'https://realcast.io/htc/',
  ]) {
    assert.ok(
      !allArticleText.includes(retiredDestination),
      `Retired destination should not return: ${retiredDestination}`,
    );
  }
});

test('nearby Team17, character-voice, Steam and related article links remain intact', () => {
  const penariumLinks = anchors(articleHtml(articles.penarium));
  const starWarsLinks = anchors(articleHtml(articles.starWars));
  const hideTheCorpseLinks = anchors(articleHtml(articles.hideTheCorpse));

  assert.ok(penariumLinks.some(link => link.href === 'https://www.team17.com' && link.text === 'Team 17'));
  assert.ok(starWarsLinks.some(link => link.href === 'character-voiceover' && link.text === 'character voices'));
  assert.ok(hideTheCorpseLinks.some(link =>
    link.href === 'https://store.steampowered.com/app/3405120/Hide_The_Corpse/' && link.text === 'Steam',
  ));
  for (const href of [
    'https://www.voiceoverguy.co.uk/patrick-stewart-money-supermartket-voice',
    'https://www.voiceoverguy.co.uk/minecraft-backpack-patrick-stewart-style-voiceover',
    'https://www.voiceoverguy.co.uk/nfl-cbs-sports-king-henry-voice-patrick-stewart',
  ]) {
    assert.ok(hideTheCorpseLinks.some(link => link.href === href), `Related article link should remain: ${href}`);
  }
});
