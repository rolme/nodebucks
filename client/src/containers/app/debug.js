import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  fetchCrypto
} from '../../reducers/cryptos'

class Debug extends Component {
  componentWillMount() {
    let { match: { params }, crypto, pending } = this.props
    if ( !!params && !!params.slug && !pending && params.slug !== crypto.slug ) {
      this.props.fetchCrypto(params.slug)
    }
  }

  render() {
    const { crypto } = this.props
    return (
      <div className="row">
        <div className="col-md-6">
        { this.renderTable(crypto) }
        </div>
        <div className="col-md-6">
          { this.renderOrders(crypto.orders) }
        </div>
      </div>
    )
  }

  renderTable(crypto) {
    let nodes = (+crypto.nodes).toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    let purchasablePrice = (+crypto.purchasablePrice).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    let nodePrice = (+crypto.nodePrice).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    let annualRoi = ((+crypto.annualRoi) * 100.0).toFixed(1)

    return(
      <table className="table">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{crypto.name} ({crypto.symbol})</td>
          </tr>
          <tr>
            <th>Stake</th>
            <td>{crypto.stake}</td>
          </tr>
          <tr>
            <th>Annual ROI (Masternode.Pro)</th>
            <td>{annualRoi}</td>
          </tr>
          <tr>
            <th>Node Price (Masternode.Pro)</th>
            <td>{nodePrice}</td>
          </tr>
          <tr>
            <th>Purchasable Price (Order Base)</th>
            <td>{purchasablePrice}</td>
          </tr>
        </tbody>
      </table>
    )
  }

  renderOrders(orders) {
    return(
      <table className="table">
        <thead>
          <tr>
            <th>Price</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          { !!orders && orders.map(order => {
            return(
              <tr key={order.id}>
                <td>{order.price} BTC</td>
                <td>{order.volume}</td>
                <td>{order.exchange}</td>
              </tr>
            )
          }) }
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = state => ({
  crypto: state.cryptos.data
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCrypto
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Debug)
