import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CryptoTable from '../../components/cryptos/table'

import {
  fetchCryptos
} from '../../reducers/cryptos'

class Home extends Component {
  componentWillMount() {
    const { cryptos } = this.props

    if (cryptos.length === 0) {
      this.props.fetchCryptos()
    }
  }

  render() {
    const { cryptos, user } = this.props
    return (
      <CryptoTable list={cryptos} user={user} />
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
)(Home)
