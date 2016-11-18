'use strict'

const Wreck = require('wreck')
const config = require('../config')
const api = config.ANSATTE_API

module.exports = (query, callback) => {
  const url = `${api}${query}`
  console.log(url)
  Wreck.get(url, {json: true}, (error, response, payload) => {
    if (error) {
      return callback(error, null)
    } else {
      console.log(payload)
      const results = payload.results
      return callback(null, results)
    }
  })
}
