const requestUtils = require('../../utils/request')
const dateUtils = require('../../utils/date')

const findGameId = async (prospect, dateObject) => {
  const teamScheduleUrl = `https://www.echl.com/api/s3?q=schedule-${prospect.season_id}-${prospect.team_id}.json`
  const teamSchedule = await requestUtils.jsonRequest(teamScheduleUrl)
  const dateRegex = new RegExp(`${dateObject.year}-${dateObject.month}-${dateObject.day}`)
  const gameData = teamSchedule.data.find(g => {
    const startDate = new Date(new Date(g.startDate).getTime() + -300 * 60 * 1000)
    const { year, month, day } = dateUtils.setDateValues(startDate, { zeroPad: true })
    return `${year}-${month}-${day}`.match(dateRegex)?.length
  })
  const gameId = gameData?._entityId
  const isHomeTeam = gameData?.teams?.home?._entityId === prospect.team_id

  return [gameId, isHomeTeam]
}

const findGameStats = async (prospect, gameId, isHomeTeam) => {
  const gameUrl = `https://www.echl.com/api/s3/live?q=match-${gameId}-players-comparison.json`
  const gameData = await requestUtils.jsonRequest(gameUrl)
  return gameData.data.teams[isHomeTeam ? 'home' : 'away'].athletes.find(player => player._entityId === prospect.league_id)
}

module.exports = async function (prospect, date) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete ECHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  if (!prospect.team_id) {
    throw new Error(`Cannot complete ECHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n team_id`)
  }

  if (!prospect.season_id) {
    throw new Error(`Cannot complete ECHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n season_id`)
  }

  const dateObject = dateUtils.setDateValues(date, { zeroPad: true })

  const [gameId, isHomeTeam] = await findGameId(prospect, dateObject)

  if (!gameId) {
    return null
  }

  const gameStats = await findGameStats(prospect, gameId, isHomeTeam)

  if (!gameStats) {
    return null
  }

  const goals = +gameStats.stats.properties.find(s => s.name === 'Goals').value
  const assists = +gameStats.stats.properties.find(s => s.name === 'Assists').value

  return {
    first_name: prospect.first_name,
    last_name: prospect.last_name,
    league: prospect.league,
    goals,
    assists,
    points: goals + assists,
    shots: +gameStats.stats.properties.find(s => s.name === 'Shots').value,
    penalty_minutes: +gameStats.stats.properties.find(s => s.name === 'Penalty Minutes').value,
    date: `${dateObject.year}-${dateObject.month}-${dateObject.day}`,
  }
}
