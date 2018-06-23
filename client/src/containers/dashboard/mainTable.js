import React, { Component } from 'react'
import { Table } from 'reactstrap'

export default class MainTable extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  displayTableData() {
    const testData = [
      {
        coin: "Polis",
        uptime: "Jun 1, 2018",
        projectedRoi: '82%',
        projectedWeek: '35.15',
        projectedMonth: '255',
        projectedYear: '1000',
        actualWeek: '35.15',
        actualMonth: '255',
        actualYear: '1000',
      },
      {
        coin: "Polis",
        uptime: "Jun 2, 2018",
        projectedRoi: '82%',
        projectedWeek: '35.15',
        projectedMonth: '255',
        projectedYear: '1000',
        actualWeek: '35.15',
        actualMonth: '255',
        actualYear: '1000',
      },
      {
        coin: "Polis",
        uptime: "Jun 3, 2018",
        projectedRoi: '82%',
        projectedWeek: '35.15',
        projectedMonth: '255',
        projectedYear: '1000',
        actualWeek: '35.15',
        actualMonth: '255',
        actualYear: '1000',
      }
    ]

    return testData.map(data => {
      return (
        <tr>
          <td>{data.coin}</td>
          <td>{data.uptime}</td>
          <td>{data.projectedRoi}</td>
          <td>{data.projectedWeek}</td>
          <td>{data.projectedMonth}</td>
          <td>{data.projectedYear}</td>
          <td>{data.actualWeek}</td>
          <td>{data.actualMonth}</td>
          <td>{data.actualYear}</td>
          <td></td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div className="mainTableContainer">
        <div className="contentContainer px-0">
          <Table responsive bordered className="dashboardMainTable">
            <thead>
            <tr>
              <th className="emptyHeader"></th>
              <th className="emptyHeader"></th>
              <th colSpan="4">Projected Returns</th>
              <th colSpan="3">Actual Returns</th>
              <th className="transparentBorder"></th>
            </tr>
            <tr>
              <th>Coin</th>
              <th>Uptime</th>
              <th>ROI</th>
              <th>Week</th>
              <th>Month</th>
              <th>Year</th>
              <th>Week</th>
              <th>Month</th>
              <th>Year</th>
              <th>View</th>
            </tr>
            </thead>
            <tbody>
            {this.displayTableData()}
            </tbody>
          </Table>
          <button className="submitButton mt-2 py-3 mx-auto d-block">+ Add Node</button>
        </div>
      </div>
    )
  }
}
