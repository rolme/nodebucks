import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { Col } from 'reactstrap'

import './index.css'

class Affiliate extends Component {
  render() {
    return (
      <div className="affiliateContainer">
        <div className='affiliateHeaderContainer'>
          <div className="contentContainer">
            <h5 className="affiliateHeaderText">Nodebucks Affiliate Program</h5>
          </div>
        </div>
        <div className='affiliateHowItWorksContainer'>
          <div className="contentContainer">
            <Col xl={{ size: 6, offset: 3 }} lg={{ size: 6, offset: 3 }} md={{ size: 8, offset: 2 }} sm={{ size: 10, offset: 1 }} className="affiliateHowItWorksContentContainer">
              <h5 className="affiliateSectionHeaderText">How it works</h5>
              <p className="affiliateSectionHeaderParagraph">Refer your friends and family by sending them your <a href='/'>affiliate link</a></p>
              <ol className="affiliateHowItWorksList">
                <li>Your visitor clicks the link and creates an account on Nodebucks.com.</li>
                <li>We track their purchases by using a long lasting cookie that keeps their IP.</li>
                <li>We will verify all purchases and review every order.</li>
                <li>Once verified, commissions* will be sent to your account.</li>
              </ol>
            </Col>
          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(Affiliate)