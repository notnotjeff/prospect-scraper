const utils = require('../../utils')

// EXAMPLE
// {
//   profile_url: "https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=7631&site_id=0&key=e828f89b243dc43f&client_code=ushl&league_id=&lang=en&statsType=standard&callback=json",
//   games_url: "https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=7631&season_id=67&site_id=0&key=e828f89b243dc43f&client_code=ushl&league_id=&lang=en&statsType=standard&callback=json",
//   league: "USHL",
// }

module.exports = async function (prospect) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete USHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const scrapedProspect = await utils.request.jsonRequest(prospect.statline_url)

  const parsedProspect = JSON.parse(String(scrapedProspect).slice(5, -1))
  const seasons = parsedProspect.careerStats[0].sections[0].data

  const currentSeason = utils.date.getCurrentSeason()
  const season = seasons.find(season => {
    return season.row.season_name === `${currentSeason}`
  })

  if (season) {
    return {
      goals: +season.row.goals,
      assists: +season.row.assists,
      points: +season.row.points,
      shots: +season.row.shots,
      games_played: +season.row.games_played,
    }
  } else {
    return { goals: null, assists: null, points: null, shots: null, games_played: null }
  }
}
