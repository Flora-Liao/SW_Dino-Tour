import { simulateServerFlag as flag } from '../utility.js';
import {
    listRanking as listRankingApi,
} from '../../api/explore/ranking.js';

const randomRanklist = [
    // Add casual data
    {
        userinfo: {
            useraccount: 'branniesocute',
            username: 'brannie',
            // userphoto: 
        },
        rank: 100,
    },
    {
        userinfo: {
            useraccount: 'aftermaaath',
            username: 'aftermath',
            // userphoto: 
        },
        rank: 3,
    },
];

export function listRanking(key) {
    if (flag) {
        return endListRanking(key, randomRanklist);
    } else {
        return (dispatch, getState) => {
            return listRankingApi(key).then(ranklist => {
                dispatch(endListRanking(key, ranklist));
            }).catch(err => {
                console.error('Error list ranking', err);
            });
        };
    }
}

function endListRanking(key, ranklist) {
    return {
        type: '@RANKING/END_LIST_RANKING',
        ranklist: ranklist,
        key: key,
    };
}