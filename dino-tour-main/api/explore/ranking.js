import axios from 'axios';
import serverUrl from '../utility.js';

// checked

export function listRanking(vote) {
    let url = `${serverUrl}/explore/listUsersByRank?vote=${vote}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}