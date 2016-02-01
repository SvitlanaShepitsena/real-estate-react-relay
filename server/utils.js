'use strict';
import Promise     from 'bluebird';
import geoip       from 'geoip-lite';
import strformat   from 'strformat';
import _ from 'lodash';

import clientConfig                     from '../etc/client-config.json';
import {getSupportedLocales, sprintf} from '../shared/utils';

export function fetchComponentsData(dispatch, components, params, location) {
    // Select components that have assync request for the specific route
    let needs = [];
    for (var i = 0; i < components.length; i++) {
        var component = components[i];
        component = component.WrappedComponent ? component.WrappedComponent : component;
        if (component.need) {
            needs.push(...component.need);
        }
    }
    needs = _.takeRight(needs);
    console.log(needs);
    const promises = needs.map(need => {
        return dispatch(need(params,location));
    });

    return Promise.all(promises);
}

export function getMetaDataFromState({route, state, lang = 'en'}) {
    if (route === '/articles/:id') {
        const {name, message, pictureURL} = state.currentArticle.article;
        return {
            title: name,
            siteName: "Re/Max 1st Class",
            image: pictureURL ? pictureURL.replace('svg', 'png') : '',
            description: message
        };
    }

}

export function makeRedirectUrl({originalUrl}) {
    const UIHousesForSalePath = `${clientConfig.embedOrigin}/houses-for-sale`;
    return `${UIHousesForSalePath}${originalUrl}`;
}

export function detectLocale(req) {
    // Take locale passed by user
    const passedLocale = ( req.query.locale || req.cookies.locale || '' ).toLowerCase();
    if (getSupportedLocales().indexOf(passedLocale) >= 0) {
        return passedLocale;
    }

    // Detect locale by ip
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress;
    const geo = geoip.lookup(ip);
    const country = ( geo && geo.country );

    return {
            'UA': 'uk',
            'RU': 'ru'
        }[country] || 'en';
}

