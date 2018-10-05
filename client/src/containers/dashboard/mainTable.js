import React, { Component } from 'react'
import { Table, Badge } from 'reactstrap'
import { NavLink, withRouter } from 'react-router-dom'
import { capitalize, valueFormat } from '../../lib/helpers'
import moment from 'moment'

class MainTable extends Component {
  constructor(props) {
    super(props)
    this.viewNode = this.viewNode.bind(this)
  }

  viewNode(slug) {
    this.props.history.push(`/nodes/${slug}`)
  }

  displayTableData(list) {
    list = [].concat(list)
    return list.sort((a, b) => {
      if ( a.crypto.name < b.crypto.name ) return -1
      if ( a.crypto.name > b.crypto.name ) return 1
      return 0
    }).map(item => {
      let uptime = item.uptime
      if ( +uptime === 0 ) {
        uptime = '0 days'
      } else {
        if ( +uptime < 60 ) {
          uptime = uptime + ' secs'
        } else if ( +uptime < 3600 ) {
          uptime = (+uptime/60).toFixed(0) + ' mins'
        } else if ( +uptime < 86400 ) {
          uptime = (+uptime/3600).toFixed(0) + ' hrs'
        } else {
          uptime = (+uptime/86400).toFixed(0) + ' days'
        }
      }

      const annualRoi = ((+item.crypto.annualRoiPercentage) * 100.0).toFixed(1) + '%'
      const weeklyRoiValue = valueFormat(+item.crypto.weeklyRoiValue, 2)
      const monthlyRoiValue = valueFormat(+item.crypto.monthlyRoiValue, 2)
      const yearlyRoiValue = valueFormat(+item.crypto.yearlyRoiValue, 2)

      const week = valueFormat(+item.rewards.week, 2)
      const month = valueFormat(+item.rewards.month, 2)
      const year = valueFormat(+item.rewards.year, 2)
      let statusColor = 'secondary'
      if ( item.status === 'online' ) {
        statusColor = 'success'
      } else if ( item.status === 'offline' || item.status === 'down' ) {
        statusColor = 'danger'
      }

      return (
        <tr key={item.slug} onClick={() => this.viewNode(item.slug)}>
          <td><img alt="logo" src={`/assets/images/logos/${item.crypto.slug}.png`} height="25px" className="pr-1"/> {item.crypto.name}</td>
          <td className="text-center">{uptime}</td>
          <td className="leftBorder text-right">{annualRoi}</td>
          <td className="text-right">${weeklyRoiValue}</td>
          <td className="text-right">${monthlyRoiValue}</td>
          <td className="text-right">${yearlyRoiValue}</td>
          <td className="leftBorder text-right">${week}</td>
          <td className="text-right">${month}</td>
          <td className="rightBorder text-right">${year}</td>
          <td className="text-center"><Badge color={statusColor} className="px-2 py-1">{capitalize(item.status)}</Badge></td>
        </tr>
      )
    })
  }

  render() {
    const { list } = this.props
    if ( !list.length ) {
      return (
        <div className="mainTableContainer mb-4">
          <div className="contentContainer px-0">
            <h5 className="dashboardSectionHeader"> My Masternodes </h5>
            <div className="dashboardMainTableContainer">
              <p className="dashboardSectionNoDataMessage pl-3">You have no masternodes. <NavLink to={`/masternodes`}> Add one now.</NavLink></p>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="mainTableContainer mb-4">
        <div className="contentContainer px-0">
          <h5 className="dashboardSectionHeader"> My Masternodes </h5>
          <div className="dashboardMainTableContainer">
            <Table responsive bordered className="dashboardMainTable">
              <thead>
              <tr>
                <th></th>
                <th></th>
                <th colSpan="4" className="leftBorder rightBorder">Estimated Returns<span className="asteriskSign">*</span></th>
                <th colSpan="3" className="rightBorder">Actual Returns</th>
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
              </tr>
              </thead>
              <tbody>
              {this.displayTableData(list)}
              </tbody>
            </Table>
          </div>
          <p className="disclaimerText ml-3">* These values are projections based on current blockchain reward amounts and frequencies and number of masternodes. These estimated values can and will change over time. </p>
        </div>
      </div>
    )
  }
}

export default withRouter(MainTable)
