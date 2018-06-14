import axios from 'axios'

if ( process.env.NODE_ENV === 'development' ) {
  axios.interceptors.request.use(function (config) {
    if ( !config.url.includes('http') ) {
      const url = process.env.REACT_APP_API_SOURCE
      config.url = url + config.url
    }
    return config
  })
}
