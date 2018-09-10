import React, { Component } from 'react'
import { NavLink, withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getReferrer } from '../../reducers/user'

import { CopyToClipboard } from 'react-copy-to-clipboard'

import { Input, Button, Col, Row, Card, CardHeader, CardBody, Alert } from 'reactstrap'

import './index.css'

class AffiliateDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCopiedMessage: false
    }
    this.showCopiedMessage = this.showCopiedMessage.bind(this)
  }

  componentDidMount() {
    this.props.getReferrer()
  }

  referralsCount(referrer) {
    let count = 0
    count += referrer.tier1_referrals.length
    count += referrer.tier2_referrals.length
    count += referrer.tier3_referrals.length
    return count
  }

  showCopiedMessage() {
    this.setState({ showCopiedMessage: true })
    setTimeout(() => this.setState({ showCopiedMessage: false }), 3000)
  }

  lastNumberOfDays(referrer, numberOfDays) {
    const today = new Date()
    const dateBeforeSevenDays = today.setDate(today.getDate() - numberOfDays)
    let count = 0
    count += this.countReferralsFromDate(dateBeforeSevenDays, referrer.tier1_referrals)
    count += this.countReferralsFromDate(dateBeforeSevenDays, referrer.tier2_referrals)
    count += this.countReferralsFromDate(dateBeforeSevenDays, referrer.tier3_referrals)
    return count
  }

  countReferralsFromDate(startDate, referrals) {
    return referrals.map(r => new Date(r.createdAt))
      .filter(d => startDate <= d)
      .length
  }

  render() {
    const { user } = this.props
    const { showCopiedMessage } = this.state

    if ( !user.tier1_referrals ) {
      return null
    }

    const affiliateLink = `${window.location.origin}?ref=${user.affiliateKey}`

    return (
      <div className="affiliateDashboardContainer">
        {showCopiedMessage &&
        <Alert className="w-25 mx-auto" color='success'>
          Copied to clipboard
        </Alert>
        }
        <div className="contentContainer">
          <h1 className="affiliateDashboardTitle pageTitle">Affiliate Dashboard</h1>
          <div className="affiliateDashboardReferralUrlContainer">
            <p>Referral URL:</p>
            <Input type="text" value={affiliateLink} readOnly/>
            <CopyToClipboard text={affiliateLink} onCopy={this.showCopiedMessage}>
              <Button><img src="/assets/images/linkIcon.png" alt="Link"/></Button>
            </CopyToClipboard>
          </div>
          <Col className="d-flex justify-content-between affiliateDashboardCardsContainer">
            <Card className="affiliateDashboardCard">
              <CardHeader>Referrals <span><br/>{this.referralsCount(user)}</span></CardHeader>
              <CardBody>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Referrals</p>
                  <h6>{this.referralsCount(user)}</h6>
                </Row>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Tier 1(20%)</p>
                  <h6>{user.tier1_referrals.length}</h6>
                </Row>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Tier 2(10%)</p>
                  <h6>{user.tier2_referrals.length}</h6>
                </Row>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Tier 3</p>
                  <h6>{user.tier3_referrals.length}</h6>
                </Row>
              </CardBody>
            </Card>
            <Card className="affiliateDashboardCard">
              <CardHeader>Last 7 days <span><br/>{this.lastNumberOfDays(user, 7)}</span></CardHeader>
              <CardBody>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Last 24 hours:</p>
                  <h6>{this.lastNumberOfDays(user, 1)}</h6>
                </Row>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Last 7 days</p>
                  <h6>{this.lastNumberOfDays(user, 7)}</h6>
                </Row>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Last 30 days</p>
                  <h6>{this.lastNumberOfDays(user, 30)}</h6>
                </Row>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Last 90 days</p>
                  <h6>{this.lastNumberOfDays(user, 90)}</h6>
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
  user: state.user.data
})

const mapDispatchToProps = dispatch => bindActionCreators({ getReferrer }, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AffiliateDashboard))
