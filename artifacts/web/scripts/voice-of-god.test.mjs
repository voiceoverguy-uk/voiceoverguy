import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const nodeRequire = createRequire(import.meta.url);
const site = 'https://www.voiceoverguy.co.uk';
const demo = '/assets/audio/voice-of-god-demo-showreel-guy-harris.mp3';
const sentence = 'Need LIVE, in-room Voice of God announcements for an event, awards show or stage production?';
const description = 'Voice of God announcer for awards ceremonies, arena tours and major live events. Powerful delivery, fast turnaround and pre-recorded options.';

// Execute the real schema factories and page declarations without starting Next
// or changing source exports. UI-only imports are not used by these assertions.
function load(path, extra = '') {
  const exports = {};
  const code = ts.transpileModule(read(path) + extra, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const require = (id) => {
    if (id === './verifiedYouTubeVideos') return load('src/lib/verifiedYouTubeVideos.ts');
    if (id === '@/lib/staticPageSchema') return load('src/lib/staticPageSchema.tsx');
    if (id === '@/data/pages.json') return JSON.parse(read('src/data/pages.json'));
    if (id.startsWith('@/')) return {};
    return nodeRequire(id);
  };
  vm.runInNewContext(code, { exports, require }, { filename: path });
  return exports;
}
const { schemas, metadata, liveEventProof } = JSON.parse(JSON.stringify(load('src/app/voice-of-god/page.tsx', '\nexport { schemas, liveEventProof };')));
const byType = (type) => schemas.filter((s) => s['@type'] === type);

test('concise live-event proof follows existing examples in the same section before the unchanged demo', () => {
  const page = read('src/app/voice-of-god/page.tsx');
  assert.ok(page.includes(`text: data.s4 + liveEventProof, audioSrc: '${demo}'`));
  assert.ok(liveEventProof.includes('<h2>Live awards announcing</h2>'));
  assert.ok(liveEventProof.includes('Hal Cruttenden hosted The Print Industry Awards 2026 at The National Conference Centre, Birmingham, at the National Motorcycle Museum, Birmingham.'));
  assert.ok(liveEventProof.includes('Guy Harris provided the live, in-room Voice of God announcements.'));
  assert.ok(liveEventProof.includes('I’m happy to travel to venues and work alongside production and event teams, taking cues, reading categories and nominees, and handling last-minute script changes.'));
  assert.equal((liveEventProof.match(/<p>/g) || []).length, 2);
  assert.doesNotMatch(liveEventProof, /<img|<video|<iframe|<a\b/);
  assert.equal(byType('Event').length, 0);
});

test('homepage changes only the opening sentence within the retained splash', () => {
  const splash = read('src/app/page.tsx').split('{/* CLUSTER B2: AWARDS */}')[1].split('{/* CLUSTER C: CHILD VOICEOVER */}')[0];
  assert.ok(splash.includes(`${sentence}<br />`));
  assert.ok(splash.includes('<h2>Event or Awards Night Voiceover?</h2>'));
  assert.ok(splash.includes('<Link href="/voice-of-god" className="red-link">Voice of God</Link>'));
  assert.ok(splash.includes('href="https://www.voiceofgod.co.uk" target="_blank" rel="noopener noreferrer"'));
  assert.ok(splash.includes('className="home-callout-box home-callout-box--stage"'));
  for (const credit of ['ITV', 'Butlins', 'The Masked Singer', 'Bestway', 'Poundland', 'GoLocal', 'TV Choice Awards']) {
    assert.ok(splash.includes(`<strong>${credit}</strong>`));
  }
  assert.ok(splash.includes('If you need a big, authoritative announcer voice that fills the room and lifts the atmosphere, lets talk. Need more?'));
});

test('AudioObject matches the unchanged visible demo with measured duration and neutral description', () => {
  assert.equal(byType('AudioObject').length, 1);
  const audio = byType('AudioObject')[0];
  assert.equal(audio.contentUrl, site + demo);
  assert.equal(audio.duration, 'PT49.26S');
  assert.equal(audio.name, 'Voice of God Demo – Guy Harris');
  assert.equal(audio.description, 'Voice of God demo for events, awards, and stage shows.');
  assert.equal(audio.encodingFormat, 'audio/mpeg');
  assert.equal(audio['@id'], site + '/voice-of-god#audio');
  assert.ok(read('src/app/voice-of-god/page.tsx').includes(`audioSrc: '${demo}'`));
});

test('WebPage identifies the unchanged Service and retains the same Person/provider relationship', () => {
  assert.equal(byType('ProfilePage').length, 0);
  assert.equal(byType('WebPage').length, 1);
  const page = byType('WebPage')[0];
  const person = byType('Person')[0];
  const service = byType('Service')[0];
  assert.equal(page.mainEntity['@id'], service['@id']);
  assert.equal(page.about['@id'], person['@id']);
  assert.equal(service.provider['@id'], person['@id']);
  assert.equal(person['@context'], 'https://schema.org');
  assert.equal(person['@id'], site + '/#guyharris');
  assert.equal(person.name, 'Guy Harris');
  assert.equal(person.description, 'Guy Harris is a professional Voice of God announcer trusted by ITV, Butlins, The Masked Singer, Poundland, the Natural History Museum and national award ceremonies.');
  assert.equal(service.description, 'Live and pre-recorded Voice of God announcer services for events, awards ceremonies, exhibitions and stage shows across the UK.');
});

test('only the incomplete meta fragment is removed; titles, canonicals and social URLs remain unchanged', () => {
  assert.equal(metadata.title, 'Voice of God – Live Event & Awards Voiceover');
  assert.equal(metadata.description, description);
  assert.equal(metadata.openGraph.description, description);
  assert.equal(metadata.twitter.description, description);
  assert.equal(metadata.alternates.canonical, site + '/voice-of-god');
  assert.equal(metadata.openGraph.url, site + '/voice-of-god');
  assert.equal(metadata.openGraph.title, metadata.title + ' | VoiceoverGuy');
  assert.equal(metadata.twitter.title, metadata.title + ' | VoiceoverGuy');
});

test('invisible FAQ markup is removed while breadcrumb and video markup remain unchanged', () => {
  assert.equal(byType('FAQPage').length, 0);
  assert.equal(schemas.length, 6);
  assert.equal(byType('BreadcrumbList')[0].itemListElement[1].item['@id'], site + '/voice-of-god');
  assert.equal(byType('VideoObject')[0].embedUrl, 'https://www.youtube.com/embed/e0vZ9cxdilo');
  assert.equal(byType('VideoObject')[0].thumbnailUrl, 'https://img.youtube.com/vi/e0vZ9cxdilo/hqdefault.jpg');
  assert.equal(byType('VideoObject')[0].uploadDate, '2024-02-27T06:11:09-08:00');
});

if (process.env.VOG_RENDERED_DIR) {
  test('production HTML renders all five corrections without altering page identity or media references', () => {
    const output = resolve(root, process.env.VOG_RENDERED_DIR);
    const home = readFileSync(resolve(output, 'index.html'), 'utf8');
    const html = readFileSync(resolve(output, 'voice-of-god.html'), 'utf8');
    assert.ok(home.includes(sentence));
    const rendered = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
      .map((match) => JSON.parse(match[1]));
    assert.deepEqual(rendered, schemas);
    assert.ok(html.includes(`<meta name="description" content="${description}"`));
    assert.ok(html.includes(`<link rel="canonical" href="${site}/voice-of-god"`));
    assert.ok(html.includes('<title>Voice of God – Live Event &amp; Awards Voiceover | VoiceoverGuy</title>'));
    assert.ok(html.includes(demo));
    const examples = JSON.parse(read('src/data/pages.json')).seo7.s4;
    const lastExample = examples.match(/<p>[\s\S]*?<\/p>/g).at(-1);
    const proofAt = html.indexOf('<h2>Live awards announcing</h2>');
    assert.ok(html.includes(lastExample));
    assert.ok(proofAt > html.indexOf(lastExample));
    assert.ok(proofAt < html.indexOf('class="demo-player"'));
    assert.equal(html.split('<h2>Live awards announcing</h2>').length - 1, 1);
    assert.ok(html.includes(liveEventProof.trim()));
    assert.ok(!home.includes('The Print Industry Awards 2026'));
    assert.match(html, /Voice of God<\/span> Announcer &(?:amp;)? Voiceover/);
    assert.ok(html.includes('https://voiceofgod.co.uk'));
  });
}