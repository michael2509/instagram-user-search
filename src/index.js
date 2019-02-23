import '@babel/polyfill';
import express from 'express';
import hypeauditorScraper from './scrapers/hypeauditor-scraper';
import getUsernameList from './data/insta-user-list/username-list';
import storage from 'node-persist';
import saveToDB from './mongoose/saveToDB';

const server = express();

server.listen(5000, async () => {
    console.log('server running on port 5000');

    // restart pm2 automatically when error
    process.on('uncaughtException', function(e) {
        console.log('An error has occured. error is: %s and stack trace is: %s', e, e.stack);
        console.log("Process will restart now.");
        process.exit(1);
    })


    try {
        await storage.init({ dir: './src/data/local-storage'});
        let requestCounter = await storage.getItem('request-counter');
        const usernameList = await getUsernameList();

        for(let i = requestCounter; i < usernameList.length; i++) {
            const userData = await hypeauditorScraper(usernameList[i]);
            saveToDB(userData);
            const haUsers = await storage.getItem('hypeauditor-users');
            haUsers.push(userData);
            storage.setItem('hypeauditor-users', haUsers);
            requestCounter++;
            storage.setItem('request-counter', requestCounter);
        }

        pm2.stop('all');
    }

    catch(err) {
        throw new Error(err);
    }

});