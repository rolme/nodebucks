import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { Container, Col } from 'reactstrap'
import './index.css'

class Footer extends Component {
  render() {
    return (
      <div className="footerContainer fixed-bottom mx-auto">
        <Container fluid className="px-0 flex-wrap">
          <Col xl={{ size: 3, offset: 0 }} lg={{ size: 4, offset: 0 }} md={{ size: 4, offset: 0 }} sm={{ size: 12, offset: 0 }} xs={{ size: 12, offset: 0 }} className="d-flex px-0 align-items-center">
            <NavLink to='/' className="footerText"><img src="/assets/images/shortLogo.png" alt="logo"/></NavLink>
            <p className="footerText pl-2"> All Rights Reserved © 2018</p>
          </Col>
          <Col xl={{ size: 3, offset: 1 }} lg={{ size: 3, offset: 1 }} md={{ size: 4, offset: 0 }} sm={{ size: 12, offset: 0 }} xs={{ size: 12, offset: 0 }} className="d-flex px-0 ">
            <NavLink to='/legal' className="footerText pr-4">Terms of Use</NavLink>
            <NavLink to='https://nodebucks.freshdesk.com' className="footerText pr-4">Support</NavLink>
            <NavLink to='/privacy' className="footerText pr-4">Privacy Policy</NavLink>
            <NavLink to='/disclaimer' className="footerText">Disclaimer</NavLink>
          </Col>
        </Container>
      </div>
    )
  }
}

export default withRouter(Footer)
