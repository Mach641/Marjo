const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
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
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  for (const width of [320, 390, 430]) {
    const context = await browser.newContext({ viewport: { width, height: 844 }, serviceWorkers: 'block' });
    const page = await context.newPage();
    await page.goto(`${origin}/?debug=1&display=pwa#welcome`);
    await page.evaluate(({key}) => localStorage.setItem(key, JSON.stringify({ version: 4, started: true, onboardingCompleted: true, currentStep: 'password', illustrations: {4:true}, finalStage: 'password' })), {key});
    await page.reload();
    await page.getByRole('heading',{name:'Le voyage touche à sa fin…'}).waitFor();
    assert.equal(await page.locator('.finale-password__boxes input').count(), 8);
    assert.equal(await page.evaluate(() => document.documentElement.scrollHeight <= innerHeight + 1), true, `password overflow at ${width}px`);
    await page.evaluate(() => { location.hash = 'final-handover'; });
    await page.waitForFunction(() => location.hash === '#password');
    assert.equal(await page.locator('.final-box-handover__illustration').count(), 0);
    for (const [index, letter] of [...'MYMPVTME'].entries()) await page.locator('.finale-password__boxes input').nth(index).fill(letter.toLowerCase());
    await page.locator('[data-action="unlock"]').click();
    await page.locator('.final-box-handover__illustration').waitFor();
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true, `box overflow at ${width}px`);
    await context.close();
  }
  console.log('Finale layout 320/390/430px, password guard and box asset: OK');
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(async () => { await browser?.close(); server.close(); });
