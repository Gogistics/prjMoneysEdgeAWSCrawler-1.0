# -*- coding: utf-8 -*-
import urllib2, json, time

class BitcoinHandler():
    def __init__(self):
        self._coindesk_url = 'https://api.coindesk.com/v1/bpi/currentprice.json'
        self._coinbase_url = 'https://api.coinbase.com/v1/currencies/exchange_rates'
        self._bitstamp_url = 'https://www.bitstamp.net/api/ticker/'
        self._btc_e_url = 'https://btc-e.com/api/2/btc_usd/ticker'
        
    def get_coinbase_exchange_rate(self):
        resp = urllib2.urlopen(self._coinbase_url)
        content = json.loads( resp.read() )
        rate = '{0:.2f}'.format(float(content['btc_to_usd']))
        current_time = time.strftime('%Y-%m-%d %H:%M:%S')
        rate_info = { 'current_time' : current_time, 'rate' : rate}
        print rate

        today = time.strftime('%Y-%m-%d')
        file_name = "coinbase_exchange_rate_{current_date}.txt".format(current_date = today)
        file_path = "{path}{file_name}".format(path = '/var/www/prjTheEdge-Beta-1.0/media/static/frontend/files/bitcoin/coinbase/', file_name = file_name)
        self.save_data(file_path, json.dumps(rate_info))
        return content
        
    def get_coindesk_exchange_rate(self):
        resp = urllib2.urlopen(self._coindesk_url)
        content = json.loads( resp.read() )
        rate = '{0:.2f}'.format(float(content['bpi']['USD']['rate']))
        current_time = time.strftime('%Y-%m-%d %H:%M:%S')
        rate_info = { 'current_time' : current_time, 'rate' : rate}
        print rate

        today = time.strftime('%Y-%m-%d')
        file_name = "coindesk_exchange_rate_{current_date}.txt".format(current_date = today)
        file_path = "{path}{file_name}".format(path = '/var/www/prjTheEdge-Beta-1.0/media/static/frontend/files/bitcoin/coindesk/', file_name = file_name)
        self.save_data(file_path, json.dumps(rate_info))
        return content
        
    def get_bitstamp_exchange_rate(self):
        resp = urllib2.urlopen(self._bitstamp_url)
        content = json.loads( resp.read() )
        rate = '{0:.2f}'.format(float(content['last']))
        current_time = time.strftime('%Y-%m-%d %H:%M:%S')
        rate_info = { 'current_time' : current_time, 'rate' : rate}
        print rate

        today = time.strftime('%Y-%m-%d')
        file_name = "bitstamp_exchange_rate_{current_date}.txt".format(current_date = today)
        file_path = "{path}{file_name}".format(path = '/var/www/prjTheEdge-Beta-1.0/media/static/frontend/files/bitcoin/bitstamp/', file_name = file_name)
        self.save_data(file_path, json.dumps(rate_info))
        return content
        
    def get_btc_e_exchange_rate(self):
        resp = urllib2.urlopen(self._btc_e_url)
        content = json.loads( resp.read() )
        rate = '{0:.2f}'.format(float(content['ticker']['avg']))
        current_time = time.strftime('%Y-%m-%d %H:%M:%S')
        rate_info = { 'current_time' : current_time, 'rate' : rate}
        print rate

        today = time.strftime('%Y-%m-%d')
        file_name = "btc_e_exchange_rate_{current_date}.txt".format(current_date = today)
        file_path = "{path}{file_name}".format(path = '/var/www/prjTheEdge-Beta-1.0/media/static/frontend/files/bitcoin/btc_e/', file_name = file_name)
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
        
if __name__ == "__main__":
    bitcoin_handler = BitcoinHandler()
    bitcoin_handler.get_btc_e_exchange_rate()
    bitcoin_handler.get_coindesk_exchange_rate()
    bitcoin_handler.get_coinbase_exchange_rate()
    bitcoin_handler.get_bitstamp_exchange_rate()