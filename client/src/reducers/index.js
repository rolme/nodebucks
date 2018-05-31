import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import mnodes from './mnodes'
import user from './user'
import users from './users'

export default combineReducers({
  mnodes,
  router: routerReducer,
  user,
  users
})
