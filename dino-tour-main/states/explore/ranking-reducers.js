const initRankingState = {
    key: 'Economic',
    planes: [], // (ownerimg, owner, owneraccount, vote)
};

export function ranking(state = initRankingState, action) {
    switch (action.type) {
        case '@RANKING/END_LIST_RANKING':
            var list = action.ranklist.map(obj => {
                return {
                    // TODO: ownerimg: obj.userinfo.userphoto,
                    owner: obj.userinfo.username,
                    owneraccount: obj.userinfo.useraccount,
                    vote: obj.rank,
                };
            });
            return {
                ...state,
                planes: list,
                key: action.key,
            };
        default:
            return state;
    }
}