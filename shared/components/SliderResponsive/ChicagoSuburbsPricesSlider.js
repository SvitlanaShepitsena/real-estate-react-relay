import React from 'react';
import Slider from 'react-slick';

if (process.env.BROWSER) {
    require('./ChicagoSuburbsPricesSlider.less');
}
export default class SliderResponsive extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        };
        return (
            <Slider {...settings}>
                <div><h3 className="ChicagoSuburbsPricesSlider__slide-content">Studio for sale</h3></div>
                <div><h3 className="ChicagoSuburbsPricesSlider__slide-content">1 Bedroom Homes for Sale</h3></div>
                <div><h3 className="ChicagoSuburbsPricesSlider__slide-content">2 Bedroom Homes for Sale</h3></div>
                <div><h3 className="ChicagoSuburbsPricesSlider__slide-content">5 Bedroom Homes for Sale</h3></div>
            </Slider>
        )
    }

}