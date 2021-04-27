const utils = require('../../utils')

module.exports = async function (prospect, date) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete QMJHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const { day, month, year } = utils.date.setDateValues(date, { zeroPad: true })
  const monthName = utils.date.getMonthName(date.getMonth(), { isZeroIndexed: true })
  const url = `https://lscluster.hockeytech.com/feed/index.php?feed=widgetkit2&key=f322673b6bcae299&client_code=lhjmq&view=Gamebygame&lang=en&season_id=${process.env.QMJHL_SEASON_ID}&fmt=json&dfdsfdsa=2fdsa&player_id=${prospect.league_id}&force_player=0`
  const scrapedProspect = await utils.request.jsonRequest(url)

  const game = scrapedProspect?.SiteKit?.Gamebygame?.games[monthName]?.find(({ date_played }) => date_played === `${year}-${month}-${day}`)

  if (!game) {
    return null
  }

  return {
    first_name: prospect.first_name,
    last_name: prospect.last_name,
    league: prospect.league,
    goals: game.goals === '-' ? 0 : +game.goals,
    assists: game.assists === '-' ? 0 : +game.assists,
    points: game.points === '-' ? 0 : +game.points,
    shots: game.shots === '-' ? 0 : +game.shots,
    penalty_minutes: game.penalty_minutes === '-' ? 0 : +game.penalty_minutes,
    date: game.date_played,
  }
}
