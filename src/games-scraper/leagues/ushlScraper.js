const utils = require('../../utils')

module.exports = async function (prospect, date) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete USHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const { day, month, year } = utils.date.setDateValues(date, { zeroPad: true })
  const url = `https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=${prospect.league_id}&site_id=0&key=e828f89b243dc43f&client_code=ushl&league_id=&lang=en&statsType=standard`

  const scrapedProspect = await utils.request.jsonRequest(url)

  const parsedProspect = JSON.parse(String(scrapedProspect).slice(1, -1))
  const game = parsedProspect?.gameByGame[0]?.sections[0]?.data?.find(({ row: { date_played } }) => date_played === `${year}-${month}-${day}`)

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
