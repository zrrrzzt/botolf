'use strict'

const Wreck = require('wreck')
const config = require('../config')

const generateStats = (data) => {
  var stats = []
  const tidsbruk = (parseInt(data.skjemaUtfyllingTime, 10) / 1000) / parseInt(data.antallTilskudd, 10)
  stats.push(`Totalt antall søknader: ${data.antallTilskudd}`)
  stats.push(`Søknader til folkehelse: ${data.antallFolkehelse || 0}`)
  stats.push(`Søknader til kultur og idrett: ${data.antallKulturIdrett || 0}`)
  stats.push(`Snitt tid brukt pr søknad: ${tidsbruk.toFixed(2)} sekunder`)

  return stats
}

module.exports = (callback) => {
  Wreck.get(config.STATS_TILSKUDD_URL, {json: true}, (error, response, payload) => {
    if (error) {
      return callback(error, null)
    } else {
      return callback(null, generateStats(payload))
    }
  })
}
