import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import WAValidator from 'wallet-address-validator'

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
import { passwordConfirmation } from '../../reducers/user'

import { valueFormat } from "../../lib/helpers";

class SellNode extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currency: 'btc',
      target: '',
      validPrice: true,
      address: '',
      password: '',
      errorMessages: {
        target: '',
        password: ''
      },
      isSelling: false,
    }
    this.handleGoBack = this.handleGoBack.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
    this.handleInputValueChange = this.handleInputValueChange.bind(this)
    this.validate = this.validate.bind(this)
  }

  componentWillMount() {
    window.scrollTo(0, 0)
    let { match: { params }, user: {verified} } = this.props
    if ( !verified ) {
      this.props.history.push('/401')
      return
    }
    this.props.sellReserveNode(params.slug, true)
  }

  componentWillReceiveProps(nextProps) {
    const newNode = nextProps.node, oldNode = this.props.node
    if ( newNode.deletedAt !== null || [ 'sold', 'new' ].includes(newNode.status) || !newNode.crypto.liquidity.sell ) {
      this.props.history.push('/dashboard')
      return
    }
    if ( !!nextProps.message && nextProps.message.status === 'error' ) {
      let { errorMessages } = this.state
      const errorName = nextProps.message.message.toLowerCase().includes('password') ? 'password' : 'target'
      errorMessages[ errorName ] = nextProps.message.message
      this.setState({ errorMessages })
    } else if ( newNode.sellBitcoinWallet !== oldNode.sellBitcoinWallet ) {
      const currency = newNode.sellSetting === 0 ? 'btc' : 'paypal'
      this.setState({ currency })
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

  handleInputValueChange(name, value) {
    let { errorMessages } = this.state
    errorMessages[ name ] = ''
    this.setState({ [ name ]: value, errorMessages })
  }

  handleSellSettingClick(value) {
    const { currency } = this.state
    if ( currency !== value ) {
      this.setState({ target: '', currency: value })
    }
  }

  handleSell = () => {
    const { node } = this.props
    const { password, currency, target } = this.state
    const data = {
      password,
      node: { currency, target }
    }
    this.setState({ isSelling: true })
    this.props.sellNode(node.slug, data, () => {
      this.setState({ isSelling: false })
    })
  }

  validate() {
    const { currency, target, password } = this.state
    let { errorMessages } = this.state, isValid = !errorMessages.password && !errorMessages.target

    if ( !password ) {
      isValid = false
      errorMessages.password = 'Please type the password.'
    }

    if ( !target ) {
      isValid = false
      errorMessages.target = 'Please enter your ' + currency === 'btc' ? 'Bitcoin Address.' : 'PayPal email.'
    }

    if ( currency === 'btc' ) {
      isValid = WAValidator.validate(target, 'BTC')
      errorMessages.target = isValid ? '' : 'Please type valid address.'
    } else {
      const re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      if ( !re.test(target) ) {
        errorMessages.target = 'Please type valid email address.'
        isValid = false
      }
    }

    this.setState({ errorMessages })

    isValid && this.handleSell()

  }


  render() {
    const { node } = this.props

    const available = (node.status !== 'sold')
    const sellPrice = valueFormat(+node.sellPrice, 2)
    return (
      <Container fluid className="sellPageContainer">
        <div className="contentContainer sellPageContentContainer">
          <p onClick={this.handleGoBack} className="sellPageBackButton"><img src="/assets/images/backArrow.png" alt="Back"/>Back</p>
          <div className="sellPageMainContentContainer">
            <Col xl={!available ? { size: 12, offset: 0 } : { size: 10, offset: 1 }} lg={{ size: 10, offset: 1 }} md={{ size: 10, offset: 1 }} sm={{ size: 12, offset: 0 }} xs={{ size: 12, offset: 0 }}>
              {this.displayHeader(node)}
              {!available && (
                <h1 className="text-center">This server sold for $ {sellPrice} USD.</h1>
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
    const sellPriceBTC = (!!node.sellPrice || node.sellPrice === '0') ? +node.sellPriceBTC : ''

    let price = (validPrice) ? (<span>${sellPrice} USD / {sellPriceBTC} BTC</span>) : (<s>${sellPrice} USD / {sellPriceBTC} BTC</s>)
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

  displaySellSettings() {
    const { currency, target, password, errorMessages } = this.state
    const disableFields = currency !== 'btc' && currency !== 'paypal'
    return (
      <div className="sellPagePaymentDestinationContainer">
        <h5 className="sellPagePaymentDestinationHeaderText">
          Select payment destination:
        </h5>
        <div className="d-flex sellPagePaymentDestinationSectionsContainer flex-wrap justify-content-center">
          <Col xl={6} lg={6} md={6} sm={12} xs={12} onClick={this.handleSellSettingClick.bind(this, 'btc')} className={`sellPagePaymentDestinationSectionContainer ${currency === 'btc' ? 'selected' : ''}`}>
            <p className="sellPagePaymentDestinationSectionHeader"><img src="/assets/images/bitcoinIcon.png" width="20px" alt="paypal" className="mr-2"/>Bitcoin Wallet {this.displayCheck(currency === 'btc')}</p>
            <p className="sellPagePaymentDestinationSectionParagraph"> Provide a valid Bitcoin address and we will send payment there</p>
          </Col>
          <Col xl={6} lg={6} md={6} sm={12} xs={12} onClick={this.handleSellSettingClick.bind(this, 'paypal')} className={`sellPagePaymentDestinationSectionContainer ${currency === 'paypal' ? 'selected' : ''}`}>
            <p className="sellPagePaymentDestinationSectionHeader"><img src="/assets/images/paypalIcon.png" width="20px" alt="paypal"/> PayPal {this.displayCheck(currency === 'paypal')}</p>
            <p className="sellPagePaymentDestinationSectionParagraph"> Provide your PayPal email below to receive payment via PayPal. </p>
          </Col>
        </div>
        <div className="sellPagePaymentDestinationAddressPartContainer">
          <FormGroup className="w-100">
            <Label for="address">{currency === 'paypal' ? 'Enter your PayPal email:' : 'Enter your Bitcoin address:'}</Label>
            <Input value={target} disabled={disableFields} type='text' name='address' id='address' placeholder={currency === 'paypal' ? "PayPal email" : "Bitcoin Wallet Address"} onChange={(event) => this.handleInputValueChange('target', event.target.value)}/>
            {!!errorMessages.target && <Label for="address" className="text-danger mb-0">{errorMessages.target}</Label>}
          </FormGroup>
          <FormGroup className="w-100">
            <Label for="password">Enter your password:</Label>
            <Input value={password} disabled={disableFields} type='password' name='password' id='password' placeholder="Password" onChange={(event) => this.handleInputValueChange('password', event.target.value)}/>
            {!!errorMessages.password && <Label for="password" className="text-danger mb-0">{errorMessages.password}</Label>}
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

  sellServerButton() {
    const { node, refreshing } = this.props
    const { validPrice, isSelling } = this.state

    if ( !validPrice ) {
      return <Button className="sellPageSubmitButton" onClick={this.handleReload}>Reload Page</Button>
    }

    if ( !node || !node.sellPrice || refreshing || !node.crypto.liquidity.sell || isSelling ) {
      return (<Button className="sellPageSubmitButton" disabled={true}>Sell Server (Disabled)</Button>)
    }

    return (<Button className="sellPageSubmitButton" onClick={this.validate}>Sell Server</Button>)
  }
}

const mapStateToProps = state => ({
  node: state.nodes.data,
  error: state.nodes.error,
  message: state.nodes.message,
  pending: state.nodes.pending,
  refreshing: state.nodes.refreshing,
  user: state.user.data,
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
