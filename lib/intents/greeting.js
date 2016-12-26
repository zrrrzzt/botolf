'use strict'

const pkg = require('../../package.json')
const getRandom = require('../get-random')
const greetings = require('../../config/greetings')

module.exports = {
  intent: /^hei|hallo|heisann|hepp/i,
  actions: [
    function (session) {
      session.send(getRandom(greetings))
      session.send(`Jeg er Botolf versjon ${pkg.version}`)
    }
  ]
}
