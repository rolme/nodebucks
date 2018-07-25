import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { RingLoader } from 'react-spinners'
import { Container, Col, Button, Alert } from 'reactstrap'
import InputField from '../../components/elements/inputField'

import './index.css'

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      first: '',
      last: '',
      messages: {
        first: '',
        last: '',
        email: '',
      },
      errors: {
        first: false,
        last: false,
        email: false,
      }
    }

    this.handleFieldValueChange = this.handleFieldValueChange.bind(this)
    this.validation = this.validation.bind(this)
  }

  componentDidMount() {
    const { first = '', last = '', email = '' } = this.props.user
    this.setState({ email, first, last })
  }

  handleFieldValueChange(newValue, name) {
    this.setState({
      [name]: newValue,
    })
  }

  renderChangeGeneralData() {
    const { first, last, email, messages, errors } = this.state
    const { message, error } = this.props
    return (
      <Col className="changeInputFieldsContainer">
        {(!!message) &&
        <Alert color={error ? 'danger' : 'success'}>
          { message}
        </Alert>
        }
        <InputField label='First Name'
                    name="first"
                    id="first"
                    type='text'
                    autoFocus={true}
                    value={first}
                    message={messages.first}
                    error={errors.first}
                    handleFieldValueChange={this.handleFieldValueChange}
                    onKeyPress={true}
        />
        <InputField label='Last Name'
                    name="last"
                    id="last"
                    type='text'
                    value={last}
                    message={messages.last}
                    error={errors.last}
                    handleFieldValueChange={this.handleFieldValueChange}
                    onKeyPress={true}
        />
        <InputField label='Email Address'
                    name="email"
                    type='email'
                    id='email'
                    value={email}
                    message={messages.email}
                    error={errors.email}
                    handleFieldValueChange={this.handleFieldValueChange}
                    onKeyPress={true}
        />
      </Col>
    )
  }

  renderFooterButtons() {
    return (
      <Col className="d-flex px-0 settingsFooterButtonsContainer justify-content-end">
        <Button onClick={this.validation} className="submitButton">SAVE</Button>
      </Col>
    )
  }

  validation() {
    let isValid = true, messages = { ...this.state.messages }, errors = { ...this.state.errors }
    const { first, last, email } = this.state
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

    this.setState({ messages, errors })

    isValid && this.updateGeneralData()
  }

  updateGeneralData() {
   // let { first, last, email } = this.state
    /**
     * ToDo
     * Should dispatch action to save data
     */

  }

  render() {
    const isLoading = false
    return (
      <Container fluid className="settingsContainer">
        <div className="contentContainer px-0">
          <Col className="settingsContentContainer px-0" xl={{ size: 12 }} lg={{ size: 12 }} md={{ size: 12 }} sm={{ size: 12 }} xs={{ size: 12 }}>
            <h1 className="settingsTitleText">Contact Information</h1>
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
              {this.renderChangeGeneralData()}
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

const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile))
