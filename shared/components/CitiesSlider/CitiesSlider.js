import React from 'react';
import Grid, {Cell} from 'react-mdl/lib/Grid';
import {Card, CardText, CardTitle, CardActions} from 'react-mdl/lib/Card';
import Slider from 'react-slick';
import {Link} from 'react-router';
import _ from 'lodash';
import Spinner from 'react-mdl/lib/Spinner';

if (process.env.BROWSER) {
    require('./CitiesSlider.less');
}

export default class CitiesSlider extends React.Component {

    render() {
        console.log(this.props.stat);
        var settings = {
            dots: true,
            infinite: false,
            lazyLoad: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    dots: true,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true
                }
            }, {
                breakpoint: 600,
                settings: {
                    dots: true,
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    dots: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        };
        return (

            <div className='CitiesSlider'>
                <h2 className="CitiesSlider__header">North Chicago Suburbs Homes for Sale</h2>
                {!_.keys(this.props.stat).length &&
                <div style={{maxWidth:100,margin:"0 auto"}}>
                    <Spinner singleColor/>
                </div>
                }

                {_.keys(this.props.stat).length &&
                <Slider {...settings} >
                    {_.keys(this.props.stat).map(city=> {
                        return (
                            <div key={city}>
                                <div className="CitiesSlider__card ">
                                    <Link to={`/houses-for-sale/${city}`} style={{textDecoration:'none'}}>
                                        <img className="CitiesSlider__card-image"
                                             src={this.props.stat[city].cityImage}
                                             alt={`${city} houses for sale`}/>
                                        <h4 className="CitiesSlider__city">
                                            {_.startCase(city) + " Homes for Sale"}
                                        </h4>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </Slider>
                }
            </div>
        );
    }
}
