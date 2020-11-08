const utils = require('../../utils')

// EXAMPLE WHL
// {
//   profile_url: "http://lscluster.hockeytech.com/feed/?feed=modulekit&view=player&key=41b145a848f4bd67&fmt=json&client_code=whl&lang=en&player_id=27355&category=seasonstats",
//   games_url: "http://lscluster.hockeytech.com/feed/?feed=modulekit&view=player&key=41b145a848f4bd67&fmt=json&client_code=whl&lang=en&player_id=27355&category=gamebygame",
//   league: "WHL",
// }

module.exports = async function (prospect) {
  if (!prospect.statline_url) {
    throw new Error(`Cannot complete WHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n statline_url`)
  }

  const scrapedProspect = await utils.jsonRequest(prospect.statline_url)

  const currentSeasonYear = utils.dateHelpers.getSeasonStartYear()
  const currentSeasons = scrapedProspect.SiteKit.Player.regular.filter(season => {
    return season.season_name.includes(currentSeasonYear.toString())
  })

  let goals = 0
  let assists = 0
  let points = 0
  let shots = 0
  let games_played = 0

  currentSeasons.forEach(season => {
    goals += season.goals === '-' ? 0 : +season.goals
    assists += +season.assists
    points += +season.points
    shots += +season.shots
    games_played += +season.games_played
  })

  return { goals, assists, points, shots, games_played }
}
