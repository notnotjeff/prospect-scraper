const utils = require('../../utils')

// EXAMPLE
// {
// statline_url: 'https://www.hockeyallsvenskan.se/statistik/spelare?season=2020&gameType=regular&position=All&team=110b-110bJcIAI',
// game_statline_url: 'https://www.hockeyallsvenskan.se/statistik/spelare?season=2020&gameType=regular&position=All&team=110b-110bJcIAI',
// league: 'Allsv',
// }

module.exports = async function (prospect) {
  if (!prospect.statline_url) {
    throw new Error(`Cannot complete Allsv scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n statline_url`)
  }

  const page = await utils.request.htmlRequest(prospect.statline_url)

  let goals = 0
  let assists = 0
  let points = 0
  let shots = 0
  let games_played = 0
  let season = null
  const fullName = `${prospect.first_name} ${prospect.last_name}`

  page('table.rmss_t-stat-table > tbody > tr.rmss_t-stat-table__row').each(function (_i, elm) {
    const row = page(elm).text()
    if (!season && row.includes(fullName)) {
      season = row.split('\n').map(td => td.trim())
    }
  })

  goals += +season[7]
  assists += +season[8]
  points += +season[9]
  shots += +season[13]
  games_played += +season[6]

  return { goals, assists, points, shots, games_played }
}
