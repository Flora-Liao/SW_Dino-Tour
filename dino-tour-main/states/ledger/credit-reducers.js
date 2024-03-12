const initCreditListState = {
    creditList: [], // (date, name, credit, payer)
};

export function creditList(state = initCreditListState, action) {
    switch (action.type) {
        case '@CREDITLIST/END_LIST_CREDIT':
            return {
                ...state,
                creditList: action.credits.map((obj) => {
                    return {
                        date: obj.createdate.substring(0, 10),
                        name: obj.description,
                        credit: obj.amount,
                        payer: obj.payer,
                    };
                }),
            };
        default:
            return state;
    }
}

const initCreditFormState = {
    LedgerName: '',
    creditName: '',
    creditValue: 0,
    payerButton: [], // bool array
    debtorButton: [], // bool array, the first specifies everyone
    memberName: [], // string array, username
    memberAccount: [], // string array, account
};

export function creditForm(state = initCreditFormState, action) {
    switch (action.type) {
        case '@CREDITFORM/END_GET_CREDIT_FORM':
            return {
                ...state,
                LedgerName: action.ledgername,
                memberName: action.members.map((member) => {
                    return member.username;
                }),
                memberAccount: action.members.map((member) => {
                    return member.useraccount;
                }),
                payerButton: action.members.map((member) => {
                    return false;
                }),
                debtorButton: action.members.map((member) => {
                    return false;
                }),
            };
        case '@CREDITFORM/END_ADD_CREDIT':
            return state;
        case '@CREDITFORM/SET_CREDIT_NAME':
            return {
                ...state,
                creditName: action.name,
            };
        case '@CREDITFORM/SET_CREDIT_VALUE':
            return {
                ...state,
                creditValue: action.value,
            };
        case '@CREDITFORM/SET_CREDIT_PAYER':
            return {
                ...state,
                payerButton: state.memberName.map(p => {
                    return p === action.payer;
                }),
            };
        case '@CREDITFORM/SET_CREDIT_DEBTOR':
            return {
                ...state,
                debtorButton: state.memberName.map((p, idx) => {
                    if (p === action.debtor) {
                        return !state.debtorButton[idx];
                    } else {
                        return state.debtorButton[idx];
                    }
                }),
            };
        default:
            return state;
    }
}