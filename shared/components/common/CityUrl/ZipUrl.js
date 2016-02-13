'use strict';

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import _ from 'lodash';
export default (props)=> {

    return (
        <Link className={props.className?props.className:""}
              to={"/" + props.url + "/" + props.city.toLowerCase().replace(/\s+/g, '-') +"/" + props.zip}>{_.startCase(props.anchor.replace(/-+/g, ' '))}</Link>
    );

}




