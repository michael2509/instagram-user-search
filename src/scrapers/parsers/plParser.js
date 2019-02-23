const plParser = ($) => {
    return new Promise((resolve, reject) => {
        const rows = $('#proxylisttable > tbody > tr');
        const proxies = [];

        for(let i = 0; i < rows.length; i++) {
            proxies.push({
                proxy: `http://${rows.eq(i).find('td').eq(0).text().trim()}:${rows.eq(i).find('td').eq(1).text().trim()}`,
                anonymity: rows.eq(i).find('td').eq(4).text().trim()
            })
        }

        // Keep only proxies with high anonymity
        const eliteProxies = proxies.reduce((accumulator, currentProxy) => {
            if(currentProxy.anonymity === 'elite proxy') {
                accumulator.push(currentProxy.proxy);
            }
            return accumulator;
        }, []);

        eliteProxies ? resolve(eliteProxies) : reject('elite proxy list not found');
    })
}

export default plParser;