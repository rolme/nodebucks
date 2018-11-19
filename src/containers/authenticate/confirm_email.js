import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import ErrorPage404 from '../../components/error_pages/404_error_page'
import './index.css'

import { confirm } from '../../reducers/user'

class ConfirmEmail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: (!!this.props.error) ? true : false,
      pending: (!!this.props.pending) ? true : false,
      user: this.props.user,
    }
  }

  componentWillMount() {
    const { slug } = this.props.match.params
    if(this.props.user) {
      this.setState({ slug })
      this.props.confirm(slug)
    }
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

    if(!this.state.user) {
      return <Redirect to="/login" />
    } else if (!pending && !error && !!user) {
      return <Redirect to="/dashboard" />
    } else if(!pending && error) {
      return <ErrorPage404 />
    } else {
      return <div />
    }
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
