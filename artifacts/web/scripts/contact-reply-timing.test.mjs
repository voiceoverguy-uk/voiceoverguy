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
const { getContactReplyTiming, getNextUkOpening } = exports;
const withinHour = 'Usually within an hour.';
const soon = 'Within the next hour — from 7am UK time.';
const around = duration => `Around ${duration} — from 7am UK time.`;
const timing = (instant, zone = 'Europe/London', away = null) =>
  getContactReplyTiming(new Date(instant), away, zone);

for (const [season, midnightUTC, offset] of [
  ['GMT', '2026-01-16T00:00:00Z', 0],
  ['BST', '2026-07-17T00:00:00Z', 60],
]) {
  test(`${season}: 06:59, 07:00, 22:59, 23:00 and midnight`, () => {
    for (const [minutes, expected] of [
      [0, around('7 hours')], [6 * 60 + 59, soon], [7 * 60, withinHour],
      [22 * 60 + 59, withinHour], [23 * 60, around('8 hours')],
    ]) {
      const instant = new Date(Date.parse(midnightUTC) + (minutes - offset) * 60_000);
      const result = getContactReplyTiming(instant);
      assert.equal(result.estimate, expected, `${season} UK minute ${minutes}`);
      assert.equal(result.localHint, null);
    }
  });
}

test('rounds shorter overnight waits to half-hours and longer waits to hours', () => {
  for (const [instant, expected] of [
    ['2026-01-17T02:00:00Z', around('5 hours')],
    ['2026-01-17T02:10:00Z', around('5 hours')],
    ['2026-01-17T01:15:00Z', around('6 hours')],
    ['2026-01-17T04:40:00Z', around('2 hours 30 minutes')],
    ['2026-01-17T05:20:00Z', around('1 hour 30 minutes')],
    ['2026-01-17T05:59:00Z', around('1 hour')],
    ['2026-01-17T06:00:00Z', soon],
    ['2026-01-17T06:59:59Z', soon],
  ]) assert.equal(timing(instant).estimate, expected, instant);
});

test('imminent UK autumn clock change uses nine actual hours, not eight', () => {
  const before = new Date('2026-10-24T22:00:00Z'); // 23:00 BST
  const opening = getNextUkOpening(before);
  assert.equal(opening.toISOString(), '2026-10-25T07:00:00.000Z'); // 07:00 GMT
  assert.equal((opening - before) / 3600_000, 9);
  assert.equal(getContactReplyTiming(before).estimate, around('9 hours'));
  assert.equal(timing('2026-10-24T23:00:00Z').estimate, around('8 hours')); // UK midnight
  // Two different real instants share the repeated 01:30 on the UK clock.
  assert.equal(timing('2026-10-25T00:30:00Z').estimate, around('7 hours'));
  assert.equal(timing('2026-10-25T01:30:00Z').estimate, around('6 hours'));
});

test('UK spring clock change uses seven actual hours, not eight', () => {
  for (const [night, nextOpening] of [
    ['2026-03-28T23:00:00Z', '2026-03-29T06:00:00.000Z'],
    ['2027-03-27T23:00:00Z', '2027-03-28T06:00:00.000Z'],
  ]) {
    const before = new Date(night);
    const opening = getNextUkOpening(before);
    assert.equal(opening.toISOString(), nextOpening);
    assert.equal((opening - before) / 3600_000, 7);
    assert.equal(getContactReplyTiming(before).estimate, around('7 hours'));
  }
  assert.equal(timing('2026-03-29T00:00:00Z').estimate, around('6 hours')); // UK midnight
});

test('Los Angeles, Dubai and UK share the same duration with accurate local dates', () => {
  for (const [instant, expectedWait, la, dubai] of [
    ['2026-07-17T22:00:00Z', '8 hours', '11pm your time today.', '10am your time today.'],
    ['2026-10-24T22:00:00Z', '9 hours', '12am your time tomorrow.', '11am your time today.'],
    ['2026-12-17T23:00:00Z', '8 hours', '11pm your time today.', '11am your time today.'],
  ]) {
    const uk = timing(instant);
    const losAngeles = timing(instant, 'America/Los_Angeles');
    const dubaiResult = timing(instant, 'Asia/Dubai');
    assert.equal(uk.estimate, around(expectedWait));
    assert.equal(losAngeles.estimate, uk.estimate);
    assert.equal(dubaiResult.estimate, uk.estimate);
    assert.equal(uk.localHint, null);
    assert.equal(losAngeles.localHint, `That’s ${la}`);
    assert.equal(dubaiResult.localHint, `That’s ${dubai}`);
  }
});

test('visitor DST changes and fractional-hour zones use the opening instant', () => {
  assert.equal(timing('2026-10-31T23:00:00Z', 'America/Los_Angeles').localHint,
    'That’s 12am your time tomorrow.');
  assert.equal(timing('2026-11-01T23:00:00Z', 'America/Los_Angeles').localHint,
    'That’s 11pm your time today.');
  assert.equal(timing('2026-03-06T23:00:00Z', 'America/Los_Angeles').localHint,
    'That’s 11pm your time today.');
  assert.equal(timing('2026-03-08T23:00:00Z', 'America/Los_Angeles').localHint,
    'That’s 12am your time tomorrow.');
  assert.equal(timing('2026-07-17T22:00:00Z', 'Asia/Kathmandu').localHint,
    'That’s 11:45am your time today.');
});

test('year and local-date boundaries remain unambiguous', () => {
  assert.equal(getNextUkOpening(new Date('2026-12-31T23:00:00Z')).toISOString(),
    '2027-01-01T07:00:00.000Z');
  assert.equal(timing('2026-12-31T23:00:00Z', 'America/Los_Angeles').localHint,
    'That’s 11pm your time today.');
  assert.equal(timing('2026-12-31T23:00:00Z', 'Asia/Dubai').localHint,
    'That’s 11am your time today.');
});

test('open hours have no opening hint; UK timezone aliases do not get a hint', () => {
  for (const zone of ['Europe/London', 'America/Los_Angeles', 'Asia/Dubai']) {
    const result = timing('2026-10-23T12:00:00Z', zone);
    assert.equal(result.estimate, withinHour);
    assert.equal(result.localHint, null);
  }
  assert.equal(timing('2026-01-17T00:00:00Z', 'GB').localHint, null);
});

test('browser timezone never changes the underlying UK estimate', () => {
  const original = process.env.TZ;
  try {
    for (const zone of ['America/Los_Angeles', 'Asia/Dubai', 'Europe/London']) {
      process.env.TZ = zone;
      assert.equal(timing('2026-10-24T22:00:00Z', zone).estimate, around('9 hours'));
    }
  } finally {
    if (original === undefined) delete process.env.TZ;
    else process.env.TZ = original;
  }
});

test('weekends have the same 07:00–23:00 availability', () => {
  for (const day of ['2026-01-16', '2026-01-17', '2026-01-18']) {
    for (let minute = 0; minute < 1440; minute++) {
      const date = new Date(Date.parse(`${day}T00:00:00Z`) + minute * 60_000);
      const result = getContactReplyTiming(date);
      assert.equal(result.estimate === withinHour, minute >= 7 * 60 && minute < 23 * 60);
      assert.ok(result.estimate.length > 0);
    }
  }
});

test('away override takes precedence over durations and suppresses local hints', () => {
  for (const instant of ['2026-10-24T22:00:00Z', '2026-10-25T12:00:00Z']) {
    const result = timing(instant, 'America/Los_Angeles', '  Back on Monday.  ');
    assert.equal(result.estimate, 'Back on Monday.');
    assert.equal(result.localHint, null);
  }
  for (const setting of [null, undefined, '', '   ']) {
    assert.equal(timing('2026-01-17T02:00:00Z', 'Europe/London', setting).estimate, around('5 hours'));
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
  const cleanup = loaded.watchContactReplyTiming(timing => outputs.push(timing), awayMessage);
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

test('an open page updates at 07:00, 23:00 and midnight, then cleans up', () => {
  for (const [hour, expected] of [[7, withinHour], [23, around('8 hours')], [24, around('7 hours')]]) {
    const boundary = Date.parse('2026-01-16T00:00:00Z') + hour * 3600_000;
    const clock = clockHarness(new Date(boundary - 1000).toISOString());
    assert.equal(clock.timer.delay, 1000);
    clock.advance();
    assert.equal(clock.outputs.at(-1).estimate, expected);
    assert.equal(clock.timer.delay, 60_000);
    clock.cleanup();
    assert.equal(clock.timer, undefined);
    assert.equal(clock.listeners.size, 0);
  }
});

test('returning to a sleeping tab recalculates the wait; away override persists', () => {
  const clock = clockHarness('2026-10-24T22:00:00Z');
  assert.equal(clock.outputs.at(-1).estimate, around('9 hours'));
  clock.resume('2026-10-25T02:00:00Z');
  assert.equal(clock.outputs.at(-1).estimate, around('5 hours'));
  clock.resume('2026-10-25T07:00:00Z');
  assert.equal(clock.outputs.at(-1).estimate, withinHour);
  clock.cleanup();
  const away = clockHarness('2026-01-16T06:59:59Z', 'Back on Monday.');
  away.advance();
  assert.equal(away.outputs.at(-1).estimate, 'Back on Monday.');
  assert.equal(away.outputs.at(-1).localHint, null);
  away.cleanup();
});

test('initial component markup is clock-neutral; browser clock is read after mount', () => {
  const component = readFileSync(new URL('../src/components/ContactReplyEstimate.tsx', import.meta.url), 'utf8');
  assert.match(component, /useEffect\(\(\) => watchContactReplyTiming/);
  assert.match(component, /awayMessage\?\.trim\(\) \|\| 'I’ll reply as quickly as I can.'/);
  assert.doesNotMatch(component, /useState[^;]*getContactReplyTiming/);
});
