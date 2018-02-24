const Telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')
const bot = new Telegraf(process.env.TITI_TELEGRAM_KEY)
const quotesUtil = require('./quotes-util')
const telegram = new Telegram(process.env.TITI_TELEGRAM_KEY)
const chatId = process.env.TITI_CHAT_ID

module.exports = (app) => {
  app.get('/telegram/quote', (req, res) => {
    var qouteText = quotesUtil.getQuote()
    console.log(qouteText)
    telegram.sendMessage(chatId, qouteText)
    res.send(qouteText)
  })
}