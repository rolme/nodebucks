import axios from 'axios'

// ACTION_TYPES ////////////////////////////////////////////////////////////////

export const FETCH = 'withdrawals/FETCH'
export const FETCH_ERROR = 'withdrawals/FETCH_ERROR'
export const FETCH_SUCCESS = 'withdrawals/FETCH_SUCCESS'
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
    case FETCH:
    case WITHDRAW:
      return {
        ...state,
        pending: true,
        error: false,
        message: ''
      }

    case FETCH_ERROR:
    case WITHDRAW_ERROR:
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
        message: ''
      }

    case WITHDRAW_SUCCESS:
      return {
        ...state,
        data: action.payload,
        pending: false,
        error: false,
        message: ''
      }

    default:
      return state
  }
}

export function fetchWithdrawData() {
  return dispatch => {
    dispatch({ type: FETCH })
    axios.defaults.headers.common[ 'Authorization' ] = 'Bearer ' + localStorage.getItem('jwt-nodebucks')
    axios.post(`/api/withdrawals`)
      .then((response) => {
        dispatch({ type: FETCH_SUCCESS, payload: response.data })
      }).catch((error) => {
      dispatch({ type: FETCH_ERROR, payload: { message: error.data } })
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
