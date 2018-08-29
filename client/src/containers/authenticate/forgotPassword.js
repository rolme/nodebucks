import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { RingLoader } from 'react-spinners'
import InputField from '../../components/elements/inputField'

import { Container, Col, Button, Alert } from 'reactstrap'
import './index.css'

import { reset, requestReset } from '../../reducers/user.js'

class ForgotPassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      messages: {
        email: '',
      },
      errors: {
        email: false,
      }
    }
    this.handleFieldValueChange = this.handleFieldValueChange.bind(this)
    this.validation = this.validation.bind(this)
  }

  componentWillMount() {
    window.scrollTo(0, 0)
    const { user } = this.props
    if ( !!user ) {
      this.props.history.push('/dashboard')
      return
    }
  }

  componentWillUnmount() {
    this.props.reset()
  }

  handleFieldValueChange(newValue, name, onEnter) {
    this.setState({ [name]: newValue, })
    onEnter && this.validation()
  }

  validation() {
    const { email } = this.state
    let isValid = true, messages = { email: '' }, errors = { email: false }
    const re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    if ( !email ) {
      messages.email = '*Required'
      errors.email = true
      isValid = false
    } else if ( !re.test(email) ) {
      messages.email = 'Please type valid email address'
      errors.email = true
      isValid = false
    }

    this.setState({ messages, errors })
    isValid && this.props.requestReset(email)
  }

  render() {
    const { email, messages, errors } = this.state
    const { message, error, pending, isOnlyForm } = this.props
    if ( pending ) {
      return (
        <Container fluid className="bg-white logInPageContainer authPageContainer logIn">
          <div className="contentContainer d-flex justify-content-center">
            <Col className="authContainer">
              <div className="spinnerContainer h-100 d-flex align-items-center justify-content-center">
                <RingLoader
                  size={150}
                  color={'#3F89E8'}
                  loading={pending}
                />
              </div>
            </Col>
          </div>
        </Container>
      )
    }

    return (
      <Container fluid className="bg-white logInPageContainer authPageContainer logIn">
        <div className="contentContainer d-flex justify-content-center">
          <Col className="authContainer d-flex align-items-center flex-wrap justify-content-center">
            {!!message &&
            <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-1 px-0">
              <Alert color={error ? 'danger' : 'success'}>
                {message}
              </Alert>
            </Col>
            }
            <Col xl={{ size: 4 }} lg={{ size: 6 }} md={{ size: 6 }} className="justify-content-center d-flex flex-column align-items-center">
              {!isOnlyForm && <NavLink to="/"><img src="/assets/images/headerLogo.png" alt="forgot password"/></NavLink>}
              {!isOnlyForm && <h2 className="forgotPasswordHeader">Forgot Password?</h2>}
              <div className="forgotPasswordMessage">
                Enter your email address to receive password reset instructions.
              </div>
              <InputField label='Email Address'
                          name="email"
                          type='email'
                          id='resetRequestEmail'
                          value={email}
                          message={messages.email}
                          error={errors.email}
                          handleFieldValueChange={this.handleFieldValueChange}
                          onKeyPress={true}
              />
              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="d-flex px-0 flex-column">
                <Button onClick={this.validation} className="submitButton logInSubmitButton w-100">Send</Button>
              </Col>
            </Col>
          </Col>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
  pending: state.user.requestResetPending,
  error: state.user.requestResetError,
  message: state.user.requestResetMessage
})

const mapDispatchToProps = dispatch => bindActionCreators({ reset, requestReset }, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword))
