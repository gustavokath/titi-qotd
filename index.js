const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const quotesUtil = require('./quotes-util')

var port = process.env.PORT || 3000
app.listen(port)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
console.log('Server running on port: ' + port)

if(process.env.RECAST_ENABLED === 'true'){
  console.log('Recast.AI enabled')
  const recast = require('./recast-ai')(app)
}

if(process.env.TELEGRAM_ENABLED === 'true'){
  console.log('Telegram enabled')
  const telegram = require('./telegram')(app)
}

app.get('/quote', (req, res) => {
  var quoteText = quotesUtil.getQuote()
  console.log(quoteText)
  res.send(quoteText)
})

app.get('/wake', (req, res) => {
  res.send('I\'m back!')
})


