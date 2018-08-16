import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { RingLoader } from 'react-spinners'
import InputField from '../../components/elements/inputField'
import { NavLink } from 'react-router-dom'
import { Container, Col, Button, Alert } from 'reactstrap'
import SocialButton from './socialButton'
import { capitalize } from '../../lib/helpers'
import './index.css'

import { register, reset, socialMediaLogin } from '../../reducers/user.js'

class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      first: '',
      last: '',
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      messages: {
        first: '',
        last: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      errors: {
        first: '',
        last: '',
        email: false,
        password: false,
        confirmPassword: false
      }
    }
    this.handleFieldValueChange = this.handleFieldValueChange.bind(this)
    this.onAddonClick = this.onAddonClick.bind(this)
    this.validation = this.validation.bind(this)
    this.signUp = this.signUp.bind(this)
  }

  componentWillMount() {
    window.scrollTo(0, 0)
    const { user } = this.props
    if ( !!user ) {
      this.props.history.push('/dashboard')
      return
    }
    this.props.reset()
  }

  componentWillReceiveProps(nextProps) {
    const { user, message, error } = nextProps
    if ( !!user ) {
      !!this.props.onSuccess ? this.props.onSuccess() : this.props.history.push('/masternodes')
    } else if ( message === 'Email has already been taken' ) {
      let messages = { ...this.state.messages }, errors = { ...this.state.errors }
      messages.email = message
      errors.email = error
      this.setState({ messages, errors })
    }
  }

  componentWillUnmount() {
    this.props.reset()
  }

  handleFieldValueChange(newValue, name, onEnter) {
    this.setState({ [name]: newValue })

    onEnter && this.validation()
  }

  onAddonClick(name) {
    name = 'show' + capitalize(name)
    this.setState({ [name]: !this.state[ name ] })
  }

  validation() {
    const { first, last, email, password, confirmPassword } = this.state
    let isValid = true, messages = { ...this.state.messages }, errors = { ...this.state.errors }
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

    if ( !password ) {
      messages.password = '*Required'
      errors.password = true
      isValid = false
    }

    if ( !first ) {
      messages.first = '*Required'
      errors.first = true
      isValid = false
    }

    if ( !last ) {
      messages.last = '*Required'
      errors.last = true
      isValid = false
    }

    if ( !confirmPassword ) {
      messages.confirmPassword = '*Required'
      errors.confirmPassword = true
      isValid = false
    }

    if ( !!password && !!confirmPassword && confirmPassword !== password ) {
      messages.confirmPassword = 'The password and confirmation password do not match'
      errors.confirmPassword = true
      isValid = false
    }

    this.setState({ messages, errors })

    isValid && this.signUp()
  }

  signUp() {
    const { first, last, email, password, confirmPassword } = this.state

    this.props.register({
      first,
      last,
      email,
      password,
      password_confirmation: confirmPassword,
    })
  }

  handleSocialSignUp(sm, user) {
    if ( !!user ) {
      this.props.socialMediaLogin(sm, user._profile)
    }
  }

  handleSocialSignUpFailure(sm, err) {
    console.log("ERR", err)
  }

  render() {
    const { first, last, email, password, confirmPassword, showPassword, showConfirmPassword, messages, errors } = this.state
    const { message, error, pending } = this.props

    if ( pending ) {
      return (
        <Container fluid className="bg-white signUpPageContainer">
          <div className="contentContainer d-flex justify-content-center">
            <Col className="signUpContainer">
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
      <Container fluid className="signUpPageContainer authPageContainer">
        <div className="contentContainer signUpPageContentContainer d-flex justify-content-center bg-white">
          <Col className="authContainer align-items-center flex-wrap justify-content-center d-flex">
            {!!message &&
            <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-1 px-0">
              <Alert color={error ? 'danger' : 'success'}>
                {message}
              </Alert>
            </Col>
            }
            <Col xl={{ size: 9 }} lg={{ size: 8 }} md={{ size: 10 }} sm={{ size: 8 }} className="justify-content-center d-flex flex-column align-items-center">
              <h2 className="authHeader pageTitle">Let's get started.</h2>
              <Col xl={12} lg={12} md={12} sm={12} className="d-flex justify-content-between px-0 flex-wrap">
                <Col xl={6} lg={6} md={6} sm={12} className="pl-0 pr-xl-2 pr-lg-2 pr-md-2 pr-0">
                  <InputField label='First Name'
                              name="first"
                              id="signUpFirst"
                              type='text'
                              autoFocus={true}
                              value={first}
                              message={messages.first}
                              error={errors.first}
                              handleFieldValueChange={this.handleFieldValueChange}
                              onKeyPress={true}
                  />
                </Col>
                <Col xl={6} lg={6} md={6} sm={12} className="pr-0 pl-xl-2 pl-lg-2 pl-md-2 pl-0">
                  <InputField label='Last Name'
                              name="last"
                              id="signUpLast"
                              type='text'
                              value={last}
                              message={messages.last}
                              error={errors.last}
                              handleFieldValueChange={this.handleFieldValueChange}
                              onKeyPress={true}
                  />
                </Col>
              </Col>
              <InputField label='Email Address'
                          name="email"
                          id="signUpEmail"
                          type='email'
                          value={email}
                          message={messages.email}
                          error={errors.email}
                          handleFieldValueChange={this.handleFieldValueChange}
                          onKeyPress={true}
              />
              <Col xl={12} lg={12} md={12} sm={12} className="d-flex justify-content-between px-0 flex-wrap">
                <Col xl={6} lg={6} md={6} sm={6} className="pl-0 pr-xl-2 pr-lg-2 pr-md-2 pr-0">
                  <InputField label='Password'
                              name="password"
                              id="signUpPassword"
                              type={showPassword ? 'text' : 'password'}
                              value={password}
                              message={messages.password}
                              error={errors.password}
                              addonIcon={showPassword ? "/assets/images/hidePassword.jpg" : "/assets/images/showPassword.jpg"}
                              handleFieldValueChange={this.handleFieldValueChange}
                              onAddonClick={this.onAddonClick}
                              onKeyPress={true}
                  />
                </Col>
                <Col xl={6} lg={6} md={6} sm={6} className="pr-0 pl-xl-2 pl-lg-2 pl-md-2 pl-0">
                  <InputField label='Confirm Password'
                              name="confirmPassword"
                              id="signUpConfirmPassword"
                              type={showConfirmPassword ? 'text' : 'password'}
                              value={confirmPassword}
                              message={messages.confirmPassword}
                              error={errors.confirmPassword}
                              addonIcon={showConfirmPassword ? "/assets/images/hidePassword.jpg" : "/assets/images/showPassword.jpg"}
                              handleFieldValueChange={this.handleFieldValueChange}
                              onAddonClick={this.onAddonClick}
                              onKeyPress={true}
                  />
                </Col>
              </Col>
              <Col xl={8} lg={8} md={8} sm={12} xs={12} className="d-flex px-0 mt-4 flex-column">
                <Button onClick={this.validation} className="submitButton w-100">Submit</Button>
                <p className="signUpSignInText">Already have an account? <NavLink to="login">Sign in</NavLink></p>
                <p className="signUpSignInText">Or Sign Up using Facebook</p>
                <SocialButton provider='facebook' appId={process.env.REACT_APP_FACEBOOK_API_KEY} onLoginSuccess={this.handleSocialSignUp.bind(this, 'facebook')} onLoginFailure={this.handleSocialSignUpFailure.bind(this, 'facebook')} className="facebookSocialButton socialLogInButton"><i className="socialButtonIcon">&#xe809;</i>Facebook</SocialButton>
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
  signUpData: state.user.signUpData,
  pending: state.user.signUpPending,
  error: state.user.signUpError,
  message: state.user.signUpMessage
})

const mapDispatchToProps = dispatch => bindActionCreators({ register, reset, socialMediaLogin }, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp))
