import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { EventEmitter } from 'events';
import moment from 'moment'
import { Col, Container, Row, Button, Table, Alert } from 'reactstrap'
import PriceHistoryChart from './priceHistoryChart'
import ConfirmationModal from '../../components/confirmationModal'
import './index.css'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/fontawesome-free-solid'

import {
  fetchNode,
  updateNode
} from '../../reducers/nodes'
import { passwordConfirmation } from '../../reducers/user'

import { capitalize, valueFormat } from "../../lib/helpers";

class Node extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rewardSetting: '',
      showAllHistoryData: false,
      withdrawWallet: '',
      showAlert: false,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.rewardSettingsChange = this.rewardSettingsChange.bind(this)
    this.toggleHistoryDataAmount = this.toggleHistoryDataAmount.bind(this)
  }

  componentWillMount() {
    window.scrollTo(0, 0)
    let { match: { params } } = this.props
    this.props.fetchNode(params.slug)
  }

  componentWillReceiveProps(nextProps) {
    const { node } = nextProps
    !!node && this.setState({ rewardSetting: node.rewardSetting, withdrawWallet: node.withdrawWallet })
  }

  toggleHistoryDataAmount() {
    const { showAllHistoryData } = this.state
    this.setState({ showAllHistoryData: !showAllHistoryData })
  }

  handleInputChange(value, name) {
    this.setState({ [ name ]: value })
  }

  rewardSettingsChange(value) {
    this.setState({ rewardSetting: value })
  }

  handleRewardSettingChange = () => {
    const { node } = this.props
    const { rewardSetting, withdrawWallet } = this.state
    rewardSetting === 20 ?
      this.props.updateNode(node.slug, { reward_setting: rewardSetting, withdraw_wallet: withdrawWallet }, () => {
        this.showAlert();
      }) :
      this.props.updateNode(node.slug, { reward_setting: rewardSetting }, () => {
        this.showAlert();
      })
  }

  showConfirmationModal = () => {
    EventEmitter.prototype.emit('open-confirm-modal');
  }

  showAlert = () => {
    this.setState({ showAlert: true })
    setTimeout(() => {
      this.setState({ showAlert: false })
    }, 3000)
  }

  render() {
    const { node, pending, message } = this.props

    if ( pending || node.slug === undefined ) {
      return null
    }

    return (
      <Container fluid className="showPageContainer">
        <div className="showPageContentContainer contentContainer">
          <Alert isOpen={this.state.showAlert}>{message}</Alert>
          {this.displayHeader(node)}
          <Row className="pt-3 mx-0">
            <Col xl={{ size: 8, offset: 0 }} lg={{ size: 10, offset: 1 }} md={{ size: 12, offset: 0 }} sm={{ size: 12, offset: 0 }} xs={{ size: 12, offset: 0 }} className="pl-0">
              {this.displayHistory(node)}
              {this.displayPriceHistoryChart(node)}
            </Col>
            <Col xl={{ size: 4, offset: 0 }} lg={{ size: 6, offset: 3 }} md={{ size: 8, offset: 2 }} sm={{ size: 12, offset: 0 }} xs={{ size: 12, offset: 0 }} className="pr-0">
              {this.displaySummary(node)}
              {this.displayRewardSettings(node)}
              {this.displayROI(node)}
            </Col>
          </Row>
          <ConfirmationModal
            show={this.showConfirmationModal}
            onSuccess={this.handleRewardSettingChange}
            onConfirm={this.props.passwordConfirmation}
            userSlug={this.props.userSlug}
            title='Confirm Reward Changes'
          />
        </div>
      </Container>
    )
  }

  displayHeader(node) {
    return (
      <Row className="showPageHeaderContainer  mx-0">
        <Col xl={3} lg={3} md={3} sm={6} xs={12} className="d-flex align-items-center justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-sm-center px-0">
          <img alt={node.crypto.slug} src={`/assets/images/logos/${node.crypto.slug}.png`} width="65px"/>
          <h5 className="mb-0 ml-4 showPageHeaderCoinName ">{node.crypto.name}</h5>
        </Col>
        <Col xl={4} lg={4} md={4} sm={6} xs={12} className="d-flex pl-0 my-xl-0 my-lg-0 my-md-0 my-3 justify-content-xl-center justify-content-lg-center justify-content-md-center align-items-center  justify-content-start">
          <h5 className="mb-0 showPageHeaderInfo"><b>Status:</b> {capitalize(node.status)}</h5>
          <h5 className="mb-0 ml-3 showPageHeaderInfo"><b>IP:</b> {(!!node.ip) ? node.ip : 'Pending'}</h5>
        </Col>
        {this.displayActions(node)}
      </Row>
    )
  }

  displaySummary(node) {
    let uptime = '-'
    if ( !!node.onlineAt ) {
      node.onlineAt += ' +0000'
      uptime = moment().diff(moment(node.onlineAt, "YYYY-MM-DD HH:mm:ss"), 'days')
    }
    if ( uptime === 0 ) {
      if ( !!moment().diff(moment(node.onlineAt, "YYYY-MM-DD HH:mm:ss"), 'hours') ) {
        uptime = moment().diff(moment(node.onlineAt, "YYYY-MM-DD HH:mm:ss"), 'hours') + ' hrs'
      } else if ( !!moment().diff(moment(node.onlineAt, "YYYY-MM-DD HH:mm:ss"), 'minutes') ) {
        uptime = moment().diff(moment(node.onlineAt, "YYYY-MM-DD HH:mm:ss"), 'minutes') + ' min'
      } else if ( !!moment().diff(moment(node.onlineAt, "YYYY-MM-DD HH:mm:ss"), 'seconds') ) {
        uptime = moment().diff(moment(node.onlineAt), "YYYY-MM-DD HH:mm:ss", 'seconds') + ' sec'
      }
    } else {
      uptime += uptime > 1 ? ' days' : ' day'
    }

    const value = valueFormat(+node.value, 2)
    const cost = valueFormat(+node.cost, 2)
    const rewardTotal = valueFormat(+node.rewardTotal, 2)
    const rewardPercentage = valueFormat(node.rewardTotal / node.cost, 2)
    return (
      <div>
        <h5 className="showPageSectionHeader"> Summary </h5>
        <div className="bg-white p-3 showPageSectionBorderedPartContainer">
          <dl className="row mb-0">
            <dd className="col-6">Node ID</dd>
            <dt className="col-6 text-right"> {node.id}</dt>

            <dd className="col-6">Value</dd>
            <dt className="col-6 text-right">${value}</dt>

            <dd className="col-6">Cost</dd>
            <dt className="col-6 text-right">${cost}</dt>

            <dd className="col-6">Total Rewards</dd>
            <dt className="col-6 text-right">${rewardTotal}</dt>

            <dd className="col-6">Reward %</dd>
            <dt className="col-6 text-right">{rewardPercentage}%</dt>

            <dd className="col-6">Uptime</dd>
            <dt className="col-6 text-right">{uptime}</dt>
          </dl>
        </div>
      </div>
    )
  }

  displayRewardSettings(node) {
    const propRewardSetting = this.props.node.rewardSetting
    const propWithdrawWallet = this.props.node.withdrawWallet
    let { rewardSetting, withdrawWallet } = this.state
    let isButtonDisabled = false
    if ( rewardSetting === 20 ) {
      isButtonDisabled = !withdrawWallet || withdrawWallet === propWithdrawWallet
    } else {
      isButtonDisabled = propRewardSetting === rewardSetting
    }
    withdrawWallet = !!withdrawWallet ? withdrawWallet : ''
    return (
      <div className="mt-3">
        <h5 className="showPageSectionHeader"> Reward Settings </h5>
        <div className="bg-white p-3 showPageSectionBorderedPartContainer">
          <label className="radioButtonContainer">
            <div>
              <p className="showPageRadioButtonTitle">Store on Nodebucks</p>
              <p className="showPageRadioButtonDescription">Withdrawn manually at any time</p>
            </div>
            <input type="radio" onChange={() => this.rewardSettingsChange(0)} checked={rewardSetting === 0} name="radio"/>
            <span className="radioButtonCheckmark"></span>
          </label>
          <label className="radioButtonContainer">
            <div>
              <p className="showPageRadioButtonTitle">Purchase New Masternode</p>
              <p className="showPageRadioButtonDescription">Your rewards will be used to purchase another masternode once you have the required amount.</p>
            </div>
            <input type="radio" onChange={() => this.rewardSettingsChange(10)} checked={rewardSetting === 10} name="radio"/>
            <span className="radioButtonCheckmark"></span>
          </label>
          <label className="radioButtonContainer">
            <div onClick={() => this.rewardSettingsChange(20)}>
              <p className="showPageRadioButtonTitle">Auto-Withdraw </p>
              <input type="text" placeholder={`${node.crypto.name} Wallet`} value={withdrawWallet} onChange={(event) => this.handleInputChange(event.target.value, 'withdrawWallet')} className="showPageRewardSettingsInputField"/>
            </div>
            <input type="radio" onChange={() => this.rewardSettingsChange(20)} checked={rewardSetting === 20} name="radio"/>
            <span className="radioButtonCheckmark"></span>
          </label>
          <div className="d-flex justify-content-start">
            <Button className="submitButton rewardSettingsUpdateButton" disabled={isButtonDisabled} onClick={this.showConfirmationModal}>Update</Button>
          </div>
        </div>
      </div>
    )
  }

  displayROI(node) {
    const week = valueFormat(node.rewards.week, 2)
    const month = valueFormat(node.rewards.month, 2)
    const year = valueFormat(node.rewards.year, 2)
    return (
      <div className="mt-3">
        <h5 className="showPageSectionHeader">ROI</h5>
        <div className="bg-white p-3 showPageSectionBorderedPartContainer">
          <dl className="row mb-0">
            <dd className="col-6">Last Week</dd>
            <dt className="col-6 text-right">${week}</dt>

            <dd className="col-6">Last Month</dd>
            <dt className="col-6 text-right">${month}</dt>

            <dd className="col-6">Last Year</dd>
            <dt className="col-6 text-right">${year}</dt>
          </dl>
        </div>
      </div>
    )
  }

  displayActions(node) {
    const value = valueFormat(+node.value, 2)
    const sellable = (node.status !== 'sold')
    const isActive = node.status === 'online'
    return (
      <Col xl={5} lg={5} md={5} sm={12} xs={12} className="d-flex px-0 flex-wrap justify-content-xl-end justify-content-lg-end justify-content-md-end justify-content-center">
        {sellable && (
          <Col xl={8} lg={8} md={8} sm={8} xs={12} className="text-xl-right text-lg-right text-md-right text-sm-center text-xs-center my-2 px-0">
            <NavLink to={`/nodes/${node.slug}/sell`}>
              <Button disabled={!isActive} className="submitButton col-xl-10 col-lg-10 col-md-12 col-sm-10 col-xs-10">Sell Server (${value})</Button>
            </NavLink>
            {!isActive &&
            <p className="col-xl-10 col-lg-10 offset-xl-2 offset-lg-2 col-12 offset-0 text-center text-danger">Disabled until activated</p>
            }
          </Col>
        )}

      </Col>
    )
  }

  displayHistory(node) {
    const { showAllHistoryData } = this.state
    const lastDaysData = node.events.filter(event => moment().diff(moment(new Date(event.timestamp)), 'days') <= 30)
    const events = !lastDaysData.length || showAllHistoryData ? node.events : lastDaysData
    return (
      <div>
        <h5 className="showPageSectionHeader"> History </h5>
        <div className="bg-white p-3 showPageSectionBorderedPartContainer">
          <Table responsive className="showPageHistoryTable">
            <thead>
            <tr>
              <th className="text-left">Date</th>
              <th className="text-left">Event</th>
              <th className="text-right">Total Rewards ({node.crypto.symbol})</th>
            </tr>
            </thead>
            <tbody>
            {this.handleHistoryData(events, node.events)}
            </tbody>
          </Table>
          {!!lastDaysData.length && lastDaysData.length !== node.events.length &&
          <div className="d-flex justify-content-center">
            <Button className="showPageHistoryTableButton" onClick={this.toggleHistoryDataAmount}> <FontAwesomeIcon icon={showAllHistoryData ? faChevronUp : faChevronDown} color="#213238" className="mr-2"/> {showAllHistoryData ? 'Last 30 Days' : 'View All'}</Button>
          </div>
          }
        </div>
      </div>
    )
  }

  handleHistoryData(events, allEvents) {
    let total = allEvents.map(e => e.value).length ? allEvents.map(e => e.value).reduce((t, v) => +t + +v) : []
    return events.map(event => {
      total = (total < 0) ? 0.00 : +total
      const row = (
        <tr key={event.id}>
          <td className="text-left">{moment(event.timestamp, "YYYY-MM-DD HH:mm:ss").format("MMM D, YYYY  HH:mm")}</td>
          <td className="text-left">{event.description}</td>
          <td className="text-right">{valueFormat(total, 2)}</td>
        </tr>
      )
      total = +total - +event.value
      return row
    })
  }

  displayPriceHistoryChart(node) {
    return (
      <div className="my-3">
        <h5 className="showPageSectionHeader">{node.crypto.name} Price</h5>
        <div className="bg-white p-3 showPageSectionBorderedPartContainer">
          <PriceHistoryChart node={node}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  node: state.nodes.data,
  error: state.nodes.error,
  message: state.nodes.message,
  pending: state.nodes.pending,
  userSlug: state.user.data.slug
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchNode,
  updateNode,
  passwordConfirmation,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Node)
