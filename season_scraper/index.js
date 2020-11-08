const dotenv = require('dotenv')
const utils = require('../utils')
const leagueScrapers = require('./leagues')

const LEAGUE_CODES = {
  OHL: 'ohlScraper',
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
  CZE2: 'czech2Scraper',
  Allsv: 'allsvenskanScraper',
  Sarja20: 'sarja20Scraper',
  MHL: 'mhlScraper',
}

dotenv.config()

module.exports = async prospect => {
  const scraperName = LEAGUE_CODES[prospect.league]
  if (!scraperName) {
    throw new Error(`No scraper found for league: ${prospect.league}`)
  }

  const countingStats = await leagueScrapers[scraperName](prospect)
  const rateStats = utils.calculateRates(countingStats)
  const age = utils.getAge(prospect.dob)

  return {
    ...prospect,
    age,
    ...countingStats,
    ...rateStats,
  }
}
