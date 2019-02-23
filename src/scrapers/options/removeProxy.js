import storage from 'node-persist';

const removeProxy = async (proxy) => {
    await storage.init({ dir: './src/data/local-storage'});
    let proxyList = await storage.getItem('proxy-list');
    const index = proxyList.indexOf(proxy);
    if(index > -1) {
        proxyList.splice(index, 1);
        await storage.setItem('proxy-list', proxyList);
    }

    return console.log('remove proxy used in the proxy list');
}

export default removeProxy;