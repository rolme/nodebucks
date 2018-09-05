import React from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { ClipLoader } from 'react-spinners'
import { NavLink, withRouter } from 'react-router-dom'

import { Col, Alert, Button, FormGroup, Label } from 'reactstrap'
import Checkbox from 'rc-checkbox'
import PaypalExpressBtn from 'react-paypal-express-checkout';
import 'rc-checkbox/assets/index.css'

const CLIENT = {
  sandbox: process.env.REACT_APP_PAYPAL_CLIENT_ID_SANDBOX,
  production: process.env.REACT_APP_PAYPAL_CLIENT_ID_PRODUCTION,
};

class _PaymentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      checkbox: false,
      checkboxError: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleCheckbox = this.toggleCheckbox.bind(this)
  }

  toggleCheckbox() {
    this.setState({ checkbox: !this.state.checkbox })
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    const { checkbox, checkboxError } = this.state
    if ( !checkbox ) {
      this.setState({ checkboxError: true })
      return
    } else if ( checkboxError ) {
      this.setState({ checkboxError: false })
    }

    this.props.togglePurchasingStatus()

    if ( this.props.stripe ) {
      this.props.stripe
        .createToken({ name: 'test' })
        .then((payload) => {
          if ( !!payload.token ) {
            this.props.togglePurchasingStatus()
            this.props.onPurchase(payload.token.id, this.props.setAsPurchased)
          } else if ( !!payload.error ) {
            this.props.togglePurchasingStatus()
            this.setState({ message: payload.error.message })
          }
        });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  }

  onSuccess = (payment) => {
    this.props.onPurchase(payment, this.props.setAsPurchased)        
  }

  onError = (err) => {
    this.setState({ message: err.message })
  }

  render() {
    const { message, checkbox, checkboxError } = this.state
    const { purchasing } = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        {!!message &&
        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-1 px-0 paymentFormMessageContainer">
          <Alert color='danger'>
            {message}
          </Alert>
        </Col>
        }
        <label className="w-100">
          Card details
          <CardElement style={{ base: { fontSize: '18px' } }}/>
        </label>
        <div style={{ textAlign: 'center' }}>
          {
            purchasing && <div>
              <p className="loading-text">Please wait ...</p>
              <ClipLoader
                size={35}
                color={'#3F89E8'}
                loading={true}
              />
            </div>
          }
        </div>
        <Col className="px-0">
          <FormGroup className="mb-0">
            <Label className={`purchasePageCheckbox ${checkboxError ? 'text-danger' : ''}`}>
              <Checkbox
                className="nodebucksCheckbox"
                defaultChecked={checkbox}
                onChange={this.toggleCheckbox}
              />
              &nbsp; I agree to the Nodebucks <NavLink to='/terms' target="_blank" rel="noopener noreferrer"> Terms of Use</NavLink>, <NavLink to='/privacy' target="_blank" rel="noopener noreferrer">Privacy Policy</NavLink>, and <NavLink to='/disclaimer' target="_blank" rel="noopener noreferrer">Disclaimer</NavLink>.
            </Label>
          </FormGroup>
          {!!checkboxError &&
          <p className="text-danger">You must agree before purchasing.</p>
          }
        </Col>
        <Col xl={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }} sm={{ size: 10, offset: 1 }} xs={{ size: 10, offset: 1 }} className="d-flex justify-content-center">
          <Button disabled={purchasing} className="submitButton purchaseNodeButton">Purchase Node</Button>
        </Col>
        <div className='mt-4'>
          <PaypalExpressBtn 
            env={process.env.REACT_APP_PAYPAL_MODE} 
            client={CLIENT} 
            currency={'USD'} 
            total={1.00} 
            onSuccess={this.onSuccess}
            onError={this.onError}
          />
        </div>
      </form>
    )
  }
}

const PaymentForm = injectStripe(_PaymentForm)
export default withRouter(PaymentForm)
