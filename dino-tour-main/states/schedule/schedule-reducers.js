const initScheduleListState = {
    mySchedules: [], // (scheduleId, authorName, cover, scheduleName, memberPhoto, public, buildDate)
};

export function scheduleList(state = initScheduleListState, action) {
    switch (action.type) {
        default:
            return state;
    }
}