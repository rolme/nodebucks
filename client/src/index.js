import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'
import {StripeProvider} from 'react-stripe-elements'

import App from './containers/app'
import './setup'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <StripeProvider apiKey={process.env.REACT_APP_STRIPE_API_KEY}>
        <App />
      </StripeProvider>
    </ConnectedRouter>
  </Provider>,
  target
)
