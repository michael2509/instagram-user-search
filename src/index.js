import '@babel/polyfill';
import express from 'express';
import hypeauditorScraper from './scrapers/hypeauditor-scraper';
import { writeFile } from 'fs';

const server = express();

server.listen(5000, async () => {
    console.log('server running on port 5000');
    
    const userData = await hypeauditorScraper("lukadoncic");
    console.log(userData);
    const data = JSON.stringify(userData);

    writeFile('./src/data/hypeauditor-data/test.json', data, () => console.log('writing done'));
});