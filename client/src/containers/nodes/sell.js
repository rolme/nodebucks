import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { ClipLoader } from 'react-spinners'
import { Col, Container, Row, FormGroup, Label, Input, Button } from 'reactstrap'
import './index.css'

import Countdown from '../../components/countdown'
import ConfirmationModal from '../../components/confirmationModal'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/fontawesome-free-solid'

import {
  sellNode,
  sellReserveNode,
  updateNode
} from '../../reducers/nodes'
import { passwordConfirmation } from '../../reducers/user'

import { valueFormat } from "../../lib/helpers";

class SellNode extends Component {
  constructor(props) {
    super(props)

    this.state = {
      validPrice: true,
      showConfirmationModal: false,
      address: ''
    }

    this.handleGoBack = this.handleGoBack.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
  }

  componentWillMount() {
    window.scrollTo(0, 0)
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
    this.setState({ validPrice: true })
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

  updateAddressValue(name, value) {
    const { node } = this.props
    let data = {}
    data[ name ] = value

    this.props.updateNode(node.slug, data)
  }

  handleAddressChange(value) {
    this.setState({ address: value })
  }

  handleSellSettingClick(value) {
    const { node } = this.props
    if ( value !== node.sellSetting ) {
      this.props.updateNode(node.slug, { sell_setting: value })
      this.setState({ address: '' })
    }
  }

  handleSellClick = () => {
    const { node } = this.props
    this.props.sellNode(node.slug)
    this.closeConfirmationModal()
  }

  showConfirmationModal = () => {
    this.setState({
      showConfirmationModal: true,
      onSuccessPasswordConfirmation: this.handleSellClick
    })
  }

  closeConfirmationModal = () => {
    this.setState({ showConfirmationModal: false })
  }

  render() {
    const { node } = this.props
    const { showConfirmationModal, onSuccessPasswordConfirmation } = this.state

    const available = (node.status !== 'sold')
    const sellPrice = valueFormat(+node.sellPrice, 2)
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
          <ConfirmationModal
            show={showConfirmationModal}
            onSuccess={onSuccessPasswordConfirmation}
            onConfirm={this.props.passwordConfirmation}
            onClose={this.closeConfirmationModal}
            userSlug={this.props.userSlug}
            title='Sell Confirmation'
            price={sellPrice}
          />
        </div>
      </Container>
    )
  }

  displayHeader(node) {
    return (
      <Row className="mx-0 d-flex justify-content-center">
        <h5 className="sellPageHeaderText pageTitle">
          {!!node.crypto && !!node.crypto.slug && <img alt={node.crypto.slug} src={`/assets/images/logos/${node.crypto.slug}.png`} width="65px"/>} Sell {!!node.crypto ? node.crypto.name : ''} Server
        </h5>
      </Row>
    )
  }

  displayPrice(node) {
    const { refreshing } = this.props
    const { validPrice } = this.state
    const sellPrice = (!!node.sellPrice || node.sellPrice === '0') ? valueFormat(+node.sellPrice, 2) : ''
    let price = (validPrice) ? (<span>${sellPrice} USD</span>) : (<s> ${sellPrice} USD</s>)
    return (
      <Col xl={12} className="sellPagePriceSectionContainer">
        <p>You are about to sell your masternode server.</p>
        <p>This action is permanent and irreversible.</p>
        <Row className="mx-0 mt-4 mb-3 align-items-center">
          <h3 className="sellPagePriceAmount">Price: {!!sellPrice && !refreshing ? price : <ClipLoader
            size={25}
            color={'#3F89E8'}
            loading={true}
          />}</h3>
          {!validPrice &&
          <Button disabled={!!refreshing || !sellPrice} className="purchasePageRefreshButton" onClick={this.handleRefresh}>Refresh</Button>
          }
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
            <p className="sellPagePaymentDestinationSectionHeader"><img src="/assets/images/bitcoinIcon.png" width="20px" alt="paypal" className="mr-2"/>Bitcoin Wallet {this.displayCheck(node.sellSetting === 0)}</p>
            <p className="sellPagePaymentDestinationSectionParagraph"> Provide a valid Bitcoin address and we will send payment there</p>
          </Col>
          <Col xl={6} lg={6} md={6} sm={12} xs={12} onClick={this.handleSellSettingClick.bind(this, 10)} className={`sellPagePaymentDestinationSectionContainer ${(node.sellSetting === 10) ? 'selected' : ''}`}>
            <p className="sellPagePaymentDestinationSectionHeader"><img src="/assets/images/paypalIcon.png" width="20px" alt="paypal"/> PayPal {this.displayCheck(node.sellSetting === 10)}</p>
            <p className="sellPagePaymentDestinationSectionParagraph"> Provide your PayPal email below to receive payment via PayPal. </p>
          </Col>
        </div>
        <div className="sellPagePaymentDestinationAddressPartContainer">
          <FormGroup className="w-100">
            <Label for="address">{node.sellSetting === 10 ? 'Enter your PayPal email:' : 'Enter your Bitcoin address:'}</Label>
            <Input value={address} disabled={node.sellSetting !== 0 && node.sellSetting !== 10} type='text' name='address' id='address' placeholder={node.sellSetting === 10 ? "PayPal email" : "Bitcoin Wallet Address"} onChange={(event) => this.handleAddressChange(event.target.value)} onBlur={(event) => this.updateAddressValue(node.sellSetting === 0 ? 'sell_bitcoin_wallet' : 'stripe', event.target.value)}/>
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
    return (<Button className="sellPageSubmitButton" onClick={this.showConfirmationModal}>Sell Server</Button>)
  }
}

const mapStateToProps = state => ({
  node: state.nodes.data,
  error: state.nodes.error,
  message: state.nodes.message,
  pending: state.nodes.pending,
  refreshing: state.nodes.refreshing,
  userSlug: state.user.data.slug,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  sellNode,
  sellReserveNode,
  updateNode,
  passwordConfirmation,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SellNode)
