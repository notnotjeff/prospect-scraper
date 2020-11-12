const utils = require('../../utils')

// EXAMPLE PROSPECT.JS JSON
// {
//   league_id: '6748',
//   profile_url: null,
//   games_url: null,
//   league: 'BCHL',
// }

module.exports = async function (prospect) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete BCHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const url = `https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=${prospect.league_id}&site_id=1&key=ca4e9e599d4dae55&client_code=bchl&league_id=&lang=en&statsType=standard`
  const scrapedProspect = await utils.jsonRequest(url)

  const parsedProspect = JSON.parse(String(scrapedProspect).slice(1, -1))
  const seasons = parsedProspect.careerStats[0].sections[0].data
  const currentSeason = utils.getCurrentSeason()

  const season = seasons.find(({ row: { season_name } }) => season_name === `${currentSeason} Regular Season`)

  if (!season) {
    return { goals: 0, assists: 0, points: 0, shots: 0, games_played: 0 }
  }

  return {
    goals: +season.row.goals,
    assists: +season.row.assists,
    points: +season.row.points,
    shots: null,
    games_played: +season.row.games_played,
  }
}
