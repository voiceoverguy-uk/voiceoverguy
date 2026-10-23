import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

const source = readFileSync(new URL('../src/lib/contactReplyTiming.ts', import.meta.url), 'utf8');
const exports = {};
vm.runInNewContext(ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText, { exports });

const cases = [
  [0, 0, 'More than likely this morning.'],
  [6, 59, 'More than likely this morning.'],
  [7, 0, 'More than likely very shortly.'],
  [10, 59, 'More than likely very shortly.'],
  [11, 0, 'Usually within the next couple of hours.'],
  [12, 0, 'Usually within the next couple of hours.'],
  [12, 1, 'Most likely this afternoon.'],
  [15, 59, 'Most likely this afternoon.'],
  [16, 0, ''],
  [16, 59, ''],
  [17, 0, 'Yes, even this evening normally.'],
  [22, 0, 'Yes, even this evening normally.'],
  [22, 1, 'Mind you it will probably be tomorrow now.'],
  [23, 59, 'Mind you it will probably be tomorrow now.'],
];

for (const [hour, minute, expected] of cases) {
  test(`visitor local time ${hour}:${String(minute).padStart(2, '0')}`, () => {
    assert.equal(exports.getContactReplyTiming(new Date(2026, 9, 23, hour, minute)), expected);
  });
}

test('reply timing starts empty and updates only after mount, with cleanup', () => {
  const component = readFileSync(new URL('../src/components/HomepageContact.tsx', import.meta.url), 'utf8');
  assert.match(component, /\[replyTiming, setReplyTiming\] = useState\(''\)/);
  assert.match(component, /useEffect\(\(\) => \{\s*const update = \(\) => setReplyTiming/);
  assert.match(component, /window\.clearInterval\(timer\)/);
});
