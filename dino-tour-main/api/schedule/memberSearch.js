import axios from 'axios';
import serverUrl from '../utility.js';

export function searchUser(searchText) {
    let url = `${serverUrl}/memberSearch/listUsersByAccount?searchText=${searchText}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}