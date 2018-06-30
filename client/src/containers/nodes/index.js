import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'

import { Button, Col, Container, Row} from 'reactstrap'
import Editable from 'react-x-editable'
import './index.css'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/fontawesome-free-solid'


import {
  fetchNode,
  updateNode
} from '../../reducers/nodes'

class Node extends Component {
  componentWillMount() {
    let { match: { params } } = this.props
    this.props.fetchNode(params.slug)
  }

  handleEditableSubmit(name, el) {
    const { node } = this.props
    let data   = {}
    data[name] = el.value

    this.props.updateNode(node.slug, data)
  }

  handleRewardSettingClick(value) {
    const { node } = this.props
    this.props.updateNode(node.slug, { reward_setting: value })
  }

  render() {
    const { match: { params }, node, pending } = this.props

    if (pending || node.slug === undefined) {
      return <h4 className="pt-3">Loading {params.slug}... </h4>
    }

    return(
      <Container fluid className="bg-white">
        <div className="contentContainer">
          {this.displayHeader(node)}
          <div className="row pt-3">
            {this.displayHistory(node)}
            <div className="col-md-4">
              {this.displaySummary(node)}
              {this.displayRewardSettings(node)}
              {this.displayActions(node)}
            </div>
          </div>
        </div>
      </Container>
    )
  }a

  displayHeader(node) {
    const uptime = (node.onlineAt !== null) ? moment().diff(moment(node.onlineAt), 'days') : 0

    return (
      <Row className="pt-3">
        <h5 className="col-md-4">
          <img alt={node.crypto.slug} src={`/assets/images/logos/${node.crypto.slug}.png`} height="45px" width="45px"/> {node.crypto.name}
        </h5>
        <h5 className="col-md-4">
          IP: {(!!node.ip) ? node.ip : 'Pending' }
        </h5>
        <h5 className="col-md-4">
          Uptime: {uptime} days
        </h5>
      </Row>
    )
  }

  displaySummary(node) {
    const value            = (+node.value).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    const cost             = (+node.cost).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    const rewardTotal      = (+node.rewardTotal).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    const rewardPercentage = (node.rewardTotal/node.cost).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    const balance          = (+node.balance.usd).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    return(
      <div className="card mb-2">
        <div className="card-header">
          Summary
        </div>
        <div className="card-body">
          <dl className="row">
            <dt className="col-sm-6">Value</dt>
            <dd className="col-sm-6 text-right">{value}</dd>

            <dt className="col-sm-6">Cost</dt>
            <dd className="col-sm-6 text-right">{cost}</dd>

            <dt className="col-sm-6">Total Rewards</dt>
            <dd className="col-sm-6 text-right">$ {rewardTotal} ({rewardPercentage}%)</dd>

            <dt className="col-sm-6">Balance (USD)</dt>
            <dd className="col-sm-6 text-right">$ {balance}</dd>

            <dt className="col-sm-6">Status</dt>
            <dd className="col-sm-6 text-right"><span className={`badge badge-${(node.status === 'online') ? 'success' : 'danger'}`}>{node.status}</span></dd>

          </dl>
        </div>
      </div>
    )
  }

  displayRewardSettings(node) {
    return(
      <div className="card mb-2">
        <div className="card-header">
          Reward Settings
        </div>
        <div className="card-body">
          <Row>
            <Col className={`my-2 ${(node.rewardSetting === 0) ? 'selected': ''}`}>
              <dl className="mt-2 clickable" onClick={this.handleRewardSettingClick.bind(this, 0)}>
                <dt>Store on Nodebucks {this.displayCheck(node.rewardSetting === 0)}</dt>
                <dd>Withdraw manually at any time.</dd>
              </dl>
            </Col>
          </Row>
          <Row>
            <Col className={`my-2 ${(node.rewardSetting === 10) ? 'selected': ''}`}>
              <dl className="mt-2 clickable" onClick={this.handleRewardSettingClick.bind(this, 10)}>
                <dt>Auto-Launch Node {this.displayCheck(node.rewardSetting === 10)}</dt>
                <dd>Your rewards will automatically be used to buy another Node</dd>
              </dl>
            </Col>
          </Row>
          <Row>
            <Col className={`my-2 ${(node.rewardSetting === 20) ? 'selected': ''}`}>
              <dl className="mt-2">
                <dt className="clickable" onClick={this.handleRewardSettingClick.bind(this, 20)}>Auto-Pay Wallet Address {this.displayCheck(node.rewardSetting === 20)}</dt>
                <dd>
                  Provide an address and we will send rewards automatically.
                  <Editable
                    dataType="text"
                    mode="inline"
                    name="wallet"
                    showButtons={false}
                    value={node.withdrawWallet}
                    display={value => {
                      return(<span style={{borderBottom: "1px dashed", textDecoration: "none"}}>{value}</span>)
                    }}
                    handleSubmit={this.handleEditableSubmit.bind(this, 'withdraw_wallet')}
                  />
                </dd>
              </dl>
            </Col>
          </Row>
        </div>
      </div>
    )
  }

  displayCheck(show) {
    if (show) {
      return <FontAwesomeIcon icon={faCheck} color="#28a745" className="ml-2"/>
    }
  }

  displayActions(node) {
    return(
      <div className="card">
        <div className="card-header">
          Actions
        </div>
        <div className="card-body">
          <Row><Col className="text-center my-2"><Button color="danger">Sell Node</Button></Col></Row>
          <Row><Col className="text-center my-2"><Button color="primary">Add Node</Button></Col></Row>
        </div>
      </div>
    )
  }

  displayHistory(node) {
    let total = node.events.map(e => e.value).reduce((t, v) => +t + +v)
    return(
      <div className="card">
        <div className="card-header">
          History
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Event</th>
                <th>Total Rewards</th>
              </tr>
            </thead>
            <tbody>
              {true && node.events.map(event => {
                total = (total < 0) ? 0.00 : +total
                const row = (
                  <tr key={event.id}>
                    <td>{event.timestamp}</td>
                    <td>{event.description}</td>
                    <td>{total.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</td>
                  </tr>
                )
                total = +total - +event.value
                return row
              })}
            </tbody>
          </table>
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
