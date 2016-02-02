import React, {Component, PropTypes} from 'react';
import Grid, {Cell} from 'react-mdl/lib/Grid';
import {Card, CardTitle, CardActions} from 'react-mdl/lib/Card';
import {Link} from 'react-router';
import _ from 'lodash';
import Dropdown from 'react-dropdown';

if (process.env.BROWSER) {
    require('./HousesList.less');
}

export default class HousesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: {value: 'two', label: 'Two'}
        }
    }

    _onSelect(option) {
        console.log('You selected ', option.label)
        this.setState({selected: option})
    }

    static contextTypes = {i18n: PropTypes.object, location: React.PropTypes.object};

    formatDbString = (string) => {
        return _.startCase(string.replace(/-+/, ' '));
    };

    render() {
        const options = [
            {value: 'one', label: 'One'},
            {value: 'two', label: 'Two'},
            {
                type: 'group', name: 'group1', items: [
                {value: 'three', label: 'Three'},
                {value: 'four', label: 'Four'}
            ]
            },
            {
                type: 'group', name: 'group2', items: [
                {value: 'five', label: 'Five'},
                {value: 'six', label: 'Six'}
            ]
            }
        ]
        let defaultOption = this.state.selected

        let cities = this.props.cities;
        let rentCities = this.props.rentCities;
        return (
            <div className='HousesList'>
                <Grid className="HousesList__grid">
                    <Cell
                        align="top"
                        col={4}
                        tablet={6}
                        phone={12}>
                        {cities &&
                        <div >
                            <h4 className="HousesList__header">North Chicago Suburbs Houses for Sale</h4>
                            {cities &&
                            <ul className="HousesList__ul">
                                {cities.sort().map(city=> {
                                    return (
                                        <li
                                            col={4}
                                            key={city}>
                                            <Link className="HousesList__link" to={"/houses-for-sale/"+ city}>
                                                {this.formatDbString(city) + " Homes for Sale"}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                            }
                        </div>
                        }
                    </Cell>
                    <Cell
                        col={4}
                        tablet={6}
                        phone={12}>
                        <h4 className="HousesList__header">North Chicago Suburbs Rentals</h4>
                        {rentCities &&
                        <ul className="HousesList__ul">
                            {rentCities.sort().map(rentCity=> {
                                return (
                                    <li
                                        col={4}
                                        key={rentCity}>
                                        <Link className="HousesList__link" to={"/houses-for-rent/"+ rentCity}>
                                            {this.formatDbString(rentCity) + " Homes for Sale"}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                        }
                    </Cell>

                    <Cell
                        col={4}
                        tablet={6}
                        phone={12}>

                        <Dropdown style={{border:"black 1px solid", background:'red'}} options={options} onChange={this._onSelect.bind(this)} value={defaultOption}
                                  placeholder="Select an option"/>
                    </Cell>
                </Grid>
            </div>
        );
    }
}
