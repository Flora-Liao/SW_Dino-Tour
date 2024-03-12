export function profilePersonal(state = '', action) {
    switch (action.type) {
        default:
            return state;
    }
}

export function profileMain(state = '', action) {
    switch (action.type) {
        default:
            return state;
    }
}

const initNameState = {
    name: '',
};

export function profileName(state = initNameState, action) {
    switch (action.type) {
        case '@PROFILENAME/SET_TEMP_NAME':
            return {
                ...state,
                name: action.name,
            };
        case '@PROFILENAME/END_CHANGE_NAME':
            return state;
        default:
            return state;
    }
}

const initIntroState = {
    intro: '',
};

export function profileIntro(state = initIntroState, action) {
    switch (action.type) {
        case '@PROFILEINTRO/SET_TEMP_INTRO':
            return {
                ...state,
                intro: action.text,
            };
        case '@PROFILEINTRO/END_EDIT_INTRO':
            return state;
        default:
            return state;
    }
}

export function profilePassword(state = '', action) {
    switch (action.type) {
        default:
            return state;
    }
}

const initNotificationState = {
    isOpen0: true,
    isOpen1: true,
    isOpen2: true,
    isOpen3: true,
    isOpen4: true,
    isOpen5: true,
};

export function notification(state = initNotificationState, action) {
    switch (action.type) {
        case '@NOTIFICATION/END_GET_INFO':
            return {
                ...state,
                isOpen0: action.notification.general,
                isOpen1: action.notification.invite,
                isOpen2: action.notification.loan,
                isOpen3: action.notification.debt,
                isOpen4: action.notification.newcredit,
                isOpen5: action.notification.note,
            };
        case '@NOTIFICATION/TOGGLE_NOTIFICATION':
            switch (action.index) {
                case 0:
                    return {
                        ...state,
                        isOpen0: !state.isOpen0,
                    };
                case 1:
                    return {
                        ...state,
                        isOpen1: !state.isOpen1,
                    };
                case 2:
                    return {
                        ...state,
                        isOpen2: !state.isOpen2,
                    };
                case 3:
                    return {
                        ...state,
                        isOpen3: !state.isOpen3,
                    };
                case 4:
                    return {
                        ...state,
                        isOpen4: !state.isOpen4,
                    };
                case 5:
                    return {
                        ...state,
                        isOpen5: !state.isOpen5,
                    };
                default:
                    return state;
            }
        case '@NOTIFICATION/END_UPDATE':
            return state;
        default:
            return state;
    }
}

const initFollowingState = {
    info: [], // TODO: set as database
};

export function following(state = initFollowingState, action) {
    switch (action.type) {
        case '@FOLLOWING/END_LIST_FOLLOWINGS':
            return {
                ...state,
                info: action.followings,
            };
        default:
            return state;
    }
}