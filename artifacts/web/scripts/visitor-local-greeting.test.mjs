import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

const source = readFileSync(new URL('../src/lib/visitorLocalGreeting.ts', import.meta.url), 'utf8');
const code = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const exports = {};
vm.runInNewContext(code, { exports });
const { getVisitorLocalGreeting } = exports;

function inZone(zone, callback) {
  const original = process.env.TZ;
  process.env.TZ = zone;
  try { callback(); } finally {
    if (original === undefined) delete process.env.TZ;
    else process.env.TZ = original;
  }
}

test('local morning, afternoon and evening boundaries are inclusive at their start', () => {
  inZone('Europe/London', () => {
    for (const [time, expected] of [
      ['00:00:00', 'Good morning.'], ['11:59:59', 'Good morning.'],
      ['12:00:00', 'Good afternoon.'], ['17:59:59', 'Good afternoon.'],
      ['18:00:00', 'Good evening.'], ['23:59:59', 'Good evening.'],
    ]) assert.equal(getVisitorLocalGreeting(new Date(`2026-01-16T${time}Z`)), expected, time);
  });
});

test('visitor timezone drives only the greeting, not the UK rolling estimate', () => {
  const replyCode = ts.transpileModule(
    readFileSync(new URL('../src/lib/contactReplyTiming.ts', import.meta.url), 'utf8'),
    { compilerOptions: { module: ts.ModuleKind.CommonJS } },
  ).outputText;
  const reply = {};
  vm.runInNewContext(replyCode, { exports: reply });
  const now = new Date('2026-10-24T22:00:00Z');
  for (const [zone, greeting] of [
    ['America/Los_Angeles', 'Good afternoon.'],
    ['Asia/Dubai', 'Good morning.'],
    ['Europe/London', 'Good evening.'],
  ]) {
    inZone(zone, () => {
      assert.equal(getVisitorLocalGreeting(now), greeting, zone);
      assert.equal(reply.getContactReplyTiming(now, null, zone).estimate,
        'Around 9 hours — from 7am UK time.');
    });
  }
});

test('invalid or unavailable local time produces no greeting', () => {
  assert.equal(getVisitorLocalGreeting(new Date(NaN)), '');
  for (const hour of [NaN, Infinity, -1, 24]) {
    assert.equal(getVisitorLocalGreeting({ getHours: () => hour }), '');
  }
});

function clockHarness(instant, unavailable = false) {
  let now = Date.parse(instant);
  let timer;
  const outputs = [];
  const listeners = new Map();
  class ClockDate extends Date {
    constructor(...args) {
      if (unavailable) throw new Error('clock unavailable');
      super(...(args.length ? args : [now]));
    }
  }
  const document = {
    visibilityState: 'visible',
    addEventListener: (event, callback) => listeners.set(event, callback),
    removeEventListener: event => listeners.delete(event),
  };
  const window = {
    clearTimeout: () => { timer = undefined; },
    setTimeout: (callback, delay) => { timer = { callback, delay }; return 1; },
  };
  const loaded = {};
  vm.runInNewContext(code, { exports: loaded, Date: ClockDate, document, window });
  const cleanup = loaded.watchVisitorLocalGreeting(value => outputs.push(value));
  return {
    outputs, listeners, cleanup,
    get timer() { return timer; },
    advance() { now += timer.delay; timer.callback(); },
    resume(instant, state = 'visible') {
      now = Date.parse(instant);
      document.visibilityState = state;
      listeners.get('visibilitychange')();
    },
  };
}

test('open page refreshes across noon, evening and midnight, with timer cleanup', () => {
  inZone('America/Los_Angeles', () => {
    for (const [instant, before, after] of [
      ['2026-01-16T19:59:59Z', 'Good morning.', 'Good afternoon.'],
      ['2026-01-17T01:59:59Z', 'Good afternoon.', 'Good evening.'],
      ['2026-01-17T07:59:59Z', 'Good evening.', 'Good morning.'],
    ]) {
      const clock = clockHarness(instant);
      assert.equal(clock.outputs.at(-1), before);
      assert.equal(clock.timer.delay, 1000);
      clock.advance();
      assert.equal(clock.outputs.at(-1), after);
      assert.equal(clock.timer.delay, 60_000);
      clock.cleanup();
      assert.equal(clock.timer, undefined);
      assert.equal(clock.listeners.size, 0);
    }
  });
});

test('returning to the tab refreshes immediately; hiding it does not force a refresh', () => {
  inZone('Europe/London', () => {
    const clock = clockHarness('2026-01-16T08:00:00Z');
    assert.equal(clock.outputs.at(-1), 'Good morning.');
    clock.resume('2026-01-16T20:00:00Z', 'hidden');
    assert.equal(clock.outputs.at(-1), 'Good morning.');
    clock.resume('2026-01-16T20:00:00Z');
    assert.equal(clock.outputs.at(-1), 'Good evening.');
    clock.cleanup();
  });
});

test('unusable clock is safely omitted and does not break rendering or cleanup', () => {
  const clock = clockHarness('2026-01-16T12:00:00Z', true);
  assert.equal(clock.outputs.at(-1), '');
  assert.equal(clock.timer.delay, 60_000);
  clock.cleanup();
  assert.equal(clock.listeners.size, 0);
});

test('greeting component is client-initialised inline text, without extra markup', () => {
  const component = readFileSync(new URL('../src/components/VisitorLocalGreeting.tsx', import.meta.url), 'utf8');
  assert.match(component, /useState\(''\)/);
  assert.match(component, /useEffect\(\(\) => watchVisitorLocalGreeting/);
  assert.doesNotMatch(component, /<(?:span|div|p|h[1-6])\b/);
});
