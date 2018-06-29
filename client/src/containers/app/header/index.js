import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { NavHashLink as NavLink } from 'react-router-hash-link'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Navbar, Collapse, NavbarToggler, Col } from 'reactstrap'

import './index.css'

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
      <Navbar className="headerNavBarContainer navbar navbar-expand-lg fixed-top navbar-light">
        <div ref="headerContainer" className="contentContainer">
          <NavLink to="/" className="headerLogo">
            <img src="/assets/images/headerLogo.png" alt="logo"/>
          </NavLink>
          <NavbarToggler onClick={this.toggleNavbar} className='headerNavBarToggler'/>
          <Collapse isOpen={!this.state.collapsed} navbar className="headerNavBar">
            <Col xl={{size: 5, offset: 7}}  lg={{size: 5, offset: 7}}  md={{size: 12, offset: 0}} className="navbar-nav headerMenuAuthItemsContainer mr-auto justify-content-end">
              {this.displayLoginLink()}
            </Col>
          </Collapse>
        </div>
      </Navbar>
    )
  }

  displayLoginLink() {
    const { user } = this.props
    const isSignUpPage = window.location.pathname === "/sign-up"
    let navigation = []
    if ( !!user ) {
      navigation.push(<NavLink key="logout" onClick={() => this.toggleNavbar(true)} to="/logout" className="nav-link nav-item" activeClassName="active">Logout</NavLink>)
    } else {
      navigation.push(<NavLink key="login" onClick={() => this.toggleNavbar(true)} to="/login" className="headerMenuAuthItem nav-link nav-item" activeClassName="active">Login</NavLink>)
      isSignUpPage ? navigation.unshift(<p className="headerMenuAuthText">Already have an Account?</p>) : navigation.push(<NavLink key="register" onClick={() => this.toggleNavbar(true)} to="/sign-up" className="headerMenuAuthItem nav-link nav-item" activeClassName="active">Register</NavLink>)
    }
    return (navigation)
  }
}

const mapStateToProps = state => ({
  user: state.user.data
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header))
