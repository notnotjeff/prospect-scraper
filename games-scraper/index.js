const dotenv = require('dotenv')
const leagueScrapers = require('./leagues')

dotenv.config()

module.exports = async (prospect, date) => {
  const scraperName = leagueScrapers.leagueCodes[prospect.league]
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
