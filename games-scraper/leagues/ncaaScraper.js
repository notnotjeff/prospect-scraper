const utils = require('../../utils')

function formatGameDate(dateString, year) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  const monthDay = dateString.split('. ')
  const month = months.indexOf(monthDay[0]) + 1

  return `${year}-${month}-${monthDay[1]}`
}

module.exports = async function (prospect, date) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete NCAA scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const currentYear = utils.date.getCurrentSeason('YYYY-YY')
  const { day, month, year } = utils.date.setDateValues(date, { zeroPad: false })
  const url = `http://collegehockeyinc.com/players/career/${prospect.league_id}/`

  const scrapedProspect = await utils.request.htmlRequest(url)

  const seasons = []
  scrapedProspect('.gxgdata').each(function (_i, elm) {
    const games = []
    const seasonName = scrapedProspect(elm).find('h2').text().split(' ')[0].trim().replace('‑', '-')
    scrapedProspect(elm)
      .find('tbody > tr')
      .each(function (_trI, trElm) {
        const game = []
        scrapedProspect(trElm)
          .find('td')
          .each(function (_tdI, tdElm) {
            const td = scrapedProspect(tdElm).text().trim()
            game.push(td)
          })
        games.push({
          date: formatGameDate(game[0], year),
          opposition: game[1],
          goals: +game[2],
          assists: +game[3],
          points: +game[4],
          penalty_minutes: +game[5],
        })
      })
    seasons.push({ name: seasonName, games })
  })

  const season = seasons?.find(s => s.name === currentYear)

  if (!season) {
    return null
  }

  const game = season?.games?.find(g => g.date === `${year}-${month}-${day}`)
  if (!game) {
    return null
  }

  const { goals, assists, points, penalty_minutes } = game
  const zeroPaddedDate = utils.date.setDateValues(date, { zeroPad: true })

  return {
    first_name: prospect.first_name,
    last_name: prospect.last_name,
    league: prospect.league,
    goals,
    assists,
    points,
    shots: null,
    penalty_minutes,
    date: `${zeroPaddedDate.year}-${zeroPaddedDate.month}-${zeroPaddedDate.day}`,
  }
}
