import React, { Component } from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

export default class RewardSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="rewardSettingsContainer">
        <div className="contentContainer">
          <p className="rewardSettingsTitle">Reward Settings</p>
          <FormGroup tag="fieldset">
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" />{' '}
               Store on Nodebucks
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" />{' '}
                Auto-Lounch MN
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" />{' '}
                Auto-Withdraw
              </Label>
            </FormGroup>
          </FormGroup>
          <button className="submitButton py-2">Update</button>
        </div>
      </div>
    )
  }
}
