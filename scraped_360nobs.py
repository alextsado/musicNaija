from bs4 import BeautifulSoup
import urllib2

def getpage(url):
  page = urllib2.urlopen("{}".format(url))
  mainsoup = BeautifulSoup(page)
  a_tags = mainsoup.findAll('a', target="_blank")
  topten_a_tags = [i for i in a_tags if len(i.text.split()) > 1]
  
  i = 1
  top_ten_list = []
  for tag in topten_a_tags:
    try:
      subpage = urllib2.urlopen(tag['href'])
      tagtitle = tag.text
      subsoup = BeautifulSoup(subpage)
    except:
      continue
    for strong in subsoup.find('div',itemprop='articleBody').findAll('strong'):
      try:
        if not (strong.a.text or strong.a['href']):
          continue
        #if tagtitle.split('-')[:1].split()
        print i,tag['href'],"\n",strong.a.text,"\n",strong.a['href'].split('=')[-1],"\n\n"
        title_artist = strong.a.text
        download_url = strong.a['href'].split('  =')[-1]
        top_ten_list.append({'title':title_artist.split(' - ')[0].strip(),'artist':title_artist.split(' - ')[1].strip(),'download_url':download_url})
        i += 1
        #continue #HACK to limit to 1 item 
      except:
        continue
  return top_ten_list
