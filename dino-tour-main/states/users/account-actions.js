import { simulateServerFlag as flag } from '../utility.js';
import {
    login as loginApi,
    createAccount as createAccountApi,
    deleteAccount as deleteAccountApi,
} from '../../api/users/account.js';

export function deleteAccount(userId) {
    if (flag) {
        return endDeleteAccount();
    } else {
        return (dispatch, getState) => {
            return deleteAccountApi(userId).then(p => {
                dispatch(endDeleteAccount());
            }).catch(err => {
                console.error('Error delete account', err);
            });
        };
    }
}

function endDeleteAccount() {
    return {
        type: '@ACCOUNT/END_DELETE_ACCOUNT'
    };
}

/* Login Page */

export function login(account, password) {
    if (flag) {
        return endLogin(1);
    } else {
        return (dispatch, getState) => {
            return loginApi(account, password).then(userId => {
                dispatch(endLogin(userId));
            }).catch(err => {
                console.error('Error login', err);
            });
        };
    }
}

function endLogin(userId) {
    return {
        type: '@LOGIN/END_LOGIN',
        userId: userId
    };
}

export function setLoginAccount(account) {
    return {
        type: '@LOGIN/SET_INPUT_ACCOUNT',
        account: account,
    };
}

export function setLoginPassword(password) {
    return {
        type: '@LOGIN/SET_INPUT_PASSWORD',
        password: password,
    };
}

/* Sign Up Page */

export function createAccount(account, username, password) {
    if (flag) {
        return endCreateAccount(1);
    } else {
        return (dispatch, getState) => {
            return createAccountApi(account, username, password).then(id => {
                dispatch(endCreateAccount(id));
            }).catch(err => {
                console.error('Error sign up', err);
            });
        };
    }

}

function endCreateAccount(userId) {
    return {
        type: '@SIGNUP/END_CREATE_ACCOUNT',
        userId: userId,
    };
}

export function setNewAccount(account) {
    return {
        type: '@SIGNUP/SET_NEW_ACCOUNT',
        account: account,
    };
}

export function setNewPassword(password) {
    return {
        type: '@SIGNUP/SET_NEW_PASSWORD',
        password: password,
    };
}

export function setNewUsername(username) {
    return {
        type: '@SIGNUP/SET_NEW_USERNAME',
        username: username,
    };
}