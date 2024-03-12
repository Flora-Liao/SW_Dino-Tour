import { simulateServerFlag as flag } from '../utility.js';

export function setSearchId(inputext) {
    return {
        type: '@MEMBERSEARCH/SET_SEARCH_ID',
        inputext: inputext,
    };
}

const randomUser = {
    // Add casual data
};

export function searchUser() {
    if (flag) {
        dispatch(endSearchUser(randomUser));
    } else {
        // TODO
    }
}

function endSearchUser(users) {
    return {
        type: '@MEMBERSEARCH/END_GET_SCHEDULE_INFO',
        users: users,
    };
}