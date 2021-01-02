const utils = require('../../utils')

module.exports = async function (prospect) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete MHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const url = `https://engmhl.khl.ru/players/${prospect.league_id}/`
  const page = await utils.request.htmlRequest(url)

  let goals = 0
  let assists = 0
  let points = 0
  let shots = 0
  let games_played = 0

  // Check to make sure the row scraped is regular season not playoffs
  if (page('.site_table > tbody > tr:nth-of-type(1)').text().includes('Regular')) {
    goals += +page('.site_table > tbody > tr:nth-of-type(2) > td:nth-of-type(4)').text()
    assists += +page('.site_table > tbody > tr:nth-of-type(2) > td:nth-of-type(5)').text()
    points += +page('.site_table > tbody > tr:nth-of-type(2) > td:nth-of-type(6)').text()
    shots += +page('.site_table > tbody > tr:nth-of-type(2) > td:nth-of-type(15)').text()
    games_played += +page('.site_table > tbody > tr:nth-of-type(2) > td:nth-of-type(3)').text()
  } else {
    goals += +page('.site_table > tbody > tr:nth-of-type(4) > td:nth-of-type(4)').text()
    assists += +page('.site_table > tbody > tr:nth-of-type(4) > td:nth-of-type(5)').text()
    points += +page('.site_table > tbody > tr:nth-of-type(4) > td:nth-of-type(6)').text()
    shots += +page('.site_table > tbody > tr:nth-of-type(4) > td:nth-of-type(15)').text()
    games_played += +page('.site_table > tbody > tr:nth-of-type(4) > td:nth-of-type(3)').text()
  }

  return { goals, assists, points, shots, games_played }
}
