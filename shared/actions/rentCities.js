//axios - Promise based HTTP client for the browser and node.js
import request from 'axios';
import config from '../config'

export const RENT_CITIES_GET = 'RENT_CITIES_GET';
export const RENT_CITIES_GET_REQUEST = 'RENT_CITIES_GET_REQUEST';
export const RENT_CITIES_GET_SUCCESS = 'RENT_CITIES_GET_SUCCESS';
export const RENT_CITIES_GET_FAILURE = 'RENT_CITIES_GET_FAILURE';

/*Action Creator functions*/
export function rentCitiesGet() {
    return {
        type: RENT_CITIES_GET,
        promise: request.get(`${config.fireDb}rent.json?shallow=true`),
        obj: true
    };
}

export function getRentCitiesIfNeeded() {
    return (dispatch, getState) => {
        var rentCities = getState().rentCities;
        if (!rentCities.length) {

            return dispatch(rentCitiesGet());
        } else{
            return rentCities;
        }

    };
}



