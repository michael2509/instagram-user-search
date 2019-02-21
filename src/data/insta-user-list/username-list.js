import * as instaUserList from './insta-user-list.json';

const getUsernameList = () => {
    return new Promise((resolve, reject) => {
        const usernameList = [];
        for(let i = 0; i < instaUserList.users.length; i++) {
            usernameList.push(instaUserList.users[i].username);
        }

        usernameList.length > 0 ? resolve(usernameList) : reject('usernames not found');
    })
}

export default getUsernameList;