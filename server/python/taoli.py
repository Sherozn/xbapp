# -*- coding: utf-8 -*-

import requests
import simplejson as json
from requests.adapters import HTTPAdapter
# from json2table import convert


# URLS = {'QDII-E':'https://www.jisilu.cn/data/qdii/qdii_list/E?___jsl=LST___'}

URLS = {'QDII-E':'https://www.jisilu.cn/data/qdii/qdii_list/E?___jsl=LST___',
'QDII-C':'https://www.jisilu.cn/data/qdii/qdii_list/C?___jsl=LST___',
'QDII-A':'https://www.jisilu.cn/data/qdii/qdii_list/A?___jsl=LST___',
'LOF-STOCK':'https://www.jisilu.cn/data/lof/stock_lof_list/?___jsl=LST___',
'LOF-INDEX':'https://www.jisilu.cn/data/lof/index_lof_list/?___jsl=LST___'
}

ETFS = ['513050','159822','513080','513030','159941','513100','513500','513300',
        '513550','159920','159924','159823','510900','513660','513600','159960','513000','159963','513880','513680','513520','513900','513090']

# DCTAOLI = ['163406','163417','161005','162605','161903','169104','162703']

s = requests.Session()
s.verify = False
s.mount('http://', HTTPAdapter(max_retries=3))
s.mount('https://', HTTPAdapter(max_retries=3))


def root():
  records_you = []
  records_wu = []
  for name in URLS:
    resp = s.get(URLS[name])
    j = resp.json()
    arbitrage_list = j['rows']
    for item in arbitrage_list:
      discount_rt = item['cell']['discount_rt'].replace('%','')
      volume = item['cell']['volume']
      # print("volume",volume)
      if discount_rt != "-":
        # print(item['id']," ",discount_rt," ",volume)
        #无底仓套利
        if abs(float(discount_rt)) >= 4 and float(volume) > 500:
          new_items = new_item(item)
          records_wu.append(new_items)
        elif float(volume) > 5000 and abs(float(discount_rt)) >= 1:
          new_items = new_item(item)
          records_you.append(new_items)
          
  # 去重
  you = [i for i in records_you if i["id"] not in ETFS]
  wu = [i for i in records_wu if i["id"] not in ETFS]
  # print("you",you)
  # print("wu",wu)
  # 获得去除掉ETF基金的数组
  return you,wu

def new_item(item):
  # print(item)
  items = {}
  items["id"] = item["id"]
  items["fund_nm"] = item["cell"]["fund_nm"]
  items["discount_rt"] = item["cell"]["discount_rt"]
  # print(items)
  return items



if __name__ == '__main__':
  data = root()
  print(data)
