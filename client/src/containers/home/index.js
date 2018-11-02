import React, { Component } from 'react'
import LazyLoad from 'react-lazyload'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'

import { fetchAnnouncement } from '../../reducers/announcements'
import { disabledAnnouncements } from '../../lib/helpers'
import { Col, Alert, Button } from 'reactstrap'

import './index.css'

import Metatags from "../../components/metatags"

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visibleAlert: false
    };

    this.onAlertDismiss = this.onAlertDismiss.bind(this)
  }

  onAlertDismiss() {
    this.setState({ visibleAlert: false });
    sessionStorage.setItem('announcementsVisible', false)
  }

  componentWillMount() {
    window.scrollTo(0, 0)
    const { user } = this.props
    if ( !!user ) {
      this.props.history.push('/dashboard')
    }
  }

  componentDidMount() {
    this.props.fetchAnnouncement()
    if ( !disabledAnnouncements() ) {
      this.setState({ visibleAlert: true })
    }
  }

  render() {
    const { announcement, announcementError } = this.props
    const { visibleAlert } = this.state
    return (
      <div className="homeContainer">
        <Metatags
          description="Operate your very own masternode and collect rewards in exchange for the work your masternode performs on the blockchain, confirming and verifying transactions of cryptocurrencies."
          title="NodeBucks - Build your Masternode and Collect Rewards"
          canonical="https://nodebucks.com/"
        />
        <div className="contentContainer px-0">
          {announcement && announcement.text && !announcementError && <Alert className="alert" isOpen={visibleAlert} toggle={this.onAlertDismiss}>
            {announcement.text}
          </Alert>
          }
        </div>
        <div className="homeMainBannerContainer">
          <LazyLoad height={200}>
            <img src="/assets/images/homeImages/homeMainBannerBackground.jpg" alt="Home Main Banner Background" className="w-100"/>
          </LazyLoad>
          <div className="contentContainer w-100 px-0">
            <Col className="px-xl-0 px-2">
              <Col xl={{ size: 6, offset: 0 }} lg={{ size: 5, offset: 0 }} md={{ size: 6, offset: 0 }} sm={{ size: 7, offset: 0 }} xs={{ size: 10, offset: 0 }} className="px-0">
                <h1 className="homeMainBannerTitle">A Full Service Masternode Provider</h1>
              </Col>
              <Col xl={{ size: 5, offset: 0 }} lg={{ size: 4, offset: 0 }} md={{ size: 5, offset: 0 }} sm={{ size: 6, offset: 0 }} xs={{ size: 9, offset: 0 }} className="px-0">
                <p className="homeMainBannerDescription">The fast and simple way to get a blockchain server up and running that PAYS YOU!</p>
              </Col>
            </Col>
          </div>
        </div>
        <div className="homeSectionContainer">
          <div className="contentContainer w-100 px-0">
            {this.renderSecondSection()}
          </div>
        </div>
        <div className="homeScreenshotsSectionContainer">
          <div className="contentContainer w-100 px-0">
            {this.renderScreenshotsSection()}
          </div>
        </div>
        <div className="homeFooterContainer">
          <div className="contentContainer d-flex align-items-center flex-wrap">
            <Col xl={{ size: 10, offset: 1 }} lg={{ size: 10, offset: 1 }} md={{ size: 8, offset: 2 }} sm={{ size: 8, offset: 2 }} xs={{ size: 10, offset: 1 }}>
              <p className="homeFooterText mb-0">Owning a masternode has never been easier! </p>
            </Col>
            <Col xl={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }} sm={{ size: 6, offset: 3 }} xs={{ size: 12, offset: 0 }} className="d-flex justify-content-center mt-xl-0 mt-lg-0 mt-md-3 mt-sm-4 mt-xs-5 px-0">
              <NavLink to="/masternodes">
                <Button className="homeFooterButton">Get a masternode</Button>
              </NavLink>
            </Col>
          </div>
        </div>
      </div>
    )
  }

  renderSecondSection() {
    return (
      <Col className="d-flex flex-wrap justify-content-center">
        <Col xl={4} lg={4} md={4} sm={6} xs={10} className="secondSectionItemContainer">
          <div className="secondSectionItemIconContainer">
            <LazyLoad height={60}>
              <img src="/assets/images/homeImages/whatIsMasternodeIcon.png" alt="What is Masternode"/>
            </LazyLoad>
          </div>
          <h3>What is a masternode?</h3>
          <p>A masternode is a blockchain server that processes transactions and secures the network. Each masternode receives rewards in exchange for the work it performs. </p>
        </Col>
        <Col xl={4} lg={4} md={4} sm={6} xs={10} className="secondSectionItemContainer">
          <div className="secondSectionItemIconContainer">
            <LazyLoad height={60}>
              <img src="/assets/images/homeImages/howMuchIcon.png" alt="How much does it pay? "/>
            </LazyLoad>
          </div>
          <h3>How much does it pay?</h3>
          <p>The rewards from a masternode vary depending on the type of coin. Masternodes can pay anywhere from 5% to 150% per year. Choose the masternode that is right for you.</p>
        </Col>
        <Col xl={4} lg={4} md={4} sm={6} xs={10} className="secondSectionItemContainer">
          <div className="secondSectionItemIconContainer">
            <LazyLoad height={60}>
              <img src="/assets/images/homeImages/howIStartedIcon.png" alt="How do I get started?"/>
            </LazyLoad>
          </div>
          <h3>How do I get started?</h3>
          <ul type="circle">
            <li><NavLink to="/masternodes">Choose a masternode</NavLink></li>
            <li> Purchase using PayPal or Bitcoin</li>
            <li> Wait while we set it up</li>
            <li> Enjoy the rewards!</li>
          </ul>
        </Col>
      </Col>
    )
  }

  renderScreenshotsSection() {
    return (
      <Col className="d-flex flex-column justify-content-center">
        <Col className="screenshotsSectionItemContainer flex-xl-row flex-lg-row flex-md-row flex-column-reverse">
          <Col xl={6} lg={5} md={5} sm={8} xs={10}>
            <LazyLoad height={200}>
              <img src="/assets/images/homeImages/dashboardScreenshot.png" alt="Dashboard Screenshot"/>
            </LazyLoad>
          </Col>
          <div className="screenshotsSectionTextPartContainer ml-xl-5 ml-lg-5 ml-md-3 ml-0">
            <h2>Clean & Simple Dashboard</h2>
            <p>The Nodebucks dashboard makes it extremely easy to keep track of all your masternodes. Track your nodes values and rewards over time. </p>
          </div>
        </Col>
        <Col className="screenshotsSectionItemContainer mt-5 flex-xl-row flex-lg-row flex-md-row flex-column">
          <div className="screenshotsSectionTextPartContainer mr-xl-5 mr-lg-5 mr-md-3 mr-0">
            <h2>Masternode History</h2>
            <p>Each masternode view provides you with a complete overview of the node from the time it was created. See a complete record of every reward you have received and 100% transparency of our service fees. Setup automatic withdrawals or choose to withdraw manually. </p>
          </div>
          <Col xl={6} lg={5} md={5} sm={8} xs={10}>
            <LazyLoad height={200}>
              <img src="/assets/images/homeImages/historyScreenshot.png" alt="History Screenshot"/>
            </LazyLoad>
          </Col>
        </Col>
        <Col className="screenshotsSectionItemContainer mt-5 flex-xl-row flex-lg-row flex-md-row flex-column-reverse">
          <Col xl={6} lg={5} md={5} sm={8} xs={10}>
            <LazyLoad height={200}>
              <img src="/assets/images/homeImages/securityScreenshot.png" alt="Security Screenshot"/>
            </LazyLoad>
          </Col>
          <div className="screenshotsSectionTextPartContainer ml-xl-5 ml-lg-5 ml-md-3 ml-0">
            <h2>Account & Coin Security</h2>
            <p>Account & Coin Security <br/> Nodebucks takes security very seriously. All masternodes are secured and backed up on a regular basis. Security audits are performed by industry experts. User accounts are secured with 2fa. </p>
          </div>
        </Col>
        <Col className="screenshotsSectionItemContainer mt-5 flex-xl-row flex-lg-row flex-md-row flex-column">
          <div className="screenshotsSectionTextPartContainer mr-xl-5 mr-lg-5 mr-md-3 mr-0">
            <h2>Affiliate Program</h2>
            <p>We appreciate you sharing Nodebucks with friends and family. Take part in our affiliate program to earn rewards every time your referrals earn rewards on their masternodes. And our affiliate program goes three tiers deep! </p>
          </div>
          <Col xl={6} lg={5} md={5} sm={8} xs={10}>
            <LazyLoad height={200}>
              <img src="/assets/images/homeImages/affiliateScreenshot.png" alt="Affiliate Screenshot"/>
            </LazyLoad>
          </Col>
        </Col>
      </Col>
    )
  }

}

const mapStateToProps = state => ({
  user: state.user.data,
  announcement: state.announcements.data,
  announcementError: state.announcements.error
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAnnouncement
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home))
