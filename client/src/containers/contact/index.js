import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { RingLoader } from 'react-spinners'
import InputField from '../../components/elements/inputField'

import { Container, Col, Button, Alert, FormGroup, Label } from 'reactstrap'
import './index.css'

class Contact extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      subject: '',
      text: '',
      messages: {
        email: '*Required',
        subject: '*Required',
        text: '*Required',
      },
      errors: {
        email: false,
        subject: false,
        text: false,
      }
    }
    this.handleFieldValueChange = this.handleFieldValueChange.bind(this)
    this.validation = this.validation.bind(this)
  }

  componentWillUnmount() {
    //this.props.reset()
  }

  handleFieldValueChange(newValue, name) {
    this.setState({ [name]: newValue, })
  }

  validation() {
    const { email, subject, text } = this.state
    let isValid = true, messages = { email: '*Required', subject: '*Required', text: '*Required' }, errors = { email: false, subject: false, text: false }
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

    if ( !subject ) {
      messages.subject = '*Required'
      errors.subject = true
      isValid = false
    }

    if ( !text ) {
      messages.text = '*Required'
      errors.text = true
      isValid = false
    }

    this.setState({ messages, errors })

    //isValid && this.props.send()
  }

  render() {
    const { email, subject, text, messages, errors } = this.state
    const { message, error, pending } = this.props

    if ( pending ) {
      return (
        <Container fluid className="bg-white contactPageContainer">
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
      <Container fluid className="bg-white contactPageContainer">
        <div className="contentContainer d-flex justify-content-center">
          <Col className="authContainer">
            {!!message &&
            <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-1 px-0">
              <Alert color={error ? 'danger' : 'success'}>
                {message}
              </Alert>
            </Col>
            }
            <Col xl={{ size: 4, offset: 4 }} lg={{ size: 6, offset: 3 }} md={{ size: 6, offset: 3 }} className="justify-content-center d-flex flex-column align-items-center">
              <p className="contactHeader">Contact Us</p>
              <h2 className="contactMessage">Please fill the form!</h2>
              <InputField label='Email Address'
                          name="email"
                          type='email'
                          value={email}
                          message={messages.email}
                          error={errors.email}
                          handleFieldValueChange={this.handleFieldValueChange}
              />
              <InputField label='Subject'
                          name="subject"
                          type='text'
                          value={subject}
                          message={messages.subject}
                          error={errors.subject}
                          handleFieldValueChange={this.handleFieldValueChange}
              />
              <InputField label='Message'
                          name="text"
                          type='textarea'
                          height={150}
                          value={text}
                          message={messages.text}
                          error={errors.text}
                          handleFieldValueChange={this.handleFieldValueChange}
              />
              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="d-flex px-0">
                <Button onClick={this.validation} className="submitButton w-100">Send</Button>
              </Col>
            </Col>
          </Col>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Contact))
