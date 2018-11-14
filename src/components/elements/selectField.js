import React, { Component } from 'react'
import Select from 'react-select'
import { FormGroup, Label, FormText, Col } from 'reactstrap'
import 'react-select/dist/react-select.min.css'
import './index.css'

export default class SelectField extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { label, name, value, message, error, options } = this.props
    let inputFieldContainerClassName = 'inputFieldContainer form-control'
    if ( !!value ) {
      inputFieldContainerClassName += ' inputFieldContainerWithValue'
    }
    if ( error ) {
      inputFieldContainerClassName += ' inputFieldContainerWithError'
    }
    return (
      <FormGroup className="w-100">
        <Col className={inputFieldContainerClassName}>
          {!!value && <Label for={name}>{label}</Label>}
          <Select
            id={name}
            className="inputSelectField"
            name={name}
            value={value}
            clearable={false}
            placeholder={label}
            onChange={(newValue) => !!newValue && this.props.handleFieldValueChange(newValue.value, name)}
            options={options}
          />
        </Col>
        <FormText className={error ? 'inputFieldErrorMessage' : 'inputFieldMessage'}>{message}</FormText>
      </FormGroup>
    )
  }
}