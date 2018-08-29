import React from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { ClipLoader } from 'react-spinners'

import { Col, Alert, Button } from 'reactstrap'

class _PaymentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    
    this.props.togglePurchasingStatus()

    if ( this.props.stripe ) {
      this.props.stripe
        .createToken({name: 'test'})
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

  render() {
    const { message } = this.state
    const { purchasing } = this.props
    console.log(purchasing)

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
        <Col xl={{size: 8, offset: 2}} lg={{size: 8, offset: 2}} md={{size: 8, offset: 2}} sm={{size: 10, offset: 1}} xs={{size: 10, offset: 1}} className="d-flex justify-content-center">
          <Button disabled={purchasing} className="submitButton purchaseNodeButton">Purchase Node</Button>
        </Col>
      </form>
    )
  }
}

const PaymentForm = injectStripe(_PaymentForm)
export default PaymentForm