const utils = require('../../utils')

module.exports = async function (prospect, date) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete MHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const { day, month, year } = utils.date.setDateValues(date, { zeroPad: true })
  const url = `https://engmhl.khl.ru/players/${prospect.league_id}/games/`

  const scrapedProspect = await utils.request.htmlRequest(url)

  const games = []
  scrapedProspect('.player_games table > tbody > tr').each(function (_i, elm) {
    const tds = []
    scrapedProspect(elm)
      .find('td')
      .each(function (_tdI, tdElm) {
        const td = scrapedProspect(tdElm).text().trim()
        tds.push(td)
      })
    games.push(tds)
  })

  const game = games?.find(g => g[0] === `${day}.${month}.${year}`)

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
    shots: +game[16],
    penalty_minutes: +game[9],
    date: `${year}-${month}-${day}`,
  }
}
