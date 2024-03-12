import axios from 'axios';
import serverUrl from '../utility.js';

/* Schedule List */

export function listMySchedule(userId) {
    let url = `${serverUrl}/schedule/listVisibleSchedules?userId=${userId}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

/* Single Schedule */

export function createSchedule(userId, scheduleName, starDate, endDate, isPublic, hasCredits, budget, initMemberAccounts) {
    let url = `${serverUrl}/schedule/newSchedule`;

    console.log(`Making POST request to: ${url}`);

    return axios
        .post(url, {
            userId, scheduleName, starDate, endDate, isPublic, hasCredits, budget, initMemberAccounts
        })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}