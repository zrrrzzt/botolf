'use strict'

const restify = require('restify')
const builder = require('botbuilder')
const cookies = require('fortune-cookie')
const brreg = require('brreg')
const config = require('./config')
const getRandom = require('./lib/get-random')

// Setup Restify Server
const server = restify.createServer()
server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log(`${server.name} listening to ${server.url}`)
})

// Create chat bot
const connector = new builder.ChatConnector({
  appId: config.APP_ID,
  appPassword: config.APP_SECRET
})

const bot = new builder.UniversalBot(connector)
const intents = new builder.IntentDialog()

server.post('/api/messages', connector.listen())

// Dialogs

bot.dialog('/', intents)

intents.matches(/^brreg/i, [
  function (session) {
    builder.Prompts.text(session, "Hva skal jeg søke etter i Brønnøysund?")
  },
  function (session, results) {
    session.send(`Søker etter ${results.response}`)
    brreg({query: results.response})
      .then((data) => {
        session.send(`${data.entries.length} treff`)
        session.send(JSON.stringify(data.entries))
      })
      .catch((error) => {
        console.error(error)
        session.send('Noe gikk galt. Beklager')
      })
  }
])

intents.onDefault((session) => {
  session.send(getRandom(cookies))
})
