import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchBalance } from '../../reducers/user'

class Balance extends Component {

  componentWillMount() {
    this.props.fetchBalance()
  }

  render() {
    const { user } = this.props

    if(!user.balances){
      return (
        <div className="dashboardBalanceSectionContainer  mb-4">
          <h5 className="dashboardSectionHeader"> Balance </h5>
          <div className="bg-white dashboardBalanceTableContainer">
            <p>No data available</p>
          </div>
        </div>
      )
    }


    //let balances = user.balances.filter(b => b.hasNodes)
    let {balances} = user
    return (
      <div className="dashboardBalanceSectionContainer  mb-4">
        <h5 className="dashboardSectionHeader"> Balance </h5>
        <div className="bg-white dashboardBalanceTableContainer">
          <table className="table">
            <thead>
            <tr>
              <th className="text-left">Coin</th>
              <th className="text-right">Amount</th>
              <th className="text-right">USD</th>
            </tr>
            </thead>
            <tbody>
            {!!balances && balances.map(balance => {
              const value        = parseFloat(balance.value).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
              const usd          = parseFloat(balance.usd).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
              return (
                <tr key={balance.name}>
                  <td className="text-left"><img alt="logo" src={`/assets/images/logos/${balance.slug}.png`} width="40px" className="pr-1"/> {balance.name}</td>
                  <td className="text-right">{value}</td>
                  <td className="text-right">${usd}</td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  error: state.nodes.error,
  message: state.nodes.message,
  pending: state.nodes.pending,
  user: state.user.data
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchBalance
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Balance)
