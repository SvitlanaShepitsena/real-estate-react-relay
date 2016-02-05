'use strict';

import React, {Component, PropTypes} from 'react';
import Helmet from "react-helmet";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CityUrl from '../../components/common/CityUrl/CityUrl.js';

import Spinner from 'react-mdl/lib/Spinner';
import {Link} from 'react-router';
import {fbImage, appType, ogProps} from "../../config.js";

import Grid, {Cell} from 'react-mdl/lib/Grid';
import {Card, CardTitle, CardActions} from 'react-mdl/lib/Card';
import _ from 'lodash';

/*Components*/
import StatisticsGrid from '../../components/SliderResponsive/StatisticsGrid.js';
import ChicagoSuburbsPricesSlider from '../../components/SliderResponsive/ChicagoSuburbsPricesSlider.js';
import CityCard from '../../components/City/CityCard';

import * as citiesActions from '../../actions/cities';

if (process.env.BROWSER) {
    require('../../assets/typography.less');
}
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
                                    <CityUrl
                                        url={this.props.location.pathname+ '/'+ city}
                                        anchor={city}
                                        className="link-18"
                                    />
                                </Cell>
                            );
                        })}
                    </Grid>}

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




