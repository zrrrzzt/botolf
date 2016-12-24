'use strict'

const fs = require('fs')
const restify = require('restify')
const builder = require('botbuilder')
const cookies = require('fortune-cookie')
const brreg = require('brreg')
const config = require('./config')
const pkg = require('./package.json')
const greetings = require('./config/greetings')
const getRandom = require('./lib/get-random')
const getAnsatt = require('./lib/get-ansatt')
const getPolitiker = require('./lib/get-politiker')
const isJsFile = file => file.indexOf('.js') > -1
const validStatus = fs.readdirSync('lib/plugins/status/').filter(isJsFile).map((file) => file.replace('.js', ''))
const validStats = [
  'minelev',
  'skoleskyss',
  'tilskudd',
  'timerspart',
  'queue'
]

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

intents.matches(/^hei|hallo|heisann|hepp/i, [
  function (session) {
    session.send(getRandom(greetings))
    session.send(`Jeg er Botolf versjon ${pkg.version}`)
  }
])

intents.matches(/^stats|statistikk/i, [
  function (session) {
    builder.Prompts.text(session, 'Hva skal jeg finne statistikk for?')
  },
  function (session, results) {
    const stats = results.response.toString().toLocaleLowerCase()
    session.send(`Leter opp statistikk for ${stats}`)

    if (validStats.includes(stats)) {
      const statsMethod = require(`./lib/get-stats-${stats}`)
      statsMethod((error, data) => {
        if (error) {
          session.send('Beklager, noe gikk galt')
        } else {
          data.forEach((message) => {
            session.send(message)
          })
        }
      })
    } else {
      session.send(`Kunne ikke finne statistikk for ${stats}`)
    }
  }
])

intents.matches(/^status/i, [
  function (session) {
    builder.Prompts.text(session, 'Hva skal jeg sjekke status for?')
  },
  function (session, results) {
    const status = results.response.toString().toLocaleLowerCase()
    session.send(`Sjekker status for ${status}`)

    if (validStatus.includes(status)) {
      const statusMethod = require(`./lib/plugins/status/${status}`)
      statusMethod((error, data) => {
        if (error) {
          session.send('Beklager, noe gikk galt')
        } else {
          data.forEach((message) => {
            session.send(message)
          })
        }
      })
    } else {
      session.send(`Kunne ikke finne status for ${status}`)
    }
  }
])

intents.matches(/^brreg/i, [
  function (session) {
    builder.Prompts.text(session, 'Hva skal jeg søke etter i Brønnøysund?')
  },
  function (session, results) {
    session.send(`Søker etter ${results.response}`)
    brreg({query: results.response})
      .then((data) => {
        session.send(`${data.entries.length} treff`)
        data.entries.forEach((entry) => {
          session.send(JSON.stringify(entry))
        })
      })
      .catch((error) => {
        console.error(error)
        session.send('Noe gikk galt. Beklager')
      })
  }
])

intents.matches(/^(ansatt|ansatte)/i, [
  function (session) {
    builder.Prompts.text(session, 'Hvilken ansatt skal jeg finne?')
  },
  function (session, results) {
    session.send(`Søker etter ${results.response}`)
    getAnsatt(results.response, (error, data) => {
      if (error) {
        console.error(error)
        session.send('Noe gikk galt. Beklager')
      } else {
        session.send(`${data.length} treff`)
        data.forEach((entry) => {
          session.send(JSON.stringify(entry._source))
        })
      }
      const options = {
        title: 'Ansatte',
        url: 'https://search.portalen.t-fk.no',
        text: 'Søk ansatte på nettsiden'
      }
      const buttonCard = createHeroCardButton(session, options)
      const msg = new builder.Message(session).addAttachment(buttonCard)
      session.send(msg)
    })
  }
])

intents.matches(/^(politiker|politikere)/i, [
  function (session) {
    builder.Prompts.text(session, 'Hvilken politiker skal jeg finne?')
  },
  function (session, results) {
    session.send(`Søker etter ${results.response}`)
    getPolitiker(results.response, (error, data) => {
      if (error) {
        console.error(error)
        session.send('Noe gikk galt. Beklager')
      } else {
        session.send(`${data.length} treff`)
        data.forEach((entry) => {
          session.send(JSON.stringify(entry))
        })
      }
      const options = {
        title: 'Politikere',
        url: 'https://politikerservice.t-fk.no',
        text: 'Søk politikere på nettsiden'
      }
      const buttonCard = createHeroCardButton(session, options)
      const msg = new builder.Message(session).addAttachment(buttonCard)
      session.send(msg)
    })
  }
])

intents.onDefault((session) => {
  session.send(getRandom(cookies))
})

function createHeroCardButton (session, options) {
  return new builder.HeroCard(session)
    .title(options.title)
    .buttons([builder.CardAction.openUrl(session, options.url, options.text)])
}
