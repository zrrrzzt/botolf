'use strict'

const Wreck = require('wreck')
const config = require('../config')
const api = config.POLITIKER_API

module.exports = (query, callback) => {
  const url = `${api}${query}`
  Wreck.get(url, {json: true}, (error, response, payload) => {
    if (error) {
      return callback(error, null)
    } else {
      return callback(null, payload)
    }
  })
}
