import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

const source = readFileSync(new URL('../src/lib/contactReplyTiming.ts', import.meta.url), 'utf8');
const code = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const exports = {};
vm.runInNewContext(code, { exports });
const { getContactReplyTiming } = exports;
const messages = [
  'Up late or starting early? I’ll most likely reply this morning.',
  'You’ll usually hear back from me very shortly.',
  'I’ll usually get back to you within a couple of hours.',
  'I’ll most likely get back to you this afternoon.',
  'Yes, I’m often still answering messages this evening!',
  'You’ll most likely hear back from me tomorrow morning.',
];
const boundaries = [
  [0, 0], [6 * 60 + 59, 0], [7 * 60, 1], [11 * 60 - 1, 1],
  [11 * 60, 2], [12 * 60 - 1, 2], [12 * 60, 3], [17 * 60 - 1, 3],
  [17 * 60, 4], [22 * 60 - 1, 4], [22 * 60, 5], [24 * 60 - 1, 5],
];

for (const [season, midnightUTC, offset] of [
  ['GMT', '2026-01-16T00:00:00Z', 0],
  ['BST', '2026-07-17T00:00:00Z', 60],
]) {
  test(`${season}: every interval boundary, including midnight`, () => {
    for (const [minutes, expected] of boundaries) {
      const date = new Date(Date.parse(midnightUTC) + (minutes - offset) * 60_000);
      assert.equal(getContactReplyTiming(date), messages[expected], `${season} UK minute ${minutes}`);
    }
  });
}

test('visitor time zones do not change the estimate', () => {
  const original = process.env.TZ;
  try {
    for (const zone of ['America/Los_Angeles', 'Asia/Tokyo', 'Pacific/Auckland', 'UTC']) {
      process.env.TZ = zone;
      assert.equal(getContactReplyTiming(new Date('2026-07-17T06:00:00Z')), messages[1], zone);
    }
  } finally {
    if (original === undefined) delete process.env.TZ;
    else process.env.TZ = original;
  }
});

test('UK clock automatically changes with spring and autumn daylight saving', () => {
  for (const instant of [
    '2026-03-29T00:59:59Z', '2026-03-29T01:00:00Z',
    '2026-10-25T00:59:59Z', '2026-10-25T01:00:00Z',
  ]) assert.equal(getContactReplyTiming(new Date(instant)), messages[0]);
  assert.equal(getContactReplyTiming(new Date('2026-03-28T06:00:00Z')), messages[0]);
  assert.equal(getContactReplyTiming(new Date('2026-03-29T06:00:00Z')), messages[1]);
  assert.equal(getContactReplyTiming(new Date('2026-10-24T06:00:00Z')), messages[1]);
  assert.equal(getContactReplyTiming(new Date('2026-10-25T06:00:00Z')), messages[0]);
});

test('weekends follow the same schedule and every minute has one estimate', () => {
  for (const day of ['2026-01-16', '2026-01-17', '2026-01-18']) {
    for (let minute = 0; minute < 1440; minute++) {
      const hour = Math.floor(minute / 60);
      const index = hour < 7 ? 0 : hour < 11 ? 1 : hour < 12 ? 2 : hour < 17 ? 3 : hour < 22 ? 4 : 5;
      const date = new Date(Date.parse(`${day}T00:00:00Z`) + minute * 60_000);
      assert.equal(getContactReplyTiming(date), messages[index]);
    }
  }
});

test('optional away message replaces the estimate; blank settings use the schedule', () => {
  const date = new Date('2026-07-17T06:00:00Z');
  assert.equal(getContactReplyTiming(date, '  Away until Monday.  '), 'Away until Monday.');
  for (const setting of [null, undefined, '', '   ']) {
    assert.equal(getContactReplyTiming(date, setting), messages[1]);
  }
  const settings = readFileSync(new URL('../src/data/contactReplySettings.ts', import.meta.url), 'utf8');
  assert.match(settings, /awayMessage: null/);
});

function clockHarness(instant, awayMessage) {
  let now = Date.parse(instant);
  let nextTimer;
  const listeners = new Map();
  const outputs = [];
  class ClockDate extends Date {
    constructor(...args) { super(...(args.length ? args : [now])); }
    static now() { return now; }
  }
  const document = {
    visibilityState: 'visible',
    addEventListener: (event, callback) => listeners.set(event, callback),
    removeEventListener: event => listeners.delete(event),
  };
  const window = {
    setTimeout: (callback, delay) => { nextTimer = { callback, delay }; return 1; },
    clearTimeout: () => { nextTimer = undefined; },
  };
  const loaded = {};
  vm.runInNewContext(code, { exports: loaded, Date: ClockDate, document, window });
  const cleanup = loaded.watchContactReplyTiming(message => outputs.push(message), awayMessage);
  return {
    outputs, listeners, cleanup,
    get timer() { return nextTimer; },
    advance() { now += nextTimer.delay; nextTimer.callback(); },
    resume(instant) {
      now = Date.parse(instant);
      listeners.get('visibilitychange')();
    },
  };
}

test('open page refreshes at all interval boundaries and midnight, then cleans up', () => {
  for (const [hour, expected] of [[7, 1], [11, 2], [12, 3], [17, 4], [22, 5], [24, 0]]) {
    const boundary = Date.parse('2026-01-16T00:00:00Z') + hour * 3600_000;
    const clock = clockHarness(new Date(boundary - 1000).toISOString());
    assert.equal(clock.timer.delay, 1000);
    clock.advance();
    assert.equal(clock.outputs.at(-1), messages[expected]);
    assert.equal(clock.timer.delay, 60_000);
    clock.cleanup();
    assert.equal(clock.timer, undefined);
    assert.equal(clock.listeners.size, 0);
  }
});

test('returning to a sleeping tab refreshes immediately; away override persists', () => {
  const clock = clockHarness('2026-01-16T06:00:00Z');
  clock.resume('2026-01-17T23:00:00Z');
  assert.equal(clock.outputs.at(-1), messages[5]);
  clock.cleanup();
  const away = clockHarness('2026-01-16T06:59:59Z', 'Back on Monday.');
  away.advance();
  assert.equal(away.outputs.at(-1), 'Back on Monday.');
  away.cleanup();
});

test('date-dependent estimate is calculated only after mount, avoiding hydration mismatch', () => {
  const component = readFileSync(new URL('../src/components/ContactReplyEstimate.tsx', import.meta.url), 'utf8');
  assert.match(component, /useEffect\(\(\) => watchContactReplyTiming/);
  assert.match(component, /awayMessage\?\.trim\(\) \|\| 'I’ll reply as quickly as I can.'/);
  assert.doesNotMatch(component, /useState\([^;]*getContactReplyTiming/);
});
