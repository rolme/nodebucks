import React, { Component } from 'react'

import { Container, Col } from 'reactstrap'
import Summary from './summary'
import MainTable from './mainTable'
import './index.css'


export default class Dashboard extends Component {

  render() {
    return (
      <Container fluid className="bg-white dashboardContainer">
        <div className="contentContainer">
          <h1>Dashboard</h1>
          <Col className="d-flex flex-column">
            <Col xl={12} className="mb-5">
              <MainTable/>
            </Col>
            <Col>
              <Summary/>
            </Col>
          </Col>
        </div>
      </Container>
    )
  }
}
