const utils = require('../../utils')

const findGameUrl = async (dateString, urlYear, prospect) => {
  const indexUrl = `https://www.iihf.com/en/events/${urlYear}/wm20/schedule`
  const indexPage = await utils.request.htmlRequest(indexUrl)
  const scorecard = indexPage(
    `div[data-hometeam="${prospect.team_id}"][data-date="${dateString}"] > .s-hover > a, div[data-guestteam="${prospect.team_id}"][data-date="${dateString}"] > .s-hover > a`,
  ).attr('href')

  return scorecard
}

const findProspectStats = async (prospect, gameUrl) => {
  const url = `https://www.iihf.com${gameUrl.replace('playbyplay', 'statistics')}`
  const scrapedProspect = await utils.request.htmlRequest(url)
  const stats = []
  scrapedProspect(`tbody.js-right-table tr[data-fwk-id="${prospect.league_id}"] > td`).each(function (_i, elm) {
    stats.push(scrapedProspect(elm).text().replace(/\n/g, ''))
  })

  return stats
}

module.exports = async function (prospect, date) {
  if (!prospect.team_id) {
    throw new Error(`Cannot complete WJC scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n team_id`)
  }

  if (!prospect.league_id) {
    throw new Error(`Cannot complete WJC scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const { day, month, year } = utils.date.setDateValues(date, { zeroPad: true })
  const dateString = `${year}-${month}-${day}`
  const urlYear = +month > 1 ? +year + 1 : +year

  const gameLink = await findGameUrl(dateString, urlYear, prospect)

  if (!gameLink) {
    return null
  }

  try {
    const stats = await findProspectStats(prospect, gameLink)

    if (!stats.length) {
      return null
    }

    return {
      first_name: prospect.first_name,
      last_name: prospect.last_name,
      league: prospect.league,
      goals: +stats[1],
      assists: +stats[2],
      points: +stats[3],
      shots: +stats[5],
      penalty_minutes: +stats[4],
      date: dateString,
    }
  } catch {
    return null
  }
}
