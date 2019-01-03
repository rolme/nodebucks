import axios from 'axios'

// ACTION_TYPES ////////////////////////////////////////////////////////////////

export const FETCH_LIST = 'rewards/FETCH_LIST'
export const FETCH_LIST_ERROR = 'rewards/FETCH_LIST_ERROR'
export const FETCH_LIST_SUCCESS = 'rewards/FETCH_LIST_SUCCESS'


// INITIAL STATE ///////////////////////////////////////////////////////////////
const initialState = {
  list: [],
  pending: false,
  error: false,
  message: ''
}


// STATE ///////////////////////////////////////////////////////////////////////
export default (state = initialState, action) => {
  switch ( action.type ) {
    case FETCH_LIST:
      return {
        ...state,
        pending: true,
        error: false,
        message: ''
      }

    case FETCH_LIST_ERROR:
      return {
        ...state,
        pending: false,
        error: true,
        message: action.payload.message
      }

    case FETCH_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload,
        pending: false,
        error: false,
        message: ''
      }

    default:
      return state
  }
}

export function fetchRewards() {
  return dispatch => {
    dispatch({ type: FETCH_LIST })
    axios.defaults.headers.common[ 'Authorization' ] = 'Bearer ' + localStorage.getItem('jwt-nodebucks')
    axios.get(`/api/rewards`)
      .then((response) => {
        dispatch({ type: FETCH_LIST_SUCCESS, payload: response.data })
      }).catch((error) => {
      dispatch({ type: FETCH_LIST_ERROR, payload: { message: error.data } })
    })
  }
}
