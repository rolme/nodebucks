import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import cryptos from './cryptos'
import user from './user'

export default combineReducers({
  cryptos,
  router: routerReducer,
  user
})
