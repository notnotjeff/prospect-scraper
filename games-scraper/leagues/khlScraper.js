const utils = require('../../utils')

module.exports = async function (prospect, date) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete KHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const { day: singleDigitDay } = utils.date.setDateValues(date, { zeroPad: false })
  const { day, month, year } = utils.date.setDateValues(date, { zeroPad: true })
  const monthName = utils.date.getMonthName(date.getMonth(), { isZeroIndexed: true, shortendNames: true })
  const url = `https://en.khl.ru/players/${prospect.league_id}/`

  const scrapedProspect = await utils.request.htmlRequest(url)

  const games = []
  scrapedProspect('#pl_Games > tbody > tr').each(function (_i, elm) {
    const cells = []
    scrapedProspect(elm)
      .find('td')
      .each(function (_cellI, cellElm) {
        const cell = scrapedProspect(cellElm).text().trim().replace('\n', '').replace('\t', '')
        cells.push(cell)
      })
    games.push(cells)
  })

  const game = games?.find(g => g[3] === `${singleDigitDay} ${monthName} ${year}`)

  if (!game) {
    return null
  }

  return {
    first_name: prospect.first_name,
    last_name: prospect.last_name,
    league: prospect.league,
    goals: +game[7],
    assists: +game[8],
    points: +game[9],
    shots: +game[20],
    penalty_minutes: +game[13],
    date: `${year}-${month}-${day}`,
  }
}
