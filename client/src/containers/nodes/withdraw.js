import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { RingLoader } from 'react-spinners'
import { Col, Container, Row, Button, Alert } from 'reactstrap'
import { capitalize, valueFormat } from '../../lib/helpers'
import InputField from '../../components/elements/inputField'
import './index.css'

import {
  fetchWithdrawData
} from '../../reducers/withdrawals'

class Withdraw extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      password: '',
      showPassword: false,
      messages: {
        address: '',
        password: ''
      },
      errors: {
        address: false,
        password: false
      }
    }

    this.handleFieldValueChange = this.handleFieldValueChange.bind(this)
    this.onAddonClick = this.onAddonClick.bind(this)
  }

  componentWillMount() {
    this.props.fetchWithdrawData()
  }

  handleGoBack() {
    window.history.back()
  }

  handleFieldValueChange(newValue, name) {
    this.setState({ [name]: newValue, })
  }

  onAddonClick(name) {
    name = 'show' + capitalize(name)
    this.setState({ [name]: !this.state[ name ] })
  }

  render() {
    const { address, password, messages, errors, showPassword } = this.state
    const { data, message, error, pending } = this.props

    if ( pending || !data ) {
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
              <Alert color={error ? 'danger' : 'success'}>
                {message}
              </Alert>
            </Col>
            }
            <Col xl={{ size: 6, offset: 3 }} lg={{ size: 6, offset: 3 }} md={{ size: 6, offset: 3 }} sm={{ size: 12, offset: 0 }} xs={{ size: 12, offset: 0 }}>
              <h5 className="withdrawPageTitle">Withdraw Rewards</h5>
              {this.renderInformationPart()}
              <InputField label='BTC Wallet Address'
                          name="address"
                          type='text'
                          id='address'
                          value={address}
                          message={messages.address}
                          error={errors.address}
                          handleFieldValueChange={this.handleFieldValueChange}
              />
              <InputField label='Password'
                          name="password"
                          id='logInPassword'
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          message={messages.password}
                          error={errors.password}
                          addonIcon={showPassword ? "/assets/images/hidePassword.jpg" : "/assets/images/showPassword.jpg"}
                          handleFieldValueChange={this.handleFieldValueChange}
                          onAddonClick={this.onAddonClick}
              />
              <Button className="withdrawPageWithdrawButton submitButton">Withdraw</Button>
            </Col>
          </div>
        </div>
      </Container>
    )
  }

  renderInformationPart() {
    const { data } = this.props
    const totalBalanceUsd = !!data.amount ? valueFormat(+data.amount.usd, 2) : ''
    const totalBalance = !!data.amount ? valueFormat(+data.amount.btc, 2) : ''
    return (
      <Col xl={12} className="withdrawPageInformationPartContainer">
        <Row className="p-0 m-0">
          <Row className="p-0 m-0 justify-content-between w-100">
            <p className="withdrawInformationPartHeaderLabel">Total Balance, USD</p>
            <p className="withdrawInformationPartHeaderValue">${totalBalanceUsd}</p>
          </Row>
          <Row className="p-0 m-0 justify-content-between w-100">
            <p className="withdrawInformationPartHeaderLabel">Total Balance, bitcoin</p>
            <p className="withdrawInformationPartHeaderValue">{totalBalance}</p>
          </Row>
        </Row>
        <Row className="p-0 mx-0 withdrawInformationDivider"/>
        <Row className="p-0 m-0">
          {!!data.balances && this.renderBalances(data.balances)}
        </Row>
      </Col>
    )
  }

  renderBalances(data) {
    return data.map((coin, index) => {
      return (
        <Row key={index} className="p-0 m-0 justify-content-between w-100">
          <p className="withdrawInformationPartInfo">{coin.name}</p>
          <p className="withdrawInformationPartInfo">{valueFormat(+coin.value, 2)}</p>
        </Row>
      )
    })
  }
}

const mapStateToProps = state => ({
  data: state.withdrawals.data,
  error: state.withdrawals.error,
  message: state.withdrawals.message,
  pending: state.withdrawals.pending,
})

const mapDispatchToProps = dispatch => bindActionCreators({ fetchWithdrawData }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Withdraw)
