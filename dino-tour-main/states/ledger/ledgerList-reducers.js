const initLedgerListState = {
    ledgersInfo: [], // (id, name, img, memberImg, date, isCleanedUp)
    total: 0,
};

export function ledgerList(state = initLedgerListState, action) {
    switch (action.type) {
        case '@LEDGERLIST/END_LIST_LEDGER':
            var newLedgersInfo = action.ledger.map(obj => {
                return {
                    id: obj.schedulecard.scheduleid,
                    name: obj.schedulecard.schedulename,
                    // TODO: handle image
                    // img: obj.schedulecard.scheduleimage,
                    // memberImg: obj.listofmembers.map(member => {
                    //     return member.userphoto;
                    // }),
                    date: obj.schedulecard.startdate.substring(0, 10),
                    isCleanedUp: obj.iscleanedup,
                }
            });
            return {
                ...state,
                ledgersInfo: newLedgersInfo,
            };
        default:
            return state;
    }
}