const utils = require('../../utils')

module.exports = async function (prospect) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete KHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const url = `https://en.khl.ru/players/${prospect.league_id}/`
  const page = await utils.request.htmlRequest(url)

  let goals = 0
  let assists = 0
  let points = 0
  let shots = 0
  let games_played = 0

  // Check to make sure the row scraped is regular season not playoffs
  if (page('#pl_Stats > tbody > tr:nth-child(1) > td:nth-child(1)').text().includes('Regular')) {
    goals += +page('#pl_Stats > tbody > tr:nth-child(2) > td:nth-child(4)').text()
    assists += +page('#pl_Stats > tbody > tr:nth-child(2) > td:nth-child(5)').text()
    points += +page('#pl_Stats > tbody > tr:nth-child(2) > td:nth-child(6)').text()
    shots += +page('#pl_Stats > tbody > tr:nth-child(2) > td:nth-child(17)').text()
    games_played += +page('#pl_Stats > tbody > tr:nth-child(2) > td:nth-child(3)').text()
  } else {
    goals += +page('#pl_Stats > tbody > tr:nth-child(4) > td:nth-child(4)').text()
    assists += +page('#pl_Stats > tbody > tr:nth-child(4) > td:nth-child(5)').text()
    points += +page('#pl_Stats > tbody > tr:nth-child(4) > td:nth-child(6)').text()
    shots += +page('#pl_Stats > tbody > tr:nth-child(4) > td:nth-child(17)').text()
    games_played += +page('#pl_Stats > tbody > tr:nth-child(4) > td:nth-child(3)').text()
  }

  return { goals, assists, points, shots, games_played }
}
