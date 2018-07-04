import React, { Component } from 'react'

export default class Summary extends Component {
  render() {
    const { list } = this.props
    let summary    = {}

    if (list.length > 0) {
      summary = list.reduce((data, item) => {
        data.rewardTotal           = +data.rewardTotal + +item.rewardTotal
        data.value                 = +data.value + +item.value
        data.cost                  = +data.cost + +item.cost
        data.rewards.month         = +data.rewards.month + +item.rewards.month
        data.crypto.yearlyRoiValue = +data.crypto.yearlyRoiValue + +item.crypto.yearlyRoiValue
        return data
      })
    } else {
      return <span>Pending...</span>
    }

    // TODO: Should have a method to fix to 2 and add commas
    const rewardTotal     = (+summary.rewardTotal).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    const value           = (+summary.value).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    const cost            = (+summary.cost).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    const month           = (+summary.rewards.month).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    const annual          = ((+summary.crypto.yearlyRoiValue/+summary.cost) * 100).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    const monthPercentage = ((+summary.rewards.month/+summary.cost) * 100).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")

    return (
      <div className="card">
        <div className="card-header">
          Summary
        </div>
        <div className="card-body">
          <dl className="row">
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
      </div>
    )
  }
}
