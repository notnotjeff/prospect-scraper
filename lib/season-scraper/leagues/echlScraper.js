const utils = require('../../utils')

module.exports = async function (prospect) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete ECHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const url = `https://www.echl.com/api/s3?q=player-${prospect.league_id}.json`
  const scrapedProspect = await utils.request.jsonRequest(url)

  const currentSeason = utils.date.getCurrentSeason()

  const season = scrapedProspect.data.stats.history.find(({ season: { name } }) => name === `${currentSeason} Regular Season`)

  if (season) {
    return {
      goals: +season?.properties?.[1]?.value,
      assists: +season?.properties?.[2]?.value,
      points: +season?.properties?.[3]?.value,
      shots: +season?.properties?.[11]?.value,
      games_played: +season?.properties?.[0]?.value,
    }
  } else {
    return { goals: null, assists: null, points: null, shots: null, games_played: null }
  }
}
