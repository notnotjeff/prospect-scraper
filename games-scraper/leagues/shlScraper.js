const utils = require('../../utils')

// EXAMPLE PROSPECT.JS JSON
// {
//   league_id: '30159',
//   league: "SHL",
// }

module.exports = async function (prospect, date) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete SHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const { day, month, year } = utils.dateHelpers.setDateValues(date, { zeroPad: true })
  const url = `https://www.shl.se/lag/${prospect.league_id}/gamelog`

  const scrapedProspect = await utils.htmlRequest(url)

  const games = []
  scrapedProspect('.rmss_t-stat-table__row').each(function (_i, elm) {
    const row = scrapedProspect(elm)
      .text()
      .trim()
      .split('\n')
      .map(r => r.trim())
    games.push(row)
  })

  const game = games?.find(g => g[0] === `${year}-${month}-${day}`)

  if (!game) {
    return null
  }

  return {
    first_name: prospect.first_name,
    last_name: prospect.last_name,
    league: prospect.league,
    goals: +game[4],
    assists: +game[5],
    points: +game[6],
    shots: +game[12],
    penalty_minutes: +game[8],
    date: `${year}-${month}-${day}`,
  }
}
