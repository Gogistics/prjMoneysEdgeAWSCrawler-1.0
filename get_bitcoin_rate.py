# -*- coding: utf-8 -*-
import urllib, urllib2, json, time

class BitcoinHandler():
    def __init__(self):
        self._coindesk_url = 'https://api.coindesk.com/v1/bpi/currentprice.json'
        self._coinbase_url = 'https://api.coinbase.com/v1/currencies/exchange_rates'
        self._bitstamp_url = 'https://www.bitstamp.net/api/ticker/'
        self._btc_e_url = 'https://btc-e.com/api/2/btc_usd/ticker' # issue
        self._itbit_url = 'https://api.itbit.com/v1/markets/XBTUSD/ticker'
        self._lakebtc_url = 'https://www.lakebtc.com/api_v1/ticker'
        self._okcoin_url = 'https://www.okcoin.com/api/v1/ticker.do?symbol=btc_usd'
        self._bitfinex_url = 'https://api.bitfinex.com/v1/ticker/btcusd'
        # chinese platforms
        self._bityes_url = 'https://market.bityes.com/usd_btc/ticker.js'
        self._btc_q_url = 'https://www.btc-q.com/futuresApi/ticker.do'
        
        self._values = { 'bitcoin_exchange_rate' : '!alantai_*bitcoin_%analysis',
                        'current_time' : current_time,
                        'today' : today,
                        'bitfinex' : '$267.45',
                        'bitstamp' : '$265.82',
                        'btc_q' : '$289.34',
                        'btc_e' : '$241.27',
                        'bityes' : '$256.92',
                        'coindesk' : '$247.72',
                        'coinbase' : '$287.37',
                        'itbit' : '$273.18',
                        'lakebtc' : '$273.01',
                        'okcoin' : '$277.19' }
        
    def get_coinbase_exchange_rate(self):
        resp = urllib2.urlopen(self._coinbase_url)
        content = json.loads( resp.read() )
        rate = '{0:.2f}'.format(float(content['btc_to_usd']))
        current_time = time.strftime('%Y-%m-%d %H:%M:%S')
        rate_info = { 'current_time' : current_time, 'rate' : rate}
        resp.close()

        today = time.strftime('%Y-%m-%d')
        file_name = "coinbase_exchange_rate_{current_date}.txt".format(current_date = today)
        file_path = "{path}{file_name}".format(path = '/my_apps/apps_moneysedge/files/bitcoin/coinbase/', file_name = file_name)
        self.save_data(file_path, json.dumps(rate_info))
        return content
        
    def get_coindesk_exchange_rate(self):
        resp = urllib2.urlopen(self._coindesk_url)
        content = json.loads( resp.read() )
        rate = '{0:.2f}'.format(float(content['bpi']['USD']['rate']))
        current_time = time.strftime('%Y-%m-%d %H:%M:%S')
        rate_info = { 'current_time' : current_time, 'rate' : rate}
        resp.close()

        today = time.strftime('%Y-%m-%d')
        file_name = "coindesk_exchange_rate_{current_date}.txt".format(current_date = today)
        file_path = "{path}{file_name}".format(path = '/my_apps/apps_moneysedge/files/bitcoin/coindesk/', file_name = file_name)
        self.save_data(file_path, json.dumps(rate_info))
        return content
        
    def get_bitstamp_exchange_rate(self):
        resp = urllib2.urlopen(self._bitstamp_url)
        content = json.loads( resp.read() )
        rate = '{0:.2f}'.format(float(content['last']))
        current_time = time.strftime('%Y-%m-%d %H:%M:%S')
        rate_info = { 'current_time' : current_time, 'rate' : rate}
        resp.close()

        today = time.strftime('%Y-%m-%d')
        file_name = "bitstamp_exchange_rate_{current_date}.txt".format(current_date = today)
        file_path = "{path}{file_name}".format(path = '/my_apps/apps_moneysedge/files/bitcoin/bitstamp/', file_name = file_name)
        self.save_data(file_path, json.dumps(rate_info))
        return content
        
    def get_btc_e_exchange_rate(self):
        resp = urllib2.urlopen(self._btc_e_url)
        content = json.loads( resp.read() )
        rate = '{0:.2f}'.format(float(content['ticker']['avg']))
        current_time = time.strftime('%Y-%m-%d %H:%M:%S')
        rate_info = { 'current_time' : current_time, 'rate' : rate}
        resp.close()

        today = time.strftime('%Y-%m-%d')
        file_name = "btc_e_exchange_rate_{current_date}.txt".format(current_date = today)
        file_path = "{path}{file_name}".format(path = '/my_apps/apps_moneysedge/files/bitcoin/btc_e/', file_name = file_name)
        self.save_data(file_path, json.dumps(rate_info))
        return content
        
    # itbit
    def get_itbit_exchange_rate(self):
        resp = urllib2.urlopen(self._itbit_url)
        content = json.loads( resp.read() )
        rate = '{0:.2f}'.format(float(content['lastPrice']))
        current_time = time.strftime('%Y-%m-%d %H:%M:%S')
        rate_info = { 'current_time' : current_time, 'rate' : rate}
        resp.close()

        today = time.strftime('%Y-%m-%d')
        file_name = "itbit_exchange_rate_{current_date}.txt".format(current_date = today)
        file_path = "{path}{file_name}".format(path = '/my_apps/apps_moneysedge/files/bitcoin/itbit/', file_name = file_name)
        self.save_data(file_path, json.dumps(rate_info))
        return content
        
    # lakebtc
    def get_lakebtc_exchange_rate(self):
        resp = urllib2.urlopen(self._lakebtc_url)
        content = json.loads( resp.read() )
        rate = '{0:.2f}'.format(float(content['USD']['last']))
        current_time = time.strftime('%Y-%m-%d %H:%M:%S')
        rate_info = { 'current_time' : current_time, 'rate' : rate}
        resp.close()

        today = time.strftime('%Y-%m-%d')
        file_name = "lakebtc_exchange_rate_{current_date}.txt".format(current_date = today)
        file_path = "{path}{file_name}".format(path = '/my_apps/apps_moneysedge/files/bitcoin/lakebtc/', file_name = file_name)
        self.save_data(file_path, json.dumps(rate_info))
        return content
        
    # okcoin
    def get_okcoin_exchange_rate(self):
        resp = urllib2.urlopen(self._okcoin_url)
        content = json.loads( resp.read() )
        rate = '{0:.2f}'.format(float(content['ticker']['last']))
        current_time = time.strftime('%Y-%m-%d %H:%M:%S')
        rate_info = { 'current_time' : current_time, 'rate' : rate}
        resp.close()

        today = time.strftime('%Y-%m-%d')
        file_name = "okcoin_exchange_rate_{current_date}.txt".format(current_date = today)
        file_path = "{path}{file_name}".format(path = '/my_apps/apps_moneysedge/files/bitcoin/okcoin/', file_name = file_name)
        self.save_data(file_path, json.dumps(rate_info))
        return content    
        
    def get_bitfinex_exchange_rate(self):
        resp = urllib2.urlopen(self._bitfinex_url)
        content = json.loads( resp.read() )
        rate = '{0:.2f}'.format(float(content['last_price']))
        current_time = time.strftime('%Y-%m-%d %H:%M:%S')
        rate_info = { 'current_time' : current_time, 'rate' : rate}
        resp.close()

        today = time.strftime('%Y-%m-%d')
        file_name = "bitfinex_exchange_rate_{current_date}.txt".format(current_date = today)
        file_path = "{path}{file_name}".format(path = '/my_apps/apps_moneysedge/files/bitcoin/bitfinex/', file_name = file_name)
        self.save_data(file_path, json.dumps(rate_info))
        return content
        
    def get_bityes_exchange_rate(self):
        site = self._bityes_url
        hdr = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
               'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
               'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
               'Accept-Encoding': 'none',
               'Accept-Language': 'en-US,en;q=0.8',
               'Connection': 'keep-alive'}
        req = urllib2.Request(site, headers=hdr)
               
        resp = urllib2.urlopen(req)
        content = json.loads( resp.read() )
        rate = '{0:.2f}'.format(float(content['ticker']['last']))
        current_time = time.strftime('%Y-%m-%d %H:%M:%S')
        rate_info = { 'current_time' : current_time, 'rate' : rate}
        resp.close()

        today = time.strftime('%Y-%m-%d')
        file_name = "bityes_exchange_rate_{current_date}.txt".format(current_date = today)
        file_path = "{path}{file_name}".format(path = '/my_apps/apps_moneysedge/files/bitcoin/bityes/', file_name = file_name)
        self.save_data(file_path, json.dumps(rate_info))
        return content
        
    def get_btc_q_exchange_rate(self):
        resp = urllib2.urlopen(self._btc_q_url)
        content = json.loads( resp.read() )
        rate = '{0:.2f}'.format(float(content['ticker'][0]['last']))
        current_time = time.strftime('%Y-%m-%d %H:%M:%S')
        rate_info = { 'current_time' : current_time, 'rate' : rate}
        resp.close()

        today = time.strftime('%Y-%m-%d')
        file_name = "btc_q_exchange_rate_{current_date}.txt".format(current_date = today)
        file_path = "{path}{file_name}".format(path = '/my_apps/apps_moneysedge/files/bitcoin/btc_q/', file_name = file_name)
        self.save_data(file_path, json.dumps(rate_info))
        return content
        
    def save_data(self, arg_file_path, arg_data):
        try:
            with open(arg_file_path, 'a') as f:
                f.write(arg_data + '\n')
                return True
        except BaseException as e:
            print("Error on_data: %s" % str(e))
        return True
        
    def update_bitcoin_exchange_rate(self, arg_url_with_query):
        resp = urllib2.urlopen(arg_url_with_query)
        print resp.read()
        resp.close()
        
if __name__ == "__main__":
    try:
        bitcoin_handler = BitcoinHandler()
        bitcoin_handler.get_coindesk_exchange_rate()
        bitcoin_handler.get_coinbase_exchange_rate()
        bitcoin_handler.get_bitstamp_exchange_rate()
        bitcoin_handler.get_bitfinex_exchange_rate()
        bitcoin_handler.get_btc_q_exchange_rate()
        bitcoin_handler.get_btc_e_exchange_rate()
        bitcoin_handler.get_bityes_exchange_rate()
        bitcoin_handler.get_itbit_exchange_rate()
        bitcoin_handler.get_lakebtc_exchange_rate()
        bitcoin_handler.get_okcoin_exchange_rate()
        
        # update data in web server
        
    except urllib2.HTTPError, err:
        print err
    