'use strict'

const { get } = require('got')
const config = require('../../../config')

module.exports = (callback) => {
  get(config.STATUS_ANTALL_URL, {json: true})
    .then((data) => {
      const results = data.body.map((site) => `${site.name}: ${site.antall}`)
      callback(null, results)
    }).catch((error) => {
    callback(error, null)
  })
}
