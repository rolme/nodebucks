import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/fontawesome-free-solid'
import { CSVLink } from 'react-csv'

import { fetchBalance } from '../../reducers/user'
import { fetchRewards } from '../../reducers/rewards'
import { valueFormat } from "../../lib/helpers"

class Balance extends Component {

  componentWillMount() {
    this.props.fetchBalance()
    this.props.fetchRewards()
  }

  render() {
    const { user } = this.props

    if ( !user.balances ) {
      return (
        <div className="dashboardBalanceSectionContainer  mb-4">
          <h5 className="dashboardSectionHeader"> Balance </h5>
          <div className="bg-white dashboardBalanceTableContainer">
            <p className="dashboardSectionNoDataMessage">No data available</p>
          </div>
        </div>
      )
    }


    //let balances = user.balances.filter(b => b.hasNodes)
    let { balances } = user
    const total = balances.filter(b => b.withdrawable).map(b => b.usd).reduce((t, i) => { return +t + +i }, 0)
    return (
      <div className="dashboardBalanceSectionContainer  mb-4">
        <h5 className="dashboardSectionHeader"> Balance <span>(${valueFormat(total, 2)})</span></h5>
        <div className="bg-white dashboardBalanceTableContainer">
          <table className="table mb-0">
            <thead>
            <tr>
              <th className="text-left">Coin</th>
              <th className="text-right">Amount</th>
              <th className="text-right">USD</th>
            </tr>
            </thead>
            <tbody>
            {!!balances && balances.map(balance => {
              const value = valueFormat(parseFloat(balance.value), 2)
              const usd = valueFormat(parseFloat(balance.usd), 2)
              return (
                <tr key={balance.name}>
                  <td className="text-left">
                    <img alt="logo" src={`/assets/images/logos/${balance.slug}.png`} width="25px" className="pr-1"/>
                    {balance.name} {!balance.withdrawable && <FontAwesomeIcon icon={faBan} color="#9E9E9E" className="ml-2"/>}
                  </td>
                  <td className="text-right">{value}</td>
                  <td className="text-right">${usd}</td>
                </tr>
              )
            })}
            </tbody>
          </table>
          {
            this.props.rewards.length > 0 && <center>
              <CSVLink filename="rewards.csv" data={this.generateRewardsCSV()}>Download Rewards History</CSVLink>
            </center>
          }
        </div>
      </div>
    )
  }

  generateRewardsCSV() {
    const { rewards } = this.props
    let csv = [["timestamp", "coin", "amount"]]
    rewards.forEach(reward => {
      csv.push([reward.timestamp, reward.crypto, reward.amount])
    })
    return csv
  }
}

const mapStateToProps = state => ({
  error: state.nodes.error,
  message: state.nodes.message,
  rewards: state.rewards.list,
  pending: state.nodes.pending,
  user: state.user.data
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchBalance,
  fetchRewards
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Balance)
