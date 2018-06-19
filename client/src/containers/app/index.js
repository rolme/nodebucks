import React, { Component } from 'react'
import { Route as PublicRoute, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from "../../components/loadingComponent"

const Home = Loadable({ loader: () => import('../home'), loading: Loading })
const Header = Loadable({ loader: () => import('./header'), loading: Loading })
const SignUp = Loadable({ loader: () => import('../authenticate/signUp'), loading: Loading })
const Login = Loadable({ loader: () => import('../authenticate/login'), loading: Loading })
const Logout = Loadable({ loader: () => import('../authenticate/logout'), loading: Loading })

export default class App extends Component {
  render() {
    return (
      <div id="appContainer" className="appContainer">
        <Header/>
        <div className="pageContainer position-relative bg-light">
          <main>
            <Switch>
              <PublicRoute exact path="/login" component={Login}/>
              <PublicRoute exact path="/logout" component={Logout}/>
              <PublicRoute exact path="/" component={Home}/>
              <PublicRoute exact path="/sign-up" component={SignUp}/>
            </Switch>
          </main>
        </div>
      </div>
    )
  }
}
