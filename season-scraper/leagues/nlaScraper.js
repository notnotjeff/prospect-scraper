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

  const fullName = `${prospect.last_name} ${prospect.first_name}`
  let goals = 0
  let assists = 0
  let points = 0
  const shots = null
  let games_played = 0

  const statline = teamData.data.filter(player => {
    return player[1] === fullName
  })

  if (statline.length > 0) {
    games_played += +statline[0][4]
    goals += +statline[0][5]
    assists += +statline[0][6]
    points += goals + assists
  }

  return { goals, assists, points, shots, games_played }
}
