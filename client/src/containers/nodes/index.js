import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Container, Col } from 'reactstrap'
import Summary from './summary'
import History from './history'
import RewardSettings from './rewardSettings'
import './index.css'


class Nodes extends Component {

  componentWillMount() {
    const { user } = this.props

    if (!user) {
      this.props.history.push('/401')
    }
  }

  render() {
    return (
      <Container fluid className="bg-white nodePageContainer">
        <div className="contentContainer">
          <h1>Node</h1>
          <Col xl={12} className="d-flex px-0">
            <Col xl={8} className="px-0">
              <History/>
            </Col>
            <Col xl={4} className="px-0">
              <Summary/>
              <RewardSettings/>
            </Col>
          </Col>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.data
})


export default connect(
  mapStateToProps,
)(Nodes)
