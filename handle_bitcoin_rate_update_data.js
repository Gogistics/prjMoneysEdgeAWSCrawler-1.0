var request = require('request');
request
  .get('http://www.moneysedge.com/update_bitcoin_rate?bitcoin_exchange_rate=278.39')
  .on('response', function(response) {
	  var crsf_token = response.headers['set-cookie'][0];
	  crsf_token = crsf_token.substring(crsf_token.indexOf('=') + 1, crsf_token.indexOf(';'));
	  console.log(crsf_token);
  });
  