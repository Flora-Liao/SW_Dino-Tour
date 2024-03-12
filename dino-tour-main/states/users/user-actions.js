import { simulateServerFlag as flag } from '../utility.js';

export function getUserInfo(userId, account) {
    if (flag) {
        return endGetUserInfo();
    } else {
        // TODO
    }
}

function endGetUserInfo() {
    return {
        type: '@USER/END_GET_USER_INFO'
    };
}

export function toggleFollows(userId, account) {
    if (flag) {
        return endToggleFollows();
    } else {
        // TODO
    }
}

function endToggleFollows() {
    return {
        type: '@USER/END_TOGGLE_FOLLOWS'
    };
}