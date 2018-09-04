import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import { valueFormat } from '../../lib/helpers'

import './index.css'
import { Table } from 'reactstrap'

import {
  fetchWithdrawals
} from '../../reducers/withdrawals'

class Withdrawals extends Component {

  componentWillMount() {
    this.props.fetchWithdrawals()
  }

  render() {
    const { list } = this.props
    return (
      <div className="withdrawalsPageContainer">
        <div className="contentContainer px-0">
          <h1 className="withdrawalsPageHeader">Withdrawals</h1>
          <div className="bg-white p-3 withdrawalsPageTableContainer">
            <Table responsive borderless>
              <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Destination</th>
              </tr>
              </thead>
              <tbody>
              {this.handleWithdrawalData(list)}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    )
  }

  handleWithdrawalData(withdrawals) {
    return withdrawals.map(withdrawal => {
      const amount = !!withdrawal.amount ? valueFormat(+withdrawal.amount.usd, 2) : ''
       return (
         <tr key={withdrawal.slug}>
          <td>{moment(withdrawal.createdAt).format("MMM D, YYYY  HH:mm")}</td>
          <td>{amount}</td>
          <td>{withdrawal.destination}</td>
        </tr>
       )
    })
  }
}

const mapStateToProps = state => ({
  list: state.withdrawals.list,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchWithdrawals
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Withdrawals)
