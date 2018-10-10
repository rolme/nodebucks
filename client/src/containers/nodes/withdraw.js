import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { RingLoader } from 'react-spinners'
import { Col, Container, Row, Button, Alert, FormGroup, Input, Label } from 'reactstrap'
import { NavLink, Redirect } from 'react-router-dom'
import { capitalize, valueFormat } from '../../lib/helpers'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/fontawesome-free-solid'
import WAValidator from 'wallet-address-validator'
import { ClipLoader } from 'react-spinners'
import './index.css'

import {
  reserveWithdrawal,
  withdraw
} from '../../reducers/withdrawals'

class Withdraw extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      showPassword: false,
      currency: 'btc',
      target: '',
      address: '',
      errorMessages: {
        target: '',
        password: ''
      },
      isProcessing: false,
      redirect: false,
      showAlert: false,
    }

    this.handleInputValueChange = this.handleInputValueChange.bind(this)
    this.validation = this.validation.bind(this)
    this.onAddonClick = this.onAddonClick.bind(this)
  }

  componentWillMount() {
    this.props.reserveWithdrawal()
  }

  componentWillReceiveProps(nextProps) {
    const { withdrawal } = nextProps
    if ( !!withdrawal && !!withdrawal.user && !!withdrawal.user.btcWallet ) {
      this.setState({ wallet: withdrawal.user.btcWallet })
    }
  }

  handleGoBack() {
    window.history.back()
  }

  handleInputValueChange(name, value) {
    let { errorMessages } = this.state
    errorMessages[ name ] = ''
    this.setState({ [ name ]: value, errorMessages })
  }

  onAddonClick(name) {
    name = 'show' + capitalize(name)
    this.setState({ [ name ]: !this.state[ name ] })
  }

  onWithdraw() {
    const { password, target, currency } = this.state
    const withdrawal = currency === 'btc' ? { password, wallet: target, payment: 'btc' } : { password, paypal_email: target, payment: 'paypal' }
    this.props.withdraw({ withdrawal: withdrawal }, (response) => {
      this.setState({ isProcessing: false, redirect: response.status !== 'error', showAlert: response.status === 'error' })
      if(response.status === 'error') setTimeout(() => { this.setState({ showAlert: false }) }, 3000);
    })
    this.setState({ isProcessing: true })
  }

  validation() {
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

    isValid && this.onWithdraw()
  }

  handleSellSettingClick(value) {
    const { currency } = this.state
    if ( currency !== value ) {
      this.setState({ target: '', currency: value })
    }
  }

  render() {
    const { withdrawal, message, error, pending } = this.props
    const { isProcessing, redirect, showAlert } = this.state

    if(redirect) return <Redirect to='/dashboard' />

    if ( pending || !withdrawal ) {
      return (
        <Container fluid className="withdrawPageContainer">
          <div className="contentContainer withdrawPageContentContainer d-flex justify-content-center flex-column">
            <p onClick={this.handleGoBack} className="withdrawPageBackButton"><img src="/assets/images/backArrow.png" alt="Back"/>Back</p>
            <div className="withdrawPageMainContentContainer">
              <Col xl={{ size: 6, offset: 3 }} lg={{ size: 6, offset: 3 }} md={{ size: 6, offset: 3 }} sm={{ size: 12, offset: 0 }} xs={{ size: 12, offset: 0 }}>
                <div className="spinnerContainer h-100 d-flex align-items-center justify-content-center">
                  <RingLoader
                    size={150}
                    color={'#3F89E8'}
                    loading={pending}
                  />
                </div>
              </Col>
            </div>
          </div>
        </Container>
      )
    }

    return (
      <Container fluid className="withdrawPageContainer">
        <div className="contentContainer withdrawPageContentContainer">
          <p onClick={this.handleGoBack} className="withdrawPageBackButton"><img src="/assets/images/backArrow.png" alt="Back"/>Back</p>
          <div className="withdrawPageMainContentContainer">
            {!!message &&
            <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-1 px-0">
              <Alert color={error ? 'danger' : 'success'} isOpen={showAlert}>
                {message}
              </Alert>
            </Col>
            }
            <Col className="center" xl={{ size: 10 }} lg={{ size: 10 }} md={{ size: 10, }} sm={{ size: 12 }} xs={{ size: 12 }}>
              <h5 className="withdrawPageTitle pageTitle">Withdraw</h5>
              { isProcessing && this.renderSpinner() }
              { !isProcessing && this.renderInformationPart() }
              { !isProcessing && this.displaySellSettings() }
              { this.displayActions() }
            </Col>
          </div>
        </div>
      </Container>
    )
  }

  renderInformationPart() {
    const { withdrawal } = this.props
    const totalBalanceUsd = !!withdrawal.amount ? valueFormat(+withdrawal.amount.usd, 2) : ''
    const totalBalance = !!withdrawal.amount ? valueFormat(+withdrawal.amount.btc, 2) : ''
    return (
      <Col xl={8} className="withdrawPageInformationPartContainer">
        <Row className="p-0 m-0">
          <Row className="p-0 m-0 justify-content-between w-100">
            <p className="withdrawInformationPartHeaderLabel">Total Balance, USD</p>
            <p className="withdrawInformationPartHeaderValue">${totalBalanceUsd}</p>
          </Row>
          <Row className="p-0 m-0 justify-content-between w-100">
            <p className="withdrawInformationPartHeaderLabel">Total Balance, bitcoin</p>
            <p className="withdrawInformationPartHeaderValue">{totalBalance}</p>
          </Row>
          <Row className="p-0 m-0 justify-content-between w-100">
            <p className="withdrawInformationPartHeaderLabel">Affiliate</p>
            <p className="withdrawInformationPartHeaderValue">
            ${valueFormat(withdrawal.affiliateBalance , 2)}
            </p>
        </Row>
        </Row>
        <Row className="p-0 mx-0 withdrawInformationDivider"/>
        <Row className="p-0 m-0">
          {!!withdrawal.user && !!withdrawal.user.balances && this.renderBalances(withdrawal.user.balances)}
        </Row>
      </Col>
    )
  }

  renderBalances(withdrawal) {
    return withdrawal.map((coin, index) => {
      const value = valueFormat(+coin.value, 2)
      if(coin.value > 0) {
        return (
          <Row key={index} className="p-0 m-0 justify-content-between w-100">
            <p className="withdrawInformationPartInfo">{coin.name}</p>
            <p className="withdrawInformationPartInfo">{value}</p>
          </Row>
        )
      } else {
        return null
      }
    })
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

  displayActions() {
    let disabled = true
    if(this.props.withdrawal.amount) {
      disabled = parseFloat(this.props.withdrawal.amount.usd) < 50
    }
    return (
      <div>
        <Row className="mx-0">
          <Col xl={6} lg={6} md={6} className="text-center my-2 px-0">
            <Button onClick={this.validation} className="sellPageSubmitButton" disabled={disabled}>Withdraw</Button>
            { disabled && <p className="text-danger mt-1">Minimum withdrawal amount is $50.</p> }
          </Col>
          <Col xl={6} lg={6} md={6} className="text-center my-2 px-0">
            <NavLink to='/dashboard'>
              <Button className="sellPageCancelButton">Cancel</Button>
            </NavLink>
          </Col>
        </Row>
      </div>
    )
  }

  renderSpinner() {
    return (
      <div className="spinnerContainerWithdrawal">
        <ClipLoader
          size={35}
          color={'#3F89E8'}
          loading={true}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  withdrawal: state.withdrawals.data,
  error: state.withdrawals.error,
  message: state.withdrawals.message,
  pending: state.withdrawals.pending,
})

const mapDispatchToProps = dispatch => bindActionCreators({ reserveWithdrawal, withdraw }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Withdraw)
