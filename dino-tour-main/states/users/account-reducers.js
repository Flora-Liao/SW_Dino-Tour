export function account(state = '', action) {
    switch (action.type) {
        case '@ACCOUNT/END_DELETE_ACCOUNT':
            return state;
        default:
            return state;
    }
}

const initLoginState = {
    account: '',
    password: '',
    id: 0,
};

export function loginPage(state = initLoginState, action) {
    switch (action.type) {
        case '@LOGIN/END_LOGIN':
            return {
                ...state,
                id: action.userId,
            };
        case '@LOGIN/SET_INPUT_ACCOUNT':
            return {
                ...state,
                account: action.account,
            };
        case '@LOGIN/SET_INPUT_PASSWORD':
            return {
                ...state,
                password: action.password,
            };
        default:
            return state;
    }
}

const initSignUpState = {
    account: '',
    password: '',
    name: '',
    id: 0,
}

export function signUpPage(state = initSignUpState, action) {
    switch (action.type) {
        case '@SIGNUP/END_CREATE_ACCOUNT':
            return {
                ...state,
                id: action.userId,
            };
        case '@SIGNUP/SET_NEW_ACCOUNT':
            return {
                ...state,
                account: action.account,
            };
        case '@SIGNUP/SET_NEW_PASSWORD':
            return {
                ...state,
                password: action.password,
            };
        case '@SIGNUP/SET_NEW_USERNAME':
            return {
                ...state,
                name: action.username,
            };
        default:
            return state;
    }
}