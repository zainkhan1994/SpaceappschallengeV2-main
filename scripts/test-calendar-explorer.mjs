import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';
import { mkdir } from 'node:fs/promises';
const out = process.env.POLISH_SCREENSHOTS || '/tmp/calendar-explorer-screenshots';
await mkdir(out, { recursive: true });
const browser = await puppeteer.launch({ headless: true, executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', args: ['--no-sandbox','--enable-unsafe-swiftshader','--use-angle=swiftshader'] });
const page = await browser.newPage();
const errors=[];
page.on('console',m=>{if(m.type()==='error' && /Calendar scene unavailable|THREE.WebGL|shader error/i.test(m.text())) errors.push(m.text());});
page.on('pageerror',e=>{errors.push(e.message);console.log('PAGE ERROR',e.message);});
const wait=(ms)=>new Promise(r=>setTimeout(r,ms));
const click=async(selector)=>{await page.$eval(selector,e=>e.click());await wait(250);};
try {
  await page.setViewport({width:1440,height:1000});
  await page.goto(process.env.TEST_URL || 'http://127.0.0.1:5174/#/tech-talks',{waitUntil:'domcontentloaded',timeout:90000});
  await page.waitForSelector('.tt-learn',{timeout:60000}); console.log('Loaded page');
  await page.$eval('.tt-learn',e=>window.scrollTo(0,e.offsetTop+100));
  await wait(1500); await page.screenshot({path:`${out}/headline-desktop.png`});
  await page.$eval('.tt-cal-stage',e=>e.scrollIntoView({block:'center'}));
  await page.waitForSelector('.tt-cal-stage.is-live',{timeout:30000});
  await wait(1200);
  const before=await page.$eval('.tt-cal-scrub input',e=>Number(e.value));
  await wait(1200);
  const after=await page.$eval('.tt-cal-scrub input',e=>Number(e.value));
  assert.ok(after>before,'Visible calendar should animate initially');
  await click('button[aria-label="Pause"]');
  const paused=await page.$eval('.tt-cal-scrub input',e=>Number(e.value));
  await wait(500);
  assert.equal(await page.$eval('.tt-cal-scrub input',e=>Number(e.value)),paused,'Pause freezes time');
  await page.screenshot({path:`${out}/calendar-desktop.png`});
  await page.evaluate(()=>window.dispatchEvent(new CustomEvent('tt:calendar',{detail:'talk-2026-09'})));
  await wait(1500);
  assert.equal(await page.$$eval('.tt-cal-facts',e=>e.length),0);
  assert.ok(await page.$('.tt-cal-card .tt-cal-moon-portrait canvas'));
  assert.ok(await page.$eval('.tt-cal-card .tt-cal-moon-portrait canvas',c=>c.getContext('2d').getImageData(c.width/2,c.height/2,1,1).data[3]>0),'Moon portrait has rendered');
  assert.ok(!(await page.$eval('.tt-cal-card',e=>e.textContent)).includes('Sun at the start'));
  await page.screenshot({path:`${out}/card-desktop.png`});
  await page.$eval('.tt-cal-stage',e=>e.scrollIntoView({block:'center'}));
  await click('.tt-cal-explore button');
  await wait(2500); await page.screenshot({path:`${out}/solar-system.png`});
  assert.equal(await page.$$eval('.tt-cal-planet-picker option',els=>els.length),11);
  for(const name of ['sun','mercury','venus','mars','jupiter','saturn','uranus','neptune','earth','moon']) {
    await page.select('.tt-cal-planet-picker select',name);
    await wait(1800);
    assert.ok((await page.$eval('.tt-cal-view-caption',e=>e.textContent)).toLowerCase().includes(name));
    await page.screenshot({path:`${out}/${name}.png`});
  }
  for(const width of [390,320]) {
    await page.setViewport({width,height:844});
    await page.$eval('.tt-learn',e=>e.scrollIntoView({block:'start'}));
    await wait(1000); await page.screenshot({path:`${out}/headline-${width}.png`});
    await page.$eval('.tt-cal-stage',e=>e.scrollIntoView({block:'start'}));
    await wait(500);
    const layout=await page.evaluate(()=>{
      const stage=document.querySelector('.tt-cal-stage').getBoundingClientRect();
      return {overflow:document.documentElement.scrollWidth>innerWidth,clipped:[...document.querySelectorAll('.tt-cal-controls button,.tt-cal-explore button,.tt-cal-explore select')].some(e=>{const r=e.getBoundingClientRect();return r.left<stage.left||r.right>stage.right;})};
    });
    assert.equal(layout.overflow,false,`Page overflow ${width}`);
    assert.equal(layout.clipped,false,`Controls clipped ${width}`);
    await page.screenshot({path:`${out}/calendar-${width}.png`});
    await page.$eval('.tt-cal-card',e=>e.scrollIntoView({block:'center'}));
    await wait(500); await page.screenshot({path:`${out}/card-${width}.png`});
  }
  assert.deepEqual(errors,[]);
  console.log('PASS: automatic rotation, pause freezes time, lunar event portrait, removed facts, every planet accessible, desktop/390/320 layouts, zero runtime errors.');
} finally {await browser.close();}
