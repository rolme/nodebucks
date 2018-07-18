import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Container, Col, Row } from 'reactstrap'
import Summary from './summary'
import Balance from './balance'
import MainTable from './mainTable'
import Chart from './chart'
import './index.css'

import { fetchNodes } from '../../reducers/nodes'


class Dashboard extends Component {
  componentWillMount() {
    this.props.fetchNodes()
  }

  changeNumberFormat(number) {
    return number.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  }

  render() {
    const { nodes } = this.props
    let totalRewards = 0, nodeValue = 0, costBases = 0, yearlyRoiValues = 0

/*    if ( nodes.length <= 0 ) {
      return (<span>Pending...</span>)
    }*/

    // Do not display sold nodes
    const filteredNodes = nodes.filter(node => {
      return node.status !== 'sold'
    })

    filteredNodes.forEach(node => {
      totalRewards += (+node.rewardTotal)
      nodeValue += (+node.value)
      costBases += (+node.cost)
      yearlyRoiValues += (+node.crypto.yearlyRoiValue)
    })

    return (
      <Container fluid className="dashboardPageContainer">
        <div className="contentContainer">
          <h1 className="dashboardPageTitle">Dashboard</h1>
          <Row className="dashboardPageTotalsRow">
            <Col xl={4} lg={6} md={5} sm={5} xs={12}>
              <h5>Rewards Balance</h5>
              <p>${this.changeNumberFormat(totalRewards)}</p>
            </Col>
            <Col xl={4} lg={6} md={5} sm={5} xs={12}>
              <h5>Total Node Value</h5>
              <p>${this.changeNumberFormat(nodeValue)}</p>
            </Col>
            <Col xl={4} lg={6} md={5} sm={5} xs={12}>
              <h5>Cost Basis</h5>
              <p>${this.changeNumberFormat(costBases)}</p>
            </Col>
            <Col xl={4} lg={6} md={5} sm={5} xs={12}>
              <h5>Projected Annual</h5>
              <p>{!!costBases ? this.changeNumberFormat(yearlyRoiValues / costBases) * 100 : 0}%</p>
            </Col>
          </Row>
          <Row>
            <Col xl={8}>
              <Chart nodes={filteredNodes}/>
              <MainTable list={filteredNodes}/>
            </Col>
            <Col xl={4}>
              <Balance nodes={filteredNodes}/>
              <Summary list={filteredNodes}/>
            </Col>
          </Row>
        </div>
      </Container>
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
