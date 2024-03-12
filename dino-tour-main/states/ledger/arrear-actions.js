import { simulateServerFlag as flag } from '../utility.js';
import {
    listDebts as listDebtsApi,
    deleteRecoverCredit as deleteRecoverCreditApi,
} from '../../api/ledger/arrear.js';
import {
    getScheduleInfo as getScheduleInfoApi
} from '../../api/schedule/scheduleInfo.js';

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

export function getLedgerGeneralInfo(scheduleId, userId) {
    if (flag) {
        return endGetLedgerGeneralInfo('a name', randomMember);
    } else {
        return (dispatch, getState) => {
            return getScheduleInfoApi(scheduleId, userId).then(info => {
                dispatch(endGetLedgerGeneralInfo(info.schedulename, info.listofmembers));
            }).catch(err => {
                console.error('Error get ledger general info', err);
            });
        };
    }
}

function endGetLedgerGeneralInfo(ledgername, members) {
    return {
        type: '@ARREAR/END_GET_INFO',
        ledgername: ledgername,
        members: members,
    };
}

export function setCurrentAccount(account) {
    return {
        type: '@ARREAR/SET_CURRENT',
        account: account,
    };
}

const randomDebts = [
    // Add casual data
    {
        name: 'aftermath',
        account: 'aftermaaath',
        debt: 100,
    },
    {
        name: 'yju',
        account: 'yju',
        debt: 220,
    },
    {
        name: 'tang',
        account: 'kristen',
        debt: 0,
    },
    {
        name: 'wen',
        account: 'wen',
        debt: -300,
    },
];

export function listPayment(account, scheduleId) {
    if (flag) {
        return endListPayment(randomDebts);
    } else {
        return (dispatch, getState) => {
            return listDebtsApi(account, scheduleId).then(debts => {
                dispatch(endListPayment(debts));
            }).catch(err => {
                console.error('Error list debt for payment', err);
            });
        };
    }
}

function endListPayment(debts) {
    return {
        type: '@ARREAR/END_LIST_PAYMENT',
        debts: debts,
    };
}

export function listRecover(account, scheduleId) {
    if (flag) {
        return endListRecover(randomDebts);
    } else {
        return (dispatch, getState) => {
            return listDebtsApi(account, scheduleId).then(debts => {
                dispatch(endListRecover(debts));
            }).catch(err => {
                console.error('Error list debt for recover', err);
            });
        };
    }
}

function endListRecover(debts) {
    return {
        type: '@ARREAR/END_LIST_RECOVER',
        debts: debts,
    };
}

export function markRecoverCredit(index) {
    return {
        type: '@ARREAR/MARK_RECOVER_CREDIT',
        index: index,
    };
}

export function deleteRecoverCredit(userId, scheduleId, credit) {
    const filtered_credit = credit.filter(p => {
        return p.mark === true;
    });;
    if (flag) {
        return endDeleteRecoverCredit(filtered_credit);
    } else {
        return (dispatch, getState) => {
            return deleteRecoverCreditApi(userId, scheduleId, filtered_credit).then(p => {
                dispatch(endListRecover(filtered_credit));
            }).catch(err => {
                console.error('Error delete recovered debt', err);
            });
        };
    }
}

function endDeleteRecoverCredit(credit) {
    return {
        type: '@ARREAR/END_DELETE_RECOVER_CREDIT',
        credit: credit,
    };
}