'use strict'

const tap = require('tap')
const getAnsatt = require('../../lib/get-ansatt')

tap.test('it returns results', (test) => {
  getAnsatt('geir', (error, data) => {
    if (error) {
      throw error
    } else {
      tap.ok(data, 'data OK')
      test.done()
    }
  })
})
