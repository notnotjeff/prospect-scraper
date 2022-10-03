const utils = require('../../utils')

module.exports = async function (prospect, date) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete Liiga scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const currentSeason = utils.date.getCurrentSeason('YYYY-YYYY').split('-')[1]
  const { day, month, year } = utils.date.setDateValues(date, { zeroPad: true })
  const url = `https://liiga.fi/api/v1/players/info/${prospect.league_id}/games/${currentSeason}`

  const gameData = await utils.request.jsonRequest(url)
  const games = [...gameData.regular, ...gameData.playoffs]
  const game = games.find(({ date: gameDateString }) => {
    const gameDate = new Date(gameDateString)
    return (date.getFullYear() === gameDate.getFullYear() &&
    date.getMonth() === gameDate.getMonth() &&
    date.getDate() === gameDate.getDate())
  })

  if (!game) {
    return null
  }

  return {
    first_name: prospect.first_name,
    last_name: prospect.last_name,
    league: prospect.league,
    goals: game?.goals,
    assists: game?.assists,
    points: game?.totalPoints,
    shots: game?.shots,
    penalty_minutes: game?.penaltyMinutes,
    date: `${year}-${month}-${day}`,
  }
}
