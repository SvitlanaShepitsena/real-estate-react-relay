'use strict';

import React, {Component, PropTypes} from 'react';
import Helmet from "react-helmet";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ChicagoSuburbsPricesSlider from '../../components/SliderResponsive/ChicagoSuburbsPricesSlider.js';

import Spinner from 'react-mdl/lib/Spinner';
import {Link} from 'react-router';
import {fbImage, appType, ogProps} from "../../config.js";

import Grid, {Cell} from 'react-mdl/lib/Grid';
import {Card, CardTitle, CardActions} from 'react-mdl/lib/Card';
import _ from 'lodash';

import CityCard from '../../components/City/CityCard';
import * as citiesActions from '../../actions/cities';

class HousesForSalePageContainer extends Component {
    static contextTypes = {i18n: PropTypes.object};

    state = {
        linkToShare: '',
        isSharing: false
    };

    componentDidMount() {
        this.props.getCitiesIfNeeded(this.props.params, this.props.location);
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        const sale = ogProps.housesForSalePage;
        const cities = _.keys(this.props.cities);

        /*Link URL*/
        const cityUrl = this.props.house.address.city.toLowerCase().replace(/\s+/g, '-');

        return (
            <div style={{maxWidth:"100%"}}>
                <Helmet
                    title={sale.title}
                    meta={[
                    {"name": "image", "content": `${fbImage}`},
                    {"name": "description", "content": `${sale.description}`},
                    {"property": "og:title", "content": `${sale.title}`},
                    {"property": "og:image", "content": `${fbImage}`},
                    {"property": "og:description", "content": `${sale.description}`}
                ]}
                />
                {!this.props.params.city &&
                <div>
                    <h1 style={{fontSize:34}}>Chicago North Suburbs Houses for Sale </h1>
                    <hr/>
                    {this.props.isFetching &&
                    <div style={{maxWidth:100,margin:"0 auto"}}>
                        <Spinner singleColor/>

                    </div>
                    }
                    {this.props.cities && !this.props.isFetching &&
                    <Grid>
                        {Object.keys(this.props.cities).map(city=> {
                            return (
                                <Cell
                                    col={4}
                                    key={city}>
                                    <Link to={this.props.location.pathname + '/'+ cityUrl}
                                          style={{textDecoration:'none', color:'#393939',fontSize:18}}>
                                        {_.startCase(city.replace(/-+/, ' '))}
                                    </Link>
                                </Cell>
                            );
                        })}
                    </Grid>}
                    <h2>Average Home Prices in Chicago Suburbs</h2>
                    <Grid>
                        <Cell col={12}>
                            <ChicagoSuburbsPricesSlider></ChicagoSuburbsPricesSlider>
                        </Cell>
                    </Grid>

                </div>
                }

                {this.props.params.city &&
                <div>
                    {this.props.children}

                </div>
                }
            </div>
        );
    }
}
function mapStateToProps(state) {
    return state.cities;

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(citiesActions, dispatch);
}
HousesForSalePageContainer.need = [
    citiesActions.getCitiesIfNeeded
]
export default connect(mapStateToProps, mapDispatchToProps)(HousesForSalePageContainer);




