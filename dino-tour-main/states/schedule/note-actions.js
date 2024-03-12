import { simulateServerFlag as flag } from '../utility.js';
import {
    listNotes as listNotesApi,
    createNewNote as createNewNoteApi,
    deleteNote as deleteNoteApi,
} from '../../api/schedule/note.js';

/* Overall */

/*
yellow: #FAF7B3
blue: #B3CFFA
green: #CDE7BD
red: #FAD1B3
*/

const randomNotes = [
    // Add casual data
    {
        noteid: 1,
        userinfo: {
            useraccount: 'aftermaaath',
            username: 'aftermath',
            // userphoto:
        },
        content: 'this is a note.',
        colour: '#B3CFFA',
    },
    {
        noteid: 2,
        userinfo: {
            useraccount: 'yju',
            username: 'yju',
            // userphoto:
        },
        content: 'Roses are red.',
        colour: '#FAD1B3',
    }
]


export function listNotes(scheduleId) {
    if (flag) {
        return endListNotes(randomNotes);
    } else {
        return (dispatch, getState) => {
            return listNotesApi(scheduleId).then(notelist => {
                dispatch(endListNotes(notelist));
            }).catch(err => {
                console.error('Error list notes', err);
            });
        };
    }
}

function endListNotes(notes) {
    return {
        type: '@NOTE/END_LIST_NOTES',
        notes: notes,
    };
}

export function createNewNote(content, scheduleId, userId, myPhoto, userAccount) {
    if (flag) {
        return endCreateNewNote(content, 1, userAccount, myPhoto);
    } else {
        return (dispatch, getState) => {
            return createNewNoteApi(userId, scheduleId, content).then(note => {
                dispatch(endCreateNewNote(content, note.newnote, userAccount, myPhoto));
            }).catch(err => {
                console.error('Error list notes', err);
            });
        };
    }
}

function endCreateNewNote(content, noteId, userAccount, myPhoto) {
    return {
        type: '@NOTE/END_CREATE_NEW_NOTE',
        content: content,
        noteId: noteId,
        userAccount: userAccount,
        myPhoto: myPhoto,
    };
}

export function deleteNote(noteId, index) {
    if (flag) {
        return endDeleteNote();
    } else {
        return (dispatch, getState) => {
            return deleteNoteApi(noteId).then(p => {
                dispatch(endDeleteNote(index));
            }).catch(err => {
                console.error('Error list notes', err);
            });
        };
    }
}

function endDeleteNote(index) {
    return {
        type: '@NOTE/END_DELETE_NOTE',
        index: index,
    };
}

// boolean, whether it is creating new note now 
// export function setCreateMode() {
//     return {
//         type: '@NOTE/SET_CREATE_MODE'
//     };
// }

// /* New Note */

// export function inputText() {
//     return {
//         type: '@NOTEFORM/INPUT_TEXT'
//     };
// }

// export function changeColor() {
//     return {
//         type: '@NOTEFORM/CHANGE_COLOR'
//     };
// }