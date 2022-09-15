from urllib.request import urlopen
from bs4 import BeautifulSoup

class ScrapeUrl:

    def __init__(self, url: str):
        self.url = url

    def get_bs_obj(self):
        "Extract the html and create a BSoup obj from it."
        html = urlopen(self.url)
        bsObj = BeautifulSoup(html, features="html.parser")
        return bsObj


    def scrape(self) -> str:
        bsObj = self.get_bs_obj()

        context=""
        for item in bsObj.find_all(['p', 'span']):

            item_text = item.get_text()

            if len(item_text.strip()) > 40:
                context += "{} ".format(item_text)
        
        return context


def scrape_url(url: str) -> str:
    scraper = ScrapeUrl(url)
    context = scraper.scrape()

    return context