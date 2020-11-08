const utils = require('../../utils')

// EXAMPLE
// {
//   profile_url: "http://collegehockeyinc.com/stats/players19.php?mrcm11",
//   games_url: "http://collegehockeyinc.com/stats/players19.php?mrcm11",
//   league: "NCAA",
// }

module.exports = async function (prospect) {
  if (!prospect.statline_url) {
    throw new Error(`Cannot complete NCAA scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n statline_url`)
  }

  const season = await utils.htmlRequest(prospect.statline_url)

  let goals = 0
  let assists = 0
  let points = 0
  let shots = 0
  let games_played = 0

  const statGroup = season(
    'body > div.page.text-center > main > section > div > div > div > div.playerstatsfull > table:nth-child(3) > tbody > tr:nth-last-child(1) > td:nth-child(3)',
  )
    .text()
    .split('-')
  goals = +statGroup[0]
  assists = +statGroup[1]
  points = +statGroup[2]
  shots = +season(
    'body > div.page.text-center > main > section > div > div > div > div.playerstatsfull > table:nth-child(3) > tbody > tr:nth-last-child(1) > td:nth-child(9)',
  ).text()
  const gpRegex = season(
    'body > div.page.text-center > main > section > div > div > div > div.playerstatsfull > table:nth-child(3) > tbody > tr:nth-last-child(1) > td:nth-child(2)',
  )
    .text()
    .match(/\d+/)
  games_played = gpRegex === null ? null : +gpRegex[0]

  return { goals, assists, points, shots, games_played }
}
