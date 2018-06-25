import React, { Component } from 'react'

import './index.css'
import { Container } from 'reactstrap'

export default class ErrorPage401 extends Component {

  render() {
    return (
      <Container className="d-flex flex-column justify-content-center align-items-center position-relative">
       <p className="errorNumber">401</p>
       <p className="errorMessage">Oops! Unauthorized Access</p>
      </Container>
    )
  }
}
