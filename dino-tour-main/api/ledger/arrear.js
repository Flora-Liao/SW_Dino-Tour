import axios from 'axios';
import serverUrl from '../utility.js';

// checked

export function listDebts(memberAccount, scheduleId) {
    let url = `${serverUrl}/arrear/listDebts?memberAccount=${memberAccount}&scheduleId=${scheduleId}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function deleteRecoverCredit(userId, scheduleId, credit) {
    let url = `${serverUrl}/arrear/cleanUp`;

    console.log(`Making POST requests to: ${url}`);

    const requests = credit.map((creditItem) =>
        axios.post(url, {
            userId,
            scheduleId,
            amount: creditItem.money,
            memberAccount: creditItem.account,
        })
    );

    return Promise.all(requests)
        .then((results) => {
            results.map((res) => {
                if (res.status !== 200)
                    throw new Error(`Unexpected response code: ${res.status}`);
            })
            return results.map((res) => res.data);
        })
        .catch((error) => {
            console.error('Error:', error);
            throw error;
        });
}