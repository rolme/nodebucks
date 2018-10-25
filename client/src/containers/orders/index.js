import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import { capitalize, valueFormat } from '../../lib/helpers'
import {NavLink} from 'react-router-dom'

import './index.css'
import { Table } from 'reactstrap'

import {
  fetchOrders
} from '../../reducers/orders'

class Orders extends Component {

  componentWillMount() {
    this.props.fetchOrders()
  }

  render() {
    const { list } = this.props
    return (
      <div className="ordersPageContainer">
        <div className="contentContainer px-0">
          <h1 className="ordersPageHeader">Orders</h1>
          <div className="bg-white p-3 ordersPageTableContainer">
            <Table responsive borderless>
              <thead>
              <tr>
                <th>Date</th>
                <th>Order ID</th>
                <th>Node ID</th>
                <th>Coin</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
              </thead>
              <tbody>
              {this.handleOrdersData(list)}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    )
  }

  handleOrdersData(orders) {
    if ( !!orders.length ) {
      return orders.map(order => {
        const amount = !!order.amount ? '$ ' + valueFormat(+order.amount, 2) : ''
        return (
          <tr key={order.orderId}>
            <td>{moment(order.createdAt).format("MMM D, YYYY  HH:mm")}</td>
            <td>{order.orderId}</td>
            <td>{order.node ? <NavLink to={`/nodes/${order.node.slug}`}>{order.node.id}</NavLink> : <div className="text-danger">N/A</div>}</td>
            <td>{order.node ? order.node.crypto.name : <div className="text-danger">N/A</div>}</td>
            <td>{order.orderType}</td>
            <td>{amount}</td>
            <td className={order.status === 'canceled' ? "text-danger" : ''}>{capitalize(order.status)}</td>
          </tr>
        )
      })
    } else {
      return <tr>
        <td colSpan="3">There is no data to show</td>
      </tr>
    }
  }
}

const mapStateToProps = state => ({
  list: state.orders.list,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchOrders
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders)
