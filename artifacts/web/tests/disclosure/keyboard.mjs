import { expect } from '@playwright/test';

// Protocol acknowledgements alone are not evidence of delivered input. Observe
// trusted DOM keydown AND keyup events, as well as focus/native default actions.
export async function observeKeyboard(page) {
  await page.evaluate(() => {
    window.__disclosureKeys = [];
    for (const type of ['keydown', 'keyup']) {
      document.addEventListener(type, event => {
        window.__disclosureKeys.push({
          type: event.type,
          key: event.key,
          trusted: event.isTrusted,
          target: event.target.tagName,
          notice: !!event.target.closest('#ai-cloning-notice'),
        });
      }, true);
    }
  });
}

export async function pressDelivered(page, key, { notice = false } = {}) {
  const offset = await page.evaluate(() => window.__disclosureKeys.length);
  await page.keyboard.press(key);
  const domKey = key === 'Space' ? ' ' : key;
  await expect.poll(async () => page.evaluate(({ offset, domKey, notice }) => {
    const events = window.__disclosureKeys.slice(offset);
    return ['keydown', 'keyup'].every(type => events.some(event =>
      event.type === type && event.key === domKey && event.trusted &&
      (!notice || event.notice),
    ));
  }, { offset, domKey, notice }), {
    message: `Input delivery failed: no trusted ${key} keydown/keyup reached ${notice ? 'the AI notice' : 'the page'}. Do not replace keyboard input with DOM click/dispatchEvent.`,
  }).toBe(true);
}

// Disabled page scripting also disables DOM event listeners. In that mode the
// native effect is the delivery receipt; a protocol acknowledgement never is.
export async function pressWithoutScripts(page, key, verifyNativeEffect) {
  await page.keyboard.press(key);
  await verifyNativeEffect();
}

export async function tabToSummary(page, { withoutScripts = false } = {}) {
  const summary = page.locator('#ai-cloning-notice summary');
  // Use the real preceding focus stop, not summary.focus(), to test Tab entry
  // without coupling the suite to every link elsewhere on the homepage.
  await summary.evaluate(element => {
    const stops = [...document.querySelectorAll('a[href], button, input, select, textarea, summary, [tabindex]')]
      .filter(node => node.tabIndex >= 0 && !node.disabled && node.getClientRects().length &&
        getComputedStyle(node).visibility !== 'hidden');
    const previous = stops[stops.indexOf(element) - 1];
    if (!previous) throw new Error('No preceding keyboard focus stop');
    previous.focus({ preventScroll: true });
  });
  if (withoutScripts) {
    await pressWithoutScripts(page, 'Tab', () => expect(summary).toBeFocused());
  } else {
    await pressDelivered(page, 'Tab');
  }
  await expect(summary).toBeFocused();
  await expect(summary).toBeInViewport();
  return summary;
}
