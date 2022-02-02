const utils = require('../../utils')

module.exports = async function (prospect, date) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete AHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const { day, month, year } = utils.date.setDateValues(date, { zeroPad: true })
  const url = `https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=${prospect.league_id}&site_id=1&key=50c2cd9b5e18e390&client_code=ahl&league_id=&lang=en&statsType=standard&callback=json`

  const scrapedProspect = await utils.request.jsonRequest(url)

  const parsedProspect = JSON.parse(String(scrapedProspect).slice(5, -1))
  const game = parsedProspect.gameByGame[0].sections[0].data.find(g => g.row.date_played === `${year}-${month}-${day}`)

  if (!game) {
    return null
  }

  return {
    first_name: prospect.first_name,
    last_name: prospect.last_name,
    league: prospect.league,
    goals: +game.row.goals,
    assists: +game.row.assists,
    points: +game.row.points,
    shots: +game.row.shots,
    penalty_minutes: +game.row.penalty_minutes,
    date: game.row.date_played,
  }
}
