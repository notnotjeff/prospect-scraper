const dotenv = require('dotenv')
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

// Enter date in YYYY-MM-DD format
module.exports = async (prospect, dateParam = null) => {
  const scraperName = LEAGUE_CODES[prospect.league]
  if (!scraperName) {
    throw new Error(`No scraper found for league: ${prospect.league}`)
  }

  const date = dateParam ? new Date(`${dateParam} 12:00:00`) : new Date()
  const gameData = await leagueScrapers[scraperName](prospect, date)

  if (!gameData) {
    return null
  }

  return {
    first_name: prospect.first_name,
    last_name: prospect.last_name,
    league: prospect.league,
    date,
    ...gameData,
  }
}
