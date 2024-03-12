import { simulateServerFlag as flag } from '../utility.js';
import {
    listCollection as listCollectionApi,
} from '../../api/users/collection.js';

const randomCollection = {
    // Add casual data
};

export function listCollection(userId) {
    if (flag) {
        return endListCollection(randomCollection);
    } else {
        return (dispatch, getState) => {
            return listCollectionApi(userId).then(collection => {
                dispatch(endListCollection(collection));
            }).catch(err => {
                console.error('Error list explore', err);
            });
        };
    }
}

function endListCollection(collection) {
    return {
        type: '@COLLECTION/END_LIST_COLLECTION',
        collection: collection,
    };
}