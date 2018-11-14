import React, { Component } from 'react'

import './index.css'
import { Container } from 'reactstrap'

export default class ErrorPage404 extends Component {

  render() {
    return (
      <Container className="d-flex flex-column justify-content-center align-items-center position-relative">
       <p className="errorNumber">404</p>
       <p className="errorMessage">Oops! Can't find what you're looking for?</p>
      </Container>
    )
  }
}
