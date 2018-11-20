import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'
import './index.css'

import { Container, Col } from "reactstrap"

import { reset } from '../../reducers/nodes'

class PurchaseSuccess extends Component {

  componentWillUnmount() {
    const { message } = this.props
    message === 'Purchase node successful.' && this.props.reset()
  }

  render() {
    const { message, user } = this.props

    if ( message === 'Purchase node successful.' ) {
      return (
        <Container fluid>
          <div className="contentContainer d-flex justify-content-center">
            <Col xl={9} className="purchaseSuccessContentContainer">
              <h1>Masternode Purchase Complete!</h1>
              <p>Congratulations on your new Masternode. Please allow for up to 48 hours to get your node up and running. You can now track your new masternode on your dashboard.</p>
              <NavLink to="/dashboard">View Dashboard</NavLink>
            </Col>
          </div>
        </Container>
      )
    }

    if ( !user ) {
      this.props.history.push('/404')
      return null
    }

    if ( !!user ) {
      this.props.history.push('/dashboard')
      return null
    }

  }
}

const mapStateToProps = state => ({
  message: state.nodes.message,
  user: state.user.data
})

const mapDispatchToProps = dispatch => bindActionCreators({ reset }, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchaseSuccess))
