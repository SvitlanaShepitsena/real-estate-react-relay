'use strict'

import clientConfig from './client-config.json';

import PORT from '../server/port';
export default function (host) {
    if (!host) {

        return JSON.parse(JSON.stringify(clientConfig));
    }
    let jsSettings = JSON.stringify(clientConfig);
    if (process.env.NODE_ENV !== 'development') {
        jsSettings = jsSettings.replace(/(3001)|(8050)/g, PORT);
        if (host.indexOf('local') === -1) {
            jsSettings = jsSettings.replace(/localhost/g, host);
            //jsSettings = jsSettings.replace(/http:/g, 'https:');
            // if on Heroku

        }

    }
    jsSettings = JSON.parse(jsSettings);
    if (host.indexOf('local') === -1) {
        jsSettings.staticUrl = jsSettings.staticUrl.replace(`:${PORT}`, '');
        jsSettings.socialAuthURL = jsSettings.socialAuthURL.replace(`:${PORT}`, '');
    }
    return jsSettings;
};

