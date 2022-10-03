const utils = require('../../utils')

module.exports = async function (prospect) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete Liiga scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const currentSeason = utils.date.getCurrentSeason('YYYY-YYYY').split('-')[1]
  const url = `https://liiga.fi/api/v1/players/info/${prospect.league_id}`
  const prospectJson = await utils.request.jsonRequest(url)
  const seasons = prospectJson.historical.regular.filter(({season}) => season === +currentSeason)

  if(seasons.length === 0) {
    return { games_played: undefined, goals: undefined, assists: undefined, points: undefined, shots: undefined }
  }

  const { games_played, goals, assists, points, shots } = seasons.reduce(
    (acc, team) => {
      return {
        goals: acc.goals + team.goals,
        assists: acc.assists + team.assists,
        points: acc.points + team.points,
        shots: acc.shots + team.shots,
        games_played: acc.games_played + team.games,
      }
    },
    { goals: 0, assists: 0, points: 0, shots: 0, games_played: 0 },
  )

  return { games_played, goals, assists, points, shots }
}
