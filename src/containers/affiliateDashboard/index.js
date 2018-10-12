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

  showCopiedMessage() {
    this.setState({ showCopiedMessage: true })
    setTimeout(() => this.setState({ showCopiedMessage: false }), 3000)
  }

  countReferralsFromDate(startDate, referrals) {
    return referrals.map(r => new Date(r.createdAt))
      .filter(d => startDate <= d)
      .length
  }

  render() {
    const { user } = this.props
    const { showCopiedMessage } = this.state

    if ( !user || !user.referrals ) {
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
            <CopyToClipboard text={affiliateLink} onCopy={this.showCopiedMessage}>
              <Input type="text" value={affiliateLink} readOnly/>
            </CopyToClipboard>
            <CopyToClipboard text={affiliateLink} onCopy={this.showCopiedMessage}>
              <Button><img src="/assets/images/linkIcon.png" alt="Link"/></Button>
            </CopyToClipboard>
          </div>
          <Col className="d-flex justify-content-between affiliateDashboardCardsContainer">
            <Card className="affiliateDashboardCard">
              <CardHeader>Referrals <span><br/>{user.referrals.total}</span></CardHeader>
              <CardBody>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Referrals</p>
                  <h6>{user.referrals.total}</h6>
                </Row>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Tier 1 (2%)</p>
                  <h6>{user.referrals.tier1}</h6>
                </Row>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Tier 2 (1%)</p>
                  <h6>{user.referrals.tier2}</h6>
                </Row>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Tier 3 (0.5%)</p>
                  <h6>{user.referrals.tier3}</h6>
                </Row>
              </CardBody>
            </Card>
            <Card className="affiliateDashboardCard">
              <CardHeader>Last 7 days <span><br/>{user.timeframe.week}</span></CardHeader>
              <CardBody>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Last 24 hours:</p>
                  <h6>{user.timeframe.day}</h6>
                </Row>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Last 7 days</p>
                  <h6>{user.timeframe.week}</h6>
                </Row>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Last 30 days</p>
                  <h6>{user.timeframe.month}</h6>
                </Row>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Last 90 days</p>
                  <h6>{user.timeframe.quarter}</h6>
                </Row>
              </CardBody>
            </Card>
            <Card className="affiliateDashboardCard">
              <CardHeader>Balance <span><br/>${user.earnings.balance.toFixed(2)}</span></CardHeader>
              <CardBody>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Total Earnings</p>
                  <h6>{user.earnings.total.toFixed(2)}</h6>
                </Row>
                <Row className="affiliateDashboardCardContentRow">
                  <p>Referral Masternodes</p>
                  <h6>{user.earnings.masternodes}</h6>
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
