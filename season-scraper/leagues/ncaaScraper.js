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
  const page = await utils.request.htmlRequest(url)

  // Check player bio to make sure we have the right page (should have player's name)
  const bio = page('.playerbios').text()
  const sanitizedBio = bio.replace(`'`, '').replace(`.`, '')
  const sanitizedFirstName = prospect.first_name.replace(`'`, '').replace(`.`, '')
  const sanitizedLastName = prospect.last_name.replace(`'`, '').replace(`.`, '')

  if (!sanitizedBio || !sanitizedBio.includes(sanitizedLastName) || !sanitizedBio.includes(sanitizedFirstName)) {
    throw new Error(
      `This is the wrong URL for ${prospect.first_name} ${prospect.last_name}. The NCAA player page changes yearly, make sure you've validated the URL and updated the player's id for the current year.`,
    )
  }

  const season = []
  page(
    'body > div.page.text-center > main > section > div > div > div > div.playerstatsfull > table:nth-child(3) > tbody > tr:nth-last-child(1) > td',
  ).each(function (_cellI, cellElm) {
    const cell = page(cellElm).text().trim().replace('\n', '').replace('\t', '')
    season.push(cell)
  })

  const gamesPlayed = season[1].match(/\d+/)?.[0]
  if (['', '0', null, undefined].includes(gamesPlayed)) {
    return { goals: null, assists: null, points: null, shots: null, games_played: null }
  }

  const [goals, assists, points] = season[2].split('-')

  return {
    goals: +goals,
    assists: +assists,
    points: +points,
    shots: +season[8],
    games_played: +gamesPlayed,
  }
}
