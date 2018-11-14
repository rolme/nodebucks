const fs = require('fs')
const { createServer } = require('http')
const express = require('express')
const compression = require('compression')
const nocache = require('nocache')
const morgan = require('morgan')
const path = require('path')

const normalizePort = port => parseInt(port, 10)
const PORT = normalizePort(process.env.PORT || 5000)

const app = express()
const dev = app.get('env') !== 'production'

if (!dev) {
  app.disable('x-powered-by')
  if (process.env.PRERENDER_TOKEN !== undefined) {
    console.log('prerender token:', process.env.PRERENDER_TOKEN)

    const prerender = require('prerender-node')
    prerender.set('prerenderToken', process.env.PRERENDER_TOKEN)
    prerender.crawlerUserAgents.push('googlebot')
    prerender.crawlerUserAgents.push('bingbot')
    prerender.crawlerUserAgents.push('yandex')

    app.use(function(req, res, next) {
      console.log('before prerender-node:', req.url, req.headers['user-agent'])
      next()
    })

    app.use(prerender)
  }

  app.use(compression())
  app.use(morgan('common'))

  app.use(express.static(path.resolve(__dirname, 'build')))
  app.use(nocache())

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  })
}

if (dev) {
  app.use(morgan('dev'))
}

const server = createServer(app)
server.listen(PORT, err => {
  if (err) throw err
  console.log('Environment:', app.get('env'))
  console.log('Server started!')
})
