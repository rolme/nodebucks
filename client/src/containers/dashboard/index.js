import React, { Component } from 'react'

import { Container } from 'reactstrap'
import Summary from './summary'
import './index.css'


export default class Dashboard extends Component {

  render() {
    return (
      <Container fluid className="bg-white dashboardContainer">
        <div className="contentContainer">
          <h1>Dashboard</h1>
          <Summary/>
        </div>
      </Container>
    )
  }
}
