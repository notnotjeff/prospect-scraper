const utils = require('../../utils')

// EXAMPLE QMJHL (set qmjhl_season_id globably in prospects.js based on current season_id)
// {
//   profile_url: "https://lscluster.hockeytech.com/feed/index.php?feed=widgetkit2&key=f322673b6bcae299&p=1&client_code=lhjmq&view=Teamstat&fmt=json&player_id=17871&lang=en&force_player=0&callback=json",
//   games_url: `https://lscluster.hockeytech.com/feed/index.php?feed=widgetkit2&key=f322673b6bcae299&client_code=lhjmq&view=Gamebygame&lang=en&season_id=${qmjhl_season_id}&fmt=json&dfdsfdsa=2fdsa&player_id=17871&force_player=0&callback=json`,
//   league: "QMJHL",
// }

module.exports = async function (prospect) {
  if (!prospect.statline_url) {
    throw new Error(`Cannot complete QMJHHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n statline_url`)
  }

  const scrapedProspect = await utils.jsonRequest(prospect.statline_url)

  const currentSeasonYear = utils.dateHelpers.getSeasonStartYear()
  const parsedProspect = JSON.parse(
    String(scrapedProspect)
      .match(/\((.*?)\)/)[0]
      .slice(1, -1),
  )
  const currentSeasons = parsedProspect.SiteKit.Teamstat.seasons.regular.filter(season => {
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
