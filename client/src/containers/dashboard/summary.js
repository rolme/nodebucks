import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Summary extends Component {

  changeNumberFormat(number) {
    return number.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  }

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
      return <span>Pending...</span>
    }

    const rewardTotal = this.changeNumberFormat(+summary.rewardTotal)
    const value = this.changeNumberFormat(+summary.value)
    const cost = this.changeNumberFormat(+summary.cost)
    const month = this.changeNumberFormat(+summary.rewards.month)
    const annual = this.changeNumberFormat((+summary.crypto.yearlyRoiValue / +summary.cost) * 100)
    const monthPercentage = this.changeNumberFormat((+summary.rewards.month / +summary.cost) * 100)

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
        </div>
      </div>
    )
  }
}
