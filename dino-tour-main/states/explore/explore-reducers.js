const initExploreState = {
    searchText: '',
    key: 'Economic',
    planes: [], // (id, name, owner, startdate, vote, img)
};

export function explore(state = initExploreState, action) {
    switch (action.type) {
        case '@EXPLORE/END_LIST_EXPLORE':
            var newplanes = action.tourlist.map((obj) => {
                var vote_by_key = 0;
                if (action.key == 'Economic') {
                    vote_by_key = obj.vote_e;
                } else if (action.key == 'Popular') {
                    vote_by_key = obj.vote_p;
                } else if (action.key == 'Delicious') {
                    vote_by_key = obj.vote_d;
                }
                return {
                    id: obj.scheduleid,
                    name: obj.schedulename,
                    owner: obj.author,
                    startdate: obj.startdate.substring(0, 10),
                    vote: vote_by_key,
                    // TODO: img 
                };
            })

            return {
                ...state,
                planes: newplanes,
                key: action.key,
            };
        case '@EXPLORE/SET_SEARCHTEXT':
            return {
                ...state,
                searchText: action.searchText,
            };
        default:
            return state;
    }
}