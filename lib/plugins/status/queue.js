'use strict'

const { get } = require('got')
const config = require('../../../config')

module.exports = (callback) => {
  get(config.STATS_QUEUE_URL, {json: true})
    .then((data) => {
      const results = data.map((site) => `${site.name}: ${site.queue}`)
      callback(null, results)
    }).catch((error) => {
      callback(error, null)
    })
}
