import puppeteer from 'puppeteer';
import { writeFile } from 'fs';

const getData = async () => {
  const browser = await puppeteer.launch({ args: ['--proxy-server=70.96.220.166:53281'], headless: false });
  const page = await browser.newPage();
  await page.goto('https://google.com', { timeout: 0} );
  await page.goto('https://hypeauditor.com', { timeout: 0} );
  const response = await page.goto("https://hypeauditor.com/preview/kingjames", { timeout: 0} );
  console.log(response.headers);
  await page.waitFor('#report_preview_follower_growth--img');
  let bodyHTML = await page.evaluate(() => document.body.innerHTML);
  writeFile('./src/test.html', bodyHTML, () => console.log('writing done'));
  browser.close();
}

export default getData;