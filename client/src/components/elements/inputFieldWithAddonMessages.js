import React, { Component } from 'react'
import { FormGroup, Label, Input, InputGroupAddon, InputGroupText, Col, Tooltip } from 'reactstrap'

import './index.css'

export default class InputField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tooltipOpen: false
    }
    this.toggleTooltip = this.toggleTooltip.bind(this)
  }

  toggleTooltip() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    })
  }

  render() {
    const { label, name, type, value, message, error, id } = this.props
    let inputFieldContainerClassName = 'inputFieldContainer form-control'
    if ( !!value ) {
      inputFieldContainerClassName += ' inputFieldContainerWithValue'
    }
    if ( !!error ) {
      inputFieldContainerClassName += ' input-group inputFieldContainerWithError inputFieldContainerWithErrorMessage withAddonInputFieldGroup'
    }
    const elementId = !!id ? id : name
    const addonId = elementId + "TooltipAddon"
    return (
      <FormGroup className="w-100">
        <Col className={inputFieldContainerClassName}>
          {!!value && <Label for={name}>{label}</Label>}
          <Input type={type} name={name} id={elementId} value={value} placeholder={label} onChange={(event) => this.props.handleFieldValueChange(event.target.value, name)} style={{ height: this.props.height }}/>
          {!!error &&
          <InputGroupAddon id={addonId} addonType="append">
            <InputGroupText><img src="/assets/images/errorAddonIcon.png" alt="message"/></InputGroupText>
          </InputGroupAddon>
          }
          {!!error &&
          <Tooltip className="tooltipAddon" placement="top-start" isOpen={this.state.tooltipOpen} target={addonId} toggle={this.toggleTooltip}>
            {message}
          </Tooltip>
          }
        </Col>
      </FormGroup>
    )
  }
}