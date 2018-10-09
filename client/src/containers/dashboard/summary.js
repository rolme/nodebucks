import React, { Component } from 'react'

import { valueFormat } from "../../lib/helpers";

export default class Summary extends Component {

  render() {
    const list = JSON.parse(JSON.stringify(this.props.list))
    let summary = {}

    if ( list.length > 0 ) {
      summary = list.reduce((data, item) => {
        data.rewardTotal = +data.rewardTotal + +item.rewardTotal
        data.value = +data.value + +item.value
        data.cost = +data.cost + +item.cost
        data.rewards.month = +data.rewards.month + +item.rewards.month
        data.crypto.yearlyRoiValue = +data.crypto.yearlyRoiValue + +item.crypto.yearlyRoiValue
        return data
      })
    } else {
      return (
        <div className="dashboardSummarySectionContainer  mb-4">
          <h5 className="dashboardSectionHeader"> Summary </h5>
          <div className="bg-white dashboardSummaryTableContainer">
            <p className="dashboardSectionNoDataMessage">No data available.</p>
          </div>
        </div>
      )
    }

    const rewardTotal = valueFormat(+summary.rewardTotal, 2)
    const value = valueFormat(+summary.value, 2)
    const cost = valueFormat(+summary.cost, 2)
    const month = valueFormat(+summary.rewards.month, 2)
    const annual = !!summary.cost ? valueFormat((+summary.crypto.yearlyRoiValue / +summary.cost) * 100, 2) : '0.00'
    const monthPercentage = !!summary.cost ? valueFormat((+summary.rewards.month / +summary.cost) * 100, 2) : '0.00'

    return (
      <div className="dashboardSummarySectionContainer mb-4">
        <h5 className="dashboardSectionHeader"> Summary </h5>
        <div className="bg-white dashboardSummaryTableContainer">
          <div className="dashboardSummaryTableRowContainer">
            <h6>Total Rewards</h6>
            <p>${rewardTotal}</p>
          </div>
          <div className="dashboardSummaryTableRowContainer">
            <h6>Total Node Value</h6>
            <p>${value}</p>
          </div>
          <div className="dashboardSummaryTableRowContainer">
            <h6>Cost Basis</h6>
            <p>${cost}</p>
          </div>
          <div className="dashboardSummaryTableRowContainer">
            <h6>Projected Annual %</h6>
            <p>{annual}%</p>
          </div>
          <div className="dashboardSummaryTableRowContainer">
            <h6>Last 30 days</h6>
            <p>{month} ({monthPercentage}%)</p>
          </div>
        </div>
      </div>
    )
  }
}
