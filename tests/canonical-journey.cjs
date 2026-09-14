// Run with Playwright installed (or PLAYWRIGHT_MODULE set to its module path).
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = process.env.APP_ROOT || path.resolve(__dirname, '..');
const order = [1, 2, 3, 5, 6, 7, 8, 4];
const targets = {2:"2026-09-18T12:00:00",5:"2026-09-19T08:00:00",7:"2026-09-19T18:00:00"};
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
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const go = async route => { await page.goto(`${origin}/?debug=1&display=pwa#${route}`); };
  const read = () => page.evaluate(key => JSON.parse(localStorage.getItem(key)), key);
  const hideDebug = () => page.addStyleTag({ content: '#debugPanel{display:none!important}' });
  const seed = async (route, value = {}) => {
    await go('welcome');
    await page.evaluate(({key, route, value}) => localStorage.setItem(key, JSON.stringify({ version: 4, started: true, onboardingCompleted: true, currentStep: route, ...value })), {key, route, value});
    await go(route); await page.reload(); await hideDebug();
  };
  const cards = () => page.locator('.scrapbook-polaroid').evaluateAll(nodes => nodes.map(node => ({id: +node.dataset.chapter, face: node.dataset.scrapbookAction === 'gallery', flip: node.classList.contains('scrapbook-polaroid--reveal')})));
  const assertHub = async (faces, next, flip = null) => {
    await page.locator('.journey-notebook--scrapbook').waitFor();
    assert.match(page.url(), /#book-open$/);
    assert.deepEqual(await cards(), [...faces.map(id => ({id, face:true, flip:id===flip})), ...(next ? [{id:next, face:false, flip:false}] : [])]);
    assert.equal(await page.locator('.closed-notebook,.open-notebook').count(), 0);
  };
  const consume = async id => {
    await page.locator(`[data-chapter="${id}"]`).click();
    if (id === 1) {
      await page.locator('.d1-portrait-gallery__track').evaluate(e => e.scrollLeft=e.scrollWidth);
      await page.locator('.d1-portrait-gallery__close').click();
    } else if ([8,2,3,5].includes(id)) {
      if (id===2) { await page.getByRole('heading',{name:'Votre profil de couple',exact:true}).waitFor(); await page.locator('[data-action="continue"]').click(); }
      await page.locator('.orientation-screen [data-action="continue"]').click();
      await page.locator('.time-travel').click();
      await page.locator('.landscape-viewer__track').evaluate(element => { element.scrollLeft = element.scrollWidth; });
      await page.locator('.landscape-viewer__close').click();
    } else if (id === 6) {
      await page.locator('.d1-portrait-gallery__close').click();
    } else if (id === 7) {
      assert.equal(await page.locator('.landscape-viewer,.orientation-screen').count(), 0);
      await page.locator('[data-action="continue"]').click();
    }
    await page.locator('[data-action="have-it"]').click();
  };
  const setTime = async localTime => {
    await page.locator('#debugNow').evaluate((e,v)=>e.value=v,localTime);
    await page.locator('#debugApplyTime').evaluate(e=>e.click());
  };
  const finishPause = async (id, faces, next) => {
    if (!targets[id]) return assertHub(faces,next);
    await page.locator('[data-pause-status="PAUSED"]').waitFor();
    assert.equal(await page.locator('[data-chapter]').count(),0);
    const before=await read();
    await page.reload(); await hideDebug();
    await page.locator('[data-pause-status="PAUSED"]').waitFor();
    await setTime(targets[id]);
    await page.locator('[data-pause-status="READY_TO_RESUME"]').waitFor();
    await page.reload(); await hideDebug();
    await page.locator('[data-pause-status="READY_TO_RESUME"]').waitFor();
    assert.deepEqual((await read()).illustrations,before.illustrations);
    await page.locator('[data-action="resume-chapter"]').click();
    await assertHub(faces,next);
    await page.reload(); await hideDebug(); await assertHub(faces,next);
  };
  // Conclusion presets persist; reveal presets never simulate handover completion.
  for (let i=0;i<order.length;i++) {
    const id=order[i];
    await seed('welcome');
    await page.locator('#debugPanel').evaluate(e=>e.style.setProperty('display','block','important'));
    await page.locator('#debugPanel details').evaluate(e=>e.open=true);
    await page.locator('#debugStep').selectOption(`${id===4?'reveal':'conclusion'}:${id}`);
    await page.locator('#debugGo').click(); await hideDebug();
    if(id!==4) {
      await page.locator(`[data-conclusion="${id}"]`).waitFor();
      assert.equal((await read()).revealedMemories[id],undefined);
      await page.reload(); await hideDebug();
      await page.locator(`[data-conclusion="${id}"]`).waitFor();
      await page.locator('[data-action="finish-conclusion"]').click();
    }
    await assertHub(order.slice(0,i+1), null, id);
    await page.reload(); await hideDebug(); await assertHub(order.slice(0,i+1),null);
    await consume(id);
    await finishPause(id,order.slice(0,i+1),order[i+1]);
    await page.reload(); await hideDebug(); await assertHub(order.slice(0,i+1),order[i+1]);
    console.log(`D${id} preset: persisted conclusion, one flip, handover, pause/resume, next ${order[i+1]||'none'} OK`);
  }
  // One uninterrupted progression: actual gameplay callbacks, not resolution aliases.
  await seed('book-open'); await assertHub([],1);
  for (let i=0;i<order.length;i++) {
    const id=order[i];
    await page.locator(`[data-chapter="${id}"]`).click();
    if (id===1) {
      await page.locator('[data-action="notebook-start"]').click();
      await page.locator('[data-rules-action="discover"]').click();
      for (let rule=1;rule<=6;rule++) {
        await page.locator(`[data-rule-id="${rule}"]`).click();
        for (const action of ['know','found','continue']) await page.locator(`[data-rules-action="${action}"]`).click();
      }
      await page.locator('[data-rules-action="enter"]').click();
    } else if (id===8) {
      await page.locator('[data-action="start-blind-test"]').click();
      for(let song=0;song<7;song++) { await page.locator('[data-action="reveal-song"]').click(); if(song<6) await page.locator('[data-action="next-song"]').click(); }
      await page.getByText('Il y a des chansons qu’on reconnaît en quelques secondes.').waitFor();

    } else if (id===2) {
      await page.locator('[data-action="start-couple-profile"]').click();
      for(let answer=0;answer<40;answer++) { await page.locator('[data-profile]').first().click(); await page.waitForTimeout(400); }
    } else if (id===3) {
      await page.locator('[data-action="start-challenge-three"]').click();
      for(let photo=0;photo<3;photo++) { await page.locator('[data-baby-choice]').first().click(); await page.locator('[data-action="next-baby-photo"]').click(); }
    } else if (id===5) {
      await page.locator('[data-trip-next]').click();
      for(let step=0;step<5;step++) { await page.locator('[data-trip-choice]').first().click(); await page.locator('[data-trip-next]').click(); }
      await page.locator('[data-trip-next]').click();
    } else if (id===6) {
      await page.locator('[data-six-start]').click();
      for(let question=0;question<14;question++) {
        await page.locator('[data-six-launch]').click();
        await page.locator('[data-six-finished]').click();
        await page.locator('[data-six-score="5"]').click();
        await page.locator('[data-six-rate]').click();
      }
    } else if (id===7) {
      // Deterministic apple positions and clock; exercise the real game/win callback.
      const targets=[[5,5],[6,5],[7,5],[8,5],[9,5],[9,4],[8,4],[7,4],[6,4],[5,4]];
      const body=[[4,5],[3,5],[2,5]],randoms=[];
      for(const target of targets) {
        const free=[];
        for(let y=0;y<10;y++)for(let x=0;x<10;x++)if(!body.some(([bx,by])=>bx===x&&by===y))free.push([x,y]);
        randoms.push((free.findIndex(([x,y])=>x===target[0]&&y===target[1])+.1)/free.length);
        body.unshift(target);
      }
      await page.evaluate(randoms=>{
        const interval=window.setInterval;
        window.setInterval=(fn,ms,...args)=>ms===300 ? (window.snakeTick=fn, -123) : interval(fn,ms,...args);
        Math.random=()=>randoms.shift()??0;
      },randoms);
      await page.locator('[data-action="play-snake"]').click();
      for(const direction of ['right','right','right','right','right','up','left','left','left','left']) {
        await page.locator(`[data-direction="${direction}"]`).click();
        await page.evaluate(()=>window.snakeTick());
      }
    } else {
      await page.locator('.time-travel').click();
      await page.getByText('Marche jusqu’au banc.',{exact:true}).waitFor();
      await page.locator('[data-action="complete-majorca"]').click();
    }
    if(id!==4) {
      await page.locator(`[data-conclusion="${id}"]`).waitFor();
      await page.locator('[data-action="finish-conclusion"]').click();
    }
    await assertHub(order.slice(0,i+1), null, id);
    // Finish the existing animation before interactions; inspect a single flip.
    await page.locator('.scrapbook-polaroid--reveal').evaluate(e=>e.getAnimations().forEach(a=>a.finish()));
    await consume(id);
    await finishPause(id,order.slice(0,i+1), order[i+1]);
    const state=await read();
    assert.deepEqual(Object.keys(state.illustrations).map(Number).sort(),order.slice(0,i+1).sort((a,b)=>a-b));
    console.log(`Real D${id}: complete → reward → souvenir → handover → hub OK`);
  }
  await page.locator('[data-action="notebook-finale"]').click();
  await page.getByRole('heading',{name:'Huit images, un seul fil'}).waitFor();
  await page.locator('[data-action="continue"]').click();
  await page.locator('[data-action="continue"]').click();
  await page.locator('#password').fill('MYMPVTME');
  await page.locator('[data-action="unlock"]').click();
  await page.getByRole('heading',{name:'La boîte',exact:true}).waitFor();
  assert.deepEqual(errors,[]);
  console.log('All eight real flows and shortcuts passed; final sequence retained.');
})().catch(error=>{console.error(error);process.exitCode=1;}).finally(async()=>{await browser?.close();server.close();});
