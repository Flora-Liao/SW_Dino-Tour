const initNoteState = {
    notes: [], // (userAccount, noteId, userPhoto, userWord, color)
};

const colors = ['#FAF7B3', '#B3CFFA', '#CDE7BD', '#FAD1B3'];

export function note(state = initNoteState, action) {
    switch (action.type) {
        case '@NOTE/END_LIST_NOTES':
            return {
                ...state,
                notes: action.notes.map((obj) => {
                    let randomIdx = Math.floor(Math.random() * 4);
                    return {
                        userAccount: obj.userinfo.useraccount,
                        noteId: obj.noteid,
                        // TODO: userPhoto: obj.userinfo.photo
                        userWord: obj.content,
                        color: colors[randomIdx],
                    };
                })
            };
        case '@NOTE/END_CREATE_NEW_NOTE':
            let randomIdx = Math.floor(Math.random() * 4);
            return {
                ...state,
                notes: [
                    {
                        userAccount: action.userAccount,
                        noteId: action.noteId,
                        userPhoto: action.myPhoto,
                        userWord: content,
                        color: colors[randomIdx],
                    },
                ]
            }
        case '@NOTE/END_DELETE_NOTE':
            return {
                ...state,
                notes: state.notes.splice(action.index, 1),
            }
        default:
            return state;
    }
}

// export function noteForm(state, action) {
//     switch (action.type) {
//         default:
//             return state;
//     }
// }