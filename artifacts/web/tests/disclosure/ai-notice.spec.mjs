import { test, expect } from '@playwright/test';
import { observeKeyboard, pressDelivered, pressWithoutScripts, tabToSummary } from './keyboard.mjs';

const notice = '#ai-cloning-notice details';
const body = '#ai-cloning-notice .ai-cloning-notice__body';
const summaryText = 'AI voice cloning: a note on permission';
const resources = [
  ['ElevenLabs policy', 'https://elevenlabs.io/use-policy'],
  ['UK performers’ rights', 'https://www.gov.uk/government/publications/performers-rights/performers-rights'],
  ['YouTube AI disclosure', 'https://support.google.com/youtube/answer/14328491?hl=en'],
  ['Meta AI disclosure', 'https://about.fb.com/news/2024/02/labeling-ai-generated-images-on-facebook-instagram-and-threads/'],
];

async function load(page, { withoutScripts = false } = {}) {
  await page.goto('/', { waitUntil: 'load' });
  // Test native destinations, not animation timing. The site's smooth-scroll
  // CSS otherwise races subsequent key actions, including without JavaScript.
  await page.evaluate(() => document.documentElement.style.setProperty('scroll-behavior', 'auto', 'important'));
  await expect(page.locator(`${notice} > summary`)).toHaveText(summaryText);
  if (!withoutScripts) await observeKeyboard(page);
}

async function expectClosed(page) {
  await expect(page.locator(notice)).not.toHaveAttribute('open');
  await expect(page.locator(`${body} p`).first()).toBeHidden();
}

async function expectOpen(page) {
  await expect(page.locator(notice)).toHaveAttribute('open', '');
  await expect(page.locator(`${body} p`).first()).toBeVisible();
}

test('Tab reaches the native summary with a visible focus ring; Enter and Space toggle both ways', async ({ page }) => {
  await load(page);
  await expectClosed(page);
  const summary = await tabToSummary(page);
  expect(await summary.evaluate(element => ({
    tag: element.tagName,
    parent: element.parentElement.tagName,
    role: element.getAttribute('role'),
    visibleFocus: element.matches(':focus-visible'),
    outline: getComputedStyle(element).outlineStyle,
    width: parseFloat(getComputedStyle(element).outlineWidth),
  }))).toEqual({
    tag: 'SUMMARY', parent: 'DETAILS', role: null,
    visibleFocus: true, outline: 'solid', width: 2,
  });
  for (const key of ['Enter', 'Space']) {
    await pressDelivered(page, key, { notice: true });
    await expectOpen(page);
    await expect(summary).toBeFocused();
    await pressDelivered(page, key, { notice: true });
    await expectClosed(page);
    await expect(summary).toBeFocused();
  }
});

for (const focus of ['summary', 'inside link', 'outside link']) {
  test(`automatic collapse keeps usable focus (${focus}) and preserves the following section position`, async ({ page }) => {
    await load(page);
    const summary = await tabToSummary(page);
    await pressDelivered(page, 'Enter', { notice: true });
    await expectOpen(page);
    if (focus === 'inside link') {
      await pressDelivered(page, 'Tab', { notice: true });
      await expect(page.locator(`${body} a`).first()).toBeFocused();
    }
    if (focus === 'outside link') {
      await summary.evaluate(element => {
        const next = element.closest('section').nextElementSibling.querySelector('a[href], button');
        if (!next) throw new Error('Following section needs a focusable control');
        next.focus({ preventScroll: true });
        window.__outsideFocus = next;
      });
    }
    // One scroll event per frame, crossing the real fixed-nav threshold.
    // No synthetic toggle events or direct manipulation of details.open.
    await page.evaluate(async () => {
      const details = document.querySelector('#ai-cloning-notice details');
      const following = details.closest('section').nextElementSibling;
      const top = () => Math.max(0, document.querySelector('.navbar--fixed')?.getBoundingClientRect().bottom ?? 0);
      const scroll = async y => {
        window.scrollTo({ top: y, behavior: 'instant' });
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      };
      await scroll(window.scrollY + following.getBoundingClientRect().top - top() - 20);
      if (!details.open) throw new Error('Disclosure collapsed before the following section reached the navigation');
      const target = window.scrollY + following.getBoundingClientRect().top - top() + 2;
      window.__expectedFollowingTop = top() - 2;
      await scroll(target);
    });
    await expectClosed(page);
    expect(await page.evaluate(() => {
      const following = document.querySelector('#ai-cloning-notice').nextElementSibling;
      return Math.abs(following.getBoundingClientRect().top - window.__expectedFollowingTop);
    })).toBeLessThanOrEqual(2);
    if (focus === 'outside link') {
      expect(await page.evaluate(() => document.activeElement === window.__outsideFocus)).toBe(true);
    } else {
      await expect(summary).toBeFocused();
    }
    await pressDelivered(page, 'Tab');
    expect(await page.evaluate(() => {
      const focused = document.activeElement;
      return focused !== document.body && !focused.closest('.ai-cloning-notice__body') &&
        focused.getClientRects().length > 0;
    })).toBe(true);
  });
}

test.describe('JavaScript disabled', () => {
  test.use({ javaScriptEnabled: false });

  test('native opening, server-rendered experience/copy and real anchor navigation work without hydration', async ({ page, context }) => {
    await load(page, { withoutScripts: true });
    // DevTools evaluation is available even with page scripting disabled.
    // Prove ordinary page scripts cannot run, rather than merely blocking .js.
    expect(await page.evaluate(() => {
      const script = document.createElement('script');
      script.textContent = 'window.__pageScriptRan = true';
      document.head.append(script);
      return window.__pageScriptRan === true;
    })).toBe(false);
    await expectClosed(page);
    const summary = await tabToSummary(page, { withoutScripts: true });
    await pressWithoutScripts(page, 'Enter', () => expectOpen(page));
    await expect(summary).toBeFocused();
    const paragraphs = page.locator(`${body} p`);
    await expect(paragraphs).toHaveCount(12);
    await expect(paragraphs.first()).toContainText(`over ${new Date().getFullYear() - 2000} years of experience`);
    for (const text of [
      'My voice is NOT available for unauthorised AI cloning.',
      'Any such use requires my explicit written agreement.',
      'AI generation can leave a trail.',
      'Transparency matters, too.',
      'A genuine business deserves a genuine connection with its audience.',
    ]) await expect(page.locator(body)).toContainText(text);
    expect(await page.locator(body).evaluate(element => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 200 && rect.height > 200 && style.visibility === 'visible' &&
        parseFloat(style.fontSize) >= 14 && parseFloat(style.lineHeight) >= 20;
    })).toBe(true);
    // Tabbing into body proves links are keyboard reachable, not just present.
    const contact = page.locator(`${body} a`).first();
    await pressWithoutScripts(page, 'Tab', () => expect(contact).toBeFocused());
    await pressWithoutScripts(page, 'Enter', () => expect(page).toHaveURL(/#contact$/));
    // Poll geometry directly: observer callbacks are not reliable with page
    // scripting disabled, and native smooth anchor scrolling is asynchronous.
    await expect.poll(async () => {
      const rect = await page.locator('#contact').boundingBox();
      return !!rect && rect.y < page.viewportSize().height && rect.y + rect.height > 0;
    }).toBe(true);
    // With no JS there is no auto-close: manual disclosure remains available.
    await expectOpen(page);
    await tabToSummary(page, { withoutScripts: true });
    await pressWithoutScripts(page, 'Space', () => expectClosed(page));
    await pressWithoutScripts(page, 'Space', () => expectOpen(page));

    // Exercise native navigation without relying on third-party availability
    // or sending external analytics requests. Verify each exact destination.
    for (const [name, href] of resources) {
      const link = page.locator(body).getByRole('link', { name, exact: true });
      await expect(link).toHaveAttribute('href', href);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);
      await expect(link).toHaveAttribute('rel', /noreferrer/);
      await context.route(href, route => route.fulfill({
        contentType: 'text/html', body: '<title>Resource navigation reached</title>',
      }));
      const popupPromise = context.waitForEvent('page');
      await link.click();
      const popup = await popupPromise;
      await popup.waitForLoadState();
      expect(popup.url()).toBe(href);
      // Playwright may track the originating Page even for noopener links.
      // The browser-visible opener is the security contract we need to check.
      expect(await popup.evaluate(() => window.opener === null)).toBe(true);
      await popup.close();
    }
    const terms = page.locator(body).getByRole('link', { name: 'Read my Terms and Conditions' });
    await expect(terms).toHaveAttribute('href', '/voiceover-terms-and-conditions');
    await terms.click();
    await expect(page).toHaveURL(/\/voiceover-terms-and-conditions\/?$/);
    await expect(page.locator('h1')).toContainText(/Terms/i);
  });
});
