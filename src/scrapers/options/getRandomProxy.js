import * as proxyList from '../../data/proxy-list/proxy-list.json';

const getRandomProxy = () => {
    return new Promise((resolve, reject) => {
        const proxyListLength = proxyList.proxies.length;
        const randomNumber = Math.floor(Math.random()*(proxyListLength-0+1)+0);
        const randomProxy = proxyList.proxies[randomNumber].proxy;

        randomProxy ? resolve(randomProxy) : reject('no random proxy found');
    })
}

export default getRandomProxy;