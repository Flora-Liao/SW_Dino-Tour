import axios from 'axios';
import serverUrl from '../utility.js';

// checked

export function listExplore(searchText = '', vote) {
    let url = `${serverUrl}/explore/listPublicSchedules?searchText=${searchText}&vote=${vote}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

listExplore('', '').then(
    data => {
        console.log(data);
    }
);

// export function listPublicSchedules(user) {
//     let url = `${serverUrl}/explore?user=${user}`;

//     console.log(`Making GET request to: ${url}`);

//     return axios.get(url).then(function (res) {
//         if (res.status !== 200)
//             throw new Error(`Unexpected response code: ${res.status}`);

//         return res.data;
//     });
// }
