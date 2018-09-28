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
    this.setState({ token: e.target.value, message: '' })
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
      this.setState({ message: 'Token is invalid.'})
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
          { !this.props.isOtherIP &&
            <div>
              <Label for="trusted">This is a trusted computer</Label>
              <Input
                type="checkbox"
                name="trusted"
                onChange={this.handleCheckboxChange}
                checked={this.state.trusted}
                className="ml-2"
              />
            </div>
          }
        </ModalBody>
        <ModalFooter>
          <Button 
            color="primary" 
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
