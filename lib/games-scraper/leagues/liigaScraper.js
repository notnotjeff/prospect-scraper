const utils = require('../../utils')

module.exports = async function (prospect, date) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete Liiga scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const { day, month, year } = utils.date.setDateValues(date, { zeroPad: false })
  const dateForObject = utils.date.setDateValues(date, { zeroPad: true })
  const url = `https://old.liiga.fi/fi/pelaajat/${
    prospect.league_id
  }/${prospect.last_name.toLowerCase()}-${prospect.first_name.toLowerCase()}/ottelu-ottelulta`

  const scrapedProspect = await utils.request.htmlRequest(url)

  const games = []
  scrapedProspect('#stats-section > table > tbody > tr').each(function (_i, elm) {
    const row = scrapedProspect(elm)
      .text()
      .trim()
      .split('\n')
      .map(r => r.trim())
    games.push(row)
  })

  const game = games?.find(g => g[0] === `${day}.${month}.${year}`)

  if (!game) {
    return null
  }

  return {
    first_name: prospect.first_name,
    last_name: prospect.last_name,
    league: prospect.league,
    goals: +game[10],
    assists: +game[11],
    points: +game[12],
    shots: +game[22],
    penalty_minutes: +game[13],
    date: `${dateForObject.year}-${dateForObject.month}-${dateForObject.day}`,
  }
}
