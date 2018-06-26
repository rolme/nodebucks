import React, { Component } from 'react'
import { Col, Table } from 'reactstrap'

export default class Summary extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="summaryContainer">
        <div className="contentContainer">
          <p className="summaryTableTitle">Summary</p>
          <Col className="d-flex px-0 py-2 summaryTableContainer">
            <Table responsive>
              <tbody>
                <tr>
                  <td>Value</td>
                  <td>$1,365</td>
                </tr>
                <tr>
                  <td>Cost</td>
                  <td>$1,123</td>
                </tr>
                <tr>
                  <td>Total Rewards</td>
                  <td>$63.72</td>
                </tr>
                <tr>
                  <td>Reward %</td>
                  <td>13,6%</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </div>
      </div>
    )
  }
}
