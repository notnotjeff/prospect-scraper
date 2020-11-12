const ohlScraper = require('./ohl_scraper.js')
const whlScraper = require('./whl_scraper.js')
const qmjhlScraper = require('./qmjhl_scraper.js')
const ahlScraper = require('./ahl_scraper.js')
const ushlScraper = require('./ushl_scraper.js')
const echlScraper = require('./echl_scraper.js')
const khlScraper = require('./khl_scraper.js')
const shlScraper = require('./shl_scraper.js')
const vhlScraper = require('./vhl_scraper.js')
const ncaaScraper = require('./ncaa_scraper.js')
const nlaScraper = require('./nla_scraper.js')
const liigaScraper = require('./liiga_scraper.js')
const mestisScraper = require('./mestis_scraper.js')
const cze2Scraper = require('./cze2_scraper.js')
const czeScraper = require('./cze_scraper.js')
const allsvenskanScraper = require('./allsvenskan_scraper.js')
const sarja20Scraper = require('./sarja20_scraper.js')
const mhlScraper = require('./mhl_scraper.js')
const bchlScraper = require('./bchl_scraper.js')

module.exports = {
  ohlScraper,
  bchlScraper,
  whlScraper,
  qmjhlScraper,
  ahlScraper,
  ushlScraper,
  echlScraper,
  khlScraper,
  shlScraper,
  vhlScraper,
  ncaaScraper,
  nlaScraper,
  liigaScraper,
  mestisScraper,
  cze2Scraper,
  czeScraper,
  allsvenskanScraper,
  sarja20Scraper,
  mhlScraper,
  leagueCodes: {
    OHL: 'ohlScraper',
    BCHL: 'bchlScraper',
    WHL: 'whlScraper',
    QMJHL: 'qmjhlScraper',
    AHL: 'ahlScraper',
    USHL: 'ushlScraper',
    NLA: 'nlaScraper',
    KHL: 'khlScraper',
    ECHL: 'echlScraper',
    SHL: 'shlScraper',
    VHL: 'vhlScraper',
    NCAA: 'ncaaScraper',
    Liiga: 'liigaScraper',
    Mestis: 'mestisScraper',
    CZE2: 'cze2Scraper',
    CZE: 'czeScraper',
    Allsv: 'allsvenskanScraper',
    Sarja20: 'sarja20Scraper',
    MHL: 'mhlScraper',
  },
}
