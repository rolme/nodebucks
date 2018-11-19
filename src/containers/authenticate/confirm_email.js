import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'
import { RingLoader } from 'react-spinners'
import './index.css'

import { Container, Col } from "reactstrap"

import { confirm } from '../../reducers/user'

class ConfirmEmail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: this.props.error,
      pending: this.props.pending,
      user: this.props.user,
    }
  }

  componentWillMount() {
    const { slug } = this.props.match.params
    this.props.confirm(slug)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      error: nextProps.error,
      pending: nextProps.pending,
      user: nextProps.user
    })
  }

  render() {
    const { pending, error, user } = this.state

    if ( pending ) {
      return (
        <Container fluid>
          <div className="contentContainer d-flex justify-content-center">
            <div className="spinnerContainer">
              <RingLoader
                size={150}
                color={'#3F89E8'}
                loading={true}
              />
            </div>
          </div>
        </Container>
      )
    }

    if ( error ) {
      this.props.history.push('/404')
      return null
    }
    if ( !!user ) {
      return (
        <Container fluid>
          <div className="contentContainer d-flex justify-content-center">
            <Col xl={9} className="confirmEmailContentContainer">
              <h1>Email verified</h1>
              <p>Thank you for verifying your email. To adjust your email settings, go to:</p>
              <NavLink to="/settings">https://nodebucks.com/settings</NavLink>
            </Col>
          </div>
        </Container>
      )
    }

    return null
  }
}

const mapStateToProps = state => ({
  pending: state.user.pending,
  error: state.user.error,
  user: state.user.data
})

const mapDispatchToProps = dispatch => bindActionCreators({ confirm }, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmEmail))
