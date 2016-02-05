'use strict';
import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {appUrl, fbImage, appType, ogProps} from "../../config.js";
import Spinner from 'react-mdl/lib/Spinner';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import _ from 'lodash';

import Grid, {Cell} from 'react-mdl/lib/Grid';
import {Card, CardTitle, CardActions, CardText} from 'react-mdl/lib/Card';

/*Components*/
import StatisticsGrid from '../../components/SliderResponsive/StatisticsGrid.js';
import CityRemaxWelcome from '../../components/City/CityRemaxWelcome.js';
import CityPropTypes from '../../components/City/CityPropTypes.js';
import * as cityInfoActions from '../../actions/cityInfo';

class cityPage extends Component {
    static contextTypes = {i18n: PropTypes.object};

    componentDidMount() {
        this.props.getCityInfoIfNeeded(this.props.params, this.props.location);
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

        let metaTitleSale = (cityName + " houses for sale | North Illinois Realty");
        let metaTitleRent = (cityName + " houses for rent | North Illinois Realty");

        let ogTitleSale = (cityName + " houses for sale! ☆ North Illinois Realty");
        let ogTitleRent = (cityName + " houses for rent! ☆ North Illinois Realty");

        let metaDescriptionSale = ('Browse ' + cityName + ' homes for sale, sorted by zip code or property type. Call us for a free consultation and schedule a showing!');
        let metaDescriptionRent = ('Browse ' + cityName + ' homes for rent, sorted by zip code or property type. Call us for a free consultation and schedule a showing!');

        let ogDescriptionSale = ('✔ Browse ' + cityName + ' homes for sale, sorted by zip code or property type. ☏   Call us for a free consultation and schedule a showing!');
        let ogDescriptionRent = ('✔ Browse ' + cityName + ' homes for rent, sorted by zip code or property type. ☏   Call us for a free consultation and schedule a showing!');

        return (
            <div>
                {saleRent == 'sale' && cityName &&
                <Helmet
                    title={metaTitleSale}
                    meta={[
                        {"name": "image", "content": `${fbImage}`},
                        {"name": "description", "content": `${metaDescriptionSale}`},
                        {"property": "og:title", "content": `${ogTitleSale}`},
                        {"property": "og:image", "content": `${fbImage}`},
                        {"property": "og:description", "content": `${ogDescriptionSale}`}
                    ]}
                />
                }
                {saleRent == 'rent' &&
                <Helmet
                    title={metaTitleRent}
                    meta={[
                        {"name": "image", "content": `${fbImage}`},
                        {"name": "description", "content": `${metaDescriptionRent}`},
                        {"property": "og:title", "content": `${ogTitleRent}`},
                        {"property": "og:image", "content": `${fbImage}`},
                        {"property": "og:description", "content": `${ogDescriptionRent}`}
                    ]}
                />
                }

                {this.props.params.zipType &&
                <div>
                    {this.props.children}
                </div>
                }

                {this.props.isFetching &&
                <div style={{maxWidth:100,margin:"0 auto"}}>
                    <Spinner singleColor/>
                </div>
                }

                {!this.props.params.zipType && !this.props.isFetching &&
                <div>
                    <ul
                        style={{listStyle:'none', margin:'0px', padding:'0px'}}>
                        <li style={{display:'inline-block'}}>
                            {saleRent == 'sale' &&
                            <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}} to="/houses-for-sale">Houses
                                For Sale
                            </Link>}
                            {saleRent == 'rent' &&
                            <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}}
                                  to="/apartments-for-rent">Apartments
                                For Rent
                            </Link>}
                            <span> / </span>
                        </li>
                        <li style={{display:'inline-block'}}>
                            <span style={{textDecoration:'none', fontSize:13, color:'#757575'}}> {cityName}
                            </span>
                        </li>
                    </ul>
                    {saleRent == 'rent' &&
                    <h1 style={{fontSize:32}}> {cityName + " Apartments for Rent "}</h1>
                    }
                    {saleRent == 'sale' &&
                    <h1 style={{fontSize:32}}> {cityName + " Houses for Sale "}</h1>
                    }
                    <hr/>

                    {/*Listing data from db*/}
                    <Grid >
                        <Cell col={6} phone={12}>
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
                        </Cell>

                        <Cell col={6} phone={12}>
                            <CityPropTypes {...this.props}></CityPropTypes>
                        </Cell>
                    </Grid>
                    <h2 style={{marginBottom:0}}>{"Home Prices in " + cityName} </h2>
                    <hr/>
                    <StatisticsGrid></StatisticsGrid>
                    <hr/>
                    <CityRemaxWelcome {...this.props} ></CityRemaxWelcome>

                </div>
                }

            </div >
        );
    }
}
function mapStateToProps(state) {
    return state.cityInfo;

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(cityInfoActions, dispatch);
}
cityPage.need = [
    cityInfoActions.getCityInfoIfNeeded
]
export default connect(mapStateToProps, mapDispatchToProps)(cityPage);




