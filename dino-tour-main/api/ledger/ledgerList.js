import axios from 'axios';
import serverUrl from '../utility.js';

// checked

export function listLedger(userId) {
    let url = `${serverUrl}/ledgerList/listLedgers?userId=${userId}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}