import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: true,
  executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader', '--no-sandbox']
});
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const pause = (ms = 150) => new Promise((r) => setTimeout(r, ms));
const click = async (selector) => { await page.$eval(selector, (el) => el.click()); await pause(); };
const text = (selector) => page.$eval(selector, (el) => el.textContent);
const dispatch = async (id) => { await page.evaluate((detail) => window.dispatchEvent(new CustomEvent('tt:calendar', { detail })), id); await pause(300); };
const date = async (iso) => {
  await page.$eval('.tt-cal-scrub input', (el, t) => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(el, t);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }, Date.parse(iso));
  await pause();
};
try {
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${process.env.CALENDAR_URL || 'http://127.0.0.1:5174/'}#/tech-talks`, { waitUntil: 'networkidle2', timeout: 60000 });
  await page.waitForSelector('#tt-calendar');
  await dispatch('talk-2026-01');
  assert.match(await text('.tt-cal-chip.is-selected'), /JAN 22/);
  assert.match(await text('.tt-cal-card-title'), /Rice/);
  assert.equal(await page.evaluate(() => document.activeElement?.classList.contains('tt-cal-card')), true);
  await page.focus('.tt-cal-skip'); await page.keyboard.press('Enter'); await pause();
  assert.equal(await page.evaluate(() => document.activeElement?.classList.contains('tt-cal-card')), true);
  assert.equal(await page.evaluate(() => location.hash), '#/tech-talks');
  await page.$eval('.tt-cal-stage', (el) => el.scrollIntoView());
  await page.waitForSelector('.tt-cal-stage.is-live', { timeout: 30000 });
  await page.waitForFunction(() => document.querySelector('.tt-cal-view')?.textContent.includes('Orbit view'));
  await click('.tt-cal-years button:last-child');
  assert.match(await text('.tt-cal-chip.is-selected'), /JAN 22/);
  await dispatch('talk-2025-03');
  assert.match(await text('.tt-cal-card-title'), /Neuro-Ocular/);
  await dispatch('talk-2026-01');
  assert.match(await text('.tt-cal-card-title'), /Rice/);
  console.log('PASS: same-year and cross-year card selection, repeated selection, focus transfer and deferred camera focus.');

  await date('2026-01-31T18:00Z');
  await click('button[aria-label="Next month"]');
  assert.match(await text('.tt-cal-month-name'), /February 2026/);
  assert.match(await text('.tt-cal-hud-date'), /Feb 28/);
  await date('2026-12-31T23:00Z');
  await click('.tt-cal-day[aria-label="December 31"]');
  assert.equal(await text('.tt-cal-years button[aria-pressed="true"]'), '2026');
  assert.ok(await page.$$eval('.tt-cal-day-glyphs i', (els) => els.length) > 0);
  await click('.tt-cal-years button:first-child');
  await date('2023-01-01T06:00Z');
  await click('button[aria-label="Previous month"]');
  assert.match(await text('.tt-cal-month-name'), /January 2023/);
  console.log('PASS: Jan 31 to February, Houston Dec 31 year boundary and minimum date.');

  await dispatch('talk-2026-08');
  await click('.tt-cal-event-list summary');
  const eclipseButton = await page.$('.tt-cal-event-list button:has(.is-lunar-eclipse)');
  assert.ok(eclipseButton);
  await eclipseButton.focus(); await page.keyboard.press('Enter'); await pause();
  assert.match(await text('.tt-cal-card-title'), /Partial lunar eclipse/);
  assert.match(await text('.tt-cal-card-kicker'), /Greatest eclipse worldwide/);
  console.log('PASS: keyboard selects eclipse sharing the August 27 talk date.');

  await date('2027-01-01T05:00Z');
  await click('button[aria-label="Play"]');
  await pause(200);
  assert.ok(await page.$('button[aria-label="Pause"]'));
  await click('button[aria-label="Pause"]');
  assert.match(await text('.tt-cal-month-name'), /January 2026/);

  for (const width of [1440, 390, 320]) {
    await page.setViewport({ width, height: width === 1440 ? 900 : 844 });
    await page.$eval('.tt-cal-stage', (el) => el.scrollIntoView()); await pause(1000);
    const bounds = await page.evaluate(() => {
      const stage = document.querySelector('.tt-cal-stage').getBoundingClientRect();
      const buttons = [...document.querySelectorAll('.tt-cal-controls button')];
      return { overflow: document.documentElement.scrollWidth > innerWidth, clipped: buttons.some((el) => {
        const r = el.getBoundingClientRect(); return r.left < stage.left - 1 || r.right > stage.right + 1;
      }) };
    });
    assert.equal(bounds.clipped, false, `clipped controls at ${width}`);
    assert.equal(bounds.overflow, false, `page overflow at ${width}`);
    if (process.env.CALENDAR_SCREENSHOTS) await page.screenshot({ path: `${process.env.CALENDAR_SCREENSHOTS}/calendar-${width}.png` });
  }
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await pause(500);
  await dispatch('talk-2026-09');
  assert.match(await text('.tt-cal-card-title'), /Navigation/);
  assert.deepEqual(errors, []);
  console.log('PASS: playback restart, desktop/390px/320px layout, reduced motion, zero runtime errors.');
} finally { await browser.close(); }
