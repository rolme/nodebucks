import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import cryptos from './cryptos'
import nodes from './nodes'
import user from './user'
import withdrawals from './withdrawals'
import announcements from './announcements'

export default combineReducers({
  announcements,
  cryptos,
  nodes,
  router: routerReducer,
  user,
  withdrawals
})
