const utils = require('../../utils')

// Helper function to check table header to make sure we have the right page (should have current season and players name)
function checkPage(header, firstName, lastName, year) {
  const sanitizedTableHeader = header.replace(`'`, '').replace(`.`, '')
  const sanitizedFirstName = firstName.replace(`'`, '').replace(`.`, '')
  const sanitizedLastName = lastName.replace(`'`, '').replace(`.`, '')
  const sanitizedYears = year.replace(`'`, '').replace(`.`, '')

  return (
    !sanitizedTableHeader ||
    !sanitizedTableHeader.includes(sanitizedLastName) ||
    !sanitizedTableHeader.includes(sanitizedFirstName) ||
    !sanitizedTableHeader.includes(sanitizedYears)
  )
}

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
      const tds = []
      const row = scrapedProspect(elm)
      row.find('td').each(function (_tdI, tdElm) {
        const td = scrapedProspect(tdElm).text().trim()
        tds.push(td)
      })
      games.push(tds)
    },
  )

  const isWrongPage = checkPage(String(games?.[0]?.[0]), prospect.first_name, prospect.last_name, currentYear)

  if (isWrongPage) {
    throw new Error(
      `This is the wrong URL for ${prospect.first_name} ${prospect.last_name}. The NCAA player page changes yearly, make sure you've validated the URL and updated the player's id for the current year.`,
    )
  }

  const game = games?.find(g => g[0] === `${month}/${day}/${year}`)
  if (!game || game[game.length - 1].match(/DID NOT DRESS/g)?.length) {
    return null
  }

  const [goals, assists, points] = game[3].split('-').map(s => +s)
  const penalty_minutes = +game[10].split('/')[1].trim()
  const shots = +game[11]

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
