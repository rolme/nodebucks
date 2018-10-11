import axios from 'axios'

if ( process.env.NODE_ENV === 'development' ) {
  axios.interceptors.request.use(function (config) {
    if ( !config.url.includes('http') ) {
      const url = process.env.REACT_APP_NODEBUCKS_API
      config.url = url + config.url
    }
    return config
  })
}

// TODO: This only works for API calls
axios.interceptors.response.use(function (response) {
  const apiVersion = response.headers['x-nodebucks-version']
  const nodebucksVersion = localStorage.getItem('nodebucks-version')

  if (apiVersion !== nodebucksVersion) {
    localStorage.setItem('nodebucks-version', apiVersion)
    console.log('new version, request a reload')
    return response
  } else {
    console.log('same version')
    return response
  }
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});
