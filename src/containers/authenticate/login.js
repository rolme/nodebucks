import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { RingLoader } from 'react-spinners'
import { withCookies } from 'react-cookie';
import InputField from '../../components/elements/inputField'
import Checkbox from 'rc-checkbox'
import { Container, Col, Button, Alert, FormGroup, Label } from 'reactstrap'
import Modal2FA from '../../components/2faModal'
import { capitalize } from '../../lib/helpers'
import SocialButton from './socialButton'
import localIpUrl from 'local-ip-url';
import './index.css'
import 'rc-checkbox/assets/index.css'

import {
  login,
  get2FASecret,
  reset,
  socialMediaLogin
} from '../../reducers/user.js'

import Metatags from "../../components/metatags";

class LogIn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      token: '',
      showPassword: false,
      rememberMe: false,
      messages: {
        email: '',
        password: '',
      },
      errors: {
        email: false,
        password: false,
      },
      show2fa: false,
      secret: '',
      isOtherIP: false,
    }
    this.handleFieldValueChange = this.handleFieldValueChange.bind(this)
    this.onAddonClick = this.onAddonClick.bind(this)
    this.toggleElement = this.toggleElement.bind(this)
    this.validation = this.validation.bind(this)
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
    const { user, message } = nextProps
    if ( !!user ) {
      !!this.props.onSuccess ? this.props.onSuccess() : this.props.history.push('/dashboard')
    } else if ( message === 'Email and/or password is invalid.' ) {
      let messages = { email: '', password: '' }, errors = { email: true, password: true }
      this.setState({ messages, errors })
    }
  }

  componentWillUnmount() {
    this.props.reset()
  }

  handleFieldValueChange(newValue, name, onEnter) {
    this.setState({ [ name ]: newValue, })
    onEnter && this.validation()
  }

  onAddonClick(name) {
    name = 'show' + capitalize(name)
    this.setState({ [ name ]: !this.state[ name ] })
  }

  check2FA() {
    const { email, password } = this.state
    const trustedIp = this.props.cookies.get('trustedIpNodebucks')

    if ( trustedIp && trustedIp === localIpUrl() ) {
      this.props.login({ email, password })
    } else {
      this.props.get2FASecret({ email, password }, (response) => {
        if ( trustedIp && trustedIp !== localIpUrl() ) {
          this.setState({ show2fa: true, secret: response.secret, isOtherIP: true })
        } else if ( response.enabled_2fa ) {
          this.setState({ show2fa: true, secret: response.secret })
        } else {
          this.props.login({ email, password })
        }
      })
    }
  }

  validation() {
    const { email, password } = this.state
    let isValid = true, messages = { email: '', password: '' }, errors = { email: false, password: false }
    const re = /(.+)@(.+){2,}\.(.+){2,}/
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

    this.setState({ messages, errors })

    isValid && this.check2FA()
  }

  toggleElement(name) {
    this.setState({ [ name ]: !this.state[ name ] })
  }

  toggleModal = () => {
    this.setState({
      show2fa: !this.state.show2fa
    });
  }

  handleSocialLogin(sm, user) {
    if ( !!user ) {
      this.props.socialMediaLogin(sm, user._profile)
    }
  }

  handleSocialLoginFailure(sm, err) {
    console.log("ERR", err)
  }

  render() {
    const { email, password, showPassword, messages, errors, rememberMe, show2fa, secret, isOtherIP } = this.state
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
        <Metatags
          description="Manage your Masternodes directly from your account, monitor their progress and see the results you have achieved. All the data is ready in your own Dashboard."
          title="Login into your Account - NodeBucks"
          canonical="https://nodebucks.com/login"
        />
        <div className="contentContainer d-flex justify-content-center">
          <Col className="authContainer d-flex align-items-center flex-wrap justify-content-center">
            {!!message &&
            <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-1 px-0">
              <Alert color={error ? 'danger' : 'success'}>
                {message}
              </Alert>
            </Col>
            }
            <Col xl={{ size: 8 }} lg={{ size: 9 }} md={{ size: 10 }} className="justify-content-center d-flex flex-column align-items-center">
              {!isOnlyForm && <NavLink to="/"><img src="/assets/images/nodebucks_beta.svg" width="180" alt="sign in"/></NavLink>}
              {!isOnlyForm && <h2 className="logInHeader pageTitle">Welcome to Nodebucks</h2>}
              <Col className="d-flex flex-xl-row-reverse flex-lg-row-reverse flex-md-row-reverse flex-column authFormFieldsContainer align-items-xl-start align-items-lg-start align-items-md-start align-items-center ">
                <Col>
                  <SocialButton
                    provider='facebook'
                    appId={process.env.REACT_APP_FACEBOOK_API_KEY}
                    onLoginSuccess={this.handleSocialLogin.bind(this, 'facebook')}
                    onLoginFailure={this.handleSocialLoginFailure.bind(this, 'facebook')}
                    className="socialButton facebookSocialButton">
                    <i className="socialButtonIcon">&#xf09a;</i> Sign in via Facebook
                  </SocialButton>
                  <SocialButton
                    provider='google'
                    appId={process.env.REACT_APP_GOOGLE_API_KEY}
                    onLoginSuccess={this.handleSocialLogin.bind(this, 'google')}
                    onLoginFailure={this.handleSocialLoginFailure.bind(this, 'google')}
                    className="socialButton googleSocialButton">
                    <i className="socialButtonIcon">&#xf1a0;</i> Sign in via Google
                  </SocialButton>
                </Col>
                <Col sm={{ size: 6, offset: 3 }} xs={{ size: 6, offset: 3 }} className="dividerWithText d-xl-none d-lg-none d-md-none d-inline">
                  <span>OR</span>
                </Col>
                <Col>
                  <InputField label='Email Address'
                              name="email"
                              type='email'
                              id='logInEmail'
                              value={email}
                              message={messages.email}
                              error={errors.email}
                              handleFieldValueChange={this.handleFieldValueChange}
                              onKeyPress={true}
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
                              onKeyPress={true}
                  />
                  <Col xl={{ size: 12, offset: 0 }} lg={{ size: 12, offset: 0 }} md={{ size: 12, offset: 0 }} sm={{ size: 12, offset: 0 }}
                       xs={{ size: 12, offset: 0 }} className="d-flex px-0 flex-row justify-content-between">
                    <FormGroup className="rememberMeCheckboxContainer">
                      <Label className="rememberMeCheckBox">
                        <Checkbox
                          className="nodebucksCheckbox"
                          defaultChecked={rememberMe}
                          onChange={(event) => this.toggleElement('rememberMe')}
                        />
                        &nbsp; Remember me
                      </Label>
                    </FormGroup>
                    <NavLink to="/forgot_password" className="logInForgotPassword">Forgot Password?</NavLink>
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={12} xs={12} className="d-flex px-0 flex-column">
                    <Button onClick={this.validation} className="submitButton logInSubmitButton w-100">Sign in</Button>
                    {!isOnlyForm && <p className="dontHaveAnAccountMessage">Don't have an account? <NavLink to="/sign-up">Sign Up Now</NavLink></p>}
                  </Col>
                </Col>
              </Col>
            </Col>
          </Col>
        </div>
        <Modal2FA
          show={show2fa}
          onToggle={this.toggleModal}
          email={email}
          password={password}
          secret={secret}
          login={this.props.login}
          isOtherIP={isOtherIP}
        />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
  pending: state.user.logInPending,
  error: state.user.logInError,
  message: state.user.logInMessage
})

const mapDispatchToProps = dispatch => bindActionCreators({
  login,
  get2FASecret,
  reset,
  socialMediaLogin,
}, dispatch)

export default withRouter(withCookies(connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn)))
