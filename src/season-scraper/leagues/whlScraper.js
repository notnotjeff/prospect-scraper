const utils = require('../../utils')

module.exports = async function (prospect) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete WHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const url = `http://lscluster.hockeytech.com/feed/?feed=modulekit&view=player&key=41b145a848f4bd67&fmt=json&client_code=whl&lang=en&player_id=${prospect.league_id}&category=seasonstats`
  const scrapedProspect = await utils.request.jsonRequest(url)

  const currentSeasonYear = utils.date.getSeasonStartYear()
  const season = scrapedProspect?.SiteKit?.Player?.regular?.find(season => {
    return season.season_name.includes(currentSeasonYear.toString())
  })

  if (season) {
    return {
      goals: season.goals === '-' ? 0 : +season.goals,
      assists: season.assists === '-' ? 0 : +season.assists,
      points: season.points === '-' ? 0 : +season.points,
      shots: season.shots === '-' ? 0 : +season.shots,
      games_played: season.games_played === '-' ? 0 : +season.games_played,
    }
  } else {
    return { goals: null, assists: null, points: null, shots: null, games_played: null }
  }
}
