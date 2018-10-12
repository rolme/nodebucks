import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { RingLoader } from 'react-spinners'
import InputField from '../../components/elements/inputFieldWithAddonMessages'
import { createContact } from '../../reducers/user'
import { Container, Col, Button, Alert } from 'reactstrap'
import './index.css'
import Metatags from "../../components/metatags"

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
      },
      contactCreated: false,
    }
    this.handleFieldValueChange = this.handleFieldValueChange.bind(this)
    this.validation = this.validation.bind(this)
  }

  componentWillMount() {
    window.scrollTo(0, 0)
    if(this.props.location.hash === "#request"){
      this.setState({subject: 'Requesting a coin', text: 'What masternode coin would you like us to support?'})
    }else if(this.props.location.hash.includes("#contact-sales")){
      const name = this.props.location.hash.split("#contact-sales-")[1]
      this.setState({subject: `Request to purchase ${name} masternode.`})
    }
  }

  componentWillUnmount() {
    //this.props.reset()
  }

  handleFieldValueChange(newValue, name) {
    this.setState({ [name]: newValue, })
  }

  handleSubmit = () => {
    const { email, subject, text } = this.state
    if(this.validation()) {
      this.props.createContact(email, subject, text, (status) => {
        if (status === 'ok') {
          this.setState({ contactCreated: true })
        }
      })
    }
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

    return isValid
  }

  render() {
    const { email, subject, text, messages, errors, contactCreated } = this.state
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
      <Container fluid className="contactPageContainer">
        <Metatags
          description="Do you have doubts about the Crypto World, Masternodes or the Blockchain? Reach our team of curated professionals and get all your doubts solved. Be assisted by the best!"
          title="Contact with our Team - NodeBucks"
          canonical="https://nodebucks.com/contact"
        />
        <div className="contentContainer d-flex justify-content-center">
          { contactCreated ?
            this.renderContactCreated()
            :
            <Col className="authContainer px-0">
              {!!message && !!error &&
              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-1 px-0">
                <Alert color='danger'>
                  {message}
                </Alert>
              </Col>
              }
              <Col xl={{ size: 12, offset: 0 }} lg={{ size: 12, offset: 0 }} md={{ size: 12, offset: 0 }} className="justify-content-center d-flex flex-column align-items-center px-0">
                <img src="/assets/images/contactIcon.png" alt="Contact"/>
                {(!message || (!!message && !!error)) &&
                <Col xl={{ size: 6, offset: 0 }} lg={{ size: 6, offset: 0 }} md={{ size: 6, offset: 0 }} className="contactMainContentContainer  px-0">
                  <p className="contactHeader pageTitle">Contact Us</p>
                  <InputField label='Subject'
                              name="subject"
                              id="subject"
                              type='text'
                              value={subject}
                              maxlength="100"
                              message={messages.subject}
                              error={errors.subject}
                              handleFieldValueChange={this.handleFieldValueChange}
                  />
                  <InputField label='Email'
                              name="email"
                              type='email'
                              id="email"
                              value={email}
                              maxlength="50"
                              message={messages.email}
                              error={errors.email}
                              handleFieldValueChange={this.handleFieldValueChange}
                  />
                  <InputField label='Message'
                              name="text"
                              id="text"
                              type='textarea'
                              height={150}
                              value={text}
                              maxlength="8000"
                              message={messages.text}
                              error={errors.text}
                              handleFieldValueChange={this.handleFieldValueChange}
                  />
                  <Col xl={12} lg={12} md={12} sm={12} xs={12} className="d-flex px-0">
                    <Button onClick={this.handleSubmit} className="contactPageSubmitButton w-100">Send</Button>
                  </Col>
                </Col>
                }
                {!!message && !error &&
                <Col xl={{ size: 7, offset: 0 }} lg={{ size: 7, offset: 0 }} md={{ size: 8, offset: 0 }} className="contactMainContentContainer  px-0">
                  <p className="contactHeader">Thank You!</p>
                  <p className="contactSuccessMessage">Your message has been sent. We will respond to you shortly!</p>
                </Col>
                }
              </Col>
            </Col>
          }
        </div>
      </Container>
    )
  }

  renderContactCreated() {
    return(
      <Col className="contact-created-container d-flex flex-column align-items-center">
        <img src="/assets/images/contactIcon.png" alt="Contact"/>
        <h2 className="contactHeader pageTitle">Thank you!</h2>
        <p className="contact-created-text">
          Your message has been sent. We will respond to you shortly!
        </p>
      </Col>
    )
  }
}

const mapStateToProps = state => ({
  contactMessage: state.user.message
})

const mapDispatchToProps = dispatch => bindActionCreators({
  createContact
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Contact))
