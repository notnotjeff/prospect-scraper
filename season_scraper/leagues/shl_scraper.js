const utils = require('../../utils')

// EXAMPLE
// {
//   profile_url: "https://www.shl.se/lag/fe02-fe02mf1FN__vaxjo-lakers/qTK-4a8Y9mMrn__pontus-holmberg/statistics",
//   games_url: "https://www.shl.se/lag/fe02-fe02mf1FN__vaxjo-lakers/qTK-4a8Y9mMrn__pontus-holmberg/gamelog",
//   league: "SHL",
// }

module.exports = async function (prospect) {
  if (!prospect.statline_url) {
    throw new Error(`Cannot complete SHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n statline_url`)
  }

  const page = await utils.request.htmlRequest(prospect.statline_url)

  let goals = 0
  let assists = 0
  let points = 0
  let shots = 0
  let games_played = 0
  let currentYearRow = null
  const currentSeasonYear = utils.date.getCurrentSeason('YYYY-YYYY').split('-').join('/')

  page('table.rmss_t-stat-table > tbody > tr.rmss_t-stat-table__row').each(function (_i, elm) {
    const row = page(elm).text().trim().split('\n')
    if (row[0] === currentSeasonYear && row[1] !== 'Slutspel') {
      currentYearRow = row
    }
  })

  goals += +currentYearRow[4]
  assists += +currentYearRow[5]
  points += +currentYearRow[6]
  shots += +currentYearRow[9]
  games_played += +currentYearRow[3]

  return { goals, assists, points, shots, games_played }
}
