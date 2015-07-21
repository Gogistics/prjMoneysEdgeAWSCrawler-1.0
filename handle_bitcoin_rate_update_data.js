var request = require('request');
request
  .get('http://www.moneysedge.com')
  .on('response', function(response) {
    	console.log(response.headers)
	  	console.log(response.headers['set-cookie'])
  });
var cookie_jar = request.jar();
  

request.post({
	url:'http://www.moneysedge.com/update_bitcoin_rate',
	jar: cookie_jar,
	form: { bitcoin_exchange_rate : { key : 'bitcoin_rate', value : '$274.28' } }}, function(err,httpResponse,body){
		console.log(body);
	});