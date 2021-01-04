const utils = require('../../utils')

module.exports = async function (prospect) {
  if (!prospect.first_name) {
    throw new Error(`Cannot complete NL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n first_name`)
  }

  if (!prospect.last_name) {
    throw new Error(`Cannot complete NL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n last_name`)
  }

  if (!prospect.season_id) {
    throw new Error(`Cannot complete NL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n season_id`)
  }

  if (!prospect.team_id) {
    throw new Error(`Cannot complete NL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n team_id`)
  }

  const url = `https://data.sihf.ch/Statistic/api/cms/cache300?alias=player&searchQuery=1//1&filterQuery=${new Date().getFullYear()}/${
    prospect.season_id
  }/${prospect.team_id}`
  const teamData = await utils.request.jsonRequest(url)

  const statline = teamData.data.find(player => player[1] === `${prospect.last_name} ${prospect.first_name}`)

  if (!statline) {
    return { goals: null, assists: null, points: null, shots: null, games_played: null }
  }

  return {
    games_played: +statline[4],
    goals: +statline[5],
    assists: +statline[6],
    points: +statline[5] + +statline[6],
    shots: null,
  }
}
