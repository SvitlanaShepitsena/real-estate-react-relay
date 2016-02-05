'use strict';

import React, {Component, PropTypes} from 'react';
import {Card, CardTitle, CardActions, CardText} from 'react-mdl/lib/Card';
import {Link} from 'react-router';
import _ from 'lodash';

export default class CityZips extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let cityInfo = this.props.cityInfo;

        let types = [];
        let allHouses = [];
        _.values(_.values(cityInfo)).forEach(zip=> {
            let houses = (_.map(_.values(zip), 'type'));
            allHouses = _.concat(allHouses, houses);
        });

        let propsCount = _.countBy(_.flatten(allHouses));

        _.forOwn(propsCount, (val, key)=> {
            types.push({type: key, count: val});
        })

        this.types = types;
        this.zips = _.keys(cityInfo).map(key=> {

            let numberHouses = _.keys(cityInfo[key]).length;
            return {zip: key, count: numberHouses};
        });

        let cityName = _.startCase(this.props.params.city.replace(/-+/g, ' '));
        let saleRent = this.props.location.pathname.indexOf('sale') > -1 ? 'sale' : 'rent';

        return (
            <Card shadow={0}
                  style={{height: 'auto', width:'100%', background: '#ffffff', color: '#393939'}}>
                <CardTitle style={{color: '#393939', width:'100%'}}>
                    <h4 style={{margin: '0',fontSize:22, fontWeight:300}}>{cityName} Zip Codes</h4>
                </CardTitle>
                <CardText
                    style={{width:'100%',margin:0, borderTop: '1px #E0E0E0 solid', boxSizing: 'border-box', color: '#393939'}}>
                    <ul
                        style={{listStyle:'none', margin:'0px', padding:'0px'}}>
                        {this.zips && this.zips.map(zip=> {
                            return (
                                <li key={zip.zip} style={{padding: 0}}>
                                    <h5 style={{marginTop: 0, fontSize: 15, fontWeight: 500}}>
                                        <Link
                                            to={(saleRent == "sale" ? "/houses-for-sale/" : "/apartments-for-rent/") + `${cityName.toLowerCase().replace(/\s+/g, '-')}/${zip.zip}`}
                                            style={{textDecoration: 'none', color: '#393939', fontSize: 18}}
                                        >
                                            {zip.zip}({zip.count})
                                        </Link>
                                    </h5>
                                </li>
                            )
                        })
                        }
                    </ul>
                </CardText>
            </Card>
        );
    }
}




