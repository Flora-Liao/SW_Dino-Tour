import { simulateServerFlag as flag } from '../utility.js';
import {
    listExplore as listExploreApi,
} from '../../api/explore/explore.js';

/* List Tour */

const randomExplore = [
    // Add casual data
    {
        scheduleid: 1,
        schedulename: 'a schedule',
        author: 'aftermath',
        startdate: '2023-06-18T16:00:00.000Z',
        vote_e: 50,
        vote_d: 40,
        vote_p: 20,
        // scheduleimage: 
    },
    {
        scheduleid: 2,
        schedulename: 'another schedule',
        author: 'yju',
        startdate: '2023-06-12T16:00:00.000Z',
        vote_e: 40,
        vote_d: 10,
        vote_p: 2,
        // scheduleimage:
    },
]

export function listExplore(searchText, key) {
    if (flag) {
        return endListExplore(key, randomExplore);
    } else {
        return (dispatch, getState) => {
            return listExploreApi(searchText, key).then(tourlist => {
                dispatch(endListExplore(key, tourlist));
            }).catch(err => {
                console.error('Error list explore', err);
            });
        };
    }
}

function endListExplore(key, tourlist) {
    return {
        type: '@EXPLORE/END_LIST_EXPLORE',
        tourlist: tourlist,
        key: key,
    };
}

/* Search */

export function setSearchText(searchText) {
    return {
        type: '@EXPLORE/SET_SEARCHTEXT',
        searchText: searchText,
    };
}