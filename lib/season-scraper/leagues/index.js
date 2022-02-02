const ohlScraper = require('./ohlScraper.js')
const whlScraper = require('./whlScraper.js')
const qmjhlScraper = require('./qmjhlScraper.js')
const ahlScraper = require('./ahlScraper.js')
const ushlScraper = require('./ushlScraper.js')
const echlScraper = require('./echlScraper.js')
const khlScraper = require('./khlScraper.js')
const shlScraper = require('./shlScraper.js')
const vhlScraper = require('./vhlScraper.js')
const ncaaScraper = require('./ncaaScraper.js')
const nlScraper = require('./nlScraper.js')
const liigaScraper = require('./liigaScraper.js')
const mestisScraper = require('./mestisScraper.js')
const cze2Scraper = require('./cze2Scraper.js')
const czeScraper = require('./czeScraper.js')
const allsvenskanScraper = require('./allsvenskanScraper.js')
const sarja20Scraper = require('./sarja20Scraper.js')
const mhlScraper = require('./mhlScraper.js')
const bchlScraper = require('./bchlScraper.js')
const wjcScraper = require('./wjcScraper.js')

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
  nlScraper,
  liigaScraper,
  mestisScraper,
  cze2Scraper,
  czeScraper,
  allsvenskanScraper,
  sarja20Scraper,
  mhlScraper,
  wjcScraper,
  leagueCodes: {
    OHL: 'ohlScraper',
    BCHL: 'bchlScraper',
    WHL: 'whlScraper',
    QMJHL: 'qmjhlScraper',
    AHL: 'ahlScraper',
    USHL: 'ushlScraper',
    NL: 'nlScraper',
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
    WJC: 'wjcScraper',
  },
}
