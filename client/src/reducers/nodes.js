import axios from 'axios'
import { push } from 'react-router-redux'

// ACTION_TYPES ////////////////////////////////////////////////////////////////
export const FETCH = 'nodes/FETCH'
export const FETCH_ERROR = 'nodes/FETCH_ERROR'
export const FETCH_SUCCESS = 'nodes/FETCH_SUCCESS'
export const FETCH_LIST = 'nodes/FETCH_LIST'
export const FETCH_LIST_ERROR = 'nodes/FETCH_LIST_ERROR'
export const FETCH_LIST_SUCCESS = 'nodes/FETCH_LIST_SUCCESS'
export const PURCHASE = 'nodes/PURCHASE'
export const PURCHASE_ERROR = 'nodes/PURCHASE_ERROR'
export const PURCHASE_SUCCESS = 'nodes/PURCHASE_SUCCESS'
export const RESERVE = 'nodes/RESERVE'
export const RESERVE_ERROR = 'nodes/RESERVE_ERROR'
export const RESERVE_SUCCESS = 'nodes/RESERVE_SUCCESS'
export const SELL = 'nodes/SELL'
export const SELL_ERROR = 'nodes/SELL_ERROR'
export const SELL_SUCCESS = 'nodes/SELL_SUCCESS'
export const SELL_RESERVE = 'nodes/SELL_RESERVE'
export const SELL_RESERVE_ERROR = 'nodes/SELL_RESERVE_ERROR'
export const SELL_RESERVE_SUCCESS = 'nodes/SELL_RESERVE_SUCCESS'
export const UPDATE = 'nodes/UPDATE'
export const UPDATE_ERROR = 'nodes/UPDATE_ERROR'
export const UPDATE_SUCCESS = 'nodes/UPDATE_SUCCESS'
export const REFRESH = 'nodes/REFRESH'

// INITIAL STATE ///////////////////////////////////////////////////////////////
const initialState = {
  data: {"balance":{"coin":0.0,"usd":0.0},"cost":"277886.431265134713","createdAt":"2018-07-10 06:27:54","crypto":{"annualRoi":"0.068622918136825767842439940193013804","hostingFee":"0.01","masternodes":4310,"monthlyRoiValue":"1567.346122524","monthlyRoiPercentage":"0.005640239846862391877460817002165518","name":"Dash","nodePrice":"277886.431265134713","slug":"dash","stake":1000,"symbol":"dash","url":"https://www.dash.org/","status":"active","weeklyRoiValue":"365.7140952556","weeklyRoiPercentage":"0.001316055964267891438074190633838621","yearlyRoiValue":"19069.377824042","yearlyRoiPercentage":"0.068622918136825767842439940193013804"},"events":[{"id":2,"timestamp":"2018-01-10 06:27:54","type":"ops","description":"Server setup initiated","value":"0.0"},{"id":1,"timestamp":"2018-01-10 06:27:49","type":"ops","description":"Server price reserved","value":"0.0"}],"ip":null,"isReady":false,"lastUpgradedAt":null,"onlineAt":null,"owner":{"email":"test@nodebucks.com","first":"Test","fullName":"Test User","last":"User","slug":"45rMuBi67UBkI6Nc8o23Zw"},"rewardSetting":0,"rewardTotal":"0.0","rewards":{"week":"0.0","quarter":"0.0","month":"0.0","year":"0.0"},"sellBitcoinWallet":"test","sellPrice":"199603.89581340981","sellSetting":0,"slug":"2Vq0F1mrgmjSkIOzBiuN8A","soldAt":null,"status":"new","stripe":null,"timeLimit":180,"wallet":"XdL3KXxRfzUmGj9QMA7i1W3M3fZdcjNnfw","withdrawWallet":null,"value":"199603.89581340981","values":[{"timestamp":"2018-07-10 06:27:54","value":"277886.431265134713"}],"version":null,"vpsMonthlyCost":null,"vpsProvider":null,"vpsUrl":null},
  list: [],
  pending: false,
  error: false,
  message: ''
}

// STATE ///////////////////////////////////////////////////////////////////////
export default (state = initialState, action) => {
  switch ( action.type ) {
    case FETCH:
    case FETCH_LIST:
    case PURCHASE:
    case RESERVE:
    case SELL:
    case SELL_RESERVE:
    case UPDATE:
      return {
        ...state,
        pending: true,
        error: false,
        message: ''
      }

    case FETCH_ERROR:
    case FETCH_LIST_ERROR:
    case PURCHASE_ERROR:
    case RESERVE_ERROR:
    case SELL_ERROR:
    case SELL_RESERVE_ERROR:
    case UPDATE_ERROR:
      return {
        ...state,
        pending: false,
        error: true,
        message: action.payload.message
      }

    case REFRESH:
      return {
        ...state,
        refreshing: true
      }

    case FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        pending: false,
        error: false,
        message: 'Fetch node successful.'
      }

    case FETCH_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload,
        pending: false,
        error: false,
        message: 'Fetch node list successful.'
      }

    case UPDATE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        pending: false,
        error: false,
        message: 'Update node successful.'
      }

    case RESERVE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        pending: false,
        error: false,
        refreshing: false,
        message: 'Reserve node successful.'
      }

    case SELL_RESERVE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        pending: false,
        error: false,
        message: 'Reserve sell price successful.'
      }

    case PURCHASE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        pending: false,
        error: false,
        message: 'Purchase node successful.'
      }

    case SELL_SUCCESS:
      return {
        ...state,
        data: action.payload,
        pending: false,
        error: false,
        message: 'Node sold successful.'
      }

    default:
      return state
  }
}

// ACTIONS /////////////////////////////////////////////////////////////////////
export function fetchNode(slug) {
  return dispatch => {
    dispatch({ type: FETCH })
    axios.defaults.headers.common[ 'Authorization' ] = 'Bearer ' + localStorage.getItem('jwt-nodebucks')
    axios.get(`/api/nodes/${slug}`)
      .then((response) => {
        dispatch({ type: FETCH_SUCCESS, payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: FETCH_ERROR, payload: { message: error.data } })
        console.log(error)
      })
  }
}

export function fetchNodes() {
  return dispatch => {
    dispatch({ type: FETCH_LIST })
    axios.defaults.headers.common[ 'Authorization' ] = 'Bearer ' + localStorage.getItem('jwt-nodebucks')
    axios.get('/api/nodes')
      .then((response) => {
        dispatch({ type: FETCH_LIST_SUCCESS, payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: FETCH_LIST_ERROR, payload: { message: error.data } })
        console.log(error)
      })
  }
}

export function reserveNode(cryptoSlug, isRefreshing) {
  return dispatch => {
    !!isRefreshing && dispatch({ type: REFRESH })
    dispatch({ type: RESERVE })
    axios.defaults.headers.common[ 'Authorization' ] = 'Bearer ' + localStorage.getItem('jwt-nodebucks')
    axios.post(`/api/nodes`, { crypto: cryptoSlug })
      .then((response) => {
        dispatch({ type: RESERVE_SUCCESS, payload: response.data })
      }).catch((error) => {
      dispatch({ type: RESERVE_ERROR, payload: { message: error.data } })
      console.log(error)
    })
  }
}

export function purchaseNode(slug) {
  return dispatch => {
    dispatch({ type: PURCHASE })
    axios.defaults.headers.common[ 'Authorization' ] = 'Bearer ' + localStorage.getItem('jwt-nodebucks')
    axios.patch(`/api/nodes/${slug}/purchase`)
      .then((response) => {
        dispatch({ type: PURCHASE_SUCCESS, payload: response.data })
        dispatch(push('/dashboard'))
      }).catch((error) => {
      dispatch({ type: PURCHASE_ERROR, payload: { message: error.data } })
      console.log(error)
    })
  }
}

export function updateNode(slug, data) {
  return dispatch => {
    dispatch({ type: UPDATE })
    axios.defaults.headers.common[ 'Authorization' ] = 'Bearer ' + localStorage.getItem('jwt-nodebucks')
    axios.patch(`/api/nodes/${slug}`, { node: data })
      .then((response) => {
        dispatch({ type: UPDATE_SUCCESS, payload: response.data })
      }).catch((error) => {
      dispatch({ type: UPDATE_ERROR, payload: { message: error.data } })
      console.log(error)
    })
  }
}

export function sellReserveNode(slug) {
  return dispatch => {
    dispatch({ type: SELL_RESERVE })
    axios.defaults.headers.common[ 'Authorization' ] = 'Bearer ' + localStorage.getItem('jwt-nodebucks')
    axios.patch(`/api/nodes/${slug}/reserve`)
      .then((response) => {
        dispatch({ type: SELL_RESERVE_SUCCESS, payload: response.data })
      }).catch((error) => {
      dispatch({ type: SELL_RESERVE_ERROR, payload: { message: error.data } })
      console.log(error)
    })
  }
}

export function sellNode(slug) {
  return dispatch => {
    dispatch({ type: SELL })
    axios.defaults.headers.common[ 'Authorization' ] = 'Bearer ' + localStorage.getItem('jwt-nodebucks')
    axios.patch(`/api/nodes/${slug}/sell`)
      .then((response) => {
        dispatch({ type: SELL_SUCCESS, payload: response.data })
      }).catch((error) => {
      dispatch({ type: SELL_ERROR, payload: { message: error.data } })
      console.log(error)
    })
  }
}
