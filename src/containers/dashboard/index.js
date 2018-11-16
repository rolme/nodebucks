import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'

import { Container, Col, Row, Alert, UncontrolledAlert } from 'reactstrap'
import Summary from './summary'
import Balance from './balance'
import MainTable from './mainTable'
import Chart from './chart'
import './index.css'

import { fetchNodes } from '../../reducers/nodes'
import { fetchAnnouncement } from '../../reducers/announcements'
import { reset } from '../../reducers/user'
import { reset as resetSellServerMessage } from '../../reducers/user'

import { capitalize, valueFormat, disabledAnnouncements } from "../../lib/helpers";
import { ClipLoader } from "react-spinners";

import Metatags from "../../components/metatags"

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPurchaseMessageAlert: false,
      showAnnouncementAlert: false,
      showConfirmMessageAlert: false,
      showSellServerMessageAlert: false,
      confirmMessage: '',
      sellServerMessage: ''
    }
  }

  componentWillMount() {
    window.scrollTo(0, 0)
    const { confirmMessage: propConfirmMessage, message } = this.props
    let { confirmMessage, sellServerMessage, showConfirmMessageAlert, showSellServerMessageAlert } = this.state
    if ( !!message && message.includes('You have successfully sold your') ) {
      sellServerMessage = message
      showSellServerMessageAlert = true
    }
    if ( !!propConfirmMessage ) {
      confirmMessage = propConfirmMessage
      showConfirmMessageAlert = true
    }
    this.setState({ confirmMessage, showConfirmMessageAlert, sellServerMessage, showSellServerMessageAlert })
    this.props.fetchNodes()
  }

  componentDidMount() {
    let { showAnnouncementAlert } = this.state

    if ( !disabledAnnouncements() ) {
      showAnnouncementAlert = true
    }
    this.props.fetchAnnouncement()
    this.setState({ showAnnouncementAlert })
  }

  onAlertDismiss = (name) => {
    name = 'show' + capitalize(name) + 'Alert'
    this.setState({ [name]: false })
    !!this.props[ 'reset' + name ] && this.props[ 'reset' + name ]()
    sessionStorage.setItem(name + 'Visible', false)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.message === 'Purchase node successful.') {
      this.setState({ showPurchaseMessageAlert: true })
    }
  }

  render() {
    const { pending, nodes, announcement, announcementError, purchaseError, messageWithdrawal, errorWithdrawal } = this.props
    const { showPurchaseMessageAlert, showAnnouncementAlert, showConfirmMessageAlert, showSellServerMessageAlert, confirmMessage, sellServerMessage } = this.state
    let monthlyRewards = 0, nodeValue = 0, costBases = 0, yearlyRoiValues = 0

    // Do not display sold nodes
    const filteredNodes = []
    if (nodes.length > 0) {
      filteredNodes = nodes.filter(node => {
        return node.status !== 'sold'
      })
    }

    filteredNodes.forEach(node => {
      monthlyRewards += (+node.crypto.monthlyRoiValue)
      nodeValue += (+node.value)
      costBases += (+node.cost)
      yearlyRoiValues += (+node.crypto.yearlyRoiValue)
    })

    return (
      <Container fluid className="dashboardPageContainer">
        <Metatags
          title="Dashboard - Nodebucks"
        />
        <div className="contentContainer px-0">
          {announcement && announcement.text && !announcementError &&
          <Alert className="alert" isOpen={showAnnouncementAlert} toggle={() => this.onAlertDismiss('announcement')}>
            {announcement.text}
          </Alert>
          }
          <Alert color='success' isOpen={showConfirmMessageAlert} toggle={() => this.onAlertDismiss('confirmMessage')}>
            {confirmMessage}
          </Alert>
          <Alert color='success' isOpen={showSellServerMessageAlert} toggle={() => this.onAlertDismiss('sellServerMessage')}>
            {sellServerMessage}
          </Alert>
          { messageWithdrawal && <UncontrolledAlert color={errorWithdrawal ? 'danger' : 'success'}>{messageWithdrawal}</UncontrolledAlert> }
        </div>
        <div className="contentContainer px-0">
          { purchaseError ?
            <UncontrolledAlert color="danger">Error on server while purchasing new node. Please contact us.</UncontrolledAlert> :
            <Alert className="messageBox statusSuccess" isOpen={showPurchaseMessageAlert} toggle={() => this.onAlertDismiss('purchaseMessage')}>
              <h5 className="messageTitle">Congratulations on your new Masternode!</h5>
              <p className="messageText">
                Please give us 24-48 hours to get your node up and running.
                Your first reward is usually given after 2-3 days of node uptime.
              </p>
            </Alert>
          }
          <h1 className="dashboardPageTitle pageTitle">Dashboard</h1>
          <Row className="dashboardPageTotalsRow">
            <Col xl={4} lg={6} md={5} sm={5} xs={12} className="ml-xl-0">
              <h5>Total Node Value</h5>
              {pending ?
                <ClipLoader
                  size={25}
                  color={'#FFFFFF'}
                  loading={true}
                /> :
                <p>${valueFormat(+nodeValue, 2)}</p>
              }
            </Col>
            <Col xl={4} lg={6} md={5} sm={5} xs={12}>
              <h5>Projected Annual ROI</h5>
              {pending ?
                <ClipLoader
                  size={25}
                  color={'#FFFFFF'}
                  loading={true}
                /> :
                <p>{!!costBases ? valueFormat((yearlyRoiValues / costBases) * 100, 2) : 0}%</p>
              }
            </Col>
            <Col xl={4} lg={6} md={5} sm={5} xs={12}>
              <h5>Projected Monthly Returns </h5>
              {pending ?
                <ClipLoader
                  size={25}
                  color={'#FFFFFF'}
                  loading={true}
                /> :
                <p>${valueFormat(+monthlyRewards, 2)}</p>
              }
            </Col>
            <Col xl={4} lg={6} md={5} sm={5} xs={12} className="mr-xl-0">
              <h5>Masternodes Owned </h5>
              {pending ?
                <ClipLoader
                  size={25}
                  color={'#FFFFFF'}
                  loading={true}
                /> :
                <p>{filteredNodes.length}</p>
              }
            </Col>
          </Row>
          <Row>
            <Col xl={9}>
              <MainTable list={filteredNodes}/>
              { !pending && filteredNodes.length > 0 && <Chart nodes={filteredNodes}/> }
            </Col>
            <Col xl={3} className="dashboardContentRightPartContainer align-items-xl-end align-items-center">
              {!!filteredNodes.length &&
              <div className="dashboardButtonsContainer">
                <NavLink to={`/masternodes`} className="btn dashboardMainTableAddNodeButton mb-3"><img src="/assets/images/plusIcon.png" alt="add" className="mr-2"/> Add Node</NavLink>
                <NavLink to={`/nodes/withdraw`} className="btn dashboardBalanceWithdrawButton"><img src="/assets/images/downArrow.png" alt="withdraw" className="mr-2"/>Withdraw</NavLink>
              </div>
              }
              <Summary list={filteredNodes}/>
              <Balance/>
            </Col>
          </Row>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  masternodes: state.masternodes.list,
  nodes: state.nodes.list,
  purchaseError: state.nodes.error,
  message: state.nodes.message,
  confirmMessage: state.user.message === 'Your email address has been successfully verified. Thank you!' && state.user.message,
  sellServerMessage: state.nodes.message && state.nodes.message.includes('You have successfully sold your') && state.nodes.message,
  pending: state.nodes.pending,
  purchasedNode: state.nodes.purchased,
  user: state.user.data,
  announcement: state.announcements.data,
  messageWithdrawal: state.withdrawals.message,
  errorWithdrawal: state.withdrawals.error,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAnnouncement,
  fetchNodes,
  reset,
  resetSellServerMessage
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard))
