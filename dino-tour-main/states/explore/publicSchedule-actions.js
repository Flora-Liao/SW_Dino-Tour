import { simulateServerFlag as flag } from '../utility.js';

/* General */

const randomPublicSchedule = {
    // Add casual data
};

export function getScheduleGeneral(scheduleId, userId) {
    if (flag) {
        return endGetScheduleGeneral(randomPublicSchedule);
    } else {
        // TODO
    }
}

function endGetScheduleGeneral(content) {
    return {
        type: '@PUBLICSCHEDULE/END_GET_GENERAL',
        content: content,
    };
}

export function setScheduleContent(day) {
    return {
        type: '@PUBLICSCHEDULE/SET_SCHEDULE_CONTENT',
        day: day,
    };
}

export function toggleLikeSchedule(ley) {
    if (flag) {
        return endToggleLikeSchedule(key);
    } else {
        // TODO
    }
}

function endToggleLikeSchedule(key) {
    return {
        type: '@PUBLICSCHEDULE/END_TOGGLE_LIKE',
        key: key,
    };
}

export function toggleCollection(scheduleId, userId) {
    if (flag) {
        return endToggleCollection();
    } else {
        // TODO
    }
}

function endToggleCollection() {
    return {
        type: '@PUBLICSCHEDULE/END_TOGGLE_COLLECTION'
    };
}

/* Schedule Info Page*/

const randomScheduleInfo = {
    // Add casual data
};

export function getScheduleInfo(scheduleId, userId) {
    if (flag) {
        return endGetScheduleInfo(randomScheduleInfo);
    } else {
        // TODO
    }
}

function endGetScheduleInfo(info) {
    return {
        type: '@PUBLICSCHEDULEINFO/END_GET_INFO',
        info: info,
    };
}

/* View Spot Page*/

const randomSpotInfo = {
    // Add casual data
};

export function getSpotInfo(eventId, userId) {
    if (flag) {
        return endGetSpotInfo(randomSpotInfo);
    } else {
        // TODO
    }
}

function endGetSpotInfo(info) {
    return {
        type: '@SPOTINFO/END_GET_INFO',
        info: info,
    };
}