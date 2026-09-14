// Run with PLAYWRIGHT_MODULE and CHROME_PATH when Playwright/Chrome are not on PATH.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = process.env.APP_ROOT || path.resolve(__dirname, '..');
const server = http.createServer((req,res) => {
 const file=path.join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\//,'')||'index.html');
 try { res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.html')?'text/html':'application/octet-stream');res.end(fs.readFileSync(file)); } catch {res.writeHead(404);res.end();}
});
let browser;
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const origin=`http://127.0.0.1:${server.address().port}`;
 browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
 const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
 const page=await context.newPage(), errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin+'/?debug=1&display=pwa');
 await page.addStyleTag({content:'#debugPanel{display:none!important}'});
 const preset=async name=>{await page.locator('#debugStep').evaluate((e,v)=>e.value=v,`road-${name}:5`);await page.locator('#debugGo').evaluate(e=>e.click());};
 const presentation=()=>page.locator('.stockholm-trip').getAttribute('data-trip-presentation');
 for(const [name,expected] of [['question',null],['selected','expanding'],['large','moving'],['moving','moving'],['arrived','arrived'],['transition','map-out'],['illustration','illustration']]) {
  await preset(name); assert.equal(await presentation(),expected);
  assert.equal(await page.locator('.site-header').isVisible(),false);
 }
 // Use the public renderer with its real data/timeline, on all fifteen chosen routes.
 const seed=async(stage,choice)=>{
  await page.evaluate(async({stage,choice})=>{
   window.stopTrip?.();
   const module=await import('./road-trip.js?v=1.4.44');
   window.trip={started:true,choices:Array.from({length:stage},(_,i)=>(i+choice)%3),phase:'choice'};
   window.stopTrip=module.renderRoadTrip(document.querySelector('#app'),window.trip,()=>{},()=>window.tripDone=true);
  },{stage,choice});
 };
 await page.clock.install();
 for(let stage=0;stage<5;stage++) for(let choice=0;choice<3;choice++) {
  await seed(stage,choice);
  const before=await page.locator('.stockholm-map').boundingBox();
  const initial=await page.locator('[data-trip-van]').getAttribute('transform');
  await page.locator(`[data-trip-choice="${choice}"]`).click();
  await page.clock.runFor(600);
  const big=await page.locator('.stockholm-map').boundingBox();
  assert.ok(big.width>before.width*1.7);
  assert.equal(await presentation(),'moving');
  assert.equal(await page.locator('.stockholm-result').isVisible(),false);
  await page.clock.runFor(1400);
  assert.notEqual(await page.locator('[data-trip-van]').getAttribute('transform'),initial);
  await page.clock.runFor(1400);
  assert.equal(await presentation(),'arrived');
  const point=await page.locator('[data-trip-van]').evaluate(el=>[el.transform.baseVal[0].matrix.e,el.transform.baseVal[0].matrix.f]);
  const end=await page.evaluate(async({stage,choice})=>(await import('./road-trip.js?v=1.4.44')).ROAD_STEPS[stage].options[choice].end,{stage,choice});
  assert.ok(point.every((v,i)=>Math.abs(v-end[i])<.02));
  const sameArea=await page.locator('.stockholm-illustration').boundingBox();
  for(const dimension of ['x','y','width','height'])assert.ok(Math.abs(big[dimension]-sameArea[dimension])<1);
  await page.clock.runFor(600);
  assert.equal(await presentation(),'map-out');
  assert.equal(await page.locator('.stockholm-illustration').evaluate(e=>+getComputedStyle(e).opacity),0);
  await page.clock.runFor(400);
  assert.equal(await presentation(),'illustration-in');
  assert.equal(await page.locator('.stockholm-map').isVisible(),false);
  await page.clock.runFor(500);
  assert.equal(await presentation(),'illustration');
  assert.equal(await page.locator('.stockholm-result').isVisible(),true);
  assert.equal(await page.locator('.stockholm-illustration').getAttribute('data-illustration'),`${stage+1}-${choice+1}`);
  assert.equal(await page.evaluate(()=>window.trip.choices.length),stage+1);
  await page.locator('[data-trip-next]').click();
  assert.equal(await page.evaluate(()=>window.trip.phase),stage===4?'final':'choice');
 }
 console.log('15 routes: expansion, movement, arrival, sequential fades, stable shared frame, choices preserved: OK');
 // Cancellation/reentry: only the pending result is restored, never an extra answer.
 await seed(2,1);await page.locator('[data-trip-choice="1"]').click();await page.clock.runFor(1200);
 await page.evaluate(async()=>{window.stopTrip();window.stopTrip=(await import('./road-trip.js?v=1.4.44')).renderRoadTrip(document.querySelector('#app'),window.trip,()=>{},()=>{});});
 await page.clock.runFor(5000);assert.equal(await presentation(),'illustration');assert.equal(await page.evaluate(()=>window.trip.choices.length),3);
 await page.emulateMedia({reducedMotion:'reduce'});await seed(0,0);await page.locator('[data-trip-choice="0"]').click();assert.equal(await presentation(),'illustration');
 await page.emulateMedia({reducedMotion:'no-preference'});
 for(const width of [320,390,430]) {
  await page.setViewportSize({width,height:844});await seed(0,0);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const van=await page.locator('[data-trip-van]').boundingBox();assert.ok(van.width>=35);
  await page.locator('[data-trip-choice="0"]').click();await page.clock.runFor(600);
  const map=await page.locator('.stockholm-map').boundingBox();
  assert.ok(map.x>=0&&map.x+map.width<=width);
  assert.ok((await page.locator('[data-trip-van]').boundingBox()).width>=65);
 }
 assert.deepEqual(errors,[]);console.log('320/390/430px, reduced motion, interrupted animation and all debug snapshots: OK');
 await context.close();
 // A fresh production service worker must cache all modules and existing D5 art.
 const offline=await browser.newContext({viewport:{width:390,height:844}});
 const p=await offline.newPage();await p.goto(origin+'/?debug=1&display=pwa');
 await p.evaluate(async()=>{await navigator.serviceWorker.ready;});
 await p.waitForFunction(()=>!!navigator.serviceWorker.controller);
 await offline.setOffline(true);await p.reload();
 await p.locator('#debugStep').evaluate(e=>e.value='road-question:5');await p.locator('#debugGo').evaluate(e=>e.click());
 await p.addStyleTag({content:'#debugPanel{display:none!important}'});
 await p.locator('[data-trip-choice="2"]').click();await p.locator('.stockholm-result:not([hidden])').waitFor();
 assert.equal(await p.locator('.stockholm-illustration').getAttribute('data-illustration'),'1-3');
 const cached=await p.evaluate(async()=>{const c=await caches.open('voyage-majorque-v1-4-50-d2-canonical-flow');return Promise.all(['./road-trip.js?v=1.4.44','./config.js?v=1.4.50','./assets/challenge-5/v1-4-14/map.png','./assets/challenge-5/v1-4-14/camper.png','./assets/finale/v1-4-49/colis.png'].map(async u=>!!await c.match(u)));});
 assert.ok(cached.every(Boolean));console.log('Fresh offline cache and D5 route: OK');
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{await browser?.close();server.close();});
