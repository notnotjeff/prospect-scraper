const utils = require('../../utils')

module.exports = async function (prospect, date) {
  if (!prospect.wjc_team) {
    throw new Error(`Cannot complete WJC scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n wjc_team`)
  }

  if (!prospect.wjc_id) {
    throw new Error(`Cannot complete WJC scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n wjc_id`)
  }

  const { day, month, year } = utils.date.setDateValues(date, { zeroPad: true })
  const dateString = `${year}-${month}-${day}`
  const urlYear = +month > 1 ? +year + 1 : +year

  const indexUrl = `https://www.iihf.com/en/events/${urlYear}/wm20/schedule`
  const indexPage = await utils.request.htmlRequest(indexUrl)
  const gameLink = indexPage(
    `div[data-hometeam="${prospect.wjc_team}"][data-date="${dateString}"] > .s-hover > a, div[data-guestteam="${prospect.wjc_team}"][data-date="${dateString}"] > .s-hover > a`,
  ).attr('href')

  if (!gameLink) {
    return null
  }

  const url = `https://www.iihf.com${gameLink.replace('playbyplay', 'statistics')}`
  try {
    const scrapedProspect = await utils.request.htmlRequest(url)
    const stats = []
    scrapedProspect(`tbody.js-right-table tr[data-fwk-id="${prospect.wjc_id}"] > td`).each(function (_i, elm) {
      stats.push(scrapedProspect(elm).text().replace(/\n/g, ''))
    })

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
