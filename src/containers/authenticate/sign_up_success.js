import React, { Component } from 'react'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'
import './index.css'
import { Container, Col } from 'reactstrap'
import "./index.css"
import { reset } from '../../reducers/user'

class SignUpSucces extends Component {
  componentWillMount() {
    const { user, message } = this.props
    if ( !user ) {
      this.props.history.push('/404')
    } else if ( message !== 'Registration completed successfully.' ) {
      this.props.history.push('/')
    }
  }

  componentWillUnmount() {
    this.props.reset()
  }

  render() {
    return (
      <Container fluid>
        <div className="contentContainer d-flex justify-content-center">
          <Col xl={9} className="signUpSuccessContentContainer">
            <h1>Welcome to Nodebucks!</h1>
            <p>You have successfully registered on Nodebucks.com, the #1 full service providers of masternodes. We sent you a verification email so please be sure to check your inbox. Here are a few things you can do to get started:</p>
            <Col xl={12} lg={12} md={12} sm={12} xs={12} className="d-flex flex-column px-0 mb-4 justify-content-start">
              <NavLink to="/what-are-masternodes" className="signUpSuccessLinks">Learn about masternodes</NavLink>
              <NavLink to="/faq" className="signUpSuccessLinks">Read our FAQ</NavLink>
              <NavLink to="/masternodes" className="signUpSuccessLinks">Select a masternode</NavLink>
            </Col>
            <p>Please <NavLink to="/contact" className="mb-0 signUpSuccessLinks">contact us</NavLink> with any questions. </p>
          </Col>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
  message: state.user.signUpMessage,
})
const mapDispatchToProps = dispatch => bindActionCreators({
  reset
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpSucces))
