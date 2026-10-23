import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

const code = ts.transpileModule(
  readFileSync(fileURLToPath(new URL('../src/lib/autoCloseDisclosure.ts', import.meta.url)), 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText;

function browser({ navHeight = 50, anchored = false } = {}) {
  const events = new Map();
  const toggles = new Map();
  let callback;
  let expanded = false;
  const focusCalls = [];
  const summary = { focus: options => { focusCalls.push(options); document.activeElement = summary; } };
  const link = {};
  const outside = {};
  const window = {
    scrollY: 0,
    addEventListener: (name, listener) => events.set(name, listener),
    removeEventListener: name => events.delete(name),
    requestAnimationFrame: listener => { callback = listener; return 1; },
    cancelAnimationFrame: () => { callback = undefined; },
    scrollBy: ({ top, behavior }) => {
      assert.equal(behavior, 'instant');
      window.scrollY += top;
    },
  };
  const details = {
    contains: element => element === summary || element === link,
    querySelector: selector => selector === 'summary' ? summary : null,
    get open() { return expanded; },
    set open(value) {
      if (expanded && !value && anchored) window.scrollY -= 700;
      expanded = value;
    },
    getBoundingClientRect: () => ({ bottom: 1000 + (expanded ? 700 : 0) - window.scrollY }),
    addEventListener: (name, listener) => toggles.set(name, listener),
    removeEventListener: name => toggles.delete(name),
  };
  const section = {
    getBoundingClientRect: () => ({ top: 1048 + (expanded ? 700 : 0) - window.scrollY }),
  };
  const document = {
    activeElement: outside,
    querySelector: () => navHeight ? { getBoundingClientRect: () => ({ bottom: navHeight }) } : null,
  };
  const exports = {};
  vm.runInNewContext(code, { exports, window, document });
  const cleanup = exports.autoCloseDisclosure(details, section);
  return {
    details, section, window, events, toggles, cleanup, document, summary, link, outside, focusCalls,
    toggle(open) { details.open = open; toggles.get('toggle')?.(); },
    scroll(y) {
      window.scrollY = y;
      events.get('scroll')?.();
      const pending = callback;
      callback = undefined;
      pending?.();
    },
    hasFrame: () => !!callback,
  };
}

test('stays open while reading, even when the summary has left view', () => {
  const b = browser();
  assert.equal(b.details.open, false);
  b.toggle(true);
  for (const y of [1100, 1500, 1697]) {
    b.scroll(y);
    assert.equal(b.details.open, true);
  }
});

for (const anchored of [false, true]) {
  for (const navHeight of [0, 50, 85]) {
    test(`auto-closes without shifting downstream content (anchoring ${anchored}, nav ${navHeight})`, () => {
      const b = browser({ anchored, navHeight });
      b.toggle(true);
      const triggerY = 1748 - navHeight;
      b.scroll(triggerY - 1);
      assert.equal(b.details.open, true);
      b.scroll(triggerY);
      assert.equal(b.details.open, false);
      assert.equal(b.section.getBoundingClientRect().top, navHeight);
      b.scroll(b.window.scrollY + 20);
      assert.equal(b.details.open, false);
      b.scroll(900);
      b.toggle(true);
      b.scroll(1000);
      assert.equal(b.details.open, true);
      b.scroll(triggerY);
      assert.equal(b.details.open, false);
    });
  }
}

test('does not close when reopened below the threshold and scrolling upwards', () => {
  const b = browser();
  b.scroll(1900);
  b.toggle(true);
  b.scroll(1800);
  assert.equal(b.details.open, true);
});

test('manual closing still works and cleanup removes listeners and pending frames', () => {
  const b = browser();
  b.toggle(true);
  b.toggle(false);
  b.scroll(2000);
  assert.equal(b.details.open, false);
  b.toggle(true);
  b.events.get('scroll')();
  assert.equal(b.hasFrame(), true);
  b.cleanup();
  assert.equal(b.events.size, 0);
  assert.equal(b.toggles.size, 0);
  assert.equal(b.hasFrame(), false);
});

for (const focused of ['summary', 'link', 'outside']) {
  test(`automatic collapse handles ${focused} focus without scrolling to the notice`, () => {
    const b = browser();
    b.document.activeElement = b[focused];
    b.toggle(true);
    b.scroll(1698);
    assert.equal(b.details.open, false);
    assert.equal(b.document.activeElement, focused === 'outside' ? b.outside : b.summary);
    assert.equal(b.focusCalls.length, focused === 'outside' ? 0 : 1);
    for (const options of b.focusCalls) assert.equal(options.preventScroll, true);
    assert.equal(b.section.getBoundingClientRect().top, 50);
  });
}
