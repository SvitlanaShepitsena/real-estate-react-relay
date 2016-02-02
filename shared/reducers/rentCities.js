import {
    RENT_CITIES_GET_REQUEST,
    RENT_CITIES_GET_SUCCESS,
    RENT_CITIES_GET_FAILURE,

} from '../actions/rentCities';

export default function rentCities(state = {isFetching: false, rentCities: [], error: null}, action) {
    switch (action.type) {
        case RENT_CITIES_GET_REQUEST:
            return Object.assign(
                {},
                state,
                {
                    isFetching: true
                }
            );
            break;
        case RENT_CITIES_GET_SUCCESS:
            return Object.assign(
                {},
                state,
                {
                    isFetching: false,
                    error: false,
                    rentCities: action.items
                });
            break;
        case RENT_CITIES_GET_FAILURE:
            return Object.assign(
                {},
                state,
                {
                    error: action.error,
                    isFetching: false
                });
            break;

        default:
            return state;
    }
}