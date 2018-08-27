import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'

import { Container, Col, Row, Alert } from 'reactstrap'
import Summary from './summary'
import Balance from './balance'
import MainTable from './mainTable'
import Chart from './chart'
import './index.css'

import { fetchNodes } from '../../reducers/nodes'

import { valueFormat } from "../../lib/helpers";

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMessage: false
    }
  }

  componentWillMount() {
    window.scrollTo(0, 0)
    this.props.fetchNodes()
  }

  componentDidMount() {
    const { purchaseStatus } = this.props
    if (purchaseStatus && purchaseStatus.message === 'Purchase successful') {
      this.setState({ showMessage: true })
    }
  }

  dissmissMessage = () => {
    this.setState({ showMessage: false })
  }

  render() {
    const { nodes } = this.props
    const { showMessage } = this.state
    let totalRewards = 0, nodeValue = 0, costBases = 0, yearlyRoiValues = 0

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
        <div className="contentContainer px-0">
          <Alert className="messageBox statusSuccess" isOpen={showMessage} toggle={this.dissmissMessage}>
            <h5 className="messageTitle">Congratulations on your new Masternode!</h5>
            <p className="messageText">
              Please give us 24-48 hours to get your node up and running. 
              Your first reward is usually given after 2-3 days of node uptime.
            </p>
          </Alert>
          <h1 className="dashboardPageTitle pageTitle">Dashboard</h1>
          <Row className="dashboardPageTotalsRow">
            <Col xl={4} lg={6} md={5} sm={5} xs={12} className="ml-xl-0">
              <h5>Rewards Balance</h5>
              <p>$ {valueFormat(+totalRewards, 2)}</p>
            </Col>
            <Col xl={4} lg={6} md={5} sm={5} xs={12}>
              <h5>Total Node Value</h5>
              <p>$ {valueFormat(+nodeValue, 2)}</p>
            </Col>
            <Col xl={4} lg={6} md={5} sm={5} xs={12}>
              <h5>Cost Basis</h5>
              <p>$ {valueFormat(+costBases, 2)}</p>
            </Col>
            <Col xl={4} lg={6} md={5} sm={5} xs={12} className="mr-xl-0">
              <h5>Projected Annual</h5>
              <p>{!!costBases ? valueFormat(yearlyRoiValues / costBases) * 100 : 0}%</p>
            </Col>
          </Row>
          <Row>
            <Col xl={9}>
              <MainTable list={filteredNodes}/>
              <Chart nodes={filteredNodes}/>
            </Col>
            <Col xl={3} className="dashboardContentRightPartContainer align-items-xl-end align-items-center">
              {!!filteredNodes.length &&
                <div className="dashboardButtonsContainer">
                  <NavLink to={`/masternodes`} className="btn dashboardMainTableAddNodeButton mb-3"><img src="/assets/images/plusIcon.png" alt="add" className="mr-2"/> Add node</NavLink>
                  <NavLink to={`/nodes/withdraw`} className="btn dashboardBalanceWithdrawButton"><img src="/assets/images/downArrow.png" alt="withdraw" className="mr-2"/>Withdraw</NavLink>
                </div>
              }
              <Summary list={filteredNodes}/>
              <Balance/>
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
  purchaseStatus: state.nodes.data,
  user: state.user.data
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchNodes
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard))
