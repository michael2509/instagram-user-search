import '@babel/polyfill';
import express from 'express';
import hypeauditorScraper from './scrapers/hypeauditor-scraper';
import { writeFile } from 'fs';
import getUsernameList from './data/insta-user-list/username-list';
import storage from 'node-persist';
import saveToDB from './mongoose/saveToDB';

const server = express();

server.listen(5000, async () => {
    console.log('server running on port 5000');
    const userData = await hypeauditorScraper("gadelmaleh");
    console.log(userData);

    saveToDB(userData);

/*
    try {
        await storage.init({ dir: './src/data/local-storage'});
        let requestCounter = await storage.getItem('request-counter');

        const usernameList = await getUsernameList();

        for(let i = requestCounter; i < usernameList.length; i++) {
            const userData = await hypeauditorScraper(usernameList[i]);
            console.log(userData);
            const data = JSON.stringify(userData);

            writeFile('./src/data/hypeauditor-data/test.json', data, () => {
                console.log('writing done');
                requestCounter++;
                storage.setItem('request-counter', requestCounter);
            });
        }
    }

    catch(err) {
        console.log(err);
    }
*/
});