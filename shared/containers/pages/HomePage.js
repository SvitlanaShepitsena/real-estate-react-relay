import React from 'react';
import _ from 'lodash';
import Helmet from "react-helmet";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fbImage, appImage, appTitle, appType, appUrl, ogProps} from "../../config.js";
import HomeContent from '../../components/HomeContent/HomeContent.js';
import HousesList from '../../components/HomeContent/HousesList.js';
import * as citiesActions from '../../actions/cities';
import * as rentCitiesActions from '../../actions/rentCities';

class HomePageContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getCitiesIfNeeded();
        this.props.getRentCitiesIfNeeded();
    }

    render() {
        const home = ogProps.homePage;
        const cities = _.keys(this.props.cities.cities);
        const rentCities = _.keys(this.props.rentCities.rentCities);
        return (
            <div style={{minHeight:1000}}>
                <Helmet
                    title={appTitle}

                    meta={[
                    {"name": "url", "content": `${appUrl}`},
                    {"name": "type", "content": `${appType}`},
                    {"name": "image", "content": `${fbImage}`},
                    {"name": "description", "content": `${home.description}`},
                    {"property": "og:url", "content": `${appUrl}`},
                    {"property": "og:type", "content": `${appType}`},
                    {"property": "og:title", "content": `${appTitle}`},
                    {"property": "og:image", "content": `${fbImage}`},
                    {"property": "og:description", "content": `${home.description}`}
                ]}
                />
                <HomeContent></HomeContent>
                {/*
                 <HousesList cities={cities} rentCities={rentCities}></HousesList>
                 */}
            </div>
        )
    }

}
function mapStateToProps(state) {
    return state;
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, rentCitiesActions, citiesActions), dispatch);
}
HomePageContainer.need = [
    citiesActions.getCitiesIfNeeded,
    rentCitiesActions.getRentCitiesIfNeeded
]
export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
