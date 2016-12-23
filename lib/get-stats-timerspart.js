'use strict'

const Wreck = require('wreck')
const config = require('../config')

module.exports = (callback) => {
  const totalStats = 3
  var jobsDone = 0
  var totalMinutes = 0

  function areWeDoneYet () {
    jobsDone++
    if (totalStats === jobsDone) {
      const msg = `Det er spart ${(totalMinutes/60).toFixed(0)} timer siden 01. august 2016`
      callback(null, [msg])
    }
  }

  function handleResponse (data) {
    if (data.antallVarslerProdusert) {
      totalMinutes = totalMinutes + data.antallVarslerProdusert*30
    } else if (data.antallSoknader) {
      totalMinutes = totalMinutes + data.antallSoknader*30
    } else if (data.antallTilskudd) {
      totalMinutes = totalMinutes + data.antallTilskudd*15
    }
    areWeDoneYet()
  }

  Wreck.get(config.STATS_SKOLESKYSS_URL, {json: true}, (error, response, payload) => {
    if (error) {
      callback(error, null)
    } else {
      handleResponse(payload)
    }
  })

  Wreck.get(config.STATS_MINELEV_URL, {json: true}, (error, response, payload) => {
    if (error) {
      callback(error, null)
    } else {
      handleResponse(payload)
    }
  })

  Wreck.get(config.STATS_TILSKUDD_URL, {json: true}, (error, response, payload) => {
    if (error) {
      callback(error, null)
    } else {
      handleResponse(payload)
    }
  })
}
