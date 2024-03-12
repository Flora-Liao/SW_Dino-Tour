const spotInitState = {
    spotName: '',
    positionX: NaN,
    positionY: NaN,
    spotImage: null,
    timeIdleHour: 0,
    timeIdleMin: 0,
    moneySpend: 0,
    traffic: ''
}

export function spot(state = spotInitState, action) {
    switch (action.type) {
        case '@SPOT/SET_SPEND':
            return {
                ...state,
                moneySpend: action.money,
            }
        case '@SPOT/SET_TIME_HOUR':
            return {
                ...state,
                timeIdleHour: action.hour,
            }
        case '@SPOT/SET_TIME_MIN':
            return {
                ...state,
                timeIdleMin: action.min,
            }
        case '@SPOT/SET_SPOT_BASIC':
            return {
                ...state,
                spotName: action.spotName,
                spotImage: action.spotImage,
                spotX: action.spotX,
                spotY: action.spotY,
            }
        case '@SPOT/SET_SPOT_TRAFFIC':
            return {
                ...state,
                traffic: action.traffic,
            }

        default:
            return state;
    }
}

const spotSearchBarInit = {
    spotSearchInput: ''
}

export function spotSearchBar(state = spotSearchBarInit, action) {
    switch (action.type) {
        case '@SPOTSEARCHBAR/SET_SEARCH_SPOT':
            return {
                ...state,
                spotSearchInput: action.searchInput,
            }
        default:
            return state;
    }
}

const spotSearchInit = {
    spotResults: []
}

export function spotSearch(state = spotSearchInit, action) {
    switch (action.type) {
        default:
            return state;
    }
}