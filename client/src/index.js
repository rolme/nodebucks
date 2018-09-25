import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'
import { CookiesProvider } from 'react-cookie';

import App from './containers/app'
import './setup'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import MetaTags from "react-meta-tags";

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <MetaTags>
      <meta name="keywords" content="masternodes masternode node blockchain"/>
      <meta name="description" content="test description"/>
      <meta property="og:locale" content="en_US"/>
      <meta property="og:type" content="website"/>
      <meta property="og:title" content="test title 4"/>
      <meta property="og:url" content="https://nodebucks.com"/>
      <meta property="og:site_name" content="test name"/>
      <meta property="og:image" content='https://nodebucks.com/assets/images/og_nodebucks.png'/>
      <meta property="og:description" content="test description"/>
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content="test title"/>
      <meta name="twitter:image" content='https://nodebucks.com/assets/images/og_nodebucks.png'/>
      <meta name="twitter:description" content="test description"/>
      <title>Test Title 4</title>
    <ConnectedRouter history={history}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </ConnectedRouter>
    </MetaTags>
  </Provider>,
  target
)
