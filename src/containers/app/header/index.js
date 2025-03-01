import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { NavHashLink as NavLink } from 'react-router-hash-link'
import Autosuggest from 'react-autosuggest';
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
} from 'reactstrap'

import {
  fetchUsers,
  impersonate,
  fetchBalance,
} from '../../../reducers/user'

import { fetchNodes } from '../../../reducers/nodes'
import { fetchOrders } from '../../../reducers/orders'
import { fetchWithdrawals } from '../../../reducers/withdrawals'
import { reserveWithdrawal } from '../../../reducers/withdrawals'

import './index.css'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: true,
      value: '',
      suggestions: [],
    };
    this.toggle = this.toggle.bind(this)
    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  componentWillMount() {
    const { user } = this.props
    if (!!user && user.admin) {
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

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.props.list.filter(user =>
      user.email.toLowerCase().slice(0, inputLength) === inputValue && user.slug !== this.props.user.slug
    );
  };

  getSuggestionValue = suggestion => suggestion.name;

  renderSuggestion = suggestion => (
    <div key={suggestion.slug} onClick={() => this.handleImpersonate(suggestion.slug)}>{suggestion.email}</div>
  );

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleImpersonate = (slug) => {
    this.props.impersonate(slug, () => {
      this.handleImpersonateStateChange();
    })
  }

  handleImpersonateStateChange = () => {
    switch(this.props.location.pathname) {
      case '/dashboard':
        this.props.fetchBalance();
        this.props.fetchNodes();
        break;
      case '/orders':
        this.props.fetchOrders();
        break;
      case '/withdrawals':
        this.props.fetchWithdrawals();
        break;
      case '/nodes/withdraw':
        this.props.reserveWithdrawal();
        break;
      default: return
    }
  }

  render() {
    const { user } = this.props
    const inputProps = {
      placeholder: 'Type user email here',
      value: this.state.value || '',
      onChange: this.onChange
    }
    const avatarUrl = (!!user && !!user.avatar && !!user.avatar.url) ? user.avatar.url : '/assets/images/user.jpg'
    return (
      <Navbar className="headerNavBarContainer navbar navbar-expand-lg navbar-light">
        <div ref="headerContainer" className="contentContainer px-0">
          <NavLink to="/" className="headerLogo">
            <img src="/assets/images/nodebucks_beta.svg" width="140" alt="logo"/>
          </NavLink>
          <NavbarToggler onClick={this.toggleNavbar} className='headerNavBarToggler navbar-light'>
            { !!user && <img src={avatarUrl} className="headerUserAvatar" alt="avatar"/> }
          </NavbarToggler>
          <Collapse isOpen={!this.state.collapsed} navbar className="headerNavBar">
            {!user &&
            <Col xl={7} lg={8} className="navbar-nav headerMenuItemsContainer mr-auto justify-content-end">
              <NavLink to="/" exact={true} onClick={() => this.toggleNavbar(true)} className="headerMenuItem nav-item nav-link"><i className="headerMenuIcon">&#xe903;</i> Home</NavLink>
              <NavLink to="/masternodes" exact={true} onClick={() => this.toggleNavbar(true)} className="headerMenuItem nav-item nav-link"><i className="headerMenuIcon">&#xe906;</i> Masternodes</NavLink>
              <NavLink to="/what-are-masternodes" exact={true} onClick={() => this.toggleNavbar(true)} className="headerMenuItem nav-item nav-link"><i className="headerMenuIcon">&#xe904;</i> Learn</NavLink>
              <NavLink to="/affiliate" exact={true} onClick={() => this.toggleNavbar(true)} className="headerMenuItem nav-item nav-link"><i className="headerMenuIcon">&#xe900;</i> Affiliate</NavLink>
              <NavLink to="/contact" exact={true} onClick={() => this.toggleNavbar(true)} className="headerMenuItem nav-item nav-link"><i className="headerMenuIcon">&#xe901;</i> Contact</NavLink>
            </Col>
            }
            {!!user &&
            <Col xl={7} lg={7} className="navbar-nav headerMenuItemsContainer loggedOut mr-auto">
              <NavLink to="/dashboard" exact={true} onClick={() => this.toggleNavbar(true)} className="headerMenuItem nav-item nav-link"> <i className="headerMenuIcon">&#xe902;</i> Dashboard</NavLink>
              <NavLink to="/masternodes" exact={true} onClick={() => this.toggleNavbar(true)} className="headerMenuItem nav-item nav-link"><i className="headerMenuIcon">&#xe906;</i> Masternodes</NavLink>
              <NavLink to="/affiliate" exact={true} onClick={() => this.toggleNavbar(true)} className="headerMenuItem nav-item nav-link"><i className="headerMenuIcon">&#xe900;</i> Affiliate</NavLink>
              <div className="dropdown-divider authMenuDivider"></div>
              <NavLink to="/contact" exact={true} onClick={() => this.toggleNavbar(true)} className="headerMenuItem nav-item nav-link"><i className="headerMenuIcon">&#xe901;</i> Contact</NavLink>
            </Col>
            }
            {!!user &&
            <Col xl={{ size: 5, offset: 0 }} lg={{ size: 5, offset: 0 }} md={{ size: 12, offset: 0 }} className="navbar-nav headerMenuItemsContainer mr-auto justify-content-end pr-0">
              <Col xl={{ size: 12, offset: 0 }} lg={{ size: 12, offset: 0 }} md={{ size: 12, offset: 0 }} className="navbar-nav headerMenuItemsContainer headerAuthMenuItemsContainer justify-content-end mr-auto">
                <NavLink isActive={(match, location) => location.pathname === '/masternodes'} to="/masternodes" onClick={() => this.toggleNavbar(true)} className="btn headerAddNodeButton"><img src="/assets/images/plusIcon.png" alt="add" className="mr-2"/> Add Node</NavLink>
                <UncontrolledDropdown nav inNavbar className="headerAuthMenuLoggedInDropDownItemsContainer">
                  <DropdownToggle nav caret className="headerLoggedInUserContainer pr-0">
                    <img src={avatarUrl} className="headerUserAvatar" alt="avatar"/>
                    <p className="headerUserName">{user.first}</p>
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
                {
                  user.admin &&
                    <UncontrolledDropdown>
                      <DropdownToggle caret>
                        Login as ...
                      </DropdownToggle>
                      <DropdownMenu>
                        <Autosuggest
                          suggestions={this.state.suggestions}
                          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                          getSuggestionValue={this.getSuggestionValue}
                          renderSuggestion={this.renderSuggestion}
                          inputProps={inputProps}
                        />
                      </DropdownMenu>
                    </UncontrolledDropdown>
                }
              </Col>
            </Col>
            }
            {!user &&
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
    navigation.push(<NavLink key="login" onClick={() => this.toggleNavbar(true)} to="/login" className="headerMenuItem headerMenuAuthItem nav-link nav-item" activeClassName="active"><i className="headerMenuIcon">&#xe905;</i> Login</NavLink>)
    navigation.push(<NavLink key="register" onClick={() => this.toggleNavbar(true)} to="/sign-up" className="headerMenuItem headerMenuAuthItem nav-link nav-item" activeClassName="active"><i className="headerMenuIcon">&#xe907;</i> Register</NavLink>)
    return (navigation)
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
  list: state.user.list,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUsers,
  impersonate,
  fetchBalance,
  fetchNodes,
  fetchOrders,
  fetchWithdrawals,
  reserveWithdrawal,
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header))
