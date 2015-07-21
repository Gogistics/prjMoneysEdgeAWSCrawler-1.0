var request = require('request');
request
  .get('http://www.moneysedge.com/update_bitcoin_rate?bitcoin_exchange_rate=278.39')
  .on('response', function(error, response, body) {
	  console.log(response);
  });
  