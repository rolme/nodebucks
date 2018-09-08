import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ConfirmationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      message: '',
    };
  }

  toggle = () => {
    this.setState({ input: '', message: '' })
    this.props.onClose();
  }

  handleConfirmation = () => {
    const { userSlug } = this.props
    this.props.onConfirm(userSlug, this.state.input, (isValid) => {
      if(isValid) {
        this.props.onSuccess()
        this.setState({ input: '', message: '' })
      }
      else this.setState({ message: 'Wrong password, please try again.'})
    })
  }

  handleInputChange = (e) => {
    this.setState({ input: e.target.value })
  }

  render() {
    const { show, title, price } = this.props
    return (
      <div>
        <Modal isOpen={show} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
          <ModalBody>
            <p>Enter your password below:</p>
            { price && <p>Price: {price === 'NaN' ? 'Loading...' : `$${price}`}</p>}
            <input type="password" value={this.state.input} onChange={this.handleInputChange}/>
            <p className="text-danger mt-3">{this.state.message}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleConfirmation}>Confirm</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ConfirmationModal;
