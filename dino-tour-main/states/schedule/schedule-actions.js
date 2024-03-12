/* Schedule List */

export function listMySchedule() {

}

function endListMySchedule() {
    return {
        type: '@SCHEDULELIST/END_LIST_SCHEDULE'
    };
}

/* Single Schedule */

// input parameter: a schedule object. Store it into database.
export function createSchedule() {

}

function endCreateSchedule() {
    return {
        type: '@SCHEDULE/END_CREATE_SCHEDULE'
    };
}