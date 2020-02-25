'use strict'

const express = require('express')
const app = express()
const hpp = require('hpp')
const csp = require('helmet-csp')
const starWarsInfo = require('./route/getPeopleInfoRoute')

require('dotenv').config()

app.use((req, res, next) => {
  console.info(req.method + 'request was made to ' + req.url)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  next()
})

app.use(hpp())

app.use(require('helmet')())
app.use(csp({
  directives: {
    defaultSrc: ["'self'"]
  }
}))

app.use('/get-starwars-info', starWarsInfo)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error handler for API

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  const error = {
    message: err.message,
    status: 'fail',
    error: {
      message: err.message,
      status: err.status || 500,
      data: err.object || {}
    }
  }
  res.send(error)
})

module.exports = app