import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => readFileSync(resolve(root, path), 'utf8');
function browser() {
  const scripts = [];
  const cookies = [];
  const document = {
    title: 'VoiceoverGuy',
    referrer: 'https://example.com/article?email=private#fragment',
    getElementById: id => scripts.find(script => script.id === id),
    createElement: () => ({}),
    head: { appendChild: script => scripts.push(script) },
    get cookie() { return '_ga=123; _ga_94QXHW47HG=456; preferences=keep'; },
    set cookie(value) { cookies.push(value); },
  };
  const window = { location: { origin: 'https://www.voiceoverguy.co.uk', hostname: 'www.voiceoverguy.co.uk' } };
  const exports = {};
  const code = ts.transpileModule(read('src/lib/googleAnalytics.ts'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  vm.runInNewContext(code, { exports, window, document, URL });
  return { ...exports, window, scripts, cookies, commands: () => window.dataLayer.map(args => Array.from(args)) };
}

test('no Google script or data before explicit opt-in; one tag across multiple pages', () => {
  const b = browser();
  assert.equal(b.scripts.length, 0);
  assert.equal(b.window.dataLayer, undefined);
  b.trackPage('/');
  b.trackPage('/voice-of-god');
  assert.equal(b.scripts.length, 1);
  assert.equal(b.scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-94QXHW47HG');
  const commands = b.commands();
  assert.equal(commands.filter(c => c[0] === 'config').length, 1);
  const consent = commands.find(c => c[0] === 'consent' && c[1] === 'default')[2];
  assert.equal(consent.ad_storage, 'denied');
  assert.equal(consent.ad_user_data, 'denied');
  assert.equal(consent.ad_personalization, 'denied');
  const config = commands.find(c => c[0] === 'config')[2];
  assert.equal(config.send_page_view, false);
  assert.equal(config.allow_google_signals, false);
  assert.equal(config.page_referrer, 'https://example.com/article');
  const views = commands.filter(c => c[0] === 'event');
  assert.equal(views.length, 2);
  assert.equal(views[1][2].page_location, 'https://www.voiceoverguy.co.uk/voice-of-god');
});

test('withdrawal disables collection and expires only analytics cookies', () => {
  const b = browser();
  b.trackPage('/');
  b.withdrawAnalytics();
  assert.equal(b.window['ga-disable-G-94QXHW47HG'], true);
  assert.equal(b.commands().at(-1)[2].analytics_storage, 'denied');
  assert.ok(b.cookies.some(c => c.startsWith('_ga=; Max-Age=0; Path=/; Domain=voiceoverguy.co.uk')));
  assert.ok(b.cookies.some(c => c.startsWith('_ga_94QXHW47HG=; Max-Age=0')));
  assert.ok(b.cookies.every(c => !c.startsWith('preferences=')));
});

test('analytics is separately opt-in and legacy media/payment choices do not grant it', () => {
  const consent = read('src/components/ThirdPartyConsent.tsx');
  const component = read('src/components/GoogleAnalytics.tsx');
  assert.ok(consent.includes('media: false, payments: false, analytics: false'));
  assert.ok(consent.includes("const analytics = 'analytics' in parsed && parsed.analytics === true"));
  assert.ok(consent.includes("setDecided('analytics' in parsed && typeof parsed.analytics === 'boolean')"));
  assert.ok(consent.includes('Allow Google Analytics'));
  assert.ok(consent.includes('>Allow all</button>'));
  assert.ok(component.includes('if (!preferences.analytics || !pathname)'));
  assert.ok(component.includes('if (lastPage.current === pathname) return'));
  const layout = read('src/app/layout.tsx');
  assert.ok(layout.indexOf('<GoogleAnalytics />') > layout.indexOf('<ThirdPartyConsent>'));
  assert.ok(layout.indexOf('<GoogleAnalytics />') < layout.indexOf('</ThirdPartyConsent>'));
});
