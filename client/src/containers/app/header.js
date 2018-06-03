import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { NavHashLink as NavLink } from 'react-router-hash-link'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Collapse, NavbarToggler } from 'reactstrap'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: true
    };
    this.toggle = this.toggle.bind(this)
    this.toggleNavbar = this.toggleNavbar.bind(this)
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
    const { user } = this.props

    let navigation = []
    if ( !!user ) {
      navigation.push(<NavLink key="logout" onClick={() => this.toggleNavbar(true)} to="/logout" className="nav-link nav-item" activeClassName="active">Logout</NavLink>)
    } else {
      navigation.push(<NavLink key="logout" onClick={() => this.toggleNavbar(true)} to="/signup" className="nav-link nav-item" activeClassName="active">Sign Up</NavLink>)
    }
    return (navigation)
  }
}

const mapStateToProps = state => ({
  user: state.user.data
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header))
