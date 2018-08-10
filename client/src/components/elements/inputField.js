import React, { Component } from 'react'
import { FormGroup, Label, Input, InputGroupAddon, InputGroupText, FormText, Col } from 'reactstrap'

import './index.css'

export default class InputField extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.focusInput = this.focusInput.bind(this);
  }

  focusInput() {
    const { id } = this.props
    document.getElementById(id).focus()
  }

  render() {
    const { label, name, type, value, message, error, addonIcon, id, autoFocus, autocomplete } = this.props
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
    const elementId = !!id ? id : name
    return (
      <FormGroup className="w-100">
        <Col className={inputFieldContainerClassName} onClick={this.focusInput}>
          {!!value && <Label for={name}>{label}</Label>}
          <Input autoFocus={!!autoFocus}
                 type={type}
                 name={name}
                 id={elementId}
                 value={value}
                 placeholder={label}
                 autoComplete={autocomplete === 'false' ? autocomplete : 'true'}
                 onChange={(event) => this.props.handleFieldValueChange(event.target.value, name)} style={{ height: this.props.height }}
                 onKeyPress={!!this.props.onKeyPress ? (event) => (event.charCode === 13) && this.props.handleFieldValueChange(event.target.value, name, true) : null}
          />
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