import axios from 'axios'
import jwt_decode from 'jwt-decode'
import moment from 'moment'
import { push } from 'react-router-redux'

// ACTION_TYPES ////////////////////////////////////////////////////////////////
export const BALANCE = 'user/BALANCE'
export const BALANCE_SUCCESS = 'user/BALANCE_SUCCESS'
export const BALANCE_FAILURE = 'user/BALANCE_FAILURE'
export const CONFIRM_REGISTRATION = 'user/CONFIRM_REGISTRATION'
export const CONFIRM_REGISTRATION_SUCCESS = 'user/CONFIRM_REGISTRATION_SUCCESS'
export const CONFIRM_REGISTRATION_FAILURE = 'user/CONFIRM_REGISTRATION_FAILURE'
export const LOGIN_USER = 'user/LOGIN_USER'
export const LOGIN_USER_SUCCESS = 'user/LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILURE = 'user/LOGIN_USER_FAILURE'
export const LOGOUT_USER_SUCCESS = 'user/LOGOUT_USER_SUCCESS'
export const REGISTER_USER = 'user/REGISTER_USER'
export const REGISTER_USER_SUCCESS = 'user/REGISTER_USER_SUCCESS'
export const REGISTER_USER_FAILURE = 'user/REGISTER_USER_FAILURE'
export const REQUEST_RESET = 'user/REQUEST_RESET'
export const REQUEST_RESET_SUCCESS = 'user/REQUEST_RESET_SUCCESS'
export const REQUEST_RESET_FAILURE = 'user/REQUEST_RESET_FAILURE'
export const RESET_PASSWORD = 'user/RESET_PASSWORD'
export const RESET_PASSWORD_SUCCESS = 'user/RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAILURE = 'user/RESET_PASSWORD_FAILURE'
export const UPDATE_USER = 'user/UPDATE_USER'
export const UPDATE_USER_SUCCESS = 'user/UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILURE = 'user/UPDATE_USER_FAILURE'
export const CONTACT_TEAM = 'user/CONTACT_TEAM'
export const CONTACT_TEAM_SUCCESS = 'user/CONTACT_TEAM_SUCCESS'
export const CONTACT_TEAM_FAILURE = 'user/CONTACT_TEAM_FAILURE'
export const RESET = 'user/RESET'

// INITIAL STATE ///////////////////////////////////////////////////////////////

// TODO: This smells, should probably be moved or figure out another way.
let TOKEN = localStorage.getItem('jwt-nodebucks')
let TOKEN_USER = null

try {
  if ( TOKEN !== '' && TOKEN !== null ) {
    TOKEN_USER = jwt_decode(TOKEN)
    if ( +TOKEN_USER.exp < +moment("", "x") ) {
      localStorage.setItem('jwt-nodebucks', '')
      TOKEN_USER = null
    }
  }
} catch ( err ) {
  localStorage.setItem('jwt-nodebucks', '')
  TOKEN_USER = null
}

const initialState = {
  data: TOKEN_USER,
  error: false,
  message: null,
  pending: true,
  logInError: false,
  signUpError: false,
  logInMessage: null,
  signUpMessage: null,
  logInPending: false,
  signUpPending: false,
  token: TOKEN
}

// STATE ///////////////////////////////////////////////////////////////////////
export default (state = initialState, action) => {
  switch ( action.type ) {
    case RESET:
      return {
        ...state,
        logInError: false,
        signUpError: false,
        logInMessage: null,
        signUpMessage: null,
        logInPending: false,
        signUpPending: false,
        signUpData: {}
      }

    case LOGIN_USER:
      return {
        ...state,
        data: null,
        logInError: false,
        logInMessage: null,
        logInPending: true,
        token: ''
      }

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        data: jwt_decode(action.payload.token),
        logInError: false,
        logInMessage: null,
        logInPending: false,
        token: action.payload.token
      }

    case LOGIN_USER_FAILURE:
      return {
        ...state,
        data: null,
        logInError: true,
        logInMessage: action.payload.message,
        logInPending: false,
        token: ''
      }

    case REGISTER_USER:
      return {
        ...state,
        data: null,
        signUpError: false,
        signUpMessage: null,
        signUpPending: true,
        token: ''
      }

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        data: jwt_decode(action.payload.token),
        signUpError: false,
        signUpMessage: 'Registration completed successfully.',
        signUpPending: false,
        token: action.payload.token,
        signUpData: {}
      }


    case REGISTER_USER_FAILURE:
      return {
        ...state,
        data: null,
        signUpError: true,
        signUpMessage: action.payload.message,
        signUpPending: false,
        token: ''
      }

    case BALANCE:
      return {
        ...state,
        error: false,
        message: null,
        pending: true
      }

    case BALANCE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: false,
        message: action.payload.message,
        pending: false
      }

    case BALANCE_FAILURE:
      return {
        ...state,
        error: true,
        message: action.payload.message,
        pending: false
      }

    case UPDATE_USER:
      return {
        ...state,
        error: false,
        message: null,
        pending: true
      }

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        data: jwt_decode(action.payload.token),
        error: false,
        message: action.payload.message,
        pending: false,
        token: action.payload.token
      }

    case UPDATE_USER_FAILURE:
      return {
        ...state,
        error: true,
        message: action.payload.message,
        pending: false
      }

    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        data: null,
        error: true,
        message: 'Logged out.',
        pending: false,
        token: ''
      }

    case CONTACT_TEAM:
      return {
        ...state,
        error: false,
        message: null,
      }

    case CONTACT_TEAM_SUCCESS:
      return {
        ...state,
        error: false,
        message: action.payload.message,
      }

    case CONTACT_TEAM_FAILURE:
      return {
        ...state,
        error: true,
        message: action.payload.message,
      }

    default:
      return state
  }
}

// ACTIONS /////////////////////////////////////////////////////////////////////
export function isAuthenticated() {
  return dispatch => {
    let token = localStorage.getItem('jwt-nodebucks')
    let tokenUser = null
    if ( token !== '' && token !== null ) {
      try {
        tokenUser = jwt_decode(token)
        if ( +tokenUser.exp < +moment("", "x") ) {
          localStorage.setItem('jwt-nodebucks', '')
          dispatch({ type: 'LOGOUT_USER_SUCCESS' })
          return false
        }
        return true
      } catch ( err ) {
        localStorage.setItem('jwt-nodebucks', '')
        dispatch({ type: 'LOGOUT_USER_SUCCESS' })
        return false
      }
    }
    return false
  }
}

export function login(data) {
  return dispatch => {
    dispatch({ type: LOGIN_USER })

    axios.post(`/auth/login`, data).then((response) => {
      if ( response.data !== 'error' ) {
        localStorage.setItem('jwt-nodebucks', response.data.token)
        dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data })
      } else {
        dispatch({ type: LOGIN_USER_FAILURE, payload: response.message })
      }
    })
      .catch((error) => {
        dispatch({ type: LOGIN_USER_FAILURE, payload: { message: 'Email and/or password is invalid.' } })
      })
  }
}

export function socialMediaLogin(socialMedia, profile) {
  return dispatch => {
    dispatch({ type: LOGIN_USER })

    const password = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10)
    axios.post(`/auth/oauth`, {
      user: {
        [socialMedia]: profile.id,
        email: profile.email,
        first: profile.firstName,
        last: profile.lastName,
        avatar: profile.profilePicURL,
        password: password,
        password_confirmation: password
      }
    }).then((response) => {
      if ( response.data !== 'error' ) {
        localStorage.setItem('jwt-nodebucks', response.data.token)
        dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data })
      } else {
        dispatch({ type: LOGIN_USER_FAILURE, payload: response.message })
      }
    })
      .catch((error) => {
        dispatch({ type: LOGIN_USER_FAILURE, payload: { message: 'Email and/or password is invalid.' } })
      })
  }
}

export function logout() {
  return dispatch => {
    localStorage.setItem('jwt-nodebucks', '')
    dispatch({ type: LOGOUT_USER_SUCCESS })
    dispatch(push('/login'))
  }
}

/* params = {
     first: string,
     last: string,
     email: string,
     password: string,
     password_confirmation: string
   } */
export function register(params) {
  return dispatch => {
    dispatch({ type: REGISTER_USER })
    axios.post('/api/users', { user: params }).then(response => {
      if ( !!response.data && response.data.status === 'error' ) {
        dispatch({ type: REGISTER_USER_FAILURE, payload: response.data })
        return
      }
      localStorage.setItem('jwt-nodebucks', response.data.token)
      dispatch({ type: REGISTER_USER_SUCCESS, payload: response.data })
    })
      .catch((error) => {
        dispatch({ type: REGISTER_USER_FAILURE, payload: error.message })
      })
  }
}

/* params = {
     first: string,
     last: string,
     email: string,
     password: string,
     password_confirmation: string
   } */
export function updateUser(slug, currentPassword, params) {
  return dispatch => {
    dispatch({ type: UPDATE_USER })
    axios.defaults.headers.common[ 'Authorization' ] = 'Bearer ' + localStorage.getItem('jwt-nodebucks')
    axios.patch(`/api/users/${slug}`, {
      current_password: currentPassword,
      user: params
    }).then(response => {
      if ( response.data.status !== 'error' ) {
        dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data })
      } else {
        dispatch({ type: UPDATE_USER_FAILURE, payload: response.data })
      }
    }).catch(error => {
      dispatch({ type: UPDATE_USER_FAILURE, payload: error.data })
    })
  }
}

export function fetchBalance() {
  return dispatch => {
    dispatch({ type: BALANCE })
    axios.defaults.headers.common[ 'Authorization' ] = 'Bearer ' + localStorage.getItem('jwt-nodebucks')
    axios.get(`/api/users/balance`).then(response => {
      if ( response.data.status !== 'error' ) {
        dispatch({ type: BALANCE_SUCCESS, payload: response.data })
      } else {
        dispatch({ type: BALANCE_FAILURE, payload: response.data })
      }
    }).catch(error => {
      dispatch({ type: BALANCE_FAILURE, payload: error.data })
    })
  }
}

export function confirm(slug) {
  return dispatch => {
    dispatch({ type: CONFIRM_REGISTRATION })
    axios.get(`/api/users/${slug}/confirm`).then(response => {
      dispatch({ type: CONFIRM_REGISTRATION_SUCCESS, payload: response.data })
    })
      .catch((error) => {
        dispatch({ type: CONFIRM_REGISTRATION_FAILURE, payload: error.message })
      })
  }
}

export function requestReset(email) {
  return dispatch => {
    dispatch({ type: REQUEST_RESET })
    axios.patch('/api/users/reset', { email }).then(response => {
      dispatch({ type: REQUEST_RESET_SUCCESS, payload: response.data })
    })
      .catch((error) => {
        dispatch({ type: REQUEST_RESET_FAILURE, payload: error.message })
      })
  }
}

export function resetPassword(resetToken, password, passwordConfirmation) {
  return dispatch => {
    dispatch({ type: RESET_PASSWORD })
    axios.patch(`/api/users/${resetToken}/reset`, {
      user: {
        password,
        password_confirmation: passwordConfirmation
      }
    })
      .then(response => {
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: RESET_PASSWORD_FAILURE, payload: error.message })
      })
  }
}

export function createContact(email, subject, message, callback) {
  return dispatch => {
    dispatch({ type: CONTACT_TEAM })
    axios.post('/api/contacts', {
      contact: {
        email,
        subject,
        message,
      }
    })
      .then(response => {
        dispatch({ type: CONTACT_TEAM_SUCCESS, payload: response.data })
        callback(response.data.status)
      })
      .catch((error) => {
        dispatch({ type: CONTACT_TEAM_FAILURE, payload: error.message })
      })
  }
}


export function reset() {
  return dispatch => {
    dispatch({ type: RESET })
  }
}
