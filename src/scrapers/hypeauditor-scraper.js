import puppeteer from 'puppeteer';
import getRandomProxy from './options/getRandomProxy';
import getRandomUserAgent from './options/getRandomUserAgent';
import haParser from './parsers/haParser';
import removeProxy from './options/removeProxy';
import isProxyListEmpty from './options/isProxyListEmpty';
import pm2 from 'pm2';

const hypeauditorScraper = (username) => {
    return new Promise(async (resolve, reject) => {
        let browser;

        try {
            const plEmpty = await isProxyListEmpty();
            if(plEmpty) pm2.stop('all');

            const proxy = await getRandomProxy();
            const userAgent = await getRandomUserAgent();

            removeProxy(proxy);

            browser = await puppeteer.launch({ args: [`--proxy-server=${proxy}`, `--user-agent=${userAgent}`]});
            const page = await browser.newPage();
            await page.setViewport({ width: 1920, height: 1080 });
            await page.setRequestInterception(true);
            page.on('request', (req) => {
                if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image') req.abort();
                else req.continue();
            })

            await page.goto("https://www.google.com/", { timeout: 50000 });
            await page.goto("https://hypeauditor.com", { timeout: 40000 });

            const user_url = `https://hypeauditor.com/preview/${username}`;
            await page.goto(user_url, { timeout: 40000 });
            await page.waitFor('#report_preview_follower_growth .report_preview_follower_change', { timeout: 40000 });

            const html = await page.content();
            const userData = await haParser(html);

            userData ? resolve(userData) : reject('user data not found');
        }

        catch(err) {
            throw new Error(err);
        }

        finally {
            browser.close();
        }
    })
}

export default hypeauditorScraper;