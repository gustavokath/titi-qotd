const express = require('express')
var fs = require('fs');
const app = express()
const Telegraf = require('telegraf')
const telegram = require('telegraf/telegram')
var random = require("random-js")()
const quotesJson = JSON.parse(fs.readFileSync('quotes.json', 'utf8'))
const quotesArray = quotesJson.quotes
var quantQuotes = quotesArray.length
const bot = new Telegraf(process.env.TITI_TELEGRAM_KEY)

var port = process.env.PORT || 3000
app.listen(port)
console.log('Server running on port: ' + port)

bot.command('/janet', (ctx) => ctx.reply('Hi I\'m Janet'))
bot.command('/nextQuote', (ctx) => {
  ctx.reply(getQuote())
})
bot.startPolling()

function getNext(){
  var quoteIndex = random.integer(0, quantQuotes-1)
  return quotesArray[quoteIndex]
}

function formatQuote(quote){
  return quote.text + '\n - ' + quote.authors.join(', ')
}

function getQuote(){
  var quote = getNext()
  console.log(quote)
  return formatQuote(quote)
}


