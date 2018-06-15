import React, { Component } from 'react';
import { FormGroup, Label, Input, FormFeedback, FormText, Col } from 'reactstrap';

import './index.css'

export default class InputField extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { label, name, type, value, message, error } = this.props
    let inputFieldContainerClassName = 'inputFieldContainer form-control'
    if(!!value){
      inputFieldContainerClassName += ' inputFieldContainerWithValue'
    }
    if(error){
      inputFieldContainerClassName += ' inputFieldContainerWithError'
    }
    return (
      <FormGroup className="w-100">
        <Col className={inputFieldContainerClassName}>
          {!!value && <Label for={name}>{label}</Label>}
          <Input type={type} name={name} id={name} value={value} placeholder={label} onChange={(event) => this.props.handleFieldValueChange(event.target.value, name)}/>
        </Col>
        <FormText className={error ? 'inputFieldErrorMessage' : 'inputFieldMessage'}>{message}</FormText>
      </FormGroup>
    )
  }
}