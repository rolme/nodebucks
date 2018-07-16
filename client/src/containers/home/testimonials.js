import React, { Component } from 'react'
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Col } from 'reactstrap'

export default class Testimonials extends Component {
  render() {
    const settings = {
      arrows: false,
      dots: true,
      dotsClass: 'homeTestimonialsSliderDots slick-dots',
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className="homeTestimonialsContainer bg-light">
        <div className="contentContainer">
          <h1 className="homeTestimonialsHeader">Testimonials</h1>
          <Slider {...settings}>
            <div>
              <div className="homeTestimonialsSlideContentContainer flex-wrap">
                <Col xl={{ size: 3, offset: 1 }} lg={{ size: 3, offset: 1 }} md={{ size: 3, offset: 1 }} sm={{ size: 6, offset: 3 }} xs={{ size: 6, offset: 3 }} className='homeTestimonialAvatarPartContainer'>
                  <img src="/assets/images/testimonialAvatar.png" alt="Testimonial" className="testimonialAvatar"/>
                </Col>
                <Col xl={{ size: 7, offset: 1 }} lg={{ size: 7, offset: 1 }} md={{ size: 7, offset: 1 }} sm={{ size: 10, offset: 1 }} xs={{ size: 12, offset: 0 }}>
                  <Col xl={12} lg={12} md={12} sm={12} xs={12} className="d-flex">
                    <img src="/assets/images/openQuotes.png" alt="Quotes" className="homeTestimonialsQuote align-self-start col-1"/>
                    <p className="testimonialMessageText">I always wanted to own a piece of the blockchain and a masternode seemed liked a great way to do it, but I didn’t have the technical background to build one or the time to maintain it. Nodebucks makes it easy to run your own masternodes and I love the clean intuitive interface, the transparency, and reporting that it provides.</p>
                    <img src="/assets/images/closeQuotes.png" alt="Quotes" className="homeTestimonialsQuote align-self-end col-1"/>
                  </Col>
                  <Col xl={{size: 10, offset: 1}} lg={{size: 10, offset: 1}} md={{size: 10, offset: 1}} sm={{size: 10, offset: 1}} xs={{size: 10, offset: 1}} className="d-flex mt-5">
                    <p className="testimonialName">Scott</p>
                    <p className="testimonialPosition">Police Officer</p>
                  </Col>
                </Col>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    )
  }
}