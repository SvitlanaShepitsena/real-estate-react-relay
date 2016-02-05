'use strict';

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import _ from 'lodash';
export default (props)=> {

    return (
        <Link className={props.className?props.className:""}
              to={props.url.toLowerCase().replace(/\s+/g, '-')}>{_.startCase(props.anchor.replace(/-+/g, ' '))}</Link>
    );

}




