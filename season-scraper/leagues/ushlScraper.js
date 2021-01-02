const utils = require('../../utils')

module.exports = async function (prospect) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete USHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const url = `https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=${prospect.league_id}&site_id=0&key=e828f89b243dc43f&client_code=ushl&league_id=&lang=en&statsType=standard&callback=json`
  const scrapedProspect = await utils.request.jsonRequest(url)

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
