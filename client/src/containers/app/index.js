import React, { Component } from 'react'
import { Route as PublicRoute, Switch } from 'react-router-dom'
import Route from '../authenticate/route'

import { withCookies } from 'react-cookie'

import { setReferer } from '../../lib/helpers'

import { Alert } from 'reactstrap'
import FreshChat from 'react-freshchat'
import Loadable from 'react-loadable'
import Loading from "../../components/loadingComponent"
import Reloader from "../../components/reloader"

const Article = Loadable({ loader: () => import('../../components/article'), loading: Loading })
const Contact = Loadable({ loader: () => import('../contact'), loading: Loading })
const ConfirmEmail = Loadable({ loader: () => import('../authenticate/confirm_email'), loading: Loading })
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
const Withdraw = Loadable({ loader: () => import('../nodes/withdraw'), loading: Loading })
const SignUp = Loadable({ loader: () => import('../authenticate/signUp'), loading: Loading })
const Terms = Loadable({ loader: () => import('../../components/terms'), loading: Loading })
const Masternodes = Loadable({ loader: () => import('../../containers/masternodes'), loading: Loading })
const CoinInfo = Loadable({ loader: () => import('../../containers/masternodes/coinInfo'), loading: Loading })
const Settings = Loadable({ loader: () => import('../../containers/settings'), loading: Loading })
const Affiliate = Loadable({ loader: () => import('../../containers/affiliate'), loading: Loading })
const ForgotPassword = Loadable({ loader: () => import('../authenticate/forgotPassword'), loading: Loading })
const ResetPassword = Loadable({ loader: () => import('../authenticate/resetPassword'), loading: Loading })
const AffiliateDashboard = Loadable({ loader: () => import('../../containers/affiliateDashboard'), loading: Loading })
const Withdrawals = Loadable({ loader: () => import('../../containers/withdrawals'), loading: Loading })
const Orders = Loadable({ loader: () => import('../../containers/orders'), loading: Loading })

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showReloadRequestAlert: false
    }
    this.toggleReloadRequestAlert = this.toggleReloadRequestAlert.bind(this)
  }

  componentDidMount() {
    const { cookies } = this.props
    setReferer(cookies)
  }

  toggleReloadRequestAlert() {
    this.setState({ showReloadRequestAlert: !this.state.showReloadRequestAlert })
  }

  render() {
    const { showReloadRequestAlert } = this.state
    const showHeader = window.location.pathname !== "/login" && window.location.pathname !== '/reset_password'
    return (
      <div id="appContainer" className="appContainer">
        <Reloader timer="300" onExpire={this.toggleReloadRequestAlert}/>
        {showHeader && <Header/>}
        <Alert color='success' isOpen={showReloadRequestAlert} toggle={this.toggleReloadRequestAlert}>
          The content of web page was updated, please reload the page.
        </Alert>
        <FreshChat token={process.env.REACT_APP_FRESH_CHAT_TOKEN} />
        <div className="pageContainer position-relative">
          <main>
            <Switch>
              <PublicRoute exact path="/" component={Home}/>
              <PublicRoute exact path="/confirm/:slug" component={ConfirmEmail}/>
              <PublicRoute exact path="/affiliate" component={Affiliate}/>
              <PublicRoute exact path="/login" component={Login}/>
              <PublicRoute exact path="/logout" component={Logout}/>
              <PublicRoute exact path="/sign-up" component={SignUp}/>
              <PublicRoute exact path="/forgot_password" component={ForgotPassword}/>
              <PublicRoute exact path="/reset_password/:slug" component={ResetPassword}/>
              <PublicRoute exact path="/faq" component={FAQ}/>
              <PublicRoute exact path="/terms" component={Terms}/>
              <PublicRoute exact path="/what-are-masternodes" component={Article}/>
              <PublicRoute exact path="/disclaimer" component={Disclaimer}/>
              <PublicRoute exact path="/privacy" component={Privacy}/>
              <PublicRoute exact path="/contact" component={Contact}/>
              <PublicRoute exact path="/nodes/:crypto/new" component={NewNode}/>
              <Route exact path="/nodes/:slug/sell" component={SellNode}/>
              <Route exact path="/nodes/withdraw" component={Withdraw}/>
              <Route exact path="/nodes/:slug" component={Node}/>
              <Route exact path="/dashboard" component={Dashboard}/>
              <Route exact path="/dashboard/affiliate" component={AffiliateDashboard}/>
              <Route exact path="/withdrawals" component={Withdrawals}/>
              <Route exact path="/orders" component={Orders}/>
              <PublicRoute exact path="/masternodes" component={Masternodes}/>
              <PublicRoute exact path="/masternodes/:slug" component={CoinInfo}/>
              <PublicRoute path="/settings" component={Settings}/>
              <PublicRoute path="/401" component={ErrorPage401}/>
              <PublicRoute path="/404" component={ErrorPage404}/>
              <Route path='*' component={ErrorPage404}/>
            </Switch>
          </main>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default withCookies(App)
