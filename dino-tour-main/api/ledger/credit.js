import axios from 'axios';
import serverUrl from '../utility.js';

// checked

export function listCredit(scheduleId) {
    let url = `${serverUrl}/credit/listCredits?scheduleId=${scheduleId}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function addCredit(scheduleId, description, amount, payerAccount, inChargeAccountsArr) {
    let url = `${serverUrl}/credit/newCredit`;
    const inChargeAccounts = inChargeAccountsArr.join(',');
    console.log(`Making POST request to: ${url}`);

    return axios
        .post(url, {
            scheduleId,
            description,
            amount,
            payerAccount,
            inChargeAccounts,
        })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}

addCredit(1, 'test using node', 100, 'aftermath', ['yju', 'aftermath']).then(
    data => {
        console.log('addCredit', data);
    })

//listCredit(1).then(
//    data => {
//        console.log('listCredit', data);
//    })
