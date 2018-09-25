import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Col, ListGroup, ListGroupItem } from 'reactstrap'
import './index.css'

import Profile from './profile'
import Security from './security'
import TwoFactorAuthentication from './2fa'

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
  }

  componentWillReceiveProps(nextProps) {
    this.handlePath(nextProps.location)
  }

  handlePath(location) {
    const path = !!location.pathname.replace('/settings', '') ? location.pathname.replace('/settings', '') : '/profile'
    if ( path !== '/profile' && path !== '/security' && path !== '/2fa' ) {
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
              <ListGroupItem onClick={() => this.changeTab('2fa')} className={path === '2fa' ? 'selected' : ''}><p>2FA</p></ListGroupItem>
            </ListGroup>
          </Col>
          <Col xl={{size: 8, offset: 0}} lg={{size: 9, offset: 0}} md={{size: 10, offset: 1}} sm={{size: 12, offset: 0}} xs={{size: 12, offset: 0}}>
           {path === 'profile' &&
            <Profile/>
            }
            {path === 'security' &&
            <Security/>
            }
            {path === '2fa' &&
            <TwoFactorAuthentication/>
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

export default withRouter(connect(
  mapStateToProps,
)(Settings))

