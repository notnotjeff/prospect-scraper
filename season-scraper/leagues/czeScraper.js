const utils = require('../../utils')

module.exports = async function (prospect) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete CZE2 scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_url`)
  }

  const url = `https://www.hokej.cz/hrac/${prospect.league_id}/career?stats-section=all`
  const prospectPage = await utils.request.htmlRequest(url)

  const currentSeasonYear = utils.date.getCurrentSeason('YYYY-YYYY')
  let currentYearRow = null

  prospectPage('#table--1 > tbody').each(function (_i, elm) {
    const row = prospectPage(elm).text()
    if (row.includes(currentSeasonYear)) {
      currentYearRow = prospectPage(elm)
    }
  })

  if (!currentYearRow) {
    return { goals: null, assists: null, points: null, shots: null, games_played: null }
  }

  const seasons = []
  currentYearRow.find('tr').each(function (_i, elm) {
    const row = prospectPage(elm)
    const tds = []
    row.find('td').each(function (_i, elm) {
      const td = prospectPage(elm).text().trim()
      tds.push(td)
    })
    seasons.push(tds.filter(td => td !== '' || td !== currentSeasonYear))
  })

  const season = seasons.find(s => s[0] === 'Tipsport extraliga')

  return {
    goals: +season[3],
    assists: +season[4],
    points: +season[5],
    games_played: +season[2],
    shots: null,
  }
}
