import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'

import { Input, Button, Col, Row, Card, CardHeader, CardBody } from 'reactstrap'

import './index.css'

class AffiliateDashboard extends Component {

  render() {
    return (
      <div className="affiliateDashboardContainer">
        <div className="contentContainer">
          <h1 className="affiliateDashboardTitle">Affiliate Dashboard</h1>
          <div className="affiliateDashboardReferralUrlContainer">
            <p>Referral URL:</p>
            <Input type="text"/>
            <Button><img src="/assets/images/linkIcon.png" alt="Link"/></Button>
          </div>
          <Col className="d-flex justify-content-between affiliateDashboardCardsContainer">
            <Card className="affiliateDashboardCard">
              <CardHeader>Referrals <span><br/>78</span></CardHeader>
              <CardBody>
                <Row>
                  <p>Referrals</p>
                  <p>78</p>
                </Row>
                <Row>
                  <p>Tier 1(20%)</p>
                  <p>25</p>
                </Row>
                <Row>
                  <p>Tier 2(10%)</p>
                  <p>15</p>
                </Row>
                <Row>
                  <p>Tier 3</p>
                  <p>38</p>
                </Row>
              </CardBody>
            </Card>
            <Card className="affiliateTierCard">
              <CardHeader>Last 7 days <span><br/>15</span></CardHeader>
              <CardBody>
                <Row>
                  <p>Last 24 hours:</p>
                  <p>3</p>
                </Row>
                <Row>
                  <p>Last 7 days</p>
                  <p>15</p>
                </Row>
                <Row>
                  <p>Last 30 days</p>
                  <p>40</p>
                </Row>
                <Row>
                  <p>Last 90 days</p>
                  <p>78</p>
                </Row>
              </CardBody>
            </Card>
            <Card className="affiliateTierCard">
              <CardHeader>Balance <span><br/>$125.35</span></CardHeader>
              <CardBody>
                <Row>
                  <p>Balance:</p>
                  <p>$125.35</p>
                </Row>
                <Row>
                  <p>Total Earned:</p>
                  <p>$283.22</p>
                </Row>
                <Row>
                  <p>Referral Masternodes</p>
                  <p>135</p>
                </Row>
              </CardBody>
            </Card>
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