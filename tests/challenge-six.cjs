const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const root = process.env.APP_ROOT || path.resolve(__dirname, '..');
const key = 'voyage-majorque-v1-debug';
const server = http.createServer((req, res) => {
  const file = path.join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/^\//, '') || 'index.html');
  try {
    res.setHeader('Content-Type', file.endsWith('.js') ? 'text/javascript' : file.endsWith('.css') ? 'text/css' : file.endsWith('.html') ? 'text/html' : 'application/octet-stream');
    res.end(fs.readFileSync(file));
  } catch { res.writeHead(404); res.end(); }
});
let browser;
(async () => {
  const { DEBATE_QUESTIONS } = await import(pathToFileURL(path.join(root, 'challenge-six.js')).href);
  assert.equal(DEBATE_QUESTIONS.length, 14);
  assert.deepEqual(DEBATE_QUESTIONS.map(question => question.recipient), ['Maman','Papa','Maman','Papa','Papa','Maman','Maman','Maman','Papa','Papa','Maman','Papa','Maman','Papa']);
  assert.deepEqual(DEBATE_QUESTIONS.map(question => question.minutes), [1,1,2,1,2,2,2,2,1,1,1,2,2,1]);
  assert.deepEqual(DEBATE_QUESTIONS.reduce((counts, question) => ({ ...counts, [question.presenter]: (counts[question.presenter] || 0) + 1 }), {}), { Lenny: 7, Milan: 7 });

  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${origin}/?debug=1&display=pwa`);
  const preset = async value => {
    await page.locator('#debugStep').evaluate((element, selected) => { element.value = selected; }, value);
    await page.locator('#debugGo').evaluate(element => element.click());
  };
  const progress = () => page.evaluate(storageKey => JSON.parse(localStorage.getItem(storageKey)).answers['chapter-6'], key);

  await preset('gameplay:6');
  await page.evaluate(storageKey => {
    const stored = JSON.parse(localStorage.getItem(storageKey));
    stored.answers['chapter-6'] = { answers: ['Magie'], phase: 'question', revealed: true };
    localStorage.setItem(storageKey, JSON.stringify(stored));
  }, key);
  await page.reload();
  await page.locator('[data-six-start]').waitFor();
  assert.deepEqual(await progress(), { phase: 'intro', questionIndex: 0, notes: [], endAt: null, selectedScore: null });

  for (const width of [320, 390, 430]) {
    await page.setViewportSize({ width, height: 844 });
    await preset('d6-read-1:6');
    const layout = await page.locator('.challenge-six').evaluate(element => ({
      overflow: element.scrollWidth - element.clientWidth,
      buttonHeight: element.querySelector('[data-six-launch]').getBoundingClientRect().height,
    }));
    assert.ok(layout.overflow <= 1);
    assert.ok(layout.buttonHeight >= 44);
  }

  await preset('d6-read-1:6');
  assert.equal(await page.locator('.challenge-six__timer').count(), 0);
  assert.equal(await page.getByText('1 minute pour convaincre', { exact: true }).count(), 1);
  const startedAt = Date.now();
  await page.locator('[data-six-launch]').click();
  assert.match(await page.locator('.challenge-six__timer').textContent(), /^1:00|0:59$/);
  assert.ok((await progress()).endAt - startedAt >= 59000);
  await page.reload();
  assert.equal((await progress()).phase, 'timer');
  assert.match(await page.locator('.challenge-six__timer').textContent(), /^(1:00|0:5[789])$/);
  await page.locator('[data-six-finished]').click();
  assert.equal((await progress()).phase, 'rating');
  assert.match(await page.locator('.gameplay-header h1').textContent(), /Vincent, Marjolaine/);
  await page.locator('[data-six-score="10"]').click();
  await page.reload();
  assert.equal((await progress()).selectedScore, 10);
  await page.locator('[data-six-rate]').click();
  assert.equal((await progress()).questionIndex, 1);

  await preset('d6-read-2:6');
  assert.equal(await page.getByText('2 minutes pour convaincre', { exact: true }).count(), 1);
  await page.locator('[data-six-launch]').click();
  assert.match(await page.locator('.challenge-six__timer').textContent(), /^2:00|1:59$/);

  await preset('d6-expiring:6');
  await page.locator('.challenge-six--rating').waitFor({ timeout: 4000 });
  assert.equal((await progress()).phase, 'rating');

  await preset('d6-rating-marjolaine:6');
  assert.match(await page.locator('.gameplay-header h1').textContent(), /Marjolaine, Vincent/);

  await preset('d6-last:6');
  await page.locator('[data-six-launch]').click();
  await page.locator('[data-six-finished]').click();
  await page.locator('[data-six-score="7"]').click();
  await page.locator('[data-six-rate]').click();
  await page.locator('[data-conclusion="6"]').waitFor();
  await page.locator('[data-action="finish-conclusion"]').click();
  await page.locator('.journey-notebook--scrapbook').waitFor();
  assert.equal(await page.locator('[data-chapter="6"][data-scrapbook-action="gallery"]').count(), 1);
  assert.equal(await page.locator('[data-chapter="7"]').count(), 0);
  await page.locator('[data-chapter="6"]').click();
  await page.locator('.d1-portrait-gallery').waitFor();
  assert.equal(await page.getByText('PLACEHOLDER — MAISON FAMILIALE', { exact: true }).count(), 1);
  await page.waitForTimeout(3100);
  await page.locator('.d1-portrait-gallery__close').click();
  await page.locator('[data-action="have-it"]').click();
  await page.locator('.journey-notebook--scrapbook').waitFor();
  assert.equal(await page.locator('[data-chapter="7"][data-scrapbook-action="continue"]').count(), 1);
  assert.deepEqual(errors, []);
  console.log('D6 debate, timers, reload, ratings, conclusion, gallery, handover and D7 reveal: OK');
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(async () => { await browser?.close(); server.close(); });
