'use strict'

const Wreck = require('wreck')
const config = require('../../../config/index')

const generateStats = (data) => {
  var stats = []
  const tidsbruk = (parseInt(data.skjemaUtfyllingTime, 10) / 1000) / parseInt(data.antallVarsler, 10)
  stats.push(`Totalt antall varsler sendt: ${data.antallVarsler}`)
  stats.push(`Varsler av type fag: ${data.fag}`)
  stats.push(`Varsler av type orden: ${data.orden}`)
  stats.push(`Varsler av type atferd: ${data.atferd}`)
  stats.push(`Bamble videregående skole: ${data.antallBAMVS || 0}`)
  stats.push(`Bø vidaregåande skule: ${data.antallBOEVS || 0}`)
  stats.push(`Hjalmar Johansen videregående skole: ${data.antallKLOVS || 0}`)
  stats.push(`Kragerø videregående skole: ${data.antallKRAVS || 0}`)
  stats.push(`Nome videregående skole: ${data.antallNOMVS || 0}`)
  stats.push(`Notodden videregående skole: ${data.antallNOTVS || 0}`)
  stats.push(`Porsgrunn videregående skole: ${data.antallPORVS || 0}`)
  stats.push(`Rjukan videregående skole: ${data.antallRJUVS || 0}`)
  stats.push(`Skien videregående skole: ${data.antallSKIVS || 0}`)
  stats.push(`Skogmo videregående skole: ${data.antallSKOVS || 0}`)
  stats.push(`Vest-Telemark vidaregåande skule: ${data.antallDALVS || 0}`)
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
