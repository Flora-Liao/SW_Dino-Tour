import axios from 'axios';
import serverUrl from '../utility.js';

// checked

export function listNotes(scheduleId) {
    let url = `${serverUrl}/note/listNotes?scheduleId=${scheduleId}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function createNewNote(userId, scheduleId, content, colour = 'blue') {
    let url = `${serverUrl}/note/newNote`;

    console.log(`Making POST request to: ${url}`);

    return axios
        .post(url, {
            userId,
            scheduleId,
            content,
            colour
        })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}

export function deleteNote(noteId) {
    let url = `${serverUrl}/note/deleteNote`;

    console.log(`Making POST request to: ${url}`);

    return axios
        .post(url, {
            noteId,
        })
        .then(function (res) {
            if (res.status !== 200)
                throw new Error(`Unexpected response code: ${res.status}`);

            return res.data;
        });
}