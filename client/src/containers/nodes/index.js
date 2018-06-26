import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Container, Col } from 'reactstrap'
import Summary from './summary'
import History from './history'
import './index.css'


class Nodes extends Component {

  componentWillMount() {
    const { user } = this.props

    if (!user) {

    }
  }

  render() {
    return (
      <Container fluid className="bg-white nodePageContainer">
        <div className="contentContainer">
          <h1>Node</h1>
          <Col xl={12} className="d-flex">
            <Col xl={7}>
              <History/>
            </Col>
            <Col xl={4}>
              <Summary/>
            </Col>
          </Col>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})


export default connect(
  mapStateToProps,
)(Nodes)
