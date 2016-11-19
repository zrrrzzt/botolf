'use strict'

module.exports = {
  APP_ID: process.env.APP_ID || 'your-app-id',
  APP_SECRET: process.env.APP_SECRET || 'your-app-password',
  POLITIKER_API: process.env.POLITIKER_API || 'https://politiker-api.t-fk.no/politicians/search/',
  ANSATTE_API: process.env.ANSATTE_API || 'https://search.portalen.t-fk.no/api/employees/search/'
}
