'use strict'

const Wreck = require('wreck')
const config = require('../config')

module.exports = (callback) => {
  const totalStats = 3
  var jobsDone = 0
  var stats = []

  function areWeDoneYet () {
    jobsDone++
    if (totalStats === jobsDone) {
      callback(null, stats)
    }
  }

  Wreck.get(config.STATS_SKOLESKYSS_URL, {json: true}, (error, response, payload) => {
    if (error) {
      callback(error, null)
    } else {
      stats.push(`Skoleskyss: ${payload.queue || 0}`)
      areWeDoneYet()
    }
  })

  Wreck.get(config.STATS_MINELEV_URL, {json: true}, (error, response, payload) => {
    if (error) {
      callback(error, null)
    } else {
      stats.push(`MinElev: ${payload.queue || 0}`)
      areWeDoneYet()
    }
  })

  Wreck.get(config.STATS_TILSKUDD_URL, {json: true}, (error, response, payload) => {
    if (error) {
      callback(error, null)
    } else {
      stats.push(`Tilskudd: ${payload.queue || 0}`)
      areWeDoneYet()
    }
  })
}
