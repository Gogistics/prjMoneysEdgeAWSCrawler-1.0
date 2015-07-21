var request = require('request');
request
  .get('http://www.moneysedge.com')
  .on('response', function(response) {
	  
    console.log(response.headers)
    console.log(response.headers.cookie)
  });
  
  /*
request.post({
	url:'http://www.moneysedge.com/update_bitcoin_rate',
	form: { bitcoin_exchange_rate : { key : 'bitcoin_rate', value : '$274.28' } }}, function(err,httpResponse,body){
		console.log(body);
	});
  */