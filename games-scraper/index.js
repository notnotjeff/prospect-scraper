const dotenv = require('dotenv')
const leagueScrapers = require('./leagues')

const LEAGUE_CODES = {
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
}

dotenv.config()

// Enter date in YYYY-MM-DD format
module.exports = async (prospect, date) => {
  const scraperName = LEAGUE_CODES[prospect.league]
  if (!scraperName) {
    throw new Error(`No scraper found for league: ${prospect.league}`)
  }

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
