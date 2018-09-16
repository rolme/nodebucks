import React from 'react'
import { ClipLoader } from 'react-spinners'
import { NavLink, withRouter } from 'react-router-dom'

import { Col, Alert, FormGroup, Label } from 'reactstrap'
import Checkbox from 'rc-checkbox'
import PaypalExpressBtn from 'react-paypal-express-checkout';
import 'rc-checkbox/assets/index.css'

const CLIENT = {
  sandbox: process.env.REACT_APP_PAYPAL_CLIENT_ID_SANDBOX,
  production: process.env.REACT_APP_PAYPAL_CLIENT_ID_PRODUCTION,
};

class PaymentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      checkbox: false,
      checkboxError: false
    }
    this.showErrorMessage = this.showErrorMessage.bind(this)
    this.toggleCheckbox = this.toggleCheckbox.bind(this)
  }

  toggleCheckbox() {
    const { checkbox, checkboxError } = this.state
    this.setState({ checkbox: !checkbox, checkboxError: checkbox && checkboxError })
  }

  showErrorMessage() {
    this.setState({ checkboxError: true })
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
      <div>
        {!!message &&
        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="mb-1 px-0 paymentFormMessageContainer">
          <Alert color='danger'>
            {message}
          </Alert>
        </Col>
        }
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
        <div className='mt-4 paypalButtonContainer' id="paypalButtonContainer">
          {!checkbox && <div className="helpingElement" onClick={this.showErrorMessage}/>}
          <PaypalExpressBtn
            env={process.env.REACT_APP_PAYPAL_MODE}
            client={CLIENT}
            currency={'USD'}
            total={1.00}
            onSuccess={this.onSuccess}
            onError={this.onError}
            style={{ width: 500 }}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(PaymentForm)
