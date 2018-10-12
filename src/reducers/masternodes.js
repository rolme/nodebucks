import axios from 'axios'

// ACTION_TYPES ////////////////////////////////////////////////////////////////
export const FETCH_MASTERNODE = 'masternodes/FETCH_MASTERNODE'
export const FETCH_MASTERNODE_ERROR = 'masternodes/FETCH_MASTERNODE_ERROR'
export const FETCH_MASTERNODE_SUCCESS = 'masternodes/FETCH_MASTERNODE_SUCCESS'
export const FETCH_MASTERNODE_LIST = 'masternodes/FETCH_MASTERNODE_LIST'
export const FETCH_MASTERNODE_LIST_ERROR = 'masternodes/FETCH_MASTERNODE_LIST_ERROR'
export const FETCH_MASTERNODE_LIST_SUCCESS = 'masternodes/FETCH_MASTERNODE_LIST_SUCCESS'

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
  switch (action.type) {
    case FETCH_MASTERNODE:
    case FETCH_MASTERNODE_LIST:
      return {
        ...state,
        pending: true,
        error: false,
        message: ''
      }

    case FETCH_MASTERNODE_ERROR:
    case FETCH_MASTERNODE_LIST_ERROR:
      return {
        ...state,
        pending: false,
        error: true,
        message: action.payload.message
      }

    case FETCH_MASTERNODE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        pending: false,
        error: false,
        message: 'Fetch masternode successful.'
      }

    case FETCH_MASTERNODE_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload,
        pending: false,
        error: false,
        message: 'Fetch masternode list successful.'
      }

    default:
      return state
  }
}

// ACTIONS /////////////////////////////////////////////////////////////////////
export function fetchMasternode(slug, user_slug) {
  return dispatch => {
    dispatch({ type: FETCH_MASTERNODE })
    axios.get(`/api/masternodes/${slug}?user_slug=${user_slug}`)
      .then((response) => {
        dispatch({ type: FETCH_MASTERNODE_SUCCESS, payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: FETCH_MASTERNODE_ERROR, payload: {message: error.data} })
        console.log(error)
      })
  }
}

export function fetchMasternodes() {
  return dispatch => {
    dispatch({ type: FETCH_MASTERNODE_LIST })
    axios.get('/api/masternodes')
      .then((response) => {
        dispatch({ type: FETCH_MASTERNODE_LIST_SUCCESS, payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: FETCH_MASTERNODE_LIST_ERROR, payload: {message: error.data} })
        console.log(error)
      })
  }
}
