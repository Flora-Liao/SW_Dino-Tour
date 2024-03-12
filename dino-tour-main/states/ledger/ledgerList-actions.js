import { simulateServerFlag as flag } from '../utility.js';
import {
    listLedger as listLedgerApi,
} from '../../api/ledger/ledgerList.js';

const randomLedger = [
    // Add casual data
    {
        schedulecard: {
            scheduleid: 1,
            schedulename: 'randomname',
            // scheduleimage:
            startdate: '2023-06-18T16:00:00.000Z'
        },
        listofmembers: [
            {
                useraccount: 'yju',
                username: 'yju',
                // userphoto: 'na',
            },
            {
                useraccount: 'aftermaaath',
                username: 'aftermath',
                // userphoto: 'na',
            },
            {
                useraccount: 'tang',
                username: 'tang',
                // userphoto: 'na',
            }
        ],
        iscleanedup: false
    },
    {
        schedulecard: {
            scheduleid: 2,
            schedulename: 'anotherrandomname',
            // scheduleimage:
            startdate: '2023-06-28T16:00:00.000Z'
        },
        listofmembers: [
            {
                useraccount: 'yju',
                username: 'yju',
                // userphoto: 'na',
            },
            {
                useraccount: 'aftermaaath',
                username: 'aftermath',
                // userphoto: 'na',
            },
        ],
        iscleanedup: false
    }
];

export function listLedger(userId) {
    if (flag) {
        return endListLedger(randomLedger);
    } else {
        return (dispatch, getState) => {
            return listLedgerApi(userId).then(ledger => {
                dispatch(endListLedger(ledger));
            }).catch(err => {
                console.error('Error get ledger list', err);
            });
        };
    }
}

function endListLedger(ledger) {
    return {
        type: '@LEDGERLIST/END_LIST_LEDGER',
        ledger: ledger,
    };
}