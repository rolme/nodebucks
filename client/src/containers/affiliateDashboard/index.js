import React, { Component } from 'react'
import { NavLink, withRouter } from "react-router-dom"
import { connect } from 'react-redux'

import { CopyToClipboard } from 'react-copy-to-clipboard'

import { Input, Button, Col, Row, Card, CardHeader, CardBody } from 'reactstrap'

import './index.css'

class AffiliateDashboard extends Component {

  // fetch affiliate key again. maybe it expired

  render() {
    const { user } = this.props
    const affiliateLink = `${window.location.origin}?ref=${user.affiliateKey}`

    return (
      <div className="affiliateDashboardContainer">
        <div className="contentContainer">
          <h1 className="affiliateDashboardTitle pageTitle">Affiliate Dashboard</h1>
          <div className="affiliateDashboardReferralUrlContainer">
            <p>Referral URL:</p>
            <Input type="text" value={affiliateLink} readOnly />
            <CopyToClipboard text={affiliateLink}>
              <Button><img src="/assets/images/linkIcon.png" alt="Link"/></Button>
            </CopyToClipboard>
          </div>
          <Col className="d-flex justify-content-between affiliateDashboardCardsContainer">
            <Card className="affiliateDashboardCard">
              <CardHeader>Referrals <span><br/>78</span></CardHeader>
              <CardBody>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Referrals</p>
                  <h6>78</h6>
                </Row>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Tier 1(20%)</p>
                  <h6>25</h6>
                </Row>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Tier 2(10%)</p>
                  <h6>15</h6>
                </Row>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Tier 3</p>
                  <h6>38</h6>
                </Row>
              </CardBody>
            </Card>
            <Card className="affiliateDashboardCard">
              <CardHeader>Last 7 days <span><br/>15</span></CardHeader>
              <CardBody>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Last 24 hours:</p>
                  <h6>3</h6>
                </Row>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Last 7 days</p>
                  <h6>15</h6>
                </Row>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Last 30 days</p>
                  <h6>40</h6>
                </Row>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Last 90 days</p>
                  <h6>78</h6>
                </Row>
              </CardBody>
            </Card>
            <Card className="affiliateDashboardCard">
              <CardHeader>Balance <span><br/>$125.35</span></CardHeader>
              <CardBody>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Balance:</p>
                  <h6>$125.35</h6>
                </Row>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Total Earned:</p>
                  <h6>$283.22</h6>
                </Row>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Referral Masternodes</p>
                  <h6>135</h6>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col className="d-flex justify-content-xl-end justify-content-center px-0 mt-xl-5 mt-lg-5 mt-md-5 mt-2">
            <NavLink to={`/nodes/withdraw`} className="btn affiliateDashboardWithdrawButton"><img src="/assets/images/downArrow.png" alt="withdraw" className="mr-2"/>Withdraw</NavLink>
          </Col>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
})


export default withRouter(connect(
  mapStateToProps,
)(AffiliateDashboard))