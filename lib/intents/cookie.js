'use strict'

const cookies = require('fortune-cookie')
const getRandom = require('../get-random')

module.exports = (session) => {
  session.send(getRandom(cookies))
}
