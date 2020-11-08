const utils = require('../../utils')

// EXAMPLE PROSPECT.JS JSON
// {
//   league_id: '25697',
//   league: "VHL",
// }

module.exports = async function (prospect, date) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete VHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const { day, month, year } = utils.dateHelpers.setDateValues(date, { zeroPad: true })
  const url = `http://www.vhlru.ru/en/players/${prospect.league_id}/games/`

  const scrapedProspect = await utils.htmlRequest(url)

  const games = []
  scrapedProspect('#laConteiner > table > tbody > tr').each(function (_i, elm) {
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
    goals: +game[13],
    assists: +game[15],
    points: +game[17],
    shots: +game[35],
    penalty_minutes: +game[21],
    date: `${year}-${month}-${day}`,
  }
}
