const viewModeInitState = {
    scheduleId: NaN,
    scheduleName: '',
    authorName: '',
    members: [], // (userAccount, userName, userPhoto)
    spots: [],
    whichDay: 1,
};

export function viewMode(state = '', action) {
    switch (action.type) {
        default:
            return state;
    }
}

const editModeInitState = {
    scheduleId: NaN,
    scheduleName: '',
    authorName: '',
    members: [], // (userAccount, userName, userPhoto)
    spots: [],
    whichDay: 1,
};

export function editMode(state = '', action) {
    switch (action.type) {
        default:
            return state;
    }
}