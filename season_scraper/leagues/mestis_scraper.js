const utils = require('../../utils')

// EXAMPLE
// {
//   profile_url: "https://mestis.fi/fi/pelaajat/31574013/simontaival-kasper",
//   games_url: "https://mestis.fi/fi/pelaajat/31574013/simontaival-kasper/ottelu-ottelulta",
//   league: "Mestis",
// }

module.exports = async function (prospect) {
  if (!prospect.statline_url) {
    throw new Error(`Cannot complete Mestis scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n statline_url`)
  }

  const season = await utils.htmlRequest(prospect.statline_url)

  const shots = +season('#stats-section > table:nth-of-type(1) > tbody > tr > td:nth-of-type(15)').text()
  const goals = +season('#stats-section > table:nth-of-type(1) > tbody > tr > td:nth-of-type(5)').text()
  const assists = +season('#stats-section > table:nth-of-type(1) > tbody > tr > td:nth-of-type(6)').text()
  const points = +season('#stats-section > table:nth-of-type(1) > tbody > tr > td:nth-of-type(7)').text()
  const games_played = +season('#stats-section > table:nth-of-type(1) > tbody > tr > td:nth-of-type(4)').text()

  return { goals, assists, points, shots, games_played }
}
