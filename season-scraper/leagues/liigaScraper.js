const utils = require('../../utils')

module.exports = async function (prospect) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete Liiga scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const url = `https://old.liiga.fi/en/pelaajat/${prospect.league_id}/${prospect.last_name.toLowerCase()}-${prospect.first_name.toLowerCase()}`
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

  const season = seasons
    ?.filter(s => s[0] === currentSeason)
    ?.reduce(
      (previousSeason, currentSeason) => {
        previousSeason.goals += +currentSeason[4]
        previousSeason.assists += +currentSeason[5]
        previousSeason.points += +currentSeason[6]
        previousSeason.shots += +currentSeason[14]
        previousSeason.games_played += +currentSeason[3]
        return previousSeason
      },
      { goals: null, assists: null, points: null, shots: null, games_played: null },
    )

  return season
}
