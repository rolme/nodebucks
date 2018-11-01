import React from 'react'
import { ClipLoader } from 'react-spinners'
import { NavLink, withRouter } from 'react-router-dom'

import { Col, Alert, FormGroup, Label } from 'reactstrap'
import Checkbox from 'rc-checkbox'
import PaypalExpressBtn from 'react-paypal-express-checkout';
import 'rc-checkbox/assets/index.css'
import { valueFormat } from "../../lib/helpers";

const CLIENT = {
  sandbox: process.env.REACT_APP_PAYPAL_CLIENT_ID_SANDBOX,
  production: process.env.REACT_APP_PAYPAL_CLIENT_ID_PRODUCTION,
};

class PaymentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      agreeCheckbox: false,
      agreeCheckboxError: false,
      realizeCheckbox: false,
      realizeCheckboxError: false,
    }
    this.showErrorMessage = this.showErrorMessage.bind(this)
    this.toggleCheckbox = this.toggleCheckbox.bind(this)
  }

  toggleCheckbox(name) {
    const checkboxName = name + 'Checkbox', checkboxErrorName = name + 'CheckboxError'
    const { [ checkboxName ]: checkbox, [ checkboxErrorName ]: checkboxError } = this.state
    this.setState({ [ checkboxName ]: !checkbox, [ checkboxErrorName ]: !!checkboxError && checkbox })
  }

  showErrorMessage() {
    const { agreeCheckbox, realizeCheckbox } = this.state
    this.setState({ agreeCheckboxError: !agreeCheckbox, realizeCheckboxError: !realizeCheckbox })
  }

  onSuccess = (payment) => {
    this.props.onPurchase(payment)
  }

  onError = (err) => {
    this.setState({ message: err.message })
  }

  render() {
    const { message, agreeCheckbox, agreeCheckboxError, realizeCheckbox, realizeCheckboxError } = this.state
    const { purchasing, price } = this.props
    const nodeCost = parseFloat(this.props.node.cost).toFixed(2)
    const nodePrice = !!price ? '$' + valueFormat(+price) : '-'

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
            <Label className={`purchasePageCheckbox ${agreeCheckboxError ? 'text-danger' : ''}`}>
              <Checkbox
                className="nodebucksCheckbox"
                defaultChecked={agreeCheckbox}
                onChange={() => this.toggleCheckbox('agree')}
              />
              &nbsp; I agree to the Nodebucks <NavLink to='/terms' target="_blank" rel="noopener noreferrer"> Terms of Use</NavLink>,
              <NavLink to='/privacy' target="_blank" rel="noopener noreferrer"> Privacy Policy</NavLink>,
              and <NavLink to='/disclaimer' target="_blank" rel="noopener noreferrer">Disclaimer</NavLink>.
            </Label>
          </FormGroup>
          {!!agreeCheckboxError &&
          <p className="text-danger purchasePageErrorMessage">You must agree before purchasing.</p>
          }
        </Col>
        <Col className="px-0">
          <FormGroup className="mb-0">
            <Label className={`purchasePageCheckbox ${realizeCheckboxError ? 'text-danger' : ''}`}>
              <Checkbox
                className="nodebucksCheckbox"
                defaultChecked={realizeCheckbox}
                onChange={() => this.toggleCheckbox('realize')}
              />
              &nbsp; I realize that the market resell value of this masternode is currently {nodePrice}
            </Label>
          </FormGroup>
          {!!realizeCheckboxError &&
          <p className="text-danger purchasePageErrorMessage">You must agree before purchasing.</p>
          }
        </Col>
        <div className='mt-4 paypalButtonContainer' id="paypalButtonContainer">
          {(!agreeCheckbox || !realizeCheckbox) && <div className="helpingElement" onClick={this.showErrorMessage}/>}
          <PaypalExpressBtn
            env={process.env.REACT_APP_PAYPAL_MODE}
            client={CLIENT}
            currency={'USD'}
            total={process.env.NODE_ENV === 'development' ? 1.00 : nodeCost}
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
