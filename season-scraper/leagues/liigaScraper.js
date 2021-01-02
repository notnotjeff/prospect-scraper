const utils = require('../../utils')

module.exports = async function (prospect) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete Liiga scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const url = `https://liiga.fi/fi/pelaajat/${prospect.league_id}/${prospect.last_name.toLowerCase()}-${prospect.first_name.toLowerCase()}`
  const scrapedProspect = await utils.request.htmlRequest(url)

  const currentSeason = utils.date.getCurrentSeason('YYYY-YYYY')

  const seasons = []
  scrapedProspect('#stats-section > table:nth-child(3) > tbody > tr').each(function (_i, elm) {
    const cells = []
    scrapedProspect(elm)
      .find('td')
      .each(function (_cellI, cellElm) {
        const cell = scrapedProspect(cellElm).text().trim().replace('\n', '').replace('\t', '')
        cells.push(cell)
      })
    seasons.push(cells)
  })

  const season = seasons.find(s => s[0] === currentSeason)

  if (season) {
    return {
      goals: +season[4],
      assists: +season[5],
      points: +season[6],
      shots: +season[14],
      games_played: +season[3],
    }
  } else {
    return { goals: null, assists: null, points: null, shots: null, games_played: null }
  }
}
