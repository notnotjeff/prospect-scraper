const utils = require('../../utils')

// EXAMPLE PROSPECT.JS JSON
// {
//   statline_url: "https://www.hokej.cz/hrac/23461/career?t=224&stats-section=all",
//   games_url: "https://www.hokej.cz/hrac/23461?t=224"
//   league: "CZE2",
// }

module.exports = async function (prospect) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete CZE2 scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_url`)
  }

  const url = `https://www.hokej.cz/hrac/${prospect.league_id}/career?stats-section=all`
  const prospectPage = await utils.htmlRequest(url)

  const currentSeasonYear = utils.getCurrentSeason('YYYY-YYYY')
  let currentYearRow = null
  let mainTeamRow = null

  prospectPage('#table--1 > tbody').each(function (_i, elm) {
    const row = prospectPage(elm).text()
    if (row.includes(currentSeasonYear)) {
      currentYearRow = prospectPage(elm)
    }
  })

  currentYearRow.find('tr').each(function (_i, elm) {
    const row = prospectPage(elm).text()
    if (row.includes('CHANCE LIGA')) {
      mainTeamRow = prospectPage(elm)
        .text()
        .split('\n')
        .map(td => td.trim())
        .filter(td => td !== '')
    }
  })

  const hasYearHeader = mainTeamRow[0] === currentSeasonYear

  const goals = 0 + +mainTeamRow[hasYearHeader ? 4 : 3]
  const assists = 0 + +mainTeamRow[hasYearHeader ? 5 : 4]
  const points = 0 + +mainTeamRow[hasYearHeader ? 6 : 5]
  const games_played = 0 + +mainTeamRow[hasYearHeader ? 3 : 2]
  const shots = null

  return { goals, assists, points, shots, games_played }
}
