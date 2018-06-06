import React, { Component } from 'react'

import './index.css'

export default class Home extends Component {
  render() {
    return (
      <div className="homeContainer">
        <div className="homeTopPartContainer">
          <div className="contentContainer">
            <div className="homeTopPartDiscountContainer">
              <p>Be one of <span>Nodebucks</span> first 500 users and receive 15% off your first node!</p>
            </div>
            <p className="homeTopPartHeaderText">Invest in the <span>Blockchain</span></p>
            <p className="homeTopPartText">Own your very own masternode and collect blockchain rewards.</p>
            <button className="homeTopPartButton">Setup a Masternode <img className="ml-1" src="/assets/images/masternode.png" alt='masternode'/></button>
          </div>
        </div>
      </div>
    )
  }
}

