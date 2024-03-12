const initTravelFormState = {
    id: NaN,
    name: 'Dino Tour',
    startDate: today.toISOString().split('T')[0],
    endDate: today.toISOString().split('T')[0],
    budget: 1000,
    remain: 1000,
    author: NaN, // {id, name, photo}
    member: [], // { account, photo, name }
    cover: null, // TODO
    togglePublic: false,
    toggleCreateLedger: true,
};

export function scheduleInfo(state = initTravelFormState, action) {
    switch (action.type) {
        case '@SCHEDULEINFO/END_GET_SCHEDULE_INFO':
        // TODO
        case '@SCHEDULEINFO/END_UPDATE_SCHEDULE_INFO':
        // TODO
        case '@SCHEDULEINFO/SET_SCHEDULE_NAME':
            return {
                ...state,
                name: action.name,
            };
        case '@SCHEDULEINFO/SET_START_DATE':
            return {
                ...state,
                startDate: action.date,
            };
        case '@SCHEDULEINFO/SET_END_DATE':
            return {
                ...state,
                endDate: action.date,
            };
        case '@SCHEDULEINFO/TOGGLE_PUBLIC':
            return {
                ...state,
                togglePublic: !state.togglePublic,
            };
        case '@SCHEDULEINFO/SET_INTRO':
            return {
                ...state,
                introduction: action.text,
            };
        case '@SCHEDULEINFO/CHANGE_COVER_IMAGE':
            return {
                ...state,
                cover: action.img,
            };
        case '@SCHEDULEINFO/SET_PERSONAL_BUDGET':
            return {
                ...state,
                budget: action.budget,
            };
        case '@SCHEDULEINFO/ADD_MEMBER':
            // TODO
            // var newmember
            return {
                ...state,
                member: [state.member, newmember],
            };
        case '@SCHEDULEINFO/DELETE_MEMBER':
            return {
                ...state,
                member: state.member.filter((_, i) => i !== action.index),
            };
        default:
            return state;
    }
}