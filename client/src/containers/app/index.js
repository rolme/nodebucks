import React, { Component } from 'react'
import { Route as PublicRoute, Switch, Redirect } from 'react-router-dom'
import Route from '../authenticate/route'

import Loadable from 'react-loadable'
import Loading from "../../components/loadingComponent"


const Contact = Loadable({ loader: () => import('../contact'), loading: Loading })
const Dashboard = Loadable({ loader: () => import('../dashboard'), loading: Loading })
const Disclaimer = Loadable({ loader: () => import('../../components/disclaimer'), loading: Loading })
const ErrorPage401 = Loadable({ loader: () => import('../../components/error_pages/401_error_page'), loading: Loading })
const ErrorPage404 = Loadable({ loader: () => import('../../components/error_pages/404_error_page'), loading: Loading })
const FAQ = Loadable({ loader: () => import('../../components/faq'), loading: Loading })
const Footer = Loadable({ loader: () => import('./footer'), loading: Loading })
const Header = Loadable({ loader: () => import('./header'), loading: Loading })
const Home = Loadable({ loader: () => import('../home'), loading: Loading })
const Login = Loadable({ loader: () => import('../authenticate/login'), loading: Loading })
const Logout = Loadable({ loader: () => import('../authenticate/logout'), loading: Loading })
const NewNode = Loadable({ loader: () => import('../nodes/new'), loading: Loading })
const Node = Loadable({ loader: () => import('../nodes/show'), loading: Loading })
const Privacy = Loadable({ loader: () => import('../../components/privacy'), loading: Loading })
const SellNode = Loadable({ loader: () => import('../nodes/sell'), loading: Loading })
const SignUp = Loadable({ loader: () => import('../authenticate/signUp'), loading: Loading })
const Terms = Loadable({ loader: () => import('../../components/terms'), loading: Loading })
const Masternodes = Loadable({ loader: () => import('../../containers/masternodes'), loading: Loading })

export default class App extends Component {

  render() {
    const showHeader = window.location.pathname !== "/login"
    return (
      <div id="appContainer" className="appContainer">
        {showHeader && <Header/>}
        <div className="pageContainer position-relative bg-white">
          <main>
            <Switch>
              <PublicRoute exact path="/" component={Home}/>
              <PublicRoute exact path="/login" component={Login}/>
              <PublicRoute exact path="/logout" component={Logout}/>
              <PublicRoute exact path="/sign-up" component={SignUp}/>
              <PublicRoute exact path="/faq" component={FAQ}/>
              <PublicRoute exact path="/terms" component={Terms}/>
              <PublicRoute exact path="/disclaimer" component={Disclaimer}/>
              <PublicRoute exact path="/privacy" component={Privacy}/>
              <PublicRoute exact path="/contact" component={Contact}/>
              <PublicRoute exact path="/nodes/:crypto/new" component={NewNode}/>
              <Route exact path="/nodes/:slug/sell" component={SellNode}/>
              <Route exact path="/nodes/:slug" component={Node}/>
              <Route exact path="/dashboard" component={Dashboard}/>
              <PublicRoute exact path="/masternodes" component={Masternodes}/>
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
