'use strict';
import {combineReducers} from 'redux';

import {reducer as form} from 'redux-form';
import user from './user';
import url from './url';
import articles from './article';
import cities from './cities';
import stat from './stat';
import rentCities from './rentCities';
import cityInfo from './cityInfo';
import houses from './houses';
import house from './house';

const rootReducer = combineReducers({
    url,
    form,
    rentCities,
    cities,
    stat,
    cityInfo,
    articles,
    houses,
    house,
    user
});

export default rootReducer;
