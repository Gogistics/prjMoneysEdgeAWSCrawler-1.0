var request = require('request');
request
  .get('http://www.moneysedge.com')
  .on('response', function(response) {
	  console.log(response.headers);
	  console.log(response.headers['set-cookie'][0]);
	  
	  var crsf_token = response.headers['set-cookie'][0];
	  console.log( crsf_token.substring(crsf_token.indexOf('=') + 1, crsf_token.indexOf(';')) );
	  
	  // request
	  request.post({
	  	url:'http://www.moneysedge.com/update_bitcoin_rate',
	  	form: { bitcoin_exchange_rate : { key : 'bitcoin_rate', value : '$274.28' } }}, function(err,httpResponse,body){
	  		console.log(body);
	  	});
  });
  