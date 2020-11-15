const utils = require('../../utils')

// EXAMPLE
// {
//   profile_url: "https://www.echl.com/api/s3?q=player-8849f569f3e47885f5a72d90.json",
//   games_url: "https://www.echl.com/api/s3?q=player-8849f569f3e47885f5a72d90.json",
//   league: "ECHL",
// }

module.exports = async function (prospect) {
  if (!prospect.statline_url) {
    throw new Error(`Cannot complete ECHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n statline_url`)
  }

  const scrapedProspect = await utils.request.jsonRequest(prospect.statline_url)

  const currentSeason = utils.date.getCurrentSeason()
  let goals = 0
  let assists = 0
  let points = 0
  let shots = 0
  let games_played = 0

  scrapedProspect.data.stats.history.forEach(season => {
    if (season.season.name === `${currentSeason} Regular Season`) {
      goals += season.properties[1].value
      assists += season.properties[2].value
      points += season.properties[3].value
      shots += season.properties[11].value
      games_played += season.properties[0].value
    }
  })

  return { goals, assists, points, shots, games_played }
}
