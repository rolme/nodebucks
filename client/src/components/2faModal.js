import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import speakeasy from 'speakeasy'

export default class Modal2FA extends Component {
  constructor(props) {
    super(props)

    this.state = {
      token: '',
      message: '',
      trusted: false,
    }
  }

  handleTokenChange = (e) => {
    const token = e.target.value
    this.setState({ token: token, message: '' }, () => {
      if (token.length === 6) {
        this.handleSubmit()
      }
    })
  }

  handleSubmit = () => {
    const { email, password, secret } = this.props
    const { trusted } = this.state
    const isTokenValid = speakeasy.totp.verify({ 
      secret: secret,
      encoding: 'ascii',
      token: this.state.token,
    })

    if(trusted) {
      this.props.login({ email, password, trusted })
    }
    else if(isTokenValid) {
      this.props.login({ email, password })
      this.props.onToggle()
    } else {
      this.setState({ token: '', message: 'Token is invalid.'})
    }
  }

  handleCheckboxChange = () => {
    this.setState({ trusted: !this.state.trusted })
  }

  render() {
    return (
      <Modal isOpen={this.props.show} toggle={this.props.onToggle} className={this.props.className}>
        <ModalHeader toggle={this.props.onToggle}>Two Factor Authentication</ModalHeader>
        <ModalBody>
          <Input 
            type="text"
            name="2fa"
            placeholder="Enter Google authenticator token here"
            value={this.state.token}
            onChange={this.handleTokenChange}
            autoFocus={true}
          />
          <p className="text-danger mt-2">{this.state.message}</p>
          <hr />
          { !this.props.isOtherIP &&
            <div className="d-flex justify-content-between">
              <div className="ml-4">
                <Input
                  type="checkbox"
                  name="trusted"
                  onChange={this.handleCheckboxChange}
                  checked={this.state.trusted}
                />
                <Label for="trusted">This is a trusted computer</Label>
              </div>
              <Button 
                color="primary" 
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </div>
          }
        </ModalBody>
      </Modal>
    );
  }
}
