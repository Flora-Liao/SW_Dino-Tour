import axios from 'axios';
import serverUrl from '../utility.js';

export function getUserInfo(userId, viewingAccount) {
    let url = `${serverUrl}/user/getUserPage?userId=${userId}&viewingAccount=${viewingAccount}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function toggleFollows(userId, account) {
    let url = `${serverUrl}/user/toggleFollowing`;

    console.log(`Making POST request to: ${url}`);

    return axios
        .post(url, {
            userId,
            account,
        })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}