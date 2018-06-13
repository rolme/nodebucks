import React, { Component } from 'react'

import Masternodes from './masternodes'
import Testimonials from './testimonials'

import { Col } from 'reactstrap'

import './index.css'

export default class Home extends Component {
  render() {
    return (
      <div className="homeContainer">
        <div className="homeMainBannerContainer">
          <div className="contentContainer">
            <div className="homeMainBannerPopUpMessageContainer">
              <div className="homeMainBannerPopUpMessagePartContainer">
                <img src="/assets/images/exclamationIcon.png" alt="exclamation"/>
                <p>Be one of <span>Nodebucks</span> first 500 users and receive 15% off your first node!</p>
              </div>
              <img className="homeMainBannerPopUpMessageCloseIcon" src="/assets/images/closeIcon.png" alt="close"/>
            </div>
            <p className="homeMainBannerHeaderText">Invest in the <span>Blockchain</span></p>
            <p className="homeMainBannerText">Own your very own masternode and collect blockchain rewards.</p>
            <button className="homeMainBannerButton"><img className="mr-1" src="/assets/images/masternode.png" alt='masternode'/>Setup a Masternode</button>
            <div className="homeMainBannerScrollDownContainer">
              <img className="scrollAnimation" src="/assets/images/mouse.png" alt="Scroll down"/>
              <p>Please Scroll Down</p>
            </div>
          </div>
        </div>
        <div className="homeAboutContainer">
          <div className="contentContainer flex-wrap">
            <Col xl={{size: 5, offset: 0}} lg={{size: 5, offset: 0}} md={{size: 6, offset: 3}} sm={{size: 6, offset: 3}} xs={{size: 6, offset: 3}} className="d-flex justify-content-center">
              <img src="/assets/images/illustration.png" alt='Illustration'/>
            </Col>
            <Col xl={{size: 7, offset: 0}} lg={{size: 7, offset: 0}} md={{size: 8, offset: 2}} sm={{size: 10, offset: 1}} xs={{size: 10, offset: 1}} className="homeAboutTextPartContainer ">
              <h1>Blockchain is the Future</h1>
              <p>The blockchain is disrupting nearly every major industry and is reshaping how businesses think and operate. Masternodes are the cornerstone of a new type of blockchain, acting as the foundation for many popular cryptocurrencies.</p>
              <p> Now you can own and operate your very own masternode and collect rewards in exchange for the work your masternode performs on the blockchain, confirming and verifying transactions.</p>
            </Col>
          </div>
        </div>
        <Masternodes/>
        <Testimonials/>
      </div>
    )
  }
}

