import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import Masternodes from '../masternodes'
import Testimonials from './testimonials'

import { fetchAnnouncement } from '../../reducers/announcements'
import { disabledAnnouncements } from '../../lib/helpers'
import { Col, Alert, Button } from 'reactstrap'

import './index.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visibleAlert: false
    };

    this.scrollToMasternodes = this.scrollToMasternodes.bind(this)
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
    const hash = this.props.location.hash.substr(1)
    if ( hash === 'masternodes' ) {
      this.scrollToMasternodes()
    }
  }

  scrollToMasternodes(event) {
    const scrollNode = ReactDOM.findDOMNode(this.refs.homeMasternodesContainer)
    setTimeout(() => window.scrollTo(0, !!scrollNode ? scrollNode.offsetTop : 0), !event ? 500 : 0)
  }

  render() {
    const { announcement, announcementError } = this.props
    const { visibleAlert } = this.state
    return (
      <div className="homeContainer">
        <div className="contentContainer px-0">
          {announcement && announcement.text && !announcementError && <Alert className="alert" isOpen={visibleAlert} toggle={this.onAlertDismiss}>
            {announcement.text}
          </Alert>
          }
        </div>
        <div className="homeMainBannerContainer">
          <div className="contentContainer">
            <p className="homeMainBannerHeaderText">Invest in the <span>Blockchain</span></p>
            <p className="homeMainBannerText">Own your very own masternode and collect blockchain rewards.</p>
            <NavLink to="/masternodes">
              <Button className="homeMainBannerButton">Get a Masternode</Button>
            </NavLink>
          </div>
        </div>
        <div className="homeAboutContainer">
          <div className="contentContainer flex-wrap">
            <Col xl={{ size: 5, offset: 0 }} lg={{ size: 5, offset: 0 }} md={{ size: 6, offset: 3 }} sm={{ size: 6, offset: 3 }} xs={{ size: 6, offset: 3 }} className="d-flex justify-content-center">
              <img src="/assets/images/illustration.png" alt='Illustration'/>
            </Col>
            <Col xl={{ size: 7, offset: 0 }} lg={{ size: 7, offset: 0 }} md={{ size: 8, offset: 2 }} sm={{ size: 10, offset: 1 }} xs={{ size: 10, offset: 1 }} className="homeAboutTextPartContainer">
              <h1>Blockchain is the Future</h1>
              <p>The blockchain is disrupting nearly every major industry and is reshaping how businesses think and operate. Masternodes are the cornerstone of a new type of blockchain, acting as the foundation for many popular cryptocurrencies.</p>
              <p> Now you can own and operate your very own masternode and collect rewards in exchange for the work your masternode performs on the blockchain, confirming and verifying transactions.</p>
            </Col>
          </div>
        </div>
        <h1 className="masternodesSectionHeader text-center my-3">Compare Masternodes</h1>
        <Masternodes ref="homeMasternodesContainer" bgColor="bg-white"/>
        <Testimonials/>
        <div className="homeWhatIsMasternodeContainer bg-white">
          <div className="contentContainer flex-wrap">
            <h1 className="homeWhatIsMasternodeHeader">What is a Masternode?</h1>
            <div className="homeWhatIsMasternodeContentPartContainer">
              <Col className="d-flex align-items-center flex-wrap-reverse">
                <Col xl={{ size: 6, offset: 2 }} lg={{ size: 6, offset: 2 }} md={{ size: 8, offset: 2 }} sm={{ size: 10, offset: 1 }} xs={{ size: 12, offset: 0 }} className="homeWhatIsFirstSectionParagraph">
                  <p className="homeWhatIsMasternodeText mb-xl-0 mb-lg-0 mb-3">A blockchain requires a network of computers called nodes to confirm and record transactions. As the number of nodes grows, the power and security of the blockchain network increases. </p>
                </Col>
                <Col xl={{ size: 2, offset: 0 }} lg={{ size: 2, offset: 0 }} md={{ size: 4, offset: 4 }} sm={{ size: 4, offset: 4 }} xs={{ size: 4, offset: 4 }} className="d-flex justify-content-xl-start justify-content-lg-start justify-content-center mb-xl-0 mb-lg-0 mb-3">
                  <img src="/assets/images/whatIsMasternode1.png" alt="What is Masternode?"/>
                </Col>
              </Col>
              <Col>
                <Col xl={{ size: 6, offset: 2 }} lg={{ size: 6, offset: 2 }} className="homeWhatIsMasternodeFirstDotesImageContainer">
                  <img src="/assets/images/whatIsMasternodeDotes1.png" alt="What is Masternode?"/>
                </Col>
              </Col>
              <Col className="d-flex align-items-center flex-wrap">
                <Col xl={{ size: 2, offset: 2 }} lg={{ size: 2, offset: 2 }} md={{ size: 4, offset: 4 }} sm={{ size: 4, offset: 4 }} xs={{ size: 4, offset: 4 }} className="homeWhatIsMasternodeSecondImageContainer d-flex justify-content-xl-start justify-content-lg-start justify-content-center mb-xl-0 mb-lg-0 mb-3">
                  <img src="/assets/images/whatIsMasternode2.png" alt="What is Masternode?"/>
                </Col>
                <Col xl={{ size: 6, offset: 0 }} lg={{ size: 6, offset: 0 }} md={{ size: 8, offset: 2 }} sm={{ size: 10, offset: 1 }} xs={{ size: 12, offset: 0 }}>
                  <p className="homeWhatIsMasternodeText">A masternode is a special node on the blockchain that has enhanced capabilities and voting rights within proof-of-stake (PoS) coins. By owning a masternode, the masternode operator is rewarded by the network for the time and energy of operating the node.
                    <br/><br/>This involves keeping the server online 24x7 as well as occasionally upgrading the software.</p>
                </Col>
              </Col>
              <Col>
                <Col xl={{ size: 6, offset: 2 }} lg={{ size: 6, offset: 2 }} className="homeWhatIsMasternodeSecondDotesImageContainer">
                  <img src="/assets/images/whatIsMasternodeDotes2.png" alt="What is Masternode?"/>
                </Col>
              </Col>
              <Col className="d-flex align-items-center  flex-wrap-reverse">
                <Col xl={{ size: 6, offset: 2 }} lg={{ size: 6, offset: 2 }} md={{ size: 8, offset: 2 }} sm={{ size: 10, offset: 1 }} xs={{ size: 12, offset: 0 }} className="homeWhatIsSecondSectionParagraph">
                  <p className="homeWhatIsMasternodeText">Nodebucks makes it easy for you to own your own masternodes without the technical expertise involved in setting it up and maintaining it. </p>
                </Col>
                <Col xl={{ size: 2, offset: 0 }} lg={{ size: 2, offset: 0 }} md={{ size: 4, offset: 4 }} sm={{ size: 4, offset: 4 }} xs={{ size: 4, offset: 4 }} className="d-flex justify-content-xl-start justify-content-lg-start justify-content-center mb-xl-0 mb-lg-0 mb-3">
                  <img src="/assets/images/whatIsMasternode3.png" alt="What is Masternode?" className="ml-2"/>
                </Col>
              </Col>
            </div>
          </div>
        </div>
        <div className="homeFooterContainer">
          <div className="contentContainer d-flex align-items-center flex-wrap">
            <Col xl={{ size: 10, offset: 1 }} lg={{ size: 10, offset: 1 }} md={{ size: 8, offset: 2 }} sm={{ size: 8, offset: 2 }} xs={{ size: 10, offset: 1 }}>
              <p className="homeFooterText mb-0">Owning a masternode has never been easier! </p>
            </Col>
            <Col xl={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }} sm={{ size: 6, offset: 3 }} xs={{ size: 12, offset: 0 }} className="d-flex justify-content-center mt-xl-0 mt-lg-0 mt-md-3 mt-sm-4 mt-xs-5 px-0">
              <NavLink to="/masternodes">
                <Button className="homeMainBannerButton">Get a Masternode</Button>
              </NavLink>
            </Col>
          </div>
        </div>
      </div>
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
