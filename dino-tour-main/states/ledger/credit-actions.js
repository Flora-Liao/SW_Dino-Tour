import { simulateServerFlag as flag } from '../utility.js';
import {
    listCredit as listCreditApi,
    addCredit as addCreditApi,
} from '../../api/ledger/credit.js';
import {
    getScheduleInfo as getScheduleInfoApi
} from '../../api/schedule/scheduleInfo.js';

/* Credit List */

const randomCredit = [
    // Add casual data
    {
        creditid: 1,
        createdate: '2023-06-18T16:00:00.000Z',
        payer: 'aftermath',
        amount: 600,
        description: 'I\'m hungry',
    },
    {
        creditid: 2,
        createdate: '2023-06-22T16:00:00.000Z',
        payer: 'yju',
        amount: 100,
        description: 'I drop it.',
    },
];

export function listCredit(scheduleId) {
    if (flag) {
        return endListCredit(randomCredit);
    } else {
        return (dispatch, getState) => {
            return listCreditApi(scheduleId).then(creditlist => {
                dispatch(endListCredit(creditlist));
            }).catch(err => {
                console.error('Error list credit', err);
            });
        };
    }
}

function endListCredit(credits) {
    return {
        type: '@CREDITLIST/END_LIST_CREDIT',
        credits: credits,
    };
}

/* Credit Form */

const randomMember = [
    // Add casual data
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
];

export function getCreditForm(scheduleId, userId) {
    if (flag) {
        return endGetCreditForm('another name', randomMember);
    } else {
        return (dispatch, getState) => {
            return getScheduleInfoApi(scheduleId, userId).then(info => {
                dispatch(endGetCreditForm(info.schedulename, info.listofmembers));
            }).catch(err => {
                console.error('Error get ledger general info', err);
            });
        };
    }
}

function endGetCreditForm(ledgername, members) {
    return {
        type: '@CREDITFORM/END_GET_CREDIT_FORM',
        ledgername: ledgername,
        members: members,
    };
}

export function addCredit(scheduleId, creditName, creditValue, payerButton, debtorButton, memberAccount) {
    // set payer
    let payers = memberAccount.filter((mem, idx) => {
        return payerButton[idx];
    });
    // set debtors
    let debtors = memberAccount.filter((mem, idx) => {
        return debtorButton[idx];
    });
    // API call and dispatch
    if (flag) {
        return endAddCredit();
    } else {
        return (dispatch, getState) => {
            return addCreditApi().then(p => {
                dispatch(endAddCredit(scheduleId, creditName, creditValue, payers[0], debtors));
            }).catch(err => {
                console.error('Error add credit', err);
            });
        };
    }
}

function endAddCredit() {
    return {
        type: '@CREDITFORM/END_ADD_CREDIT',
    };
}

export function setCreditName(name) {
    return {
        type: '@CREDITFORM/SET_CREDIT_NAME',
        name: name,
    };
}

export function setCreditValue(value) {
    return {
        type: '@CREDITFORM/SET_CREDIT_VALUE',
        value: value,
    };
}

export function setCreditPayer(payer) {
    return {
        type: '@CREDITFORM/SET_CREDIT_PAYER',
        payer: payer,
    };
}

export function setCreditDebtor(debtor) {
    return {
        type: '@CREDITFORM/SET_CREDIT_DEBTOR',
        debtor: debtor,
    };
}