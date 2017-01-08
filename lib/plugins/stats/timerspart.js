'use strict'

const { get } = require('got')
const config = require('../../../config/index')

module.exports = (callback) => {
  get(config.STATS_TIMERSPART_URL, {json: true})
    .then((data) => {
      const msg = `Det er spart ${data.body.timerSpart.toFixed(0)} timer siden 01. august 2016`
      callback(null, [msg])
    }).catch((error) => {
      callback(error, null)
    })
}
