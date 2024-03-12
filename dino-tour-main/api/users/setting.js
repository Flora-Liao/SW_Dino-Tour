import axios from 'axios';
import serverUrl from '../utility.js';

/* My profile */

export function getSettingProfile(userId, viewingAccount) {
    let url = `${serverUrl}/setting/getUserPage?userId=${userId}&viewingAccount=${viewingAccount}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function changeNameAndPassword(userId, username, password) {
    let url = `${serverUrl}/setting/updateUser`;

    console.log(`Making POST request to: ${url}`);

    return axios
        .post(url, {
            userId,
            username,
            password,
        })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}

export function changeName(userId, username) {
    let url = `${serverUrl}/setting/updateUserName`;

    console.log(`Making POST request to: ${url}`);

    return axios
        .post(url, {
            userId,
            username
        })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}



export function editIntro(userId, description) {
    let url = `${serverUrl}/setting/updateUserDescription`;

    console.log(`Making POST request to: ${url}`);

    return axios
        .post(url, {
            userId,
            description,
        })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}

export function changeAvatar(userId, image) {
    let url = `${serverUrl}/setting/updateUserPhoto/${userid}`;

    console.log(`Making POST request to: ${url}`);

    return axios
        .post(url, {
            userId,
            image,
        })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}

export function changeBackgroundImage(userId, image) {
    let url = `${serverUrl}/setting/updateUserBackgroundImage`;

    console.log(`Making POST request to: ${url}`);

    return axios
        .post(url, {
            userId,
            image,
        })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}

/* Notification */

export function getNotificationInfo(userId) {
    let url = `${serverUrl}/setting/getNotifications?userId=${userId}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function updateNotification(userId, general, invitation, loan, debt, newCredit, note) {
    let url = `${serverUrl}/setting/updateNotifications`;

    console.log(`Making POST request to: ${url}`);

    return axios
        .post(url, {
            userId,
            general,
            invitation,
            loan,
            debt,
            newCredit,
            note
        })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}

/* Following */

export function ListFollowings(userId) {
    let url = `${serverUrl}/setting/listFollowingUsersById?userId=${userId}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

ListFollowings(1).then(data => console.log(data));
