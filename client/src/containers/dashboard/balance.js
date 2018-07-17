import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Balance extends Component {
  render() {

    let balances = {}, { nodes } = this.props
    nodes.forEach(n => {
      if ( !balances[ n.crypto.name ] ) {
        balances[ n.crypto.name ] = {}
      }
      balances[ n.crypto.name ][ "name" ] = n.crypto.name

      if ( !balances[ n.crypto.name ][ "coin" ] ) {
        balances[ n.crypto.name ][ "coin" ] = 0.0
      }
      if ( !balances[ n.crypto.name ][ "usd" ] ) {
        balances[ n.crypto.name ][ "usd" ] = 0.0
      }
      balances[ n.crypto.name ][ "coin" ] += +n.balance.coin
      balances[ n.crypto.name ][ "usd" ] += +n.balance.usd
    })

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
            {!!balances && Object.keys(balances).sort().map(key => {
              const coin = balances[ key ].coin.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
              const usd = balances[ key ].usd.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
              return (
                <tr key={balances[ key ].name}>
                  <td className="text-left">{balances[ key ].name}</td>
                  <td className="text-right">{coin}</td>
                  <td className="text-right">${usd}</td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end">
          <NavLink to={`/nodes/withdraw`} className="btn dashboardBalanceWithdrawButton"><img src="/assets/images/downArrow.png" alt="withdraw" className="mr-2"/>WITHDRAW</NavLink>
        </div>
      </div>
    )
  }
}
