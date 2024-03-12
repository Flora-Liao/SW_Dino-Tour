import axios from 'axios';
import serverUrl from '../utility.js';

// url and figma frame checked

/* General */

export function getScheduleGeneral(userId, scheduleId) {
    let url = `${serverUrl}/explore/getSchedulePage?userId=${userId}&scheduleId=${scheduleId}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function toggleLikeSchedule(userId, scheduleId, vote) {
    let url = `${serverUrl}/explore/toggleVote`;

    console.log(`Making POST request to: ${url}`);

    return axios
        .post(url, {
            userId,
            scheduleId,
            vote
        })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}

export function toggleCollection(userId, scheduleId) {
    let url = `${serverUrl}/explore/toggleArchive`;

    console.log(`Making POST request to: ${url}`);

    return axios
        .post(url, {
            userId,
            scheduleId,
        })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}

/* Schedule Info Page*/

export function getScheduleInfo(userId, scheduleId) {
    let url = `${serverUrl}/explore/getScheduleInfo?userId=${userId}&scheduleId=${scheduleId}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

/* View Spot Page*/

export function getSpotInfo(userId, eventId) {
    let url = `${serverUrl}/explore/getEventInfo?userId=${userId}&eventId=${eventId}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

toggleLikeSchedule(1, 1, 'Economic').then(data=> {console.log(data)});
