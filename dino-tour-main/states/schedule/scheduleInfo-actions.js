import { simulateServerFlag as flag } from '../utility.js';
import {
    getScheduleInfo as getScheduleInfoApi,
    updateScheduleInfo as updateScheduleInfoApi,
    updateScheduleIntro as updateScheduleIntroApi,
    updateScheduleImage as updateScheduleImageApi,
    addMember as addMemberApi,
    deleteMember as deleteMemberApi,
    addTag as addTagApi,
    deleteSchedule as deleteScheduleApi,
} from '../../api/schedule/scheduleInfo.js';

const randomInfo = {
    // Add casual data
};

export function getScheduleInfo(scheduleId, userId) {
    if (flag) {
        return endGetScheduleInfo(randomInfo);
    } else {
        return (dispatch, getState) => {
            return getScheduleInfoApi(scheduleId, userId).then(info => {
                dispatch(endGetScheduleInfo(info));
            }).catch(err => {
                console.error('Error get schedule info', err);
            });
        };
    }
}

function endGetScheduleInfo(info) {
    return {
        type: '@SCHEDULEINFO/END_GET_SCHEDULE_INFO',
        info: info,
    };
}

export function deleteSchedule() {
    if (flag) {
        return endDeleteSchedule();
    } else {
        // TODO
    }
}

function endDeleteSchedule() {
    return {
        type: '@SCHEDULEINFO/END_DELETE_SCHEDULE'
    };
}

/* Update */

export function updateScheduleInfo(userId, scheduleId, scheduleName, startDate, endDate, isPublic) {
    if (flag) {
        return endUpdateScheduleInfo();
    } else {
        // TODO
    }
}

function endUpdateScheduleInfo() {
    return {
        type: '@SCHEDULEINFO/END_UPDATE_SCHEDULE_INFO'
    };
}



export function updateScheduleImage(userId, scheduleId, image) {
    if (flag) {
        return endUpdateScheduleImage();
    } else {
        // TODO
    }
}

function endUpdateScheduleImage() {
    return {
        type: '@SCHEDULEINFO/END_UPDATE_SCHEDULE_IMAGE'
    };
}

export function updateScheduleBudget(userId, scheduleId, budget) {
    if (flag) {
        return endUpdateScheduleBudget();
    } else {
        // TODO
    }
}

function endUpdateScheduleBudget() {
    return {
        type: '@SCHEDULEINFO/END_UPDATE_SCHEDULE_BUDGET'
    };
}

/* Modify Member and Tag */

export function addMember(userId, memberAccount, scheduleId) {
    if (flag) {
        return endAddMember();
    } else {
        // TODO
    }
}

function endAddMember() {
    return {
        type: '@SCHEDULEINFO/END_ADD_MEMBER'
    };
}

export function deleteMember(userId, memberAccount, scheduleId) {
    if (flag) {
        return endDeleteMember();
    } else {
        // TODO
    }
}

function endDeleteMember() {
    return {
        type: '@SCHEDULEINFO/END_DELETE_MEMBER'
    };
}

/* General */

export function setScheduleName(name) {
    return {
        type: '@SCHEDULEINFO/SET_SCHEDULE_NAME',
        name: name,
    };
}

export function setStartDate(date) {
    return {
        type: '@SCHEDULEINFO/SET_START_DATE',
        date: date,
    };
}

export function setEndDate(date) {
    return {
        type: '@SCHEDULEINFO/SET_END_DATE',
        date: date,
    };
}

export function togglePublic() {
    return {
        type: '@SCHEDULEINFO/TOGGLE_PUBLIC'
    };
}

export function changeCoverImage(img) {
    return {
        type: '@SCHEDULEINFO/CHANGE_COVER_IMAGE',
        img: img,
    };
}

/* Money */

export function setPersonalBudget(budget) {
    return {
        type: '@SCHEDULEINFO/SET_PERSONAL_BUDGET',
        budget: budget,
    };
}