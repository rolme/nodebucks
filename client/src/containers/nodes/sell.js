import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { ClipLoader } from 'react-spinners'
import { Col, Container, Row } from 'reactstrap'
import Editable from 'react-x-editable'
import './index.css'

import Countdown from '../../components/countdown'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/fontawesome-free-solid'


import {
  sellNode,
  sellReserveNode,
  updateNode
} from '../../reducers/nodes'

class SellNode extends Component {
  constructor(props) {
    super(props)

    this.state = {
      validPrice: true
    }
  }

  componentWillMount() {
    let { match: { params } } = this.props
    this.props.sellReserveNode(params.slug)
  }

  handleExpire() {
    this.setState({ validPrice: false })
  }

  handleReload() {
    window.location.reload()
  }

  handleEditableSubmit(name, el) {
    const { node } = this.props
    let data = {}
    data[ name ] = el.value

    this.props.updateNode(node.slug, data)
  }

  handleSellSettingClick(value) {
    const { node } = this.props
    this.props.updateNode(node.slug, { sell_setting: value })
  }

  handleSellClick() {
    const { node } = this.props
    this.props.sellNode(node.slug)
  }

  render() {
    const { node } = this.props

    const available = (node.status !== 'sold')
    const sellPrice = (+node.sellPrice).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    return (
      <Container fluid className="bg-white">
        <div className="contentContainer">
          {this.displayHeader(node)}
          {!available && (
            <h1>This server sold for $ {sellPrice} USD.</h1>
          )}
          {available && this.displayPrice(node)}
          {available && this.displaySellSettings(node)}
          {available && this.displayActions(node)}
        </div>
      </Container>
    )
  }

  displayHeader(node) {
    return (
      <Row className="pt-3">
        <h5 className="col-md-4">
          {!!node.crypto && !!node.crypto.slug && <img alt={node.crypto.slug} src={`/assets/images/logos/${node.crypto.slug}.png`} height="45px" width="45px"/>} Sell {!!node.crypto ? node.crypto.name : ''} Server
        </h5>
        <h5 className="col-md-4">
          IP: {(!!node.ip) ? node.ip : <ClipLoader
          size={20}
          color={'#3F89E8'}
          loading={true}
        />}
        </h5>
      </Row>
    )
  }

  displayPrice(node) {
    const { validPrice } = this.state
    const sellPrice = (!!node.sellPrice || node.sellPrice === '0') ? (+node.sellPrice).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") : ''
    let price = (validPrice) ? `$${sellPrice} USD` : (<s>${sellPrice} USD</s>)
    return (
      <Col xl={12}>
        <p>You are about to sell your Polis server. This action is permanent and irreversible.</p>
        <h3 className="mb-1">Sale Price: {!!sellPrice ? price : <ClipLoader
          size={35}
          color={'#3F89E8'}
          loading={true}
        />}</h3>
        <p className="small">(price resets in <Countdown timer={node.timeLimit} onExpire={this.handleExpire.bind(this)}/>)</p>
      </Col>
    )
  }

  displaySellSettings(node) {
    return (
      <div className="card mb-2">
        <div className="card-header">
          Select payment destination
        </div>
        <div className="card-body">
          <Row>
            <Col className={`my-2 ${(node.sellSetting === 0) ? 'selected' : ''}`}>
              <dl className="mt-2">
                <dt className="clickable" onClick={this.handleSellSettingClick.bind(this, 0)}>Bitcoin Wallet {this.displayCheck(node.sellSetting === 0)}</dt>
                <dd>
                  Provide a valid Bitcoin address and we will send payment there.
                  <Editable
                    dataType="text"
                    mode="inline"
                    name="wallet"
                    showButtons={false}
                    value={node.sellBitcoinWallet}
                    display={value => {
                      return (<span style={{ borderBottom: "1px dashed", textDecoration: "none" }}>{value}</span>)
                    }}
                    handleSubmit={this.handleEditableSubmit.bind(this, 'sell_bitcoin_wallet')}
                  />
                </dd>
              </dl>
            </Col>
          </Row>
          <Row>
            <Col className={`my-2 ${(node.sellSetting === 10) ? 'selected' : ''}`}>
              <dl className="mt-2">
                <dt className="clickable" onClick={this.handleSellSettingClick.bind(this, 10)}>Debit Card {this.displayCheck(node.sellSetting === 10)}</dt>
                <dd>
                  We will use the following debit card on file (THIS REQUIRES STRIPE INTEGRATION)
                  <Editable
                    dataType="text"
                    mode="inline"
                    name="wallet"
                    showButtons={false}
                    value={node.stripe}
                    display={value => {
                      return (<span style={{ borderBottom: "1px dashed", textDecoration: "none" }}>{value}</span>)
                    }}
                    handleSubmit={this.handleEditableSubmit.bind(this, 'stripe')}
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
    if ( show ) {
      return <FontAwesomeIcon icon={faCheck} color="#28a745" className="ml-2"/>
    }
  }

  displayActions(node) {
    if ( node.status === 'sold' ) {
      return (<h5>This server has already been sold.</h5>)
    }

    return (
      <Row>
        <Col xl={12} className="text-center my-2">
          {this.sellServerButton(node)}
        </Col>
        <Col xl={12} className="text-center my-2">
          <NavLink to={`/nodes/${node.slug}`}>
            <button className="btn btn-secondary col-sm-7">Cancel</button>
          </NavLink>
        </Col>
      </Row>
    )
  }

  sellServerButton(node) {
    // TODO: This should be moved to top of file
    const bitcoinWallet = 0
    const stripe = 10
    const { validPrice } = this.state

    if ( !validPrice ) {
      return <button className="btn btn-outline-secondary col-sm-7" onClick={this.handleReload}>Reload Page</button>
    }

    if ( (node.sellSetting === bitcoinWallet && !node.sellBitcoinWallet) ||
      (node.sellSetting === stripe && !node.stripe) ) {
      return (<button className="btn btn-primary col-sm-7" disabled={true}>Sell Server (Disabled)</button>)
    }
    return (<button className="btn btn-primary col-sm-7" onClick={this.handleSellClick.bind(this)}>Sell Server</button>)
  }
}

const mapStateToProps = state => ({
  node: state.nodes.data,
  error: state.nodes.error,
  message: state.nodes.message,
  pending: state.nodes.pending
})

const mapDispatchToProps = dispatch => bindActionCreators({
  sellNode,
  sellReserveNode,
  updateNode
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SellNode)
