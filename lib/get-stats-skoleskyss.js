'use strict'

const Wreck = require('wreck')
const config = require('../config')

const generateStats = (data) => {
  var stats = []
  const tidsbruk = (parseInt(data.skjemaUtfyllingTime, 10) / 1000) / parseInt(data.antallSoknader, 10)
  stats.push(`Totalt antall søknader: ${data.antallSoknader}`)
  stats.push(`Totalt antall unike søkere: ${data.antallSokere}`)
  stats.push(`Automatisk behandlet: ${data.antallAutomatisk}`)
  stats.push(`Innvilget: ${data.antallInnvilget}`)
  stats.push(`Avslag: ${data.antallAvslag}`)
  stats.push(`Snitt tid brukt pr søknad: ${tidsbruk.toFixed(2)} sekunder`)

  return stats
}

module.exports = (callback) => {
  Wreck.get(config.STATS_SKOLESKYSS_URL, {json: true}, (error, response, payload) => {
    if (error) {
      return callback(error, null)
    } else {
      return callback(null, generateStats(payload))
    }
  })
}
