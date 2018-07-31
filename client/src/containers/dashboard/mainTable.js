import React, { Component } from 'react'
import { Table } from 'reactstrap'
import { NavLink } from 'react-router-dom'

import moment from 'moment'

export default class MainTable extends Component {
  displayTableData(list) {
    list = [].concat(list)
    return list.sort((a, b) => {
      if ( a.crypto.name < b.crypto.name ) return -1
      if ( a.crypto.name > b.crypto.name ) return 1
      return 0
    }).map(item => {
      const uptime = (item.onlineAt === null) ? 0 : moment().diff(moment(item.onlineAt), 'days')
      const annualRoi = ((+item.crypto.annualRoi) * 100.0).toFixed(1) + ' %'
      const weeklyRoiValue = (+item.crypto.weeklyRoiValue).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      const monthlyRoiValue = (+item.crypto.monthlyRoiValue).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      const yearlyRoiValue = (+item.crypto.yearlyRoiValue).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")

      const week = (+item.rewards.week).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      const month = (+item.rewards.month).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      const year = (+item.rewards.year).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")

      return (
        <tr key={item.slug}>
          <td><img alt="logo" src={`/assets/images/logos/${item.crypto.slug}.png`} height="25px" className="pr-1"/> {item.crypto.name}</td>
          <td>{uptime} days</td>
          <td className="leftBorder">{annualRoi}</td>
          <td>$ {weeklyRoiValue}</td>
          <td>$ {monthlyRoiValue}</td>
          <td>$ {yearlyRoiValue}</td>
          <td className="leftBorder">$ {week}</td>
          <td>$ {month}</td>
          <td className="rightBorder">$ {year}</td>
          <td>{item.crypto.status}</td>
          <td>
            <NavLink to={`/nodes/${item.slug}`} className="dashboardMainTableViewButton">... </NavLink>
          </td>
        </tr>
      )
    })
  }

  render() {
    const { list } = this.props
    if ( !list.length ) {
      return (
        <div className="mainTableContainer">
          <div className="contentContainer px-0">
            <h5 className="dashboardSectionHeader"> Masternodes </h5>
            <div className="dashboardMainTableContainer">
              <p>You have no masternodes. <NavLink to={`/masternodes`}> Add one now.</NavLink></p>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="mainTableContainer">
        <div className="contentContainer px-0">
          <h5 className="dashboardSectionHeader"> Masternodes </h5>
          <div className="dashboardMainTableContainer">
            <Table responsive bordered className="dashboardMainTable">
              <thead>
              <tr>
                <th></th>
                <th></th>
                <th colSpan="4" className="leftBorder rightBorder">PROJECTED RETURNS</th>
                <th colSpan="3" className="rightBorder">ACTUAL RETURNS</th>
                <th></th>
              </tr>
              <tr>
                <th>Coin</th>
                <th>Uptime</th>
                <th className="leftBorder">ROI</th>
                <th>Week</th>
                <th>Month</th>
                <th>Year</th>
                <th className="leftBorder">Week</th>
                <th>Month</th>
                <th className="rightBorder">Year</th>
                <th>Status</th>
                <th>View</th>
              </tr>
              </thead>
              <tbody>
              {this.displayTableData(list)}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    )
  }
}
