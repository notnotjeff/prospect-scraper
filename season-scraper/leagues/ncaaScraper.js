const utils = require('../../utils')

// EXAMPLE
// {
//   profile_url: "http://collegehockeyinc.com/stats/players19.php?mrcm11",
//   games_url: "http://collegehockeyinc.com/stats/players19.php?mrcm11",
//   league: "NCAA",
// }

module.exports = async function (prospect) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete NCAA scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const currentSeason = utils.date.getCurrentSeason('YYYY-YYYY')
  const url = `http://collegehockeyinc.com/stats/players${currentSeason.slice(-2)}.php?${prospect.league_id}`
  const season = await utils.request.htmlRequest(url)

  // Check player bio to make sure we have the right page (should have players name)
  const bio = season('.playerbios').text()
  const sanitizedBio = bio.replace(`'`, '').replace(`.`, '')
  const sanitizedFirstName = prospect.first_name.replace(`'`, '').replace(`.`, '')
  const sanitizedLastName = prospect.last_name.replace(`'`, '').replace(`.`, '')

  if (!sanitizedBio || !sanitizedBio.includes(sanitizedLastName) || !sanitizedBio.includes(sanitizedFirstName)) {
    throw new Error(
      `This is the wrong URL for ${prospect.first_name} ${prospect.last_name}. The NCAA player page changes yearly, make sure you've validated the URL and updated the player's id for the current year.`,
    )
  }

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
  games_played = +gpRegex?.[0]

  return { goals, assists, points, shots, games_played }
}
