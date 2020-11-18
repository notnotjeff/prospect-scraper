const utils = require('../../utils')

// EXAMPLE
// {
//   profile_url: 'https://data.sihf.ch/Statistic/api/cms/cache300?alias=player&searchQuery=1//1&filterQuery=2020/3092/101151&filterBy=Season,Phase&orderBy=points&orderByDescending=true&take=20&callback=externalStatisticsCallback&skip=-1&language=de',
//   games_url: '',
//   league: 'NLA',
// },

module.exports = async function (prospect) {
  if (!prospect.statline_url) {
    throw new Error(`Cannot complete NLA scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n statline_url`)
  }

  const scrapedProspect = await utils.request.jsonRequest(prospect.statline_url)
  const teamData = JSON.parse(
    String(scrapedProspect)
      .match(/\((.*?)\)/)[0]
      .slice(1, -1),
  )

  const statline = teamData.data.find(player => player[1] === `${prospect.last_name} ${prospect.first_name}`)

  if (!statline) {
    return { goals: null, assists: null, points: null, shots: null, games_played: null }
  }

  return {
    games_played: +statline[4],
    goals: +statline[5],
    assists: +statline[6],
    points: +statline[5] + +statline[6],
    shots: null,
  }
}
