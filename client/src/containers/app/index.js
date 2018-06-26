import React, { Component } from 'react'
import { Route as PublicRoute, Switch, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from "../../components/loadingComponent"

const Home = Loadable({ loader: () => import('../home'), loading: Loading })
const Header = Loadable({ loader: () => import('./header'), loading: Loading })
const Footer = Loadable({ loader: () => import('./footer'), loading: Loading })
const SignUp = Loadable({ loader: () => import('../authenticate/signUp'), loading: Loading })
const Login = Loadable({ loader: () => import('../authenticate/login'), loading: Loading })
const FAQ = Loadable({ loader: () => import('../../components/faq'), loading: Loading })
const Dashboard = Loadable({ loader: () => import('../dashboard'), loading: Loading })
const Terms = Loadable({ loader: () => import('../../components/terms'), loading: Loading })
const Logout = Loadable({ loader: () => import('../authenticate/logout'), loading: Loading })
const ErrorPage401 = Loadable({ loader: () => import('../../components/error_pages/401_error_page'), loading: Loading })
const ErrorPage404 = Loadable({ loader: () => import('../../components/error_pages/404_error_page'), loading: Loading })

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
              <PublicRoute exact path="/faq" component={FAQ}/>
              <PublicRoute exact path="/dashboard" component={Dashboard}/>
              <PublicRoute exact path="/terms" component={Terms}/>
              <PublicRoute path="/401" component={ErrorPage401}/>
              <PublicRoute path="/404" component={ErrorPage404}/>
              <Redirect from='*' to='/404'/>
            </Switch>
          </main>
        </div>
        <Footer/>
      </div>
    )
  }
}
