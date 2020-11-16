const utils = require('../../utils')

// EXAMPLE PROSPECT.JS JSON
// {
//   league_id: '7314',
//   profile_url: null,
//   games_url: null,
//   league: "AHL",
// }

module.exports = async function (prospect) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete AHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const url = `https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=${prospect.league_id}&site_id=1&key=50c2cd9b5e18e390&client_code=ahl&league_id=&lang=en&statsType=standard&callback=json`
  const scrapedProspect = await utils.request.jsonRequest(url)

  const parsedProspect = JSON.parse(String(scrapedProspect).slice(5, -1))
  const seasons = parsedProspect.careerStats[0].sections[0].data

  const currentSeason = utils.date.getCurrentSeason()
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
