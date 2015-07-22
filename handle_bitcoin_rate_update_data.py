# -*- coding: utf-8 -*-
import urllib, urllib2, time

def update_data():
    url = 'http://www.moneysedge.com/update_bitcoin_rate?'
    current_time = time.strftime('%Y-%m-%d %H:%M:%S')
    today = time.strftime('%Y-%m-%d')
    values = { 'bitcoin_exchange_rate' : '!alantai_*bitcoin_%analysis',
            'current_time' : current_time,
            'today' : today,
            'bitfinex' : '267.45',
            'bitstamp' : '265.82',
            'btc_q' : '289.34',
            'btc_e' : '241.27',
            'bityes' : '256.92',
            'coindesk' : '247.72',
            'coinbase' : '287.37',
            'itbit' : '273.18',
            'lakebtc' : '273.01',
            'okcoin' : '277.19'}
            
    data = urllib.urlencode(values)
    data = data.encode('utf-8') # data should be bytes
    
    resp = urllib2.urlopen(url + data)
    print resp.read()
    resp.close()
    
    
if __name__ == "__main__":
    update_data()