const utils = require('../../utils')

module.exports = async function (prospect, date) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete SHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const { day, month, year } = utils.date.setDateValues(date, { zeroPad: true })
  const url = `https://www.shl.se/lag/${prospect.team_id}/${prospect.league_id}/gamelog`

  const scrapedProspect = await utils.request.htmlRequest(url)

  const games = []
  scrapedProspect('.rmss_t-stat-table__row').each(function (_i, elm) {
    const cells = []
    scrapedProspect(elm)
      .find('td')
      .each(function (_cellI, cellElm) {
        const cell = scrapedProspect(cellElm).text().trim().replace('\n', '').replace('\t', '')
        cells.push(cell)
      })
    games.push(cells)
  })

  const game = games?.find(g => g[0] === `${year}-${month}-${day}`)

  // If there is no game today, or the player is unavailable for play (the stat columns have text explaining the cause) then return null
  if (!game || game?.[4].match(/[a-zA-Z]+/)) {
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
