//axios - Promise based HTTP client for the browser and node.js
import request from 'axios';
import config from '../config'

export const STAT_GET = 'STAT_GET';
export const STAT_GET_REQUEST = 'STAT_GET_REQUEST';
export const STAT_GET_SUCCESS = 'STAT_GET_SUCCESS';
export const STAT_GET_FAILURE = 'STAT_GET_FAILURE';

/*Action Creator functions*/
export function statGet() {

    return {
        type: STAT_GET,
        promise: request.get(`${config.fireDb}stats/sale.json`),
        obj: true
    };
}

export function getStatsIfNeeded() {

    return (dispatch, getState) => {
        var stat = getState().stat;
        if (!Object.keys(stat.stat).length) {

            return dispatch(statGet());
        } else {
            return stat;
        }
    }
}



