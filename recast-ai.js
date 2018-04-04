const quotesUtil = require('./quotes-util')

module.exports = (app) => {
  app.post('/recast-ai/quote', (req, res) => {
    console.log(req);
    var intent = getBestIntent(req.body.nlp.intents);
    if(intent === 'new-quote'){
      res.send({
        replies: [{
          type: 'text',
          content: quotesUtil.getQuote()
        }]
      })
    }else{
      res.end()
    }
  })
}

function getBestIntent(intentsList){
  if(intentsList === undefined){
    return undefined
  }
  var intent = undefined;
  var confidence = 0;
  for(var i=0;i<intentsList.length;i++){
    var currentIntent = intentsList[i];
    if(confidence < currentIntent.confidence){
      intent = currentIntent.slug;
      confidence = currentIntent.confidence;
    }
  }
  return intent;
}