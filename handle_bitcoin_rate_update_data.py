# -*- coding: utf-8 -*-
import urllib, urllib2

def update_data():
    url = 'http://www.moneysedge.com/update_bitcoin_rate'
    values = { 'bitcoin_exchange_rate' : '!alantai_*bitcoin_%analysis',
            'bitfinex' : '$267.45'}
            
    data = urllib.urlencode(values)
    data = data.encode('utf-8') # data should be bytes
    
    resp = urllib2.urlopen(url + data)
    print resp.read()
    resp.close()
    
    
if __name__ == "__main__":
    update_data()