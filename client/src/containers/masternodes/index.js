import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {NavLink} from 'react-router-dom'

import CryptoTable from '../../components/cryptos/table'

import './index.css'

import {
  fetchCryptos
} from '../../reducers/cryptos'

class Masternodes extends Component {

  componentWillMount() {
    window.scrollTo(0, 0)
    const { cryptos } = this.props

    if (cryptos.length === 0) {
      this.props.fetchCryptos()
    }
  }

  render() {
    const { cryptos, user } = this.props
    return (
      <div className="masternodesContainer bg-white">
        <div className="contentContainer">
          <h1 className="masternodesHeader">Select a Masternode</h1>
          <CryptoTable list={cryptos} user={user} />
          <NavLink to='/contact#request' className="masternodeContactLink">Request a different masternode coin</NavLink>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cryptos: state.cryptos.list,
  user: state.user.user
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCryptos
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Masternodes)
