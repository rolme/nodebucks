import axios from 'axios'

// ACTION_TYPES ////////////////////////////////////////////////////////////////
export const FETCH = 'cryptos/FETCH'
export const FETCH_ERROR = 'cryptos/FETCH_ERROR'
export const FETCH_SUCCESS = 'cryptos/FETCH_SUCCESS'
export const FETCH_LIST = 'cryptos/FETCH_LIST'
export const FETCH_LIST_ERROR = 'cryptos/FETCH_LIST_ERROR'
export const FETCH_LIST_SUCCESS = 'cryptos/FETCH_LIST_SUCCESS'
export const FETCH_PRICES = 'cryptos/FETCH_PRICES'
export const FETCH_PRICES_ERROR = 'cryptos/FETCH_PRICES_ERROR'
export const FETCH_PRICES_SUCCESS = 'cryptos/FETCH_PRICES_SUCCESS'

// INITIAL STATE ///////////////////////////////////////////////////////////////
const initialState = {
  data: {},
  list: [],
  priceData: [],
  pending: false,
  error: false,
  message: ''
}

// STATE ///////////////////////////////////////////////////////////////////////
export default (state = initialState, action) => {
  switch ( action.type ) {
    case FETCH:
    case FETCH_LIST:
    case FETCH_PRICES:
      return {
        ...state,
        pending: true,
        error: false,
        message: ''
      }

    case FETCH_ERROR:
    case FETCH_LIST_ERROR:
    case FETCH_PRICES_ERROR:
      return {
        ...state,
        pending: false,
        error: true,
        message: action.payload.message
      }

    case FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        pending: false,
        error: false,
        message: 'Fetch cryptocurrency successful.'
      }

    case FETCH_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload,
        pending: false,
        error: false,
        message: 'Fetch cryptocurrency list successful.'
      }

    case FETCH_PRICES_SUCCESS:
      return {
        ...state,
        priceData: action.payload,
        pending: false,
        error: false,
        message: ''
      }

    default:
      return state
  }
}

// ACTIONS /////////////////////////////////////////////////////////////////////
export function fetchCrypto(slug) {
  return dispatch => {
    dispatch({ type: FETCH })
    axios.get(`/api/cryptos/${slug}`)
      .then((response) => {
        dispatch({ type: FETCH_SUCCESS, payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: FETCH_ERROR, payload: { message: error.data } })
        console.log(error)
      })
  }
}

export function fetchCryptos() {
  return dispatch => {
    dispatch({ type: FETCH_LIST })
    axios.get('/api/cryptos')
      .then((response) => {
        dispatch({ type: FETCH_LIST_SUCCESS, payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: FETCH_LIST_ERROR, payload: { message: error.data } })
        console.log(error)
      })
  }
}

export function fetchCryptoPrices(slug, timeframe, days) {
  return dispatch => {
    dispatch({ type: FETCH_PRICES })
    axios.get(`/api/cryptos/${slug}/prices?timeframe=${timeframe}&days=${days}`)
      .then((response) => {
        dispatch({ type: FETCH_PRICES_SUCCESS, payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: FETCH_PRICES_ERROR, payload: { message: error.data } })
        console.log(error)
      })
  }
}
