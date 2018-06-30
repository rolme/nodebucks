import React, { Component } from 'react'
import { Table } from 'reactstrap'

import moment from 'moment'

export default class MainTable extends Component {
  displayTableData(list) {
    return list.map(item => {
      const uptime          = (item.onlineAt === null) ? 0 : moment().diff(moment(item.onlineAt), 'days')
      const annualRoi       = ((+item.crypto.annualRoi) * 100.0).toFixed(1) + ' %'
      const weeklyRoiValue  = (+item.crypto.weeklyRoiValue).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      const monthlyRoiValue = (+item.crypto.monthlyRoiValue).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      const yearlyRoiValue  = (+item.crypto.yearlyRoiValue).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")

      const week  = (+item.rewards.week).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      const month = (+item.rewards.month).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      const year  = (+item.rewards.year).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")

      return (
        <tr key={item.slug}>
          <td className="text-right">{item.crypto.name}</td>
          <td className="text-right">{uptime} days</td>
          <td className="text-right">{annualRoi}</td>
          <td className="text-right">{weeklyRoiValue}</td>
          <td className="text-right">{monthlyRoiValue}</td>
          <td className="text-right">{yearlyRoiValue}</td>
          <td className="text-right">{week}</td>
          <td className="text-right">{month}</td>
          <td className="text-right">{year}</td>
          <td></td>
        </tr>
      )
    })
  }

  render() {
    const { list } = this.props

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
            {this.displayTableData(list)}
            </tbody>
          </Table>
          <button className="submitButton mt-2 py-3 mx-auto d-block">+ Add Node</button>
        </div>
      </div>
    )
  }
}
