import axios from 'axios'
import { valueFormat } from "../lib/helpers"
import { RESET } from "./user"

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
export const FETCH_NODE_SELL_PRICES = 'nodes/FETCH_NODE_SELL_PRICES'
export const FETCH_NODE_SELL_PRICES_SUCCESS = 'nodes/FETCH_NODE_SELL_PRICES_SUCCESS'
export const FETCH_NODE_SELL_PRICES_ERROR = 'nodes/FETCH_NODE_SELL_PRICES_ERROR'

// INITIAL STATE ///////////////////////////////////////////////////////////////
const initialState = {
  data: {},
  list: [],
  pending: false,
  error: false,
  message: '',
  sellPrices: []
}

// STATE ///////////////////////////////////////////////////////////////////////
export default (state = initialState, action) => {
  switch ( action.type ) {
    case RESET:
      return {
        ...state,
        data: {},
        list: [],
        pending: false,
        error: false,
        message: ''
      }
    case FETCH:
    case FETCH_LIST:
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
        message: 'Successfully updated node'
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
        refreshing: false,
        error: false,
        message: 'Reserve sell price successful.'
      }
    case PURCHASE:
      return {
        ...state
      }
    case PURCHASE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        purchased: action.payload,
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
        message:`You have successfully sold your ${action.payload.crypto.name} Masternode for $${valueFormat(+action.payload.sellPrice, 2)}. You will no longer receive rewards for that server. Your payment will be sent within 3 days. Thank you.`
      }
    case FETCH_NODE_SELL_PRICES_SUCCESS:
      return {
        ...state,
        sellPrices: action.payload,
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

export function purchaseNode(paymentResponse, slug, callback) {
  return dispatch => {
    dispatch({ type: PURCHASE })
    axios.defaults.headers.common[ 'Authorization' ] = 'Bearer ' + localStorage.getItem('jwt-nodebucks')
    axios.patch(`/api/nodes/${slug}/purchase`, { payment_response: paymentResponse })
      .then((response) => {
        if (response.data.status !== 'error') {
          dispatch({ type: PURCHASE_SUCCESS, payload: response.data })
          callback()
        } else {
          dispatch({ type: PURCHASE_ERROR, payload: { message: response.message } })
          console.log(response.message)
        }
      }).catch((error) => {
      dispatch({ type: PURCHASE_ERROR, payload: { message: error.data } })
      console.log(error)
    })
  }
}

export function updateNode(slug, data, callback) {
  return dispatch => {
    dispatch({ type: UPDATE })
    axios.defaults.headers.common[ 'Authorization' ] = 'Bearer ' + localStorage.getItem('jwt-nodebucks')
    axios.patch(`/api/nodes/${slug}`, { node: data })
      .then((response) => {
        dispatch({ type: UPDATE_SUCCESS, payload: response.data })
        callback()
      }).catch((error) => {
      dispatch({ type: UPDATE_ERROR, payload: { message: error.data } })
      console.log(error)
    })
  }
}

export function sellReserveNode(slug, isRefreshing) {
  return dispatch => {
    !!isRefreshing && dispatch({ type: REFRESH })
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

export function sellNode(slug, data, callback) {
  return dispatch => {
    dispatch({ type: SELL })
    axios.defaults.headers.common[ 'Authorization' ] = 'Bearer ' + localStorage.getItem('jwt-nodebucks')
    axios.patch(`/api/nodes/${slug}/sell`, data)
      .then((response) => {
        if ( response.data.status === 'error' ) {
          dispatch({ type: SELL_ERROR, payload: { message: response.data } })
        } else {
          dispatch({ type: SELL_SUCCESS, payload: response.data })
        }
        callback()
      }).catch((error) => {
      dispatch({ type: SELL_ERROR, payload: { message: error.data } })
      console.log(error)
    })
  }
}

export function fetchNodeSellPrices(slug, timeframe, days, callback) {
  return dispatch => {
    dispatch({ type: FETCH_NODE_SELL_PRICES })
    axios.get(`/api/nodes/${slug}/sell_prices?timeframe=${timeframe}&days=${days}`)
      .then((response) => {
        dispatch({ type: FETCH_NODE_SELL_PRICES_SUCCESS, payload: response.data })
        if(callback) callback()
      })
      .catch((error) => {
        dispatch({ type: FETCH_NODE_SELL_PRICES_ERROR, payload: { message: error.data } })
        console.log(error)
      })
  }
}

export function reset() {
  return dispatch => {
    dispatch({ type: RESET })
  }
}
