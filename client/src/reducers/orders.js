import axios from 'axios'

// ACTION_TYPES ////////////////////////////////////////////////////////////////

export const FETCH = 'orders/FETCH'
export const FETCH_ERROR = 'orders/FETCH_ERROR'
export const FETCH_SUCCESS = 'orders/FETCH_SUCCESS'


// INITIAL STATE ///////////////////////////////////////////////////////////////
const initialState = {
  data: [],
  pending: false,
  error: false,
  message: ''
}


// STATE ///////////////////////////////////////////////////////////////////////
export default (state = initialState, action) => {
  switch ( action.type ) {
    case FETCH:
      return {
        ...state,
        pending: true,
        error: false,
        message: ''
      }

    case FETCH_ERROR:
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

    default:
      return state
  }
}

export function fetchOrdersData() {
  return dispatch => {
    dispatch({ type: FETCH })
    axios.defaults.headers.common[ 'Authorization' ] = 'Bearer ' + localStorage.getItem('jwt-nodebucks')
    axios.get(`/api/orders`)
      .then((response) => {
        dispatch({ type: FETCH_SUCCESS, payload: response.data })
      }).catch((error) => {
      dispatch({ type: FETCH_ERROR, payload: { message: error.data } })
    })
  }
}
