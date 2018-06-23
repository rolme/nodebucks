import React, { Component } from 'react'
import {Col} from 'reactstrap'

export default class Summary extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className="summaryContainer">
        <div className="contentContainer">
          <p className="summaryTableTitle">Summary</p>
          <Col className="d-flex px-0 py-2 summaryTableContainer">
            <Col className="summaryLabelsContainer">
              <p>Reward Balance: USD balance of all coins</p>
              <p>Total Node(s) Value</p>
              <p>Cost Basis</p>
              <p>Projected Annual %</p>
              <p>Last 30 days: $USD (percentage %)</p>
            </Col>
            <Col className="summaryValuesContainer">
              <p>$13,412.01</p>
              <p>$13,412.01</p>
              <p>$13,412.01</p>
              <p>$13,412.01</p>
              <p>$13,412.01</p>
            </Col>
          </Col>
          <button className="submitButton mt-2 py-3">Add Node</button>
        </div>
      </div>
    )
  }
}
