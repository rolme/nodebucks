import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import {valueFormat} from "../../lib/helpers";

export default class Summary extends Component {

  render() {
    const { list } = this.props
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
            <p>No data available.</p>
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
      <div className="dashboardSummarySectionContainer  mb-4">
        <h5 className="dashboardSectionHeader"> Summary </h5>
        <div className="bg-white dashboardSummaryTableContainer">
          <dl className="row mb-0">
            <dt className="col-sm-7">Total Rewards</dt>
            <dd className="col-sm-5 text-right">$ {rewardTotal}</dd>

            <dt className="col-sm-7">Total Node(s) Value</dt>
            <dd className="col-sm-5 text-right">{value}</dd>

            <dt className="col-sm-7">Cost Basis</dt>
            <dd className="col-sm-5 text-right">{cost}</dd>

            <dt className="col-sm-7">Projected Annual %</dt>
            <dd className="col-sm-5 text-right">{annual} %</dd>

            <dt className="col-sm-7">Last 30 days</dt>
            <dd className="col-sm-5 text-right">{month} ({monthPercentage} %)</dd>
          </dl>
        </div>
        <div className="d-flex justify-content-end mt-2">
          <NavLink to={`/masternodes`} className="btn dashboardMainTableAddNodeButton mr-2">+ Add Node</NavLink>
          <NavLink to={`/nodes/withdraw`} className="btn dashboardBalanceWithdrawButton"><img src="/assets/images/downArrow.png" alt="withdraw" className="mr-2"/>Withdraw</NavLink>
        </div>
      </div>
    )
  }
}
