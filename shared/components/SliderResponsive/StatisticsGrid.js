'use strict';
import React, {Component, PropTypes} from 'react';
import Grid, {Cell} from 'react-mdl/lib/Grid';
import {Card, CardTitle, CardActions} from 'react-mdl/lib/Card';
import _ from 'lodash';

if (process.env.BROWSER) {
    require('./StatisticsGrid.less');
}
export default class StatisticsGrid extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid>
                <Cell col={4} phone={12}>
                    <div className="StatisticsGrid__card-content">
                        <h3 className="StatisticsGrid__header">Property</h3>
                        <p className="StatisticsGrid__price">Price</p>
                        <a className="StatisticsGrid__link" href="">See # listings for sale</a>
                    </div>
                </Cell>
            </Grid>
        );
    }
}