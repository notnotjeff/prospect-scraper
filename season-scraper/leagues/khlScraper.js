const utils = require('../../utils')

module.exports = async function (prospect) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete KHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const currentSeason = utils.date.getCurrentSeason('YY-YY').split('-').join('/')
  const url = `https://en.khl.ru/players/${prospect.league_id}/`
  const page = await utils.request.htmlRequest(url)

  const seasonObject = {}
  let seasonInfo = []
  let seasonId = null

  page(`.detail-table__scroll > table > tbody > tr`).each(function (_i, elm) {
    const children = page(elm).children()
    const seasonYear = children.text().match(/\d{2}\/\d{2}/)?.[0]
    const seasonType = children.text().match(/regular|playoffs/)?.[0]
    
    if (seasonYear) {
      seasonInfo = []
      seasonId = `${seasonYear}-${seasonType}`
      seasonObject[seasonId] = { seasonYear, seasonType, stats: [] }
      seasonInfo.push(seasonYear)
      seasonInfo.push(seasonType)
    } else if (children.length > 0) {
      const tds = [...seasonInfo]
      children.each(function (_tdI, tdElm) {
        const td = page(tdElm).text().trim()
        tds.push(td)
      })
      seasonObject[seasonId].stats.push(tds)
    }
  })

  const seasons = Object.values(seasonObject).map(s => {
    return s.stats[s.stats.length - 1]
  })
  const season = seasons.find(s => (s[0] === currentSeason && s[1] === 'regular'))

  if (!season) {
    return {}
  }

  return {
    goals: +season[5],
    assists: +season[6],
    points: +season[7],
    shots: +season[18],
    games_played: +season[4],
  }
}
