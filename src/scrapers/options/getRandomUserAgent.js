import * as userAgentList from '../../data/user-agent-list/userAgentList.json';

const getRandomUserAgent = () => {
    return new Promise((resolve, reject) => {
        const userAgentListLength = userAgentList.items.length;
        const randomNumber = Math.floor(Math.random()*(userAgentListLength-0+1)+0);
        const randomUserAgent = userAgentList.items[randomNumber].useragent;

        randomUserAgent ? resolve(randomUserAgent) : reject('no user agent found');
    })
}

export default getRandomUserAgent;