import React, { Component } from 'react'
import { FormGroup, Label, Input, InputGroupAddon, InputGroupText, FormText, Col } from 'reactstrap'

import './index.css'

export default class InputField extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { label, name, type, value, message, error, addonIcon } = this.props
    let inputFieldContainerClassName = 'inputFieldContainer form-control'
    if ( !!value ) {
      inputFieldContainerClassName += ' inputFieldContainerWithValue'
    }
    if ( error ) {
      inputFieldContainerClassName += ' inputFieldContainerWithError'
    }
    if ( !!addonIcon ) {
      inputFieldContainerClassName += ' input-group withAddonInputFieldGroup'
    }
    return (
      <FormGroup className="w-100">
        <Col className={inputFieldContainerClassName}>
          {!!value && <Label for={name}>{label}</Label>}
          <Input type={type} name={name} id={name} value={value} placeholder={label} onChange={(event) => this.props.handleFieldValueChange(event.target.value, name)} style={{height: this.props.height}}/>
          {!!addonIcon &&
          <InputGroupAddon addonType="append">
            <InputGroupText><img src={addonIcon} alt='psw' onClick={() => this.props.onAddonClick(name)} className={!!this.props.onAddonClick ? "inputFieldClickableAddon" : ""}/></InputGroupText>
          </InputGroupAddon>
          }
        </Col>
        <FormText className={error ? 'inputFieldErrorMessage' : 'inputFieldMessage'}>{message}</FormText>
      </FormGroup>
    )
  }
}