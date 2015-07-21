var request = require('request');
request
  .get('http://www.moneysedge.com')
  .on('response', function(response) {
	  var crsf_token = response.headers['set-cookie'][0];
	  crsf_token = crsf_token.substring(crsf_token.indexOf('=') + 1, crsf_token.indexOf(';'));
	  console.log(crsf_token);
	  
	  // request
	  request.post({
	  	url :'http://www.moneysedge.com/update_bitcoin_rate',
		data : { csrfmiddlewaretoken : crsf_token },
	  	form : { csrfmiddlewaretoken : crsf_token, bitcoin_exchange_rate : { key : 'bitcoin_rate', value : '$274.28' } }}, function(err,httpResponse,body){
	  		console.log(body);
	  	});
  });
  