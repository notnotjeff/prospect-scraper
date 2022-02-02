const utils = require('../../utils')

module.exports = async function (prospect) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete KHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const currentSeason = utils.date.getCurrentSeason('YYYY-YYYY').split('-').join('/')
  const url = `https://en.khl.ru/players/${prospect.league_id}/`
  const page = await utils.request.htmlRequest(url)

  const seasons = []
  page(`#pl_Stats > tbody > tr`).each(function (_i, elm) {
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
    if (!['KHL Summary', 'Regular season:', 'Playoffs:', 'KHL Total:', 'Summary:'].includes(tds[0])) {
      seasons.push(tds)
    }
  })

  let seasonRow = null
  const parsedSeasons = []
  seasons.forEach(s => {
    if (s.filter(c => c !== '').length === 1) {
      seasonRow = s[0]
    } else {
      parsedSeasons.push([seasonRow, ...s])
    }
  })

  const teams = parsedSeasons.filter(s => s[0].includes(currentSeason) && !s[0].match(/Playoffs/g)?.length)

  if (!teams.length) {
    return { goals: null, assists: null, points: null, shots: null, games_played: null }
  }

  const season = teams.reduce(
    (acc, team) => {
      return {
        goals: acc.goals + +team[4],
        assists: acc.assists + +team[5],
        points: acc.points + +team[6],
        shots: acc.shots + +team[17],
        games_played: acc.games_played + +team[3],
      }
    },
    { goals: 0, assists: 0, points: 0, shots: 0, games_played: 0 },
  )

  return season
}
