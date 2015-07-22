var request = require('request');
var request_str = '?bitcoin_exchange_rate=!alantai_*bitcoin_%analysis&bitfinex=$234.89&bitstamp=$267.32&btc_e=$287.21&btc_q=$267.98&bityes=256.73&coinbase=$278.33&coindesk=$276.38&itbit=$278.23&lakebtc=$254.38&okcoin=$233.87',
	request_url = 'http://moneysedge.com/update_bitcoin_rate' + request_str;
request( request_url, function (error, response, body) {
  	if (!error && response.statusCode == 200) {
    	console.log(body) // Show the HTML for the Google homepage.
  	}
});