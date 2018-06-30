import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Container, Col, Row} from 'reactstrap'
import Summary from './summary'
import MainTable from './mainTable'
import './index.css'

import { fetchNodes } from '../../reducers/nodes'


class Dashboard extends Component {
  componentWillMount() {
    this.props.fetchNodes()
  }

  render() {
    const { nodes } = this.props

    if (nodes.length <= 0) { return(<span>Pending...</span>) }

    return (
      <Container fluid className="bg-white">
        <div className="contentContainer">
          <h1>Dashboard</h1>
          <Row>
            <Col xl={8}>
              <MainTable list={nodes}/>
            </Col>
            <Col xl={4}>
              {this.displayBalances(nodes)}
              <Summary list={nodes}/>
            </Col>
          </Row>
        </div>
      </Container>
    )
  }

  // TODO: This should be moved into its own file
  displayBalances(nodes) {
    let balances = {}
    nodes.forEach(n => {
      if (!balances[n.crypto.name]) { balances[n.crypto.name] = {} }
      balances[n.crypto.name]["name"] = n.crypto.name

      if (!balances[n.crypto.name]["coin"]) { balances[n.crypto.name]["coin"] = 0.0 }
      if (!balances[n.crypto.name]["usd"]) { balances[n.crypto.name]["usd"] = 0.0 }
      balances[n.crypto.name]["coin"] += +n.balance.coin
      balances[n.crypto.name]["usd"] += +n.balance.usd
    })

    return(
      <div className="card mb-2">
        <div className="card-header">
          Balance(s)
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="text-left">Crypto</th>
                <th className="text-right">Coins</th>
                <th className="text-right">USD</th>
              </tr>
            </thead>
            <tbody>
              {!!balances && Object.keys(balances).sort().map(key => {
                const coin = balances[key].coin.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                const usd  = balances[key].usd.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                return(
                  <tr key={balances[key].name}>
                    <td className="text-left">{balances[key].name}</td>
                    <td className="text-right">{coin}</td>
                    <td className="text-right">{usd}</td>
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
  nodes: state.nodes.list,
  error: state.nodes.error,
  message: state.nodes.message,
  pending: state.nodes.pending,
  user: state.user.data
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchNodes
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard))
