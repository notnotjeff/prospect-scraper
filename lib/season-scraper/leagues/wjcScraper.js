const utils = require('../../utils')

const blankStatline = {
  games_played: null,
  goals: null,
  assists: null,
  points: null,
  shots: null,
}

const findTeamUrl = async prospect => {
  const year = utils.date.getCurrentSeason('YYYY-YYYY').split('-')[1]
  const indexUrl = `https://www.iihf.com/en/events/${year}/wm20/teams`
  const indexPage = await utils.request.htmlRequest(indexUrl)
  let teamUrl = null
  indexPage(`.s-team .s-country-title`).each(function (_i, elm) {
    const teamRegex = new RegExp(prospect.team_id.toUpperCase(), 'g')
    if (indexPage(elm).text().match(teamRegex)?.length) {
      teamUrl = indexPage(elm).attr('href')
    }
  })

  return teamUrl
}

const findProspectStats = async (prospect, teamUrl) => {
  const scrapedProspect = await utils.request.htmlRequest(`https://www.iihf.com${teamUrl}`)
  const stats = []
  scrapedProspect(`table.s-table tr[data-fwk-id="${prospect.league_id}"] > td`).each(function (_i, elm) {
    stats.push(scrapedProspect(elm).text().replace(/\n/g, ''))
  })

  return stats
}

module.exports = async function (prospect) {
  if (!prospect.team_id) {
    throw new Error(`Cannot complete WJC scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n team_id`)
  }

  if (!prospect.league_id) {
    throw new Error(`Cannot complete WJC scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const teamLink = await findTeamUrl(prospect)

  if (!teamLink) {
    return blankStatline
  }

  const stats = await findProspectStats(prospect, teamLink)

  if (!stats.length || !+stats[4]) {
    return blankStatline
  }

  return {
    games_played: +stats[4],
    goals: stats[5] ? +stats[5] : null,
    assists: stats[6] ? +stats[6] : null,
    points: stats[7] ? +stats[7] : null,
    shots: stats[9] ? +stats[9] : null,
  }
}
