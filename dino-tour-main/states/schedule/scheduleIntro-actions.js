import { simulateServerFlag as flag } from '../utility.js';

export function getTagIntro(scheduleId) {

}

function endGetTagIntro(data) {
    return {
        type: '@SCHEDULEINTRO/END_GET_TAG_INTRO',
        data: data,
    };
}

export function updateScheduleIntro(userId, scheduleId, description) {
    if (flag) {
        return endUpdateScheduleIntro();
    } else {
        // TODO
    }
}

function endUpdateScheduleIntro() {
    return {
        type: '@SCHEDULEINFO/END_UPDATE_SCHEDULE_INTRO'
    };
}

// export function setIntro(text) {
//     return {
//         type: '@SCHEDULEINTRO/SET_INTRO',
//         text: text,
//     };
// }

export function addTag(userId, scheduleId, tag) {

}

function endAddTag() {
    return {
        type: '@SCHEDULEINTRO/ADD_TAG'
    };
}

export function deleteTag(tagId, index) {

}

function endDeleteTag() {
    return {
        type: '@SCHEDULEINTRO/DELETE_TAG'
    };
}

/* Input for Tag */

// export function setInputTag(text) {
//     return {
//         type: '@SCHEDULEINTRO/SET_INPUT_TAG',
//         text: text,
//     };
// }