'use strict'

const alexaSkillKit = require('alexa-skill-kit')
const MessageTemplate = require('alexa-message-builder')
const fetch = global.fetch = require('node-fetch')
const cc = require('cryptocompare')

const tokens = {
  bitcoin: 'BTC',
  litecoin: 'LTC',
  ethereum: 'ETH'
}

function cryptoSkill(event, context, callback) {
  console.log(event)

  alexaSkillKit(event, context, (message) => {
    if (message.intent.name === 'GetPrice') {
      const token = message.intent.slots.Coin.value

      if (Object.keys(tokens).indexOf(token.toLowerCase()) < 0) {
        return 'I can give you the info only for bitcoin, litecoin and ethereum'
      }

      return cc.price(tokens[token], 'EUR')
        .then(prices => `Current price of ${token} is ${prices.EUR} euros.`)
    }

    if (message.intent.name === 'HistoricalPrice') {
      const token = message.intent.slots.Coin.value
      const date = message.intent.slots.Date.value

      if (Object.keys(tokens).indexOf(token.toLowerCase()) < 0) {
        return 'I can give you the info only for bitcoin, litecoin and ethereum'
      }

      if (new Date(date) > new Date()) {
        return `Hey, I can't predict the future.`
      }

      return cc.priceHistorical(tokens[token], 'EUR', new Date(date))
        .then(prices => `${token} price was ${prices.EUR} euros on ${new Date(date).toDateString()}.`)
    }

    if (message.intent.name === "AmountInfo") {
      console.log(message.intent);
      return `You can get X coins`;
    }

    if (message.type === 'LaunchRequest') {
      return new MessageTemplate()
        .addText(`Hello from crypto currency bot.
          I can give you the info about bitcoin, litecoin and ethereum current and historical prices.
          How can I help you today?

          You can say:
          What is the current bitcoin price?
          What was the litecoin price yesterday?
          Or How many ethereums can I get for 10 euros?
        `)
        .addReprompt(`
          You can say:
          What is the current bitcoin price?
          What was the litecoin price yesterday?
          Or How many ethereums can I get for 10 euros?
        `)
        .keepSession()
        .get();
    }

    return new MessageTemplate()
      .addText(`
        Hm, not sure I understand the request.
        Please try again.

        You can say:
        What is the current bitcoin price?
        What was the litecoin price yesterday?
        Or How many ethereums can I get for 10 euros?
      `)
      .get();
  })
}

exports.handler = cryptoSkill