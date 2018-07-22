import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { NavHashLink as NavLink } from 'react-router-hash-link'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Navbar, Collapse, NavbarToggler, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap'

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
    const { user } = this.props
    return (
      <Navbar className="headerNavBarContainer navbar navbar-expand-lg navbar-light">
        <div ref="headerContainer" className="contentContainer px-0">
          <NavLink to="/" className="headerLogo">
            <img src="/assets/images/headerLogo.png" alt="logo"/>
          </NavLink>
          <NavbarToggler onClick={this.toggleNavbar} className='headerNavBarToggler navbar-light'>
            {!!user &&
            <img src={!!user.avatar ? user.avatar : '/assets/images/user.jpg'} className="headerUserAvatar" alt="avatar"/>
            }
          </NavbarToggler>
          <Collapse isOpen={!this.state.collapsed} navbar className="headerNavBar">
            {!!user &&
            <Col xl={7} lg={7} className="navbar-nav headerMenuItemsContainer mr-auto">
              <NavLink to="/dashboard" exact={true} onClick={() => this.toggleNavbar(true)} className="headerMenuItem nav-item nav-link">Dashboard</NavLink>
              <NavLink to="/masternodes" exact={true} onClick={() => this.toggleNavbar(true)} className="headerMenuItem nav-item nav-link">Masternodes</NavLink>
              <a href="https://nodebucks.freshdesk.com" onClick={() => this.toggleNavbar(true)} target="_new" className="headerMenuItem nav-item nav-link">Support</a>
            </Col>
            }
            <Col xl={{ size: 5, offset: 0 }} lg={{ size: 5, offset: 0 }} md={{ size: 12, offset: 0 }} className="navbar-nav headerMenuItemsContainer mr-auto justify-content-end pr-0">
              {!!user &&
              <Col xl={{ size: 12, offset: 0 }} lg={{ size: 12, offset: 0 }} md={{ size: 12, offset: 0 }} className="navbar-nav headerMenuItemsContainer headerAuthMenuItemsContainer justify-content-end mr-auto">
                <NavLink to="/masternodes" onClick={() => this.toggleNavbar(true)} className="btn headerAddNodeButton">+ Add Node</NavLink>
                <UncontrolledDropdown nav inNavbar className="headerAuthMenuLoggedInDropDownItemsContainer">
                  <DropdownToggle nav caret className="headerLoggedInUserContainer ">
                    <img src={!!user.avatar ? user.avatar : '/assets/images/user.jpg'} className="headerUserAvatar" alt="avatar"/>
                    <p className="headerUserName">{user.fullName}</p>
                  </DropdownToggle>
                  <DropdownMenu right className="p-0">
                    <DropdownItem className="headerUserDropDownItem">
                      <NavLink to="/settings" exact={true} onClick={() => this.toggleNavbar(true)}>Settings</NavLink>
                    </DropdownItem>
                    <DropdownItem className="headerUserDropDownItem">
                      <NavLink to="/logout" exact={true} onClick={() => this.toggleNavbar(true)}>Logout</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavLink to="/settings" className="headerMenuItem headerMenuAuthItem headerAuthMenuLoggedInMobileItem nav-item nav-link" exact={true} onClick={() => this.toggleNavbar(true)}>Settings</NavLink>
                <NavLink to="/logout" className="headerMenuItem headerMenuAuthItem headerAuthMenuLoggedInMobileItem nav-item nav-link" exact={true} onClick={() => this.toggleNavbar(true)}>Logout</NavLink>
              </Col>
              }
            </Col>
            {!user &&
            <Col xl={{ size: 12, offset: 0 }} lg={{ size: 12, offset: 0 }} md={{ size: 12, offset: 0 }} className="navbar-nav headerAuthMenuItemsContainer mr-auto justify-content-end">
              {this.displayLoginLink()}
            </Col>
            }
          </Collapse>
        </div>
      </Navbar>
    )
  }

  displayLoginLink() {
    const isSignUpPage = window.location.pathname === "/sign-up"
    let navigation = []
    {
      navigation.push(<NavLink key="login" onClick={() => this.toggleNavbar(true)} to="/login" className="headerMenuItem headerMenuAuthItem nav-link nav-item" activeClassName="active">Login</NavLink>)
      isSignUpPage ? navigation.unshift(<p className="headerMenuAuthText">Already have an Account?</p>) : navigation.push(<NavLink key="register" onClick={() => this.toggleNavbar(true)} to="/sign-up" className="headerMenuItem headerMenuAuthItem nav-link nav-item" activeClassName="active">Register</NavLink>)
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
