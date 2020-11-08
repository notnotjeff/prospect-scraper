const utils = require('../../utils')

// EXAMPLE PROSPECT.JS JSON
// {
//   profile_url: "https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=6966&site_id=1&key=50c2cd9b5e18e390&client_code=ahl&league_id=&lang=en&statsType=standard&callback=json",
//   games_url: "https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=6966&site_id=1&key=50c2cd9b5e18e390&client_code=ahl&league_id=&lang=en&statsType=standard&callback=json",
//   league: "AHL",
// }

module.exports = async function (prospect) {
  if (!prospect.statline_url) {
    throw new Error(`Cannot complete AHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n statline_url`)
  }

  const scrapedProspect = await utils.jsonRequest(prospect.statline_url)

  const parsedProspect = JSON.parse(String(scrapedProspect).slice(5, -1))
  const seasons = parsedProspect.careerStats[0].sections[0].data

  const currentSeason = utils.getCurrentSeason()
  const currentSeasons = seasons.filter(season => {
    return season.row.season_name === `${currentSeason} Regular Season`
  })

  let goals = 0
  let assists = 0
  let points = 0
  let shots = 0
  let games_played = 0

  currentSeasons.forEach(season => {
    goals += +season.row.goals
    assists += +season.row.assists
    points += +season.row.points
    shots += +season.row.shots
    games_played += +season.row.games_played
  })

  return { goals, assists, points, shots, games_played }
}
