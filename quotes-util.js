const fs = require('fs');
const quotesJson = JSON.parse(fs.readFileSync('quotes.json', 'utf8'))
const quotesArray = quotesJson.quotes
const random = require("random-js")()
var quantQuotes = quotesArray.length

module.exports = {
  getQuote: function () {
    var quote = getNext()
    console.log(quote)
    return formatQuote(quote)
  }
};

function getNext(){
  var quoteIndex = random.integer(0, quantQuotes-1)
  return quotesArray[quoteIndex]
}

function formatQuote(quote){
  return quote.text + '\n - ' + quote.authors.join(', ')
}