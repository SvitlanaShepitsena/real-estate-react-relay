'use strict';

import React, {Component, PropTypes} from 'react';
import {Card, CardTitle, CardActions, CardText} from 'react-mdl/lib/Card';
import {Link} from 'react-router';
import _ from 'lodash';

export default class CityPropTypes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let types = [];
        let cityInfo = this.props.cityInfo;
        let allHouses = [];
        _.values(_.values(cityInfo)).forEach(zip=> {
            let houses = (_.map(_.values(zip), 'type'));
            allHouses = _.concat(allHouses, houses);
        });

        let propsCount = _.countBy(_.flatten(allHouses));
        _.forOwn(propsCount, (val, key)=> {
            types.push({type: key, count: val});
        })
        this.cityTypes = types;
        return (
            <Card shadow={0}
                  style={{height: 'auto', width: '100%', background: '#ffffff', color: '#393939'}}>
                <CardTitle style={{width: '100%'}}>
                    <h4 style={{margin: '0', fontSize: 22, fontWeight: 300}}> Property Types </h4>
                </CardTitle>
                <CardText
                    style={{width: '100%', margin: 0, borderTop: '1px #E0E0E0 solid', boxSizing: 'border-box'}}>
                    {this.cityTypes && this.cityTypes.map(type=> {
                        return (
                            <h5 style={{marginTop:0,fontSize:15, fontWeight:500}} key={type.type}>
                                <Link
                                    to={this.props.location.pathname+'/'+ type.type.replace(/\s+/g,'-').toLowerCase()}
                                    style={{color: '#393939',textDecoration:'none'}}>
                                    {`${type.type}(${type.count})`}
                                </Link>
                            </h5>
                        );
                    })}
                </CardText>
            </Card>
        );
    }
}




