'use strict'

const Wreck = require('wreck')
const config = require('../config')
const api = config.ANSATTE_API

module.exports = (query, callback) => {
  const url = `${api}${query}`
  Wreck.get(url, {json: true}, (error, response, payload) => {
    if (error) {
      return callback(error, null)
    } else {
      const results = payload.hits.hits || []
      return callback(null, results)
    }
  })
}
