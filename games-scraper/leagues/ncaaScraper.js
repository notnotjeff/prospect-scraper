const utils = require('../../utils')

// EXAMPLE PROSPECT.JS JSON
// {
//   league_id: '16',
//   league: "NCAA",
// }

module.exports = async function (prospect, date) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete NCAA scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const currentYear = utils.date.getCurrentSeason('YYYY-YYYY')
  const { day, month, year } = utils.date.setDateValues(date, { zeroPad: true })
  const url = `http://collegehockeyinc.com/stats/players${currentYear.slice(-2)}.php?${prospect.league_id}`

  const scrapedProspect = await utils.request.htmlRequest(url)

  const games = []
  scrapedProspect('body > div.page.text-center > main > section > div > div > div > div.playerstatsfull > table:nth-child(3) > tbody > tr').each(
    function (_i, elm) {
      const row = scrapedProspect(elm)
        .text()
        .trim()
        .split('\n')
        .map(r => r.trim())
      games.push(row)
    },
  )

  // Check table header to make sure we have the right page (should have current season and players name in the title)
  const sanitizedTableHeader = String(games?.[0]?.[0]).replace(`'`, '').replace(`.`, '')
  const sanitizedFirstName = prospect.first_name.replace(`'`, '').replace(`.`, '')
  const sanitizedLastName = prospect.last_name.replace(`'`, '').replace(`.`, '')
  const sanitizedYears = currentYear.replace(`'`, '').replace(`.`, '')

  if (
    !sanitizedTableHeader ||
    !sanitizedTableHeader.includes(sanitizedLastName) ||
    !sanitizedTableHeader.includes(sanitizedFirstName) ||
    !sanitizedTableHeader.includes(sanitizedYears)
  ) {
    throw new Error(
      `This is the wrong URL for ${prospect.first_name} ${prospect.last_name}. The NCAA player page changes yearly, make sure you've validated the URL and updated the player's id for the current year.`,
    )
  }

  const game = games?.find(g => g[0] === `${month}/${day}/${year}`)
  if (!game) {
    return null
  }

  const [goals, assists, points] = game[4].split('-').map(s => +s)
  const penalty_minutes = +game[9].split('/')[1].trim()
  const shots = +game[10]

  return {
    first_name: prospect.first_name,
    last_name: prospect.last_name,
    league: prospect.league,
    goals,
    assists,
    points,
    shots,
    penalty_minutes,
    date: `${year}-${month}-${day}`,
  }
}
