import React, { Component } from 'react'
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
          <img src="/assets/images/homeImages/homeMainBannerBackground.jpg" alt="Home Main Banner Background" className="w-100"/>
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
        <div className="homeSectionContainer">
          <div className="contentContainer w-100 px-0 flex-column">
            <h2 className="testimonialsSectionTitle">Testimonials</h2>
            {this.renderTestimonialsSection()}
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
            <img src="/assets/images/homeImages/whatIsMasternodeIcon.png" alt="What is Masternode"/>
          </div>
          <h4>What is a masternode?</h4>
          <p>A masternode is a blockchain server that processes transactions and secures the network. Each masternode receives rewards in exchange for the work it performs. </p>
        </Col>
        <Col xl={4} lg={4} md={4} sm={6} xs={10} className="secondSectionItemContainer">
          <div className="secondSectionItemIconContainer">
            <img src="/assets/images/homeImages/howMuchIcon.png" alt="How much does it pay? "/>
          </div>
          <h4>How much does it pay?</h4>
          <p>The rewards from a masternode vary depending on the type of coin. Masternodes can pay anywhere from 5% to 150% per year. Choose the masternode that is right for you.</p>
        </Col>
        <Col xl={4} lg={4} md={4} sm={6} xs={10} className="secondSectionItemContainer">
          <div className="secondSectionItemIconContainer">
            <img src="/assets/images/homeImages/howIStartedIcon.png" alt="How do I get started?"/>
          </div>
          <h4>How do I get started?</h4>
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
            <img src="/assets/images/homeImages/dashboardScreenshot.png" alt="Dashboard Screenshot"/>
          </Col>
          <div className="screenshotsSectionTextPartContainer ml-xl-5 ml-lg-5 ml-md-3 ml-0">
            <h5>Clean & Simple Dashboard</h5>
            <p>The Nodebucks dashboard makes it extremely easy to keep track of all your masternodes. Track your nodes values and rewards over time. </p>
          </div>
        </Col>
        <Col className="screenshotsSectionItemContainer mt-5 flex-xl-row flex-lg-row flex-md-row flex-column">
          <div className="screenshotsSectionTextPartContainer mr-xl-5 mr-lg-5 mr-md-3 mr-0">
            <h5>Masternode History</h5>
            <p>Each masternode view provides you with a complete overview of the node from the time it was created. See a complete record of every reward you have received and 100% transparency of our service fees. Setup automatic withdrawals or choose to withdraw manually. </p>
          </div>
          <Col xl={6} lg={5} md={5} sm={8} xs={10}>
            <img src="/assets/images/homeImages/historyScreenshot.png" alt="History Screenshot"/>
          </Col>
        </Col>
        <Col className="screenshotsSectionItemContainer mt-5 flex-xl-row flex-lg-row flex-md-row flex-column-reverse">
          <Col xl={6} lg={5} md={5} sm={8} xs={10}>
            <img src="/assets/images/homeImages/securityScreenshot.png" alt="Security Screenshot"/>
          </Col>
          <div className="screenshotsSectionTextPartContainer ml-xl-5 ml-lg-5 ml-md-3 ml-0">
            <h5>Account & Coin Security</h5>
            <p>Account & Coin Security <br/> Nodebucks takes security very seriously. All masternodes are secured and backed up on a regular basis. Security audits are performed by industry experts. User accounts are secured with 2fa. </p>
          </div>
        </Col>
        <Col className="screenshotsSectionItemContainer mt-5 flex-xl-row flex-lg-row flex-md-row flex-column">
          <div className="screenshotsSectionTextPartContainer mr-xl-5 mr-lg-5 mr-md-3 mr-0">
            <h5>Affiliate Program</h5>
            <p>We appreciate you sharing Nodebucks with friends and family. Take part in our affiliate program to earn rewards every time your referrals earn rewards on their masternodes. And our affiliate program goes three tiers deep! </p>
          </div>
          <Col xl={6} lg={5} md={5} sm={8} xs={10}>
            <img src="/assets/images/homeImages/affiliateScreenshot.png" alt="Affiliate Screenshot"/>
          </Col>
        </Col>
      </Col>
    )
  }

  renderTestimonialsSection() {
    return (
      <Col className="d-flex flex-wrap justify-content-center">
        <Col xl={4} lg={5} md={6} sm={9} xs={12} className="mt-4">
          <div className="testimonialsSectionItemContainer">
            <img src="/assets/images/homeImages/testimonialAvatarScott.jpg" alt="Scott Avatar"/>
            <p className="testimonialDescription">I always wanted to own a piece of the blockchain and a masternode seemed liked a great way to do it, but I didn‘t have the technical background to build one or the time to maintain it. Nodebucks makes it easy to run your own masternodes and I love the clean intuitive interface, the transparency, and reporting that it provides.</p>
            <div className="divider"/>
            <p className="testimonialName">Scott</p>
            <img className="testimonialsQuotationMark" src="/assets/images/homeImages/testimonialsQuotationMark.png" alt="Quotation Mark"/>
          </div>
        </Col>
        <Col xl={4} lg={5} md={6} sm={9} xs={12} className="mt-4">
          <div className="testimonialsSectionItemContainer">
            <img src="/assets/images/homeImages/testimonialAvatarJoe.jpg" alt="Scott Avatar"/>
            <p className="testimonialDescription">Nodebucks was by far the easiest site I've ever used and I had a masternode setup within just a few clicks. Finally a start to finish solution for masternodes. </p>
            <div className="divider"/>
            <p className="testimonialName">Joe</p>
            <img className="testimonialsQuotationMark" src="/assets/images/homeImages/testimonialsQuotationMark.png" alt="Quotation Mark"/>
          </div>
        </Col>
        <Col xl={4} lg={5} md={6} sm={9} xs={12} className="mt-4">
          <div className="testimonialsSectionItemContainer">
            <img src="/assets/images/homeImages/testimonialAvatarPavel.jpg" alt="Scott Avatar"/>
            <p className="testimonialDescription">I was skeptical, but after talking to their team, it was clear these guys were the real deal. They know what they're doing! </p>
            <div className="divider"/>
            <p className="testimonialName">Pavel</p>
            <img className="testimonialsQuotationMark" src="/assets/images/homeImages/testimonialsQuotationMark.png" alt="Quotation Mark"/>
          </div>
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
