const initArrearState = {
    name: 'na',
    currentAccount: 'na',
    members: [], // (useraccount, username, userphoto)
    unrecoveredCredit: [], // (account, name, money, mark(bool))
    unPaidCredit: [], // (name, money)
};

export function arrear(state = initArrearState, action) {
    switch (action.type) {
        case '@ARREAR/END_GET_INFO':
            return {
                ...state,
                name: action.ledgername,
                currentAccount: action.members[0].useraccount,
                members: action.members,
            };
        case '@ARREAR/SET_CURRENT':
            return {
                ...state,
                currentAccount: action.account,
            };
        case '@ARREAR/END_LIST_RECOVER':
            return {
                ...state,
                unrecoveredCredit: action.debts.filter(obj => {
                    return obj.debt < 0;
                }).map(obj => {
                    return {
                        account: obj.account,
                        name: obj.name,
                        money: obj.debt,
                        mark: false,
                    };
                }),
            };
        case '@ARREAR/END_LIST_PAYMENT':
            return {
                ...state,
                unPaidCredit: action.debts.filter(obj => {
                    return obj.debt > 0;
                }).map(obj => {
                    return {
                        name: obj.name,
                        money: -obj.debt,
                    };
                }),
            }
        case '@ARREAR/MARK_RECOVER_CREDIT':
            var newUnrecoveredCredit = state.unrecoveredCredit;
            newUnrecoveredCredit[action.index].mark = !newUnrecoveredCredit[action.index].mark;
            return {
                ...state,
                unrecoveredCredit: newUnrecoveredCredit,
            }
        case '@ARREAR/END_DELETE_RECOVER_CREDIT':
            return {
                ...state,
                unrecoveredCredit: action.credit,
            }
        default:
            return state;
    }
}