import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import InputField from '../../components/elements/inputField'

import { Container, Col, Button, Alert } from 'reactstrap'
import './index.css'

import { reset, resetPassword } from '../../reducers/user.js'

class ResetPassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      password: '',
      confirmPassword: '',
      messages: {
        password: '',
        confirmPassword: ''
      },
      errors: {
        password: false,
        confirmPassword: false
      },
      slug: ''
    }
    this.handleFieldValueChange = this.handleFieldValueChange.bind(this)
    this.validation = this.validation.bind(this)
  }

  componentWillMount() {
    window.scrollTo(0, 0)
    //TODO: get reset token from url
    this.props.reset()
    const { slug } = this.props.match.params
    this.setState({ slug })
  }

  componentWillUnmount() {
    this.props.reset()
  }

  handleFieldValueChange(newValue, name, onEnter) {
    this.setState({ [name]: newValue, })
    onEnter && this.validation()
  }

  validation() {
    const { slug, password, confirmPassword } = this.state
    const MINIMUM_PASSWORD_LENGTH = 6
    let isValid = true
    let messages = {
      password: '',
      confirmPassword: ''
    }
    let errors = {
      password: false,
      confirmPassword: false
    }
    if ( !password ) {
      messages.password = '*Required'
      errors.password = true
      isValid = false
    }
    if ( !confirmPassword ) {
      messages.confirmPassword = '*Required'
      errors.confirmPassword = true
      isValid = false
    }
    if ( !!password && !!confirmPassword && confirmPassword !== password ) {
      messages.confirmPassword = 'Passwords must match'
      errors.confirmPassword = true
      isValid = false
    }

    if ( password.length < MINIMUM_PASSWORD_LENGTH || confirmPassword.length < MINIMUM_PASSWORD_LENGTH) {
      messages.password = ''
      errors.password = false
      messages.confirmPassword = 'Password must be at least 6 characters long'
      errors.confirmPassword = true
      isValid = false
    }

    this.setState({ messages, errors })

    isValid && this.props.resetPassword(slug, password, confirmPassword, this.redirect.bind(this))
  }

  redirect() {
    this.props.history.push('/')
  }

  render() {
    const { password, confirmPassword, messages, errors } = this.state
    const { message, error, isOnlyForm } = this.props

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
              {!isOnlyForm && <NavLink to="/"><img src="/assets/images/headerLogo.png" alt="reset password"/></NavLink>}
              {!isOnlyForm && <h2 className="forgotPasswordHeader">Reset Password</h2>}
              <InputField label='Password'
                          name="password"
                          id="resetPassword"
                          type='password'
                          value={password}
                          message={messages.password}
                          error={errors.password}
                          handleFieldValueChange={this.handleFieldValueChange}
                          onKeyPress={true}
              />
              <InputField label='Confirm Password'
                          name="confirmPassword"
                          id="confirmPassword"
                          type='password'
                          value={confirmPassword}
                          message={message || messages.confirmPassword}
                          error={error || errors.confirmPassword}
                          handleFieldValueChange={this.handleFieldValueChange}
                          onKeyPress={true}
              />
              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="d-flex px-0 flex-column">
                <Button onClick={this.validation} className="submitButton logInSubmitButton w-100">Reset</Button>
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
  error: state.user.logInError,
  message: state.user.logInMessage
})

const mapDispatchToProps = dispatch => bindActionCreators({ reset, resetPassword }, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword))
