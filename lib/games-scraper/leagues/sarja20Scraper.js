const utils = require('../../utils')

module.exports = async function (prospect, date) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete Sarja20 scrape, prospect is missing: \n league_id`)
  }

  const currentSeason = utils.date.getCurrentSeason('YYYY-YYYY').split('-')[1]
  const { day, month, year } = utils.date.setDateValues(date, { zeroPad: true })
  const url = `https://www.leijonat.fi/modules/mod_playercardseriestats/helper/getplayerseriestats3.php?lkq=${prospect.league_id}&season=${currentSeason}&isgoalie=0&isskater=1`

  const scrapedProspect = await utils.request.jsonRequest(url)

  const game = scrapedProspect?.AllSkaterGames?.find(({ GameDate: gameDate }) => gameDate === `${day}.${month}.${year}`)

  if (!game) {
    return null
  }

  return {
    first_name: prospect.first_name,
    last_name: prospect.last_name,
    league: prospect.league,
    goals: +game.SkaterGoals,
    assists: +game.SkaterAssists,
    points: +game.SkaterPoints,
    shots: null,
    penalty_minutes: +game.SkaterPenMinutes,
    date: `${year}-${month}-${day}`,
  }
}
