const ahlScraper = require('./ahlScraper')
const cze2Scraper = require('./cze2Scraper')
const czeScraper = require('./czeScraper')
const khlScraper = require('./khlScraper')
const liigaScraper = require('./liigaScraper')
const mhlScraper = require('./mhlScraper')
const ncaaScraper = require('./ncaaScraper')
const ohlScraper = require('./ohlScraper')
const qmjhlScraper = require('./qmjhlScraper')
const shlScraper = require('./shlScraper')
const ushlScraper = require('./ushlScraper')
const vhlScraper = require('./vhlScraper')
const whlScraper = require('./whlScraper')

module.exports = {
  ohlScraper,
  whlScraper,
  qmjhlScraper,
  ahlScraper,
  ushlScraper,
  khlScraper,
  shlScraper,
  vhlScraper,
  ncaaScraper,
  liigaScraper,
  mhlScraper,
  cze2Scraper,
  czeScraper,
  leagueCodes: {
    OHL: 'ohlScraper',
    WHL: 'whlScraper',
    QMJHL: 'qmjhlScraper',
    AHL: 'ahlScraper',
    USHL: 'ushlScraper',
    KHL: 'khlScraper',
    SHL: 'shlScraper',
    VHL: 'vhlScraper',
    NCAA: 'ncaaScraper',
    Liiga: 'liigaScraper',
    MHL: 'mhlScraper',
    CZE: 'czeScraper',
    CZE2: 'cze2Scraper',
  },
}
