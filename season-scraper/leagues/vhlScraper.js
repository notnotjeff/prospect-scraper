const utils = require('../../utils')

module.exports = async function (prospect) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete VHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const currentSeason = utils.date.getCurrentSeason('YY-YY').split('-').join('/')
  const url = `https://www.vhlru.ru/en/players/${prospect.league_id}/`
  const page = await utils.request.htmlRequest(url)

  const seasons = []
  page(`#DataTables_Table_0 > tbody > tr[role=row]`).each(function (_i, elm) {
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
    if (tds[0] !== 'Season / Team') {
      seasons.push(tds)
    }
  })
  // console.log(seasons)

  let seasonRow = null
  const parsedSeasons = []
  seasons.forEach(s => {
    if (s.filter(c => c !== '').length === 1) {
      // console.log(s[0])
      seasonRow = s[0]
    } else {
      parsedSeasons.push([seasonRow, ...s])
    }
  })

  const teams = parsedSeasons.filter(s => s[0].includes(currentSeason) && !s[1].includes('Summary:') && s[0].includes('Regular Season'))

  if (!teams.length) {
    return { goals: null, assists: null, points: null, shots: null, games_played: null }
  }

  const season = teams.reduce(
    (acc, team) => {
      return {
        goals: acc.goals + +team[4],
        assists: acc.assists + +team[5],
        points: acc.points + +team[6],
        shots: acc.shots + +team[15],
        games_played: acc.games_played + +team[3],
      }
    },
    { goals: 0, assists: 0, points: 0, shots: 0, games_played: 0 },
  )

  return season
}
