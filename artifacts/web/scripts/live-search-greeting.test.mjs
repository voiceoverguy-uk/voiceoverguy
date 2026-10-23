import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';
import vm from 'node:vm';

const require = createRequire(new URL('../package.json', import.meta.url));
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const source = readFileSync(new URL('../src/components/LiveSearch.tsx', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;

function loadAtHour(hour) {
  const exports = {};
  const effects = [];
  class LocalDate extends Date {
    getHours() { return hour; }
  }
  vm.runInNewContext(compiled, {
    exports,
    Date: LocalDate,
    require(name) {
      if (name === 'react') {
        return { ...React, useEffect: callback => effects.push(callback) };
      }
      if (name === 'next/link') return { default: 'a' };
      if (name === '@/lib/experience') return { getYearsExperience: () => 26 };
      if (name.startsWith('@/data/')) {
        return { default: [], voiceDemos: [], characterDemos: [], characterVoiceLibrary: [] };
      }
      return require(name);
    },
  });
  return { Component: exports.default, effects };
}

test('initial search HTML is identical in morning, afternoon and evening', () => {
  const html = [8, 17, 18, 23].map(hour => {
    const { Component } = loadAtHour(hour);
    return renderToStaticMarkup(React.createElement(Component));
  });
  for (const rendered of html) {
    assert.equal(rendered, html[0]);
    assert.ok(rendered.includes('Welcome to VoiceoverGuy.co.uk!'));
    assert.ok(!rendered.includes('Good afternoon'));
    assert.ok(!rendered.includes('Good evening'));
  }
});

test('time-specific greeting is set after mount, not during initial state', () => {
  assert.match(source, /useState\('Welcome to VoiceoverGuy\.co\.uk!'\)/);
  assert.match(source, /useEffect\(\(\) => \{\s*setGreeting\(getGreeting\(\)\);/);
  assert.doesNotMatch(source, /useState\(\(\) => getGreeting\(\)\)/);
});
