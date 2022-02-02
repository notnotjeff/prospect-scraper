const utils = require('../../utils')

module.exports = async function (prospect) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete QMJHHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const url = `https://lscluster.hockeytech.com/feed/index.php?feed=widgetkit2&key=f322673b6bcae299&p=1&client_code=lhjmq&view=Teamstat&fmt=json&player_id=${prospect.league_id}&lang=en&force_player=0&callback=json`
  const scrapedProspect = await utils.request.jsonRequest(url)

  const currentSeasonYear = utils.date.getSeasonStartYear()
  const parsedProspect = JSON.parse(
    String(scrapedProspect)
      .match(/\((.*?)\)/)[0]
      .slice(1, -1),
  )
  const season = parsedProspect?.SiteKit?.Teamstat?.seasons?.regular?.find(season => {
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
