'use strict';

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import _ from 'lodash';
export default (props)=> {

    return (
        <ul style={{listStyle:'none', margin:'0px', padding:'0px'}}>
            <li style={{display:'inline-block'}}>
                {saleRent == 'sale' &&
                <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}}
                      to="/houses-for-sale">Houses
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
                {saleRent == 'sale' &&
                <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}}
                      to={`/houses-for-sale/${city.toLowerCase().replace(/\s+/g,'-')}`}>
                    {city}
                </Link>}
                {saleRent == 'rent' &&
                <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}}
                      to={`/apartments-for-rent/${city.toLowerCase().replace(/\s+/g,'-')}`}>
                    {city}
                </Link>}
                <span> / </span>
            </li>
            <li style={{display:'inline-block'}}>
                {saleRent == 'sale' &&
                <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}}
                      to={`/houses-for-sale/${city.toLowerCase().replace(/\s+/g,'-')}/${zipType}`}>
                    {zipType}

                </Link>}
                {saleRent == 'rent' &&
                <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}}
                      to={`/apartments-for-rent/${city.toLowerCase().replace(/\s+/g,'-')}/${zipType}`}>
                    {zipType}
                </Link>}
                <span> / </span>
            </li>
            <li style={{display:'inline-block'}}>
                {house.address.street &&
                <span style={{textDecoration:'none', fontSize:13, color:'#757575'}}>
                                {house.address.street}
                            </span>
                }
                {house.mls &&
                <span style={{textDecoration:'none', fontSize:13, color:'#757575'}}>
                             {" - MLS#" + house.mls  }
                            </span>
                }
            </li>
        </ul>
    );

}




