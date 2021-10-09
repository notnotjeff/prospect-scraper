const utils = require('../../utils')

module.exports = async function (prospect) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete NCAA scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const currentSeason = utils.date.getCurrentSeason('YYYY-YY')
  const url = `http://collegehockeyinc.com/players/career/${prospect.league_id}/`
  const page = await utils.request.htmlRequest(url)

  const seasons = []
  page('div.factbox:nth-child(3) > table > tbody > tr').each(function (_i, elm) {
    const tds = []
    const row = page(elm)
    row.find('td').each(function (_tdI, tdElm) {
      const td = page(tdElm).text().trim()
      tds.push(td)
    })
    seasons.push({
      name: tds[0].slice(0, 7).replace('‑', '-'),
      team: tds[0].slice(7).trim(),
      games_played: +tds[1],
      goals: +tds[2],
      assists: +tds[3],
      points: +tds[4],
      shots: +tds[9],
    })
  })

  const season = seasons.find(s => s.name === currentSeason)

  if (!season) {
    return null
  }

  const { goals, assists, points, shots, games_played } = season

  return {
    goals,
    assists,
    points,
    shots,
    games_played,
  }
}
