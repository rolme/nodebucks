import React from 'react'
import { CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement, injectStripe } from 'react-stripe-elements'

import { Col, Alert, Button } from 'reactstrap'

class _PaymentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (ev) => {
    ev.preventDefault()

    if ( this.props.stripe ) {
      this.props.stripe
        .createToken()
        .then((payload) => {
          if ( !!payload.token ) {
            this.props.onSuccess(this.props.slug)
          } else if ( !!payload.error ) {
            this.setState({ message: payload.error.message })
          }

          console.log('[token]', payload)
        });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  }

  render() {
    const { message } = this.state
    const { refreshing } = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        {!!message &&
        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-1 px-0 paymentFormMessageContainer">
          <Alert color='danger'>
            {message}
          </Alert>
        </Col>
        }
        <label>
          Card number
        </label>
        <CardNumberElement style={{ base: { fontSize: '18px' } }}/>
        <label>
          Expiration date
        </label>
        <CardExpiryElement style={{ base: { fontSize: '18px' } }}/>
        <label>
          CVC
        </label>
        <CardCVCElement style={{ base: { fontSize: '18px' } }}/>
        <label>
          Postal code
        </label>
        <PostalCodeElement style={{ base: { fontSize: '18px' } }}/>
        <Button disabled={!!refreshing} color="primary">Purchase Node</Button>
      </form>
    )
  }
}

const PaymentForm = injectStripe(_PaymentForm)
export default PaymentForm