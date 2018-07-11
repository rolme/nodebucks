import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { ClipLoader } from 'react-spinners'
import { Col, Container, Row, FormGroup, Label, Input, Button } from 'reactstrap'
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
      validPrice: true,
      address: ''
    }

    this.handleGoBack = this.handleGoBack.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
  }

  componentWillMount() {
    let { match: { params } } = this.props
    this.props.sellReserveNode(params.slug, true)
  }

  componentWillReceiveProps(nextProps) {
    const newNode = nextProps.node, oldNode = this.props.node
    if ( newNode.stripe !== oldNode.stripe || newNode.sellBitcoinWallet !== oldNode.sellBitcoinWallet ) {
      this.setState({ address: '' })
    }
  }

  handleRefresh() {
    let { match: { params } } = this.props
    this.props.sellReserveNode(params.slug, true)
  }

  handleInputChange(value, name) {
    this.setState({ [name]: value })
  }

  handleExpire() {
    this.setState({ validPrice: false })
  }

  handleReload() {
    window.location.reload()
  }

  handleGoBack() {
    window.history.back()
  }

  handleAddressChange(name, value) {
    const { node } = this.props
    let data = {}
    data[ name ] = value

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
      <Container fluid className="sellPageContainer">
        <div className="contentContainer sellPageContentContainer">
          <p onClick={this.handleGoBack} className="sellPageBackButton"><img src="/assets/images/backArrow.png" alt="Back"/>Back</p>
          <div className="sellPageMainContentContainer">
            <Col xl={{ size: 10, offset: 1 }} lg={{ size: 10, offset: 1 }} md={{ size: 10, offset: 1 }} sm={{ size: 12, offset: 0 }} xs={{ size: 12, offset: 0 }}>
              {this.displayHeader(node)}
              {!available && (
                <h1>This server sold for $ {sellPrice} USD.</h1>
              )}
              {available && this.displayPrice(node)}
              {available && this.displaySellSettings(node)}
              {available && this.displayActions(node)}
            </Col>
          </div>
        </div>
      </Container>
    )
  }

  displayHeader(node) {
    return (
      <Row className="mx-0 d-flex justify-content-center">
        <h5 className="sellPageHeaderText">
          {!!node.crypto && !!node.crypto.slug && <img alt={node.crypto.slug} src={`/assets/images/logos/${node.crypto.slug}.png`} width="65px"/>} Sell {!!node.crypto ? node.crypto.name : ''} Server
        </h5>
      </Row>
    )
  }

  displayPrice(node) {
    const { refreshing } = this.props
    const { validPrice } = this.state
    const sellPrice = (!!node.sellPrice || node.sellPrice === '0') ? (+node.sellPrice).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") : ''
    let price = (validPrice) ? `$${sellPrice} USD` : (<s>${sellPrice} USD</s>)
    return (
      <Col xl={12} className="sellPagePriceSectionContainer">
        <p>You are about to sell your Polis server.</p>
        <p>This action is permanent and irreversible.</p>
        <Row className="mx-0 mt-4 align-items-center">
          <h3 className="sellPagePriceAmount">Sale Price: {!!sellPrice && !refreshing ? price : <ClipLoader
            size={35}
            color={'#3F89E8'}
            loading={true}
          />}</h3>
          <Button disabled={!!refreshing || !sellPrice} className="purchasePageRefreshButton" onClick={this.handleRefresh}>Refresh</Button>
        </Row>
        <p className="small">(price resets in <Countdown refreshing={!node.timeLimit || refreshing} timer={node.timeLimit} onExpire={this.handleExpire.bind(this)}/>)</p>
      </Col>
    )
  }

  displaySellSettings(node) {
    const { address } = this.state

    return (
      <div className="sellPagePaymentDestinationContainer">
        <h5 className="sellPagePaymentDestinationHeaderText">
          Select payment destination:
        </h5>
        <div className="d-flex sellPagePaymentDestinationSectionsContainer flex-wrap justify-content-center">
          <Col xl={6} lg={6} md={6} sm={12} xs={12} onClick={this.handleSellSettingClick.bind(this, 0)} className={`sellPagePaymentDestinationSectionContainer ${(node.sellSetting === 0) ? 'selected' : ''}`}>
            <p className="sellPagePaymentDestinationSectionHeader">Bitcoin Wallet {this.displayCheck(node.sellSetting === 0)}</p>
            <p className="sellPagePaymentDestinationSectionParagraph"> Provide a valid Bitcoin address and we will send payment there</p>
            <p className="sellPagePaymentDestinationSectionParagraph">{node.sellBitcoinWallet}</p>
          </Col>
          <Col xl={6} lg={6} md={6} sm={12} xs={12} onClick={this.handleSellSettingClick.bind(this, 10)} className={`sellPagePaymentDestinationSectionContainer ${(node.sellSetting === 10) ? 'selected' : ''}`}>
            <p className="sellPagePaymentDestinationSectionHeader">Debit Card {this.displayCheck(node.sellSetting === 10)}</p>
            <p className="sellPagePaymentDestinationSectionParagraph"> We will use the following debit card on file (THIS REQUIRES STRIPE INTEGRATION)</p>
            <p className="sellPagePaymentDestinationSectionParagraph">{node.stripe}</p>
          </Col>
        </div>
        <div className="sellPagePaymentDestinationAddressPartContainer">
          <FormGroup className="w-100">
            <Label for="address">Enter your bitcoin address:</Label>
            <Input disabled={node.sellSetting !== 0 && node.sellSetting !== 10} value={address} type='text' name='address' id='address' placeholder="Bitcoin Wallet Address" onChange={(event) => this.handleInputChange(event.target.value, 'address')} onBlur={(event) => this.handleAddressChange(node.sellSetting === 0 ? 'sell_bitcoin_wallet' : 'stripe', event.target.value)}/>
          </FormGroup>
        </div>
      </div>
    )
  }

  displayCheck(show) {
    if ( show ) {
      return <FontAwesomeIcon icon={faCheck} color="#2283C6" className="ml-2"/>
    }
  }

  displayActions(node) {
    if ( node.status === 'sold' ) {
      return (<h5>This server has already been sold.</h5>)
    }

    return (
      <Row className="mx-0">
        <Col xl={6} lg={6} md={6} className="text-center my-2 px-0">
          {this.sellServerButton(node)}
        </Col>
        <Col xl={6} lg={6} md={6} className="text-center my-2 px-0">
          <NavLink to={`/nodes/${node.slug}`}>
            <Button className="sellPageCancelButton">Cancel</Button>
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
      return <Button className="sellPageSubmitButton" onClick={this.handleReload}>Reload Page</Button>
    }

    if ( (node.sellSetting === bitcoinWallet && !node.sellBitcoinWallet) || (node.sellSetting === stripe && !node.stripe) ) {
      return (<Button className="sellPageSubmitButton" disabled={true}>Sell Server (Disabled)</Button>)
    }
    return (<Button className="sellPageSubmitButton" onClick={this.handleSellClick.bind(this)}>Sell Server</Button>)
  }
}

const mapStateToProps = state => ({
  node: state.nodes.data,
  error: state.nodes.error,
  message: state.nodes.message,
  pending: state.nodes.pending,
  refreshing: state.nodes.refreshing,
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
