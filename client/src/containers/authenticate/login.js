import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { RingLoader } from 'react-spinners'
import InputField from '../../components/elements/inputField'
import SelectField from '../../components/elements/selectField'
import { Container, Col, Button, Alert } from 'reactstrap'
import { capitalize } from '../../lib/helpers'
import './index.css'

import { login, reset } from '../../reducers/user.js'

class LogIn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      showPassword: false,
      messages: {
        email: '*Required',
        password: '*Required',
      },
      errors: {
        email: false,
        password: false,
      }
    }
    this.handleFieldValueChange = this.handleFieldValueChange.bind(this)
    this.onAddonClick = this.onAddonClick.bind(this)
    this.validation = this.validation.bind(this)
  }

  componentWillMount() {
    const { user } = this.props
    if ( !!user ) {
      this.props.history.push('/')
      return
    }
    this.props.reset()
  }

  componentWillReceiveProps(nextProps) {
    const { user, message, error } = nextProps
    if ( !!user ) {
      this.props.history.push('/')
    } else if ( message === 'Email has already been taken' ) {
      let messages = { ...this.state.messages }, errors = { ...this.state.errors }
      messages.email = message
      errors.email = error
      this.setState({ stepNumber: 1, messages, errors })
    }
  }

  componentWillUnmount() {
    this.props.reset()
  }

  handleFieldValueChange(newValue, name) {
    this.setState({ [name]: newValue, })
  }

  onAddonClick(name) {
    name = 'show' + capitalize(name)
    this.setState({ [name]: !this.state[ name ] })
  }

  validation() {
    const { email, password } = this.state
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

    this.setState({ messages, errors })

    isValid && this.props.login({ email, password })
  }

  render() {
    const { email, password, showPassword, messages, errors } = this.state
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
      <Container fluid className="bg-white signUpPageContainer">
        <div className="contentContainer d-flex justify-content-center">
          <Col className="signUpContainer">
            {!!message &&
            <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-1 px-0">
              <Alert color={error ? 'danger' : 'success'}>
                {message}
              </Alert>
            </Col>
            }
            <Col xl={{ size: 4, offset: 4 }} lg={{ size: 6, offset: 3 }} md={{ size: 4, offset: 4 }} className="justify-content-center d-flex flex-column align-items-center">
              <h2 className="signUpHeader">Log In</h2>
              <InputField label='Email Address'
                          name="email"
                          type='email'
                          value={email}
                          message={messages.email}
                          error={errors.email}
                          handleFieldValueChange={this.handleFieldValueChange}
              />
              <InputField label='Password'
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          message={messages.password}
                          error={errors.password}
                          addonIcon={showPassword ? "/assets/images/hidePassword.jpg" : "/assets/images/showPassword.jpg"}
                          handleFieldValueChange={this.handleFieldValueChange}
                          onAddonClick={this.onAddonClick}
              />
              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="d-flex px-0">
                <Button onClick={this.validation} className="submitButton w-100">Log In</Button>
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
  pending: state.user.pending,
  error: state.user.error,
  message: state.user.message
})

const mapDispatchToProps = dispatch => bindActionCreators({ login, reset }, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn))
