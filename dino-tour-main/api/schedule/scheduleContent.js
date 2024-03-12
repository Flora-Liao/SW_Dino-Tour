import axios from 'axios';
import serverUrl from '../utility.js';

/* View Mode */

export function getContent(userId, scheduleId) {
    let url = `${serverUrl}/schedulecontent/getSchedulePage?userId=${userId}&scheduleId=${scheduleId}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

// TODO: sync with server
export function updateContent(userid, scheduleid, content) {
    let url = `${serverUrl}/schedulecontent/${userid}?scheduleid=${scheduleid}`;

    console.log(`Making POST request to: ${url}`);

    return axios
        .post(url, {
            content,
        })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}