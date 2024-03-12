import axios from 'axios';
import serverUrl from '../utility.js';

export function getScheduleInfo(scheduleId, userId) {
    let url = `${serverUrl}/scheduleInfo/getScheduleInfo?userId=${userId}&scheduleId=${scheduleId}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

getScheduleInfo(1, 1).then(data => console.log(data));

export function updateScheduleInfo(userId, scheduleId, scheduleName, startDate, endDate, isPublic) {
    let url = `${serverUrl}/scheduleInfo/updateSchedule`;

    console.log(`Making POST request to: ${url}`);

    return axios
        .post(url, {
            userId,
            scheduleId,
            scheduleName,
            startDate,
            endDate,
            isPublic
        })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}

export function updateScheduleBudget(userId, scheduleId, budget) {
    let url = `${serverUrl}/scheduleInfo/updateMember`;

    console.log(`Making POST request to: ${url}`);

    return axios
        .post(url, {
            userId,
            scheduleId,
            budget
        })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}

export function updateScheduleIntro(userId, scheduleId, description) {
    let url = `${serverUrl}/scheduleInfo/updateScheduleDescription`;

    console.log(`Making POST request to: ${url}`);

    return axios
        .post(url, {
            userId,
            scheduleId,
            description
        })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}

export function updateScheduleImage(userId, scheduleId, image) {
    let url = `${serverUrl}/scheduleInfo/updateScheduleImage`;

    console.log(`Making POST request to: ${url}`);

    return axios
        .post(url, {
            userId,
            scheduleId,
            image,
        })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}

export function addMember(userId, memberAccount, scheduleId, budget = 1000) {
    let url = `${serverUrl}/scheduleInfo/newMember`;

    console.log(`Making POST request to: ${url}`);

    return axios
        .post(url, {
            userId,
            memberAccount,
            scheduleId,
            budget
        })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}

// ?
//addMember(1, 'aftermath', 1);

export function deleteMember(userId, memberAccount, scheduleId) {
    let url = `${serverUrl}/scheduleInfo/deleteMember`;

    console.log(`Making POST request to: ${url}`);

    return axios
        .post(url, {
            userId,
            memberAccount,
            scheduleId,
        })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}

// ? Testing
// deleteMember(1, 'aftermath', 1).then(data => {console.log(data)});

export function addTag(userId, scheduleId, tag) {
    let url = `${serverUrl}/scheduleInfo/newTag`;

    console.log(`Making POST request to: ${url}`);

    return axios
        .post(url, {
            userId,
            scheduleId,
            tag,
        })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}

// ? Testing
addTag(1, 1, 'test tag').then(data => {console.log(data)});

export function deleteTag(tagId) {
    let url = `${serverUrl}/scheduleInfo/deleteTag`;

    console.log(`Making POST request to: ${url}`);

    return axios
        .post(url, {
            tagId,
        })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}

export function deleteSchedule(userId, scheduleId) {
    let url = `${serverUrl}/scheduleInfo/deleteSchedule`;

    console.log(`Making POST request to: ${url}`);

    return axios
        .post(url, {
            userId,
            scheduleId,
        })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}


