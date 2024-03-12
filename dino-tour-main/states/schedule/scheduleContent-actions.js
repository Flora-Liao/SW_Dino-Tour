/* View Mode */

export function getContent() {

}

function endGetContent() {
    return {
        type: '@VIEWMODE/END_GET_CONTENT'
    };
}

export function updateContent() {

}

function endUpdateContent() {
    return {
        type: '@VIEWMODE/END_UPDATE_CONTENT'
    };
}

/* Edit Mode */

export function setStartTime() {
    return {
        type: '@EDITMODE/SET_START_TIME'
    };
}

export function addSpot() {
    return {
        type: '@EDITMODE/ADD_SPOT'
    };
}

export function deleteSpot() {
    return {
        type: '@EDITMODE/DELETE_SPOT'
    };
}

export function updateSpot() {
    return {
        type: '@EDITMODE/UPDATE_SPOT'
    };
}

export function clearDay() {
    return {
        type: '@EDITMODE/CLEAR_DAY'
    };
}