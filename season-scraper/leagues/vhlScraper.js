const utils = require('../../utils')

// EXAMPLE
// {
//   profile_url: "http://www.vhlru.ru/en/players/22888/",
//   games_url: "http://www.vhlru.ru/en/players/22888/games",
//   league: "VHL",
// }

module.exports = async function (prospect) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete VHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const currentSeason = utils.date.getCurrentSeason('YY-YY').split('-').join('/')
  const url = `http://www.vhlru.ru/en/players/${prospect.league_id}/`
  const page = await utils.request.htmlRequest(url)

  const seasons = []
  page(`.player_stats > tbody > tr`).each(function (_i, elm) {
    const row = page(elm)
    const tds = []
    row.find('th').each(function (_tdI, tdElm) {
      const td = page(tdElm).text().trim()
      tds.push(td)
    })
    row.find('td').each(function (_tdI, tdElm) {
      const td = page(tdElm).text().trim()
      tds.push(td)
    })
    seasons.push(tds)
  })

  let season = null
  seasons.forEach((s, i) => {
    if (s[0].includes(currentSeason) && s[0].includes('Regular Season')) {
      season = seasons[i + 1]
    }
  })

  if (!season) {
    return { goals: null, assists: null, points: null, shots: null, games_played: null }
  }

  return {
    goals: +season[3],
    assists: +season[4],
    points: +season[5],
    shots: +season[14],
    games_played: +season[2],
  }
}
