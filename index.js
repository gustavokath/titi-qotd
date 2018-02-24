const express = require('express')
const app = express()
const Telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')
const bodyParser = require('body-parser');
const quotesUtil = require('./quotes-util')
const bot = new Telegraf(process.env.TITI_TELEGRAM_KEY)
const telegram = new Telegram(process.env.TITI_TELEGRAM_KEY)
const chatId = process.env.TITI_CHAT_ID


var port = process.env.PORT || 3000
app.listen(port)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
console.log('Server running on port: ' + port)

if(process.env.RECAST_ENABLED === 'true'){
  console.log('Recast.AI enabled')
  const recast = require('./recast-ai')(app)
}

app.get('/quote', (req, res) => {
  var qouteText = quotesUtil.getQuote()
  console.log(qouteText)
  telegram.sendMessage(chatId, qouteText)
  res.send(qouteText)
})

app.get('/wake', (req, res) => {
  res.send('I\'m back!')
})

bot.command('/janet', (ctx) => ctx.reply('Hi I\'m Janet'))
bot.command('/nextQuote', (ctx) => {
  ctx.reply(quotesUtil.getQuote())
})
bot.startPolling()


