import storage from 'node-persist';

const getRandomProxy = () => {
    return new Promise(async (resolve, reject) => {
        await storage.init({ dir: './src/data/local-storage' });
        const proxyList = await storage.getItem('proxy-list');

        const proxyListLength = proxyList.length - 1;
        const randomNumber = Math.floor(Math.random()*(proxyListLength-0+1)+0);
        const randomProxy = proxyList[randomNumber];

        randomProxy ? resolve(randomProxy) : reject('no random proxy found');
    })
}

export default getRandomProxy;