import {
    STAT_GET_REQUEST,
    STAT_GET_SUCCESS,
    STAT_GET_FAILURE,

} from '../actions/stat';

export default function stat(state = {isFetching: false, stat: {}, error: null}, action) {
    switch (action.type) {
        case STAT_GET_REQUEST:
            return Object.assign(
                {},
                state,
                {
                    isFetching: true
                }
            );
            break;
        case STAT_GET_SUCCESS:
            return Object.assign(
                {},
                state,
                {
                    isFetching: false,
                    error: false,
                    stat: action.items
                });
            break;
        case STAT_GET_FAILURE:
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