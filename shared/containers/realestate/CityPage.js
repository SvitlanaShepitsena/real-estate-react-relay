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

        let city = _.startCase(this.props.params.city.replace(/-+/g, ' '));
        let saleRent = this.props.location.pathname.indexOf('sale') > -1 ? 'sale' : 'rent';

        let metaTitleSale = (city + " houses for sale | North Illinois Realty");
        let metaTitleRent = (city + " houses for rent | North Illinois Realty");

        let ogTitleSale = (city + " houses for sale! ☆ North Illinois Realty");
        let ogTitleRent = (city + " houses for rent! ☆ North Illinois Realty");

        let metaDescriptionSale = ('Browse ' + city + ' homes for sale, sorted by zip code or property type. Call us for a free consultation and schedule a showing!');
        let metaDescriptionRent = ('Browse ' + city + ' homes for rent, sorted by zip code or property type. Call us for a free consultation and schedule a showing!');

        let ogDescriptionSale = ('✔ Browse ' + city + ' homes for sale, sorted by zip code or property type. ☏   Call us for a free consultation and schedule a showing!');
        let ogDescriptionRent = ('✔ Browse ' + city + ' homes for rent, sorted by zip code or property type. ☏   Call us for a free consultation and schedule a showing!');

        return (
            <div>
                {saleRent == 'sale' && city &&
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
                            <span style={{textDecoration:'none', fontSize:13, color:'#757575'}}> {_.startCase(city)}
                            </span>
                        </li>
                    </ul>
                    {saleRent == 'rent' &&
                    <h1 style={{fontSize:32}}> {_.startCase(city) + " Apartments for Rent "}</h1>
                    }
                    {saleRent == 'sale' &&
                    <h1 style={{fontSize:32}}> {_.startCase(city) + " Houses for Sale "}</h1>
                    }
                    <hr/>


                    {/*Listing data from db*/}
                    <Grid >
                        <Cell col={6} phone={12}>
                            <Card shadow={0}
                                  style={{height: 'auto', width:'100%', background: '#ffffff', color: '#393939'}}>
                                <CardTitle style={{color: '#393939', width:'100%'}}>
                                    <h4 style={{margin: '0',fontSize:22, fontWeight:300}}>{city} Zip Codes</h4>
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
                                                            to={(saleRent == "sale" ? "/houses-for-sale/" : "/apartments-for-rent/") + `${city.toLowerCase().replace(/\s+/g, '-')}/${zip.zip}`}
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
                            <Card shadow={0}
                                  style={{height: 'auto', width: '100%', background: '#ffffff', color: '#393939'}}>
                                <CardTitle style={{width: '100%'}}>
                                    <h4 style={{margin: '0', fontSize: 22, fontWeight: 300}}> Property Types </h4>
                                </CardTitle>
                                <CardText
                                    style={{width: '100%', margin: 0, borderTop: '1px #E0E0E0 solid', boxSizing: 'border-box'}}>
                                    {this.types && this.types.map(type=> {
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
                        </Cell>
                    </Grid>
                    <h2 style={{marginBottom:0}}>{"Home Prices in " + _.startCase(city)} </h2>
                    <StatisticsGrid></StatisticsGrid>
                    <h2 style={{marginBottom:0}}> Nearby Cities </h2>
                    < article >
                        {saleRent == 'sale' &&
                        <h4>
                            {
                                "Re/Max 1st Class Realty helps you to find your dream home by offering newest listings for sale in "
                                + _.startCase(city) + "."
                            }
                        </h4>
                        }
                        {saleRent == 'rent' &&
                        <h4>
                            {
                                "Re/Max 1st Class Realty helps you to find your dream home by offering newest listings for rent in "
                                + _.startCase(city) + "."
                            }
                        </h4>
                        }
                        <p>
                            {
                                "For your best experience, we are filtering " + _.startCase(city) + " listings for you by Home Type and City Zip."
                            }
                        </p>

                        {saleRent == 'sale' &&
                        <h3 style={{color: "#D32F2F"}}> {
                            "Let us guide you, call us for a free consultation about " + _.startCase(city) + " properties for sale: (847) 674-9797"
                        }
                        </h3>
                        }
                        {saleRent == 'rent' &&
                        <h3 style={{color: "#D32F2F"}}> {
                            "Let us guide you, call us for a free consultation about " + _.startCase(city) + " properties for rent: (847) 674-9797"
                        }
                        </h3>
                        }

                    </article>
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




