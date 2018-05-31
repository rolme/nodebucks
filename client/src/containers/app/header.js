import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { NavHashLink as NavLink } from 'react-router-hash-link'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Collapse, NavbarToggler } from 'reactstrap'

import { fetchUsers } from '../../reducers/users'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: true
    };
    this.toggle = this.toggle.bind(this)
    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  componentWillMount(nextProps) {
    let { users, user } = this.props

    if (users.length === 0 && user !== null) {
      this.props.fetchUsers()
    }
  }

  toggle(name) {
    let dropdownItems = this.state.dropdownItems
    dropdownItems[ name ] = !dropdownItems[ name ]
    this.setState({ dropdownItems })
  }
  toggleNavbar(value) {
    value = (value && typeof(value) === 'boolean') || !this.state.collapsed
    this.setState({
      collapsed: value
    })
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top pb-70">
        <NavLink to="/" className="navbar-brand">
          <img src="/assets/images/logo.png" alt="logo" width="40px" height="40px"/> Node Bucks
        </NavLink>
        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
        <Collapse isOpen={!this.state.collapsed} navbar>
          <div className="navbar-nav mr-auto">
            {this.displayLoginLink()}
          </div>
        </Collapse>
      </nav>
    )
  }

  displayLoginLink() {
    const { user, users } = this.props

    let navigation = []
    if ( !!user ) {
      navigation.push(<NavLink key="users" onClick={() => this.toggleNavbar(true)} to="/users" exact={true} className="headerMenuItem nav-item nav-link">Users ({users.length})</NavLink>)
      navigation.push(<NavLink key="logout" onClick={() => this.toggleNavbar(true)} to="/logout" className="nav-link nav-item" activeClassName="active">Logout</NavLink>)
      return (navigation)
    }
    return (<div></div>)
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
  users: state.users.list
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUsers
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header))
