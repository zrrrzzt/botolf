'use strict'
process.env.APP_ID = 'abe69286-e067-420a-933e-38ab4876fd1c'
process.env.APP_SECRET = 'iYfCBcgBVRS9JOaSC5YzqHY'
module.exports = {
  APP_ID: process.env.APP_ID || 'your-app-id',
  APP_SECRET: process.env.APP_SECRET || 'your-app-password',
  STATS_SKOLESKYSS_URL: process.env.STATS_SKOLESKYSS_URL || 'https://tfk-livestats.firebaseio.com/skoleskyss.json',
  STATS_MINELEV_URL: process.env.STATS_MINELEV_URL || 'https://tfk-livestats.firebaseio.com/minelev.json',
  STATS_TILSKUDD_URL: process.env.STATS_TILSKUDD_URL || 'https://tfk-stats.firebaseio.com/tilskudd.json',
  STATS_QUEUE_URL: process.env.STATS_QUEUE_URL || 'https://queue.status.tfk.allthethings.win?format=json',
  STATS_TIMERSPART_URL: process.env.STATS_TIMERSPART_URL || 'https://timerspart.automate.allthethings.win?format=json',
  POLITIKER_API: process.env.POLITIKER_API || 'https://politiker-api.t-fk.no/politicians/search/',
  ANSATTE_API: process.env.ANSATTE_API || 'https://search.portalen.t-fk.no/api/employees/search/'
}
