import axios from 'axios'

// ACTION_TYPES ////////////////////////////////////////////////////////////////

export const RESERVE = 'withdrawals/RESERVE'
export const RESERVE_ERROR = 'withdrawals/RESERVE_ERROR'
export const RESERVE_SUCCESS = 'withdrawals/RESERVE_SUCCESS'
export const FETCH_LIST = 'withdrawals/FETCH_LIST'
export const FETCH_LIST_ERROR = 'withdrawals/FETCH_LIST_ERROR'
export const FETCH_LIST_SUCCESS = 'withdrawals/FETCH_LIST_SUCCESS'
export const WITHDRAW = 'withdrawals/WITHDRAW'
export const WITHDRAW_ERROR = 'withdrawals/WITHDRAW_ERROR'
export const WITHDRAW_SUCCESS = 'withdrawals/WITHDRAW_SUCCESS'


// INITIAL STATE ///////////////////////////////////////////////////////////////
const initialState = {
  data: {},
  list: [],
  pending: false,
  error: false,
  message: ''
}


// STATE ///////////////////////////////////////////////////////////////////////
export default (state = initialState, action) => {
  switch ( action.type ) {
    case RESERVE:
    case FETCH_LIST:
    case WITHDRAW:
      return {
        ...state,
        pending: true,
        error: false,
        message: ''
      }

    case RESERVE_ERROR:
    case FETCH_LIST_ERROR:
    case WITHDRAW_ERROR:
      return {
        ...state,
        pending: false,
        error: true,
        message: action.payload.message
      }

    case RESERVE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        pending: false,
        error: false,
        message: ''
      }

    case FETCH_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload,
        pending: false,
        error: false,
        message: ''
      }

    case WITHDRAW_SUCCESS:
      return {
        ...state,
        data: action.payload,
        pending: false,
        error: false,
        message: 'Success. You will be redirected to the dashboard page.'
      }

    default:
      return state
  }
}

export function reserveWithdrawal() {
  return dispatch => {
    dispatch({ type: RESERVE })
    axios.defaults.headers.common[ 'Authorization' ] = 'Bearer ' + localStorage.getItem('jwt-nodebucks')
    axios.post(`/api/withdrawals`)
      .then((response) => {
        dispatch({ type: RESERVE_SUCCESS, payload: response.data })
      }).catch((error) => {
      dispatch({ type: RESERVE_ERROR, payload: { message: error.data } })
    })
  }
}

export function fetchWithdrawals() {
  return dispatch => {
    dispatch({ type: FETCH_LIST })
    axios.defaults.headers.common[ 'Authorization' ] = 'Bearer ' + localStorage.getItem('jwt-nodebucks')
    axios.get(`/api/withdrawals`)
      .then((response) => {
        dispatch({ type: FETCH_LIST_SUCCESS, payload: response.data })
      }).catch((error) => {
      dispatch({ type: FETCH_LIST_ERROR, payload: { message: error.data } })
    })
  }
}

export function withdraw(data) {
  return dispatch => {
    dispatch({ type: WITHDRAW })
    axios.defaults.headers.common[ 'Authorization' ] = 'Bearer ' + localStorage.getItem('jwt-nodebucks')
    axios.patch('/api/withdrawals/confirm', data)
      .then((response) => {
        dispatch({ type: WITHDRAW_SUCCESS, payload: response.data })
      }).catch((error) => {
      dispatch({ type: WITHDRAW_ERROR, payload: { message: error.data } })
    })
  }
}
