import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Col, ListGroup, ListGroupItem } from 'reactstrap'
import './index.css'

import Profile from './profile'
import Security from './security'
import Verification from './verification'

import {
  fetchBalance 
} from '../../reducers/user';

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      path: 'profile'
    }
    this.changeTab = this.changeTab.bind(this)
  }

  componentWillMount() {
    window.scrollTo(0, 0)
    if(!this.props.user){
      this.props.history.push('/login')
      return
    }
    this.handlePath(this.props.location)
    this.props.fetchBalance()
  }

  componentWillReceiveProps(nextProps) {
    this.handlePath(nextProps.location)
  }

  handlePath(location) {
    const path = !!location.pathname.replace('/settings', '') ? location.pathname.replace('/settings', '') : '/profile'
    if ( path !== '/profile' && path !== '/security' && path !== '/verification' ) {
      this.props.history.push('/404')
      return
    }
    this.setState({ path: path.substr(1) })
  }

  changeTab(name) {
    this.props.history.push('/settings/' + name)
  }

  render() {
    const { path } = this.state
    return (
      <Container fluid className="settingsPageContainer">
        <div className="contentContainer settingsPageContentContainer">
          <Col xl={{size: 3, offset: 0}} lg={{size: 3, offset: 0}} md={{size: 6, offset: 3}} sm={{size: 8, offset: 2}} xs={{size: 10, offset: 1}} className="px-0">
            <ListGroup className="settingsSideBarItemsContainer">
              <ListGroupItem onClick={() => this.changeTab('profile')} className={path === 'profile' ? 'selected' : ''}><p>Profile</p></ListGroupItem>
              <ListGroupItem onClick={() => this.changeTab('security')} className={path === 'security' ? 'selected' : ''}><p>Password</p></ListGroupItem>
              <ListGroupItem onClick={() => this.changeTab('verification')} className={path === 'verification' ? 'selected' : ''}><p>Verification</p></ListGroupItem>
            </ListGroup>
          </Col>
          <Col xl={{size: 8, offset: 0}} lg={{size: 9, offset: 0}} md={{size: 10, offset: 1}} sm={{size: 12, offset: 0}} xs={{size: 12, offset: 0}}>
            { path === 'profile' &&
              <Profile/>
            }
            { path === 'security' &&
              <Security/>
            }
            { path === 'verification' &&
              <Verification />
            }
          </Col>
        </div>
      </Container>
    )
  }

}


const mapStateToProps = state => ({
  user: state.user.data,
})

const mapDispatchToProps = dispatch => bindActionCreators({ 
  fetchBalance 
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings))

