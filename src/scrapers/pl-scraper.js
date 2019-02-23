import rp from 'request-promise';
import cheerio from 'cheerio';
import getRandomUserAgent from './options/getRandomUserAgent';
import plParser from './parsers/plParser';

const scrapePL = async (url) => {
    const userAgent = await getRandomUserAgent();
    const proxy = 'http://182.52.51.4:39047';

    const options = {
        uri: url,
        headers: { 'user-agent': userAgent },
        proxy: proxy,
        transform: (body) => cheerio.load(body)
    }

    const html = await rp(options, (err, res, body) => {
        if(err) throw new Error(err);
        return body;
    })

    const data = await plParser(html);

    return data;    
}

export default scrapePL;