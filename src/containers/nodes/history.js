import React, { Component } from 'react'
import {Col, Table} from 'reactstrap'

export default class History extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className="historyContainer">
        <div className="contentContainer px-0">
          <p className="historyTableTitle">History</p>
          <Col className="d-flex px-0 py-2 historyTableContainer">
           <Table striped hover>
             <thead>
                <tr>
                  <th>Date</th>
                  <th>Event</th>
                  <th>Total Rewards</th>
                </tr>
             </thead>
             <tbody>
                <tr>
                  <td>May 11, 2018 9:43</td>
                  <td>Reward: +14.4 PLS (-4 Fee)</td>
                  <td>42.00</td>
                </tr>
                <tr>
                  <td>May 11, 2018 9:43</td>
                  <td>Reward: +14.4 PLS (-4 Fee)</td>
                  <td>28.00</td>
                </tr>
                <tr>
                  <td>May 11, 2018 9:43</td>
                  <td>Reward: +14.4 PLS (-4 Fee)</td>
                  <td>14.00</td>
                </tr>
                <tr>
                  <td>May 11, 2018 9:43</td>
                  <td>Server Setup</td>
                  <td>0.00</td>
                </tr>
             </tbody>
           </Table>
          </Col>
        </div>
      </div>
    )
  }
}
