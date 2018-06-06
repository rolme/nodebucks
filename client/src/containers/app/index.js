import React, { Component } from 'react'
import { Route as PublicRoute } from 'react-router-dom'
// import { Switch } from 'react-router-dom'
// import Route from '../authenticate/route'

import Debug from './debug'
import Header from './header'
import Login from '../authenticate/login'
import Logout from '../authenticate/logout'
import Home from './home'

import { Container } from 'reactstrap'

export default class App extends Component {
  render() {
    return (
      <Container fluid={true}>
        <Header/>
        <main>
          <PublicRoute exact path="/debug/:slug" component={Debug}/>
          <PublicRoute exact path="/login" component={Login}/>
          <PublicRoute exact path="/logout" component={Logout}/>
          <PublicRoute exact path="/" component={Home}/>
        </main>
      </Container>
    )
  }
}
