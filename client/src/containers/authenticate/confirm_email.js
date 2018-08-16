import { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './index.css'

import { confirm } from '../../reducers/user'

class ConfirmEmail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: (!!this.props.error) ? true : false,
      pending: (!!this.props.pending) ? true : false,
      user: this.props.user
    }
  }

  componentWillMount() {
    const { slug } = this.props.match.params
    this.setState({ slug })
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
    
    if (!pending && !error && !!user) {
      this.props.history.push('/')
      return ''
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
