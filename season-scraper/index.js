const dotenv = require('dotenv')
const utils = require('../utils')
const leagueScrapers = require('./leagues')

dotenv.config()

module.exports = async prospect => {
  const scraperName = leagueScrapers.leagueCodes[prospect.league]
  if (!scraperName) {
    throw new Error(`No scraper found for league: ${prospect.league}`)
  }

  const countingStats = await leagueScrapers[scraperName](prospect)
  const rateStats = utils.calculation.scoringRates(countingStats)
  const age = utils.calculation.ageOnDate(prospect.dob)

  return {
    ...prospect,
    age,
    ...countingStats,
    ...rateStats,
  }
}
