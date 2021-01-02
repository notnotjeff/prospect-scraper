const utils = require('../../utils')

module.exports = async function (prospect) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete Mestis scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const url = `https://mestis.fi/fi/pelaajat/${prospect.league_id}/${prospect.last_name.toLowerCase()}-${prospect.first_name.toLowerCase()}`
  const season = await utils.request.htmlRequest(url)

  const shots = +season('#stats-section > table:nth-of-type(1) > tbody > tr > td:nth-of-type(15)').text()
  const goals = +season('#stats-section > table:nth-of-type(1) > tbody > tr > td:nth-of-type(5)').text()
  const assists = +season('#stats-section > table:nth-of-type(1) > tbody > tr > td:nth-of-type(6)').text()
  const points = +season('#stats-section > table:nth-of-type(1) > tbody > tr > td:nth-of-type(7)').text()
  const games_played = +season('#stats-section > table:nth-of-type(1) > tbody > tr > td:nth-of-type(4)').text()

  return { goals, assists, points, shots, games_played }
}
