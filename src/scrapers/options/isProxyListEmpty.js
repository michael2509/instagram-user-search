import storage from 'node-persist';

const isProxyListEmpty = () => {
    return new Promise(async (resolve, reject) => {
        await storage.init({ dir: './src/data/local-storage'});
        const proxyList = await storage.getItem('proxy-list');
        if(proxyList.length < 1 || proxyList === undefined || proxyList === null) {
            reject(true);
        }
        else {
            resolve(false);
        }
    })
}

export default isProxyListEmpty;