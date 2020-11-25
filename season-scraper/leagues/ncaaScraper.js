const utils = require('../../utils')

// Helper function to check table header to make sure we have the right page (should have current season and players name)
function checkPage(header, firstName, lastName) {
  const sanitizedTableHeader = header.replace(`'`, '').replace(`.`, '')
  const sanitizedFirstName = firstName.replace(`'`, '').replace(`.`, '')
  const sanitizedLastName = lastName.replace(`'`, '').replace(`.`, '')

  return !sanitizedTableHeader || !sanitizedTableHeader.includes(sanitizedLastName) || !sanitizedTableHeader.includes(sanitizedFirstName)
}

module.exports = async function (prospect) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete NCAA scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const currentSeason = utils.date.getCurrentSeason('YYYY-YYYY')
  const url = `http://collegehockeyinc.com/stats/players${currentSeason.slice(-2)}.php?${prospect.league_id}`
  const page = await utils.request.htmlRequest(url)

  const rows = []
  page('body > div.page.text-center > main > section > div > div > div > div.playerstatsfull > table:nth-child(3) > tbody > tr').each(function (
    _i,
    elm,
  ) {
    const tds = []
    const row = page(elm)
    row.find('td').each(function (_tdI, tdElm) {
      const td = page(tdElm).text().trim()
      tds.push(td)
    })
    rows.push(tds)
  })
  const season = rows.find(r => r[0] === 'Season Totals:')

  const bio = page('.playerbios').text()
  const isWrongPage = checkPage(String(bio), prospect.first_name, prospect.last_name)

  if (isWrongPage) {
    throw new Error(
      `This is the wrong URL for ${prospect.first_name} ${prospect.last_name}. The NCAA player page changes yearly, make sure you've validated the URL and updated the player's id for the current year.`,
    )
  }

  const gamesPlayed = season[1].match(/\d+/)?.[0]
  if (['', '0', null, undefined].includes(gamesPlayed)) {
    return { goals: null, assists: null, points: null, shots: null, games_played: null }
  }

  const [goals, assists, points] = season[2].split('-')

  return {
    goals: +goals,
    assists: +assists,
    points: +points,
    shots: +season[8],
    games_played: +gamesPlayed,
  }
}
