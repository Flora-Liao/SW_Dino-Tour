import axios from 'axios';
import serverUrl from '../utility.js';

// changePassword unchecked

/* My profile */

export function login(userAccount, userPassword) {
    let url = `${serverUrl}/account/login?userAccount=${userAccount}&userPassword=${userPassword}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function createAccount(userAccount, userName, userPassword) {
    let url = `${serverUrl}/account/signup`;

    console.log(`Making POST request to: ${url}`);

    return axios
        .post(url, {
            userAccount,
            userName,
            userPassword,
        })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}

export function deleteAccount(userId) {
    let url = `${serverUrl}/account/deleteAccount`;

    console.log(`Making POST request to: ${url}`);

    return axios
        .post(url, {
            userId,
        })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}

export function changePassword(userId, userName, userPassword) {
    let url = `${serverUrl}/account/updateAccount`;

    console.log(`Making POST request to: ${url}`);

    return axios
        .post(url, {
            userId,
            userName,
            userPassword,
        })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}
