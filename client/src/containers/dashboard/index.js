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

    return (
      <Container fluid className="bg-white dashboardContainer">
        <div className="contentContainer">
          <h1>Dashboard</h1>
          <Row>
            <Col xl={8}>
              <MainTable list={nodes}/>
            </Col>
            <Col xl={4}>
              <Summary list={nodes}/>
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
