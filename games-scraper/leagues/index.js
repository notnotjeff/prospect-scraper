const ahlScraper = require('./ahlScraper')
const bchlScraper = require('./bchlScraper')
const cze2Scraper = require('./cze2Scraper')
const czeScraper = require('./czeScraper')
const echlScraper = require('./echlScraper')
const khlScraper = require('./khlScraper')
const liigaScraper = require('./liigaScraper')
const mestisScraper = require('./mestisScraper')
const mhlScraper = require('./mhlScraper')
const ncaaScraper = require('./ncaaScraper')
const ohlScraper = require('./ohlScraper')
const qmjhlScraper = require('./qmjhlScraper')
const sarja20Scraper = require('./sarja20Scraper')
const shlScraper = require('./shlScraper')
const ushlScraper = require('./ushlScraper')
const vhlScraper = require('./vhlScraper')
const whlScraper = require('./whlScraper')
const wjcScraper = require('./wjcScraper')

module.exports = {
  ohlScraper,
  bchlScraper,
  echlScraper,
  whlScraper,
  qmjhlScraper,
  ahlScraper,
  mestisScraper,
  ushlScraper,
  khlScraper,
  shlScraper,
  vhlScraper,
  sarja20Scraper,
  ncaaScraper,
  liigaScraper,
  mhlScraper,
  cze2Scraper,
  czeScraper,
  wjcScraper,
  leagueCodes: {
    OHL: 'ohlScraper',
    BCHL: 'bchlScraper',
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
    Mestis: 'mestisScraper',
    Sarja20: 'sarja20Scraper',
    WJC: 'wjcScraper',
    ECHL: 'echlScraper',
  },
}
