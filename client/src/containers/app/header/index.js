import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { NavHashLink as NavLink } from 'react-router-hash-link'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { 
  Navbar,
  Collapse,
  NavbarToggler,
  Col,
  UncontrolledDropdown,
  DropdownToggle, 
  DropdownMenu,
  DropdownItem,
  Button,
} from 'reactstrap'

import { 
  fetchUsers,
  impersonate,
  stopImpersonating,
} from '../../../reducers/user'

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

  componentWillMount() {
    this.props.fetchUsers();
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
    const { currentUser, impersonator, list } = this.props
    return (
      <Navbar className="headerNavBarContainer navbar navbar-expand-lg navbar-light">
        <div ref="headerContainer" className="contentContainer px-0">
          <NavLink to="/" className="headerLogo">
            <img src="/assets/images/headerLogo.png" alt="logo"/>
          </NavLink>
          <NavbarToggler onClick={this.toggleNavbar} className='headerNavBarToggler navbar-light'/>
          <Collapse isOpen={!this.state.collapsed} navbar className="headerNavBar">
            {!currentUser &&
            <Col xl={7} lg={7} className="navbar-nav headerMenuItemsContainer mr-auto justify-content-end">
              <NavLink to="/" exact={true} onClick={() => this.toggleNavbar(true)} className="headerMenuItem nav-item nav-link">Home</NavLink>
              <NavLink to="/masternodes" exact={true} onClick={() => this.toggleNavbar(true)} className="headerMenuItem nav-item nav-link">Masternodes</NavLink>
              <NavLink to="/contact" exact={true} onClick={() => this.toggleNavbar(true)} className="headerMenuItem nav-item nav-link">Contact</NavLink>
            </Col>
            }
            {!!currentUser &&
            <Col xl={7} lg={7} className="navbar-nav headerMenuItemsContainer mr-auto">
              <NavLink to="/dashboard" exact={true} onClick={() => this.toggleNavbar(true)} className="headerMenuItem nav-item nav-link">Dashboard</NavLink>
              <NavLink to="/masternodes" exact={true} onClick={() => this.toggleNavbar(true)} className="headerMenuItem nav-item nav-link">Masternodes</NavLink>
              <div className="dropdown-divider authMenuDivider"></div>
              <NavLink to="/contact" exact={true} onClick={() => this.toggleNavbar(true)} className="headerMenuItem nav-item nav-link">Contact</NavLink>
            </Col>
            }
            {!!currentUser &&
            <Col xl={{ size: 5, offset: 0 }} lg={{ size: 5, offset: 0 }} md={{ size: 12, offset: 0 }} className="navbar-nav headerMenuItemsContainer mr-auto justify-content-end pr-0">
              <Col xl={{ size: 12, offset: 0 }} lg={{ size: 12, offset: 0 }} md={{ size: 12, offset: 0 }} className="navbar-nav headerMenuItemsContainer headerAuthMenuItemsContainer justify-content-end mr-auto">
                <NavLink isActive={(match, location) => location.pathname === '/masternodes'} to="/masternodes" onClick={() => this.toggleNavbar(true)} className="btn headerAddNodeButton"><img src="/assets/images/plusIcon.png" alt="add" className="mr-2"/> Add Node</NavLink>
                <UncontrolledDropdown nav inNavbar className="headerAuthMenuLoggedInDropDownItemsContainer">
                  <DropdownToggle nav caret className="headerLoggedInUserContainer pr-0">
                    <img src={!!currentUser.avatar ? currentUser.avatar : '/assets/images/user.jpg'} className="headerUserAvatar" alt="avatar"/>
                    <p className="headerUserName">{currentUser.first}</p>
                  </DropdownToggle>
                  <DropdownMenu right className="p-0">
                    <DropdownItem className="headerUserDropDownItem">
                      <NavLink to="/orders" exact={true} onClick={() => this.toggleNavbar(true)}>Orders</NavLink>
                    </DropdownItem>
                    <DropdownItem className="headerUserDropDownItem">
                      <NavLink to="/withdrawals" exact={true} onClick={() => this.toggleNavbar(true)}>Withdrawals</NavLink>
                    </DropdownItem>
                    <DropdownItem className="headerUserDropDownItem">
                      <NavLink to="/settings" exact={true} onClick={() => this.toggleNavbar(true)}>Settings</NavLink>
                    </DropdownItem>
                    <DropdownItem className="headerUserDropDownItem">
                      <NavLink to="/logout" exact={true} onClick={() => this.toggleNavbar(true)}>Logout</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <div className="dropdown-divider authMenuDivider"></div>
                <NavLink to="/orders" className="headerMenuItem headerMenuAuthItem headerAuthMenuLoggedInMobileItem nav-item nav-link" exact={true} onClick={() => this.toggleNavbar(true)}>Orders</NavLink>
                <NavLink to="/withdrawals" className="headerMenuItem headerMenuAuthItem headerAuthMenuLoggedInMobileItem nav-item nav-link" exact={true} onClick={() => this.toggleNavbar(true)}>Withdrawals</NavLink>
                <NavLink to="/settings" className="headerMenuItem headerMenuAuthItem headerAuthMenuLoggedInMobileItem nav-item nav-link" exact={true} onClick={() => this.toggleNavbar(true)}>Settings</NavLink>
                <div className="dropdown-divider authMenuDivider"></div>
                <NavLink to="/logout" className="headerMenuItem headerMenuAuthItem headerAuthMenuLoggedInMobileItem nav-item nav-link" exact={true} onClick={() => this.toggleNavbar(true)}>Logout</NavLink>
                { impersonator ?
                  <Button onClick={() => this.props.stopImpersonating()}>Stop Impersonate</Button> : 
                  <UncontrolledDropdown>
                    <DropdownToggle caret>
                      Login as ...
                    </DropdownToggle>
                    <DropdownMenu>
                      { list.map(user => {
                          if(user.slug === currentUser.slug) return null
                          return <DropdownItem key={user.slug} onClick={() => this.props.impersonate(user.slug)}>{user.email}</DropdownItem>
                        })
                      }
                    </DropdownMenu>
                  </UncontrolledDropdown>
                }
              </Col>
            </Col>
            }
            {!currentUser &&
            <Col xl={{ size: 12, offset: 0 }} lg={{ size: 12, offset: 0 }} md={{ size: 12, offset: 0 }} className="navbar-nav headerAuthMenuItemsContainer mr-auto justify-content-end">
              <div className="dropdown-divider authMenuDivider"></div>
              {this.displayLoginLink()}
            </Col>
            }
          </Collapse>
        </div>
      </Navbar>
    )
  }

  displayLoginLink() {
    let navigation = []
    navigation.push(<NavLink key="login" onClick={() => this.toggleNavbar(true)} to="/login" className="headerMenuItem headerMenuAuthItem nav-link nav-item" activeClassName="active">Login</NavLink>)
    navigation.push(<NavLink key="register" onClick={() => this.toggleNavbar(true)} to="/sign-up" className="headerMenuItem headerMenuAuthItem nav-link nav-item" activeClassName="active">Register</NavLink>)
    return (navigation)
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.data,
  list: state.user.list,
  impersonator: state.user.impersonator,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUsers,
  impersonate,
  stopImpersonating,
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header))
