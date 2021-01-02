const utils = require('../../utils')

module.exports = async function (prospect, date) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete MHL scrape, prospect is missing: \n league_id`)
  }

  const { day: singleDigitDay, month: singleDigitMonth } = utils.date.setDateValues(date, { zeroPad: true })
  const { day, month, year } = utils.date.setDateValues(date, { zeroPad: true })
  const url = `https://mestis.fi/en/pelaajat/${
    prospect.league_id
  }/${prospect.last_name.toLowerCase()}-${prospect.first_name.toLowerCase()}/ottelu-ottelulta`

  const scrapedProspect = await utils.request.htmlRequest(url)

  const games = []
  scrapedProspect('#stats-section table > tbody > tr').each(function (_i, elm) {
    const tds = []
    scrapedProspect(elm)
      .find('td')
      .each(function (_tdI, tdElm) {
        const td = scrapedProspect(tdElm).text().trim()
        tds.push(td)
      })
    games.push(tds)
  })

  const game = games?.find(g => g[0] === `${singleDigitDay}.${singleDigitMonth}.${year}`)

  if (!game) {
    return null
  }

  return {
    first_name: prospect.first_name,
    last_name: prospect.last_name,
    league: prospect.league,
    goals: +game[2],
    assists: +game[3],
    points: +game[4],
    shots: +game[12],
    penalty_minutes: +game[5],
    date: `${year}-${month}-${day}`,
  }
}
