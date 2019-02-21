import puppeteer from 'puppeteer';
import getRandomProxy from './options/getRandomProxy';
import getRandomUserAgent from './options/getRandomUserAgent';
import haParser from './parsers/haParser';

const hypeauditorScraper = (username) => {
    return new Promise(async (resolve, reject) => {
        let browser;

        try {
            const proxy = 'http://176.9.211.175:8080';
            //const proxy = await getRandomProxy();
            const userAgent = await getRandomUserAgent();

            browser = await puppeteer.launch({ headless: false, args: [`--proxy-server=${proxy}`, `--user-agent=${userAgent}`]});
            const page = await browser.newPage();
            await page.setViewport({ width: 1920, height: 1080 });
            await page.setRequestInterception(true);
            page.on('request', (req) => {
                if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image') req.abort();
                else req.continue();
            })

            await page.goto("https://www.google.com/", { timeout: 0 });
            await page.goto("https://hypeauditor.com", { timeout: 0 });

            const user_url = `https://hypeauditor.com/preview/${username}`;
            await page.goto(user_url, { timeout: 0 });
            await page.waitFor('#report_preview_follower_growth .report_preview_follower_change');

            const html = await page.content();
            const userData = await haParser(html);

            userData ? resolve(userData) : reject('user data not found');
        }

        catch(err) {
            console.log(err);
        }

        finally {
            browser.close();
        }
    })
}

export default hypeauditorScraper;