'use strict'

const Wreck = require('wreck')
const config = require('../config')

const generateStats = (data) => {
  var stats = []
  const tidsbruk = (parseInt(data.skjemaUtfyllingTime, 10) / 1000) / parseInt(data.antallVarsler, 10)
  stats.push(`Totalt antall varsler sendt: ${data.antallVarsler}`)
  stats.push(`Varsler av type fag: ${data.fag}`)
  stats.push(`Varsler av type orden: ${data.orden}`)
  stats.push(`Varsler av type atferd: ${data.atferd}`)
  stats.push(`Snitt tid pr varsel: ${tidsbruk.toFixed(2)} sekunder`)

  return stats
}

module.exports = (callback) => {
  Wreck.get(config.STATS_MINELEV_URL, {json: true}, (error, response, payload) => {
    if (error) {
      return callback(error, null)
    } else {
      return callback(null, generateStats(payload))
    }
  })
}
