import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import announcements from './announcements'
import cryptos from './cryptos'
import masternodes from './masternodes'
import nodes from './nodes'
import orders from './orders'
import rewards from './rewards'
import user from './user'
import withdrawals from './withdrawals'

export default combineReducers({
  announcements,
  cryptos,
  masternodes,
  nodes,
  rewards,
  router: routerReducer,
  user,
  withdrawals,
  orders
})
