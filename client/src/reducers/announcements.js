import axios from 'axios'

// ACTION_TYPES ////////////////////////////////////////////////////////////////
export const FETCH = 'announcements/FETCH'
export const FETCH_ERROR = 'announcements/FETCH_ERROR'
export const FETCH_SUCCESS = 'announcements/FETCH_SUCCESS'

// INITIAL STATE ///////////////////////////////////////////////////////////////
const initialState = {
  data: {},
  pending: false,
  error: false,
  message: ''
}

// STATE ///////////////////////////////////////////////////////////////////////
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        pending: false,
        error: true,
        message: '',
        data: {}
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        pending: false,
        error: false,
        message: 'Announcement fetched',
        data: action.payload
      }
    case FETCH_ERROR:
      return {
        ...state,
        pending: false,
        error: true,
        data: {},
        message: action.payload
      }
    default:
      return state
  }
}

export function fetchAnnouncement() {
  return dispatch => {
    dispatch({ type: FETCH })
    axios.get(`/api/announcements/last`)
      .then((response) => {
      dispatch({ type: FETCH_SUCCESS, payload: response.data })
      }).catch((error) => {
        dispatch({ type: FETCH_ERROR, payload: error.data })
      })
  }
}
