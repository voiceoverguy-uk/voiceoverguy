import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

const source = readFileSync(new URL('../src/lib/replyEstimateExplanation.ts', import.meta.url), 'utf8');
const exports = {};
vm.runInNewContext(ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText, { exports });
const { replyTooltipPosition, REPLY_ESTIMATE_EXPLANATION, AWAY_REPLY_EXPLANATION } = exports;

test('explanation is exact; away copy does not claim normal hours control the override', () => {
  assert.equal(REPLY_ESTIMATE_EXPLANATION, 'This estimate updates automatically using Guy’s usual reply hours of 7am–11pm UK time. Any local times shown use your device’s time zone. It’s a guide, rather than live availability.');
  assert.match(AWAY_REPLY_EXPLANATION, /instead of the normal reply-hours estimate/);
  assert.doesNotMatch(AWAY_REPLY_EXPLANATION, /updates automatically using Guy’s usual reply hours/);
});

test('prefers above the label to leave form fields clear', () => {
  const position = replyTooltipPosition(
    { left: 120, top: 400, bottom: 424 },
    { width: 320, height: 140 },
    { width: 1280, height: 900 },
  );
  assert.equal(position.left, 120);
  assert.equal(position.top, 252);
});

test('uses below when above would cross the top edge', () => {
  const position = replyTooltipPosition(
    { left: 20, top: 65, bottom: 90 },
    { width: 320, height: 140 },
    { width: 390, height: 844 },
  );
  assert.equal(position.top, 98);
});

test('desktop, narrow phones, screen edges and short screens keep the tooltip within bounds', () => {
  for (const viewport of [
    { width: 1280, height: 900 },
    { width: 390, height: 844 },
    { width: 320, height: 568 },
    { width: 280, height: 200 },
  ]) {
    const tooltip = { width: Math.min(320, viewport.width - 24), height: Math.min(160, viewport.height - 24) };
    for (const anchor of [
      { left: 0, top: 0, bottom: 24 },
      { left: viewport.width - 40, top: 60, bottom: 84 },
      { left: 20, top: viewport.height - 24, bottom: viewport.height },
    ]) {
      const position = replyTooltipPosition(anchor, tooltip, viewport);
      assert.ok(position.left >= 12);
      assert.ok(position.top >= 12);
      assert.ok(position.left + tooltip.width <= viewport.width - 12);
      assert.ok(position.top + tooltip.height <= viewport.height - 12);
    }
  }
});
