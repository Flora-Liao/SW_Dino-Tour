/* View and Edit */

export function setSpend(money) {
    return {
        type: '@SPOT/SET_SPEND',
        money: money
    };
}

export function setTimeHour(hour) {
    return {
        type: '@SPOT/SET_TIME_HOUR',
        hour: hour
    };
}

export function setTimeMin(min) {
    return {
        type: '@SPOT/SET_TIME_MIN',
        min: min
    };
}

/* Related to Create */

export function setSearchSpot(searchInput) {
    return {
        type: '@SPOTSEARCHBAR/SET_SEARCH_SPOT',
        searchInput: searchInput
    };
}

export function getSearchResult() {

}

function endGetSearchResult(searchResults) {
    return {
        type: '@SPOTSEARCH/END_GET_SEARCH_RESULT',
        searchResults: searchResults
    };
}

export function setSpotBasic(spotName, spotImage, spotX, spotY) {
    return {
        type: '@SPOT/SET_SPOT_BASIC',
        spotName: spotName,
        spotImage: spotImage,
        spotX: spotX,
        spotY: spotY
    };
}

// adding

export function setSpotTraffic(spotTraffic) {
    return {
        type: '@SPOT/SET_SPOT_TRAFFIC',
        spotTraffic: spotTraffic
    };
}