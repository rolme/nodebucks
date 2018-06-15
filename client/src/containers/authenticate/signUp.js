import React, { Component } from 'react'

import InputField from '../../components/inputField'
import { Container, Col } from 'reactstrap'
import './index.css'

export default class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      stepNumber: 1,
    }
    this.handleFieldValueChange = this.handleFieldValueChange.bind(this)
  }

  handleFieldValueChange(newValue, name) {
    this.setState({
      [name]: newValue,
    })
  }

  render() {
    const { stepNumber, firstName } = this.state
    return (
      <Container fluid className="bg-white">
        <div className="contentContainer d-flex justify-content-center">
          <Col className="signUpContainer">
            {stepNumber === 1 &&
            <Col xl={{size: 4, offset: 4}} className="justify-content-center d-flex flex-column align-items-center">
              <img src="/assets/images/signUpFirstStepIcon.png" alt="Step 1"/>
              <p className="signUpStepNumber">Step 1 of 2</p>
              <h2 className="signUpHeader">Let's get started.</h2>
              <InputField label='First Name'
                          name="firstName"
                          type='text'
                          value={firstName}
                          message='*Required'
                          error={false}
                          handleFieldValueChange={this.handleFieldValueChange}
              />
            </Col>
            }
          </Col>
        </div>
      </Container>
    )
  }
}