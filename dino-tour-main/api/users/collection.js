import axios from 'axios';
import serverUrl from '../utility.js';

export function listCollection(userId) {
    let url = `${serverUrl}/collection/listArchivedSchedules?userId=${userId}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
