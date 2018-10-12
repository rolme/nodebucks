import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { RingLoader } from 'react-spinners'
import { capitalize } from '../../lib/helpers'
import { Container, Col, Button, Alert } from 'reactstrap'
import InputField from '../../components/elements/inputField'

import { updateUser } from '../../reducers/user';

import './index.css'

class Security extends Component {
  constructor(props) {
    super(props)

    this.state = {
      password: '',
      newPassword: '',
      confirmPassword: '',
      showResetEmailAlert: false,
      showPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      messages: {
        password: '',
        newPassword: '',
        confirmPassword: '',
      },
      errors: {
        password: false,
        newPassword: false,
        confirmPassword: false,
      }
    }

    this.handleFieldValueChange = this.handleFieldValueChange.bind(this)
    this.onAddonClick = this.onAddonClick.bind(this)
    this.validation = this.validation.bind(this)
  }

  handleFieldValueChange(newValue, name) {
    this.setState({
      [name]: newValue,
    })
  }

  onAddonClick(name) {
    name = 'show' + capitalize(name)
    this.setState({ [name]: !this.state[ name ] })
  }

  renderChangePasswordFields() {
    const { password, newPassword, confirmPassword, messages, errors, showPassword, showNewPassword, showConfirmPassword, showResetEmailAlert } = this.state
    const { message, error } = this.props
    return (
      <Col className="changeInputFieldsContainer">
        {(!!message) &&
        <Alert color={error ? 'danger' : 'success'}>
          { message}
        </Alert>
        }
        <InputField label='Password'
                    name="password"
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    message={messages.password}
                    error={errors.password}
                    addonIcon={showPassword ? "/assets/images/hidePassword.jpg" : "/assets/images/showPassword.jpg"}
                    handleFieldValueChange={this.handleFieldValueChange}
                    onAddonClick={this.onAddonClick}
        />
        <InputField label='New Password'
                    name="newPassword"
                    id='newPassword'
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    message={messages.newPassword}
                    error={errors.newPassword}
                    addonIcon={showNewPassword ? "/assets/images/hidePassword.jpg" : "/assets/images/showPassword.jpg"}
                    handleFieldValueChange={this.handleFieldValueChange}
                    onAddonClick={this.onAddonClick}
        />
        <InputField label='Confirm Password'
                    name="confirmPassword"
                    id='confirmPassword'
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    message={messages.confirmPassword}
                    error={errors.confirmPassword}
                    addonIcon={showConfirmPassword ? "/assets/images/hidePassword.jpg" : "/assets/images/showPassword.jpg"}
                    handleFieldValueChange={this.handleFieldValueChange}
                    onAddonClick={this.onAddonClick}
        />
        {
          showResetEmailAlert && <Alert className="success">Password reset email has been sent.</Alert>
        }
      </Col>
    )
  }

  renderFooterButtons() {
    return (
      <Col className="d-flex px-0 settingsFooterButtonsContainer justify-content-start">
        <Button onClick={this.validation} className="submitButton">SAVE</Button>
      </Col>
    )
  }

  validation() {
    let isValid = true, messages = { ...this.state.messages }, errors = { ...this.state.errors }
    const { password, newPassword, confirmPassword } = this.state
    const { user } = this.props

    messages.password = ''
    messages.newPassword = ''
    messages.confirmPassword = ''
    errors.password = false
    errors.newPassword = false
    errors.confirmPassword = false

    if ( !password ) {
      messages.password = '*Required'
      errors.password = true
      isValid = false
    }

    if ( !newPassword ) {
      messages.newPassword = '*Required'
      errors.newPassword = true
      isValid = false
    }

    if ( !confirmPassword ) {
      messages.confirmPassword = '*Required'
      errors.confirmPassword = true
      isValid = false
    }

    if(!!password && !!confirmPassword && newPassword !== confirmPassword) {
      messages.newPassword = '*New Password and Confirm Password do not match'
      errors.newPassword = true
      messages.confirmPassword = '*New Password and Confirm Password do not match'
      errors.confirmPassword = true
      isValid = false
    }

    this.setState({ messages, errors })

    isValid && this.props.updateUser(user.slug, password, {
      password: newPassword,
      password_confirmation: confirmPassword
    })
  }

  render() {
    const isLoading = false
    return (
      <Container fluid className="settingsContainer">
        <div className="contentContainer px-0">
          <Col className="settingsContentContainer px-0" xl={{ size: 12 }} lg={{ size: 12 }} md={{ size: 12 }} sm={{ size: 12 }} xs={{ size: 12 }}>
            <h1 className="settingsTitleText pageTitle">Change Password</h1>
            {isLoading &&
            <div className="spinnerContainer">
              <RingLoader
                size={150}
                color={'#FD552D'}
                loading={isLoading}
              />
            </div>
            }
            {!isLoading &&
            <Col className="px-0 settingsPageFieldsPartContainer">
              {this.renderChangePasswordFields()}
              {this.renderFooterButtons()}
            </Col>
            }
          </Col>
        </div>
      </Container>
    )
  }
}


const mapStateToProps = state => ({
  user: state.user.data,
  message: state.user.message,
  error: state.user.error
})

const mapDispatchToProps = dispatch => bindActionCreators({ updateUser }, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Security))
