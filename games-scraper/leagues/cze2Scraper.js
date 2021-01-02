const utils = require('../../utils')

module.exports = async function (prospect, date) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete CZE2 scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const { day: singleDigitDay, month: singleDigitMonth } = utils.date.setDateValues(date, { zeroPad: false })
  const { day, month, year } = utils.date.setDateValues(date, { zeroPad: true })
  const url = `https://www.hokej.cz/hrac/${prospect.league_id}/match`

  const scrapedProspect = await utils.request.htmlRequest(url)

  const games = []
  scrapedProspect('.table-stats > tbody > tr').each(function (_i, elm) {
    const row = scrapedProspect(elm)
    const cells = []
    row.find('td').each(function (_cellI, cellElm) {
      const cell = scrapedProspect(cellElm).text().trim().replace('\n', '').replace('\t', '')
      cells.push(cell)
    })
    if (row.text().includes('CHANCE LIGA')) {
      games.push(cells)
    }
  })

  const game = games?.find(g => g[0] === `${singleDigitDay}.${singleDigitMonth}.${year}`)

  if (!game) {
    return null
  }

  return {
    first_name: prospect.first_name,
    last_name: prospect.last_name,
    league: prospect.league,
    goals: +game[5],
    assists: +game[6],
    points: +game[7],
    shots: null,
    penalty_minutes: +game[9],
    date: `${year}-${month}-${day}`,
  }
}
