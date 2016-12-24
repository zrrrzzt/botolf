'use strict'

const Wreck = require('wreck')
const config = require('../../../config')
const checkList = [
  {name: 'Skoleskyss', url: config.STATS_SKOLESKYSS_URL},
  {name: 'MinElev', url: config.STATS_MINELEV_URL},
  {name: 'Tilskudd', url: config.STATS_TILSKUDD_URL}
]

module.exports = (callback) => {
  const totalStats = checkList.length
  let jobsDone = 0
  let stats = []

  function areWeDoneYet () {
    jobsDone++
    if (totalStats === jobsDone) {
      callback(null, stats)
    }
  }

  checkList.forEach((site) => {
    Wreck.get(site.url, {json: true}, (error, response, payload) => {
      if (error) {
        callback(error, null)
      } else {
        stats.push(`${site.name}: ${payload.queue || 0}`)
        areWeDoneYet()
      }
    })
  })
}
