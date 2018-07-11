import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import moment from 'moment'
import { Col, Container, Row, Button, Table } from 'reactstrap'
import PriceHistoryChart from './priceHistoryChart'
import './index.css'

import {
  fetchNode,
  updateNode
} from '../../reducers/nodes'

class Node extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rewardSetting: '',
      withdrawWallet: '',
    }
    this.rewardSettingsChange = this.rewardSettingsChange.bind(this)
    this.handleRewardSettingChange = this.handleRewardSettingChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentWillMount() {
    let { match: { params } } = this.props
    this.props.fetchNode(params.slug)
  }

  componentWillReceiveProps(nextProps) {
    const { node } = nextProps
    !!node && this.setState({ rewardSetting: node.rewardSetting, withdrawWallet: node.withdrawWallet })
  }

  handleEditableSubmit(name, el) {
    const { node } = this.props
    let data = {}
    data[ name ] = el.value

    this.props.updateNode(node.slug, data)
  }

  handleInputChange(value, name) {
    this.setState({ [name]: value })
  }

  rewardSettingsChange(value) {
    this.setState({ rewardSetting: value })
  }

  handleRewardSettingChange() {
    const { node } = this.props
    const { rewardSetting, withdrawWallet } = this.state
    rewardSetting === 20 ? this.props.updateNode(node.slug, { rewardSetting, withdrawWallet }) : this.props.updateNode(node.slug, { rewardSetting })
  }

  render() {
    const { match: { params }, node, pending } = this.props

    if ( pending || node.slug === undefined ) {
      return <h4 className="pt-3">Loading {params.slug}... </h4>
    }

    return (
      <Container fluid className="showPageContainer">
        <div className="showPageContentContainer contentContainer">
          {this.displayHeader(node)}
          <Row className="pt-3">
            <Col xl={8} className="pl-0">
              {this.displayHistory(node)}
              {this.displayPriceHistoryChart(node)}
            </Col>
            <Col xl={4} className="pr-0">
              {this.displaySummary(node)}
              {this.displayRewardSettings(node)}
              {this.displayROI(node)}
            </Col>
          </Row>
        </div>
      </Container>
    )
  }

  displayHeader(node) {
    const uptime = (node.onlineAt !== null) ? moment().diff(moment(node.onlineAt), 'days') : 0

    return (
      <Row className="showPageHeaderContainer">
        <Col xl={3} className="d-flex align-items-center px-0">
          <img alt={node.crypto.slug} src={`/assets/images/logos/${node.crypto.slug}.png`} width="65px"/>
          <h5 className="mb-0 ml-2 showPageHeaderCoinName ">{node.crypto.name}</h5>
        </Col>
        <Col xl={3} className="d-flex flex-column justify-content-center">
          <h5 className="mb-0 ml-2 showPageHeaderInfo"><b>IP:</b> {(!!node.ip) ? node.ip : 'Pending'}</h5>
          <h5 className="mb-0 ml-2 showPageHeaderInfo"><b>Uptime:</b> {uptime} days</h5>
        </Col>
        {this.displayActions(node)}
      </Row>
    )
  }

  displaySummary(node) {
    const value = (+node.value).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    const cost = (+node.cost).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    const rewardTotal = (+node.rewardTotal).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    const rewardPercentage = (node.rewardTotal / node.cost).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    return (
      <div>
        <h5 className="showPageSectionHeader"> Summary </h5>
        <div className="bg-white p-3">
          <dl className="row mb-0">
            <dd className="col-sm-6">Value</dd>
            <dt className="col-sm-6 text-right">{value}</dt>

            <dd className="col-sm-6">Cost</dd>
            <dt className="col-sm-6 text-right">{cost}</dt>

            <dd className="col-sm-6">Total Rewards</dd>
            <dt className="col-sm-6 text-right">$ {rewardTotal}</dt>

            <dd className="col-sm-6">Reward %</dd>
            <dt className="col-sm-6 text-right">{rewardPercentage}%</dt>
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
        <div className="bg-white p-3">
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
              <p className="showPageRadioButtonTitle">Auto-Launch MN</p>
              <p className="showPageRadioButtonDescription">Your reward will automatically be used to buy another MN</p>
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
          <div className="d-flex justify-content-end">
            <Button className="rewardSettingsUpdateButton" disabled={isButtonDisabled} onClick={this.handleRewardSettingChange}>Update</Button>
          </div>
        </div>
      </div>
    )
  }

  displayROI(node) {
    return (
      <div className="mt-3">
        <h5 className="showPageSectionHeader">ROI</h5>
        <div className="bg-white p-3">
          <dl className="row mb-0">
            <dd className="col-sm-6">Last Week</dd>
            <dt className="col-sm-6 text-right">$ {node.rewards.week}</dt>

            <dd className="col-sm-6">Last Month</dd>
            <dt className="col-sm-6 text-right">$ {node.rewards.month}</dt>

            <dd className="col-sm-6">Last Year</dd>
            <dt className="col-sm-6 text-right">$ {node.rewards.year}</dt>
          </dl>
        </div>
      </div>
    )
  }

  displayActions(node) {
    const value = (+node.value).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    const sellable = (node.status !== 'sold')
    return (
      <Col xl={6} className="d-flex px-0">
        {sellable && (
          <Col xl={6} className="text-right my-2 px-0">
            <NavLink to={`/nodes/${node.slug}/sell`}>
              <Button className="submitButton sellServerButton col-xl-10">Sell Server (${value})</Button>
            </NavLink>
          </Col>
        )}
        <Col xl={6} className="text-right my-2 px-0">
          <NavLink to={`/nodes/${node.crypto.slug}/new`}>
            <Button className="submitButton col-xl-10">Add {node.crypto.name} Node</Button>
          </NavLink>
        </Col>
      </Col>
    )
  }

  displayHistory(node) {
    return (
      <div>
        <h5 className="showPageSectionHeader"> History </h5>
        <div className="bg-white p-3">
          <Table className="showPageHistoryTable">
            <thead>
            <tr>
              <th>Date</th>
              <th>Event</th>
              <th>Total Rewards</th>
            </tr>
            </thead>
            <tbody>
            {this.handleHistoryData(node)}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }

  handleHistoryData(node) {
    let total = node.events.map(e => e.value).reduce((t, v) => +t + +v)
    return node.events.map(event => {
      total = (total < 0) ? 0.00 : +total
      const row = (
        <tr key={event.id}>
          <td>{moment(event.timestamp).format("MMM D, YYYY  HH:mm")}</td>
          <td>{event.description}</td>
          <td>{total.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</td>
        </tr>
      )
      total = +total - +event.value
      return row
    })
  }

  displayPriceHistoryChart(node) {
    return (
      <div className="mt-3">
        <h5 className="showPageSectionHeader">{node.crypto.name} Price</h5>
        <div className="bg-white p-3">
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
  pending: state.nodes.pending
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchNode,
  updateNode
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Node)
