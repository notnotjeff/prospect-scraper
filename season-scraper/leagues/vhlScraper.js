const utils = require('../../utils')

// EXAMPLE
// {
//   profile_url: "http://www.vhlru.ru/en/players/22888/",
//   games_url: "http://www.vhlru.ru/en/players/22888/games",
//   league: "VHL",
// }

module.exports = async function (prospect) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete VHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const url = `http://www.vhlru.ru/en/players/${prospect.league_id}/`
  const season = await utils.request.htmlRequest(url)

  let goals = 0
  let assists = 0
  let points = 0
  let shots = 0
  let games_played = 0
  let rowNumber = 4

  // Set rowNumber to the right table row based on if their summary statline has playoffs or not (adds an extra row)
  rowNumber = season(`.player_stats > tbody > tr:nth-last-of-type(${rowNumber})`).text() === 'SHL Summary' ? 5 : 4
  // If the last season was the playoffs skip it and go to regular season
  if (
    season(`.player_stats > tbody > tr:nth-last-of-type(${rowNumber + 1})`)
      .text()
      .includes('Playoffs')
  ) {
    rowNumber += 2
  }

  // If the player has a summary row then alter the default column number so correct stats are plucked
  const columnNumber = season(`.player_stats > tbody > tr:nth-last-of-type(${rowNumber})`).children('td:nth-child(1)').text() === 'Summary:' ? 3 : 4

  goals = +season(`.player_stats > tbody > tr:nth-last-of-type(${rowNumber})`).children(`td:nth-child(${columnNumber})`).text()
  assists = +season(`.player_stats > tbody > tr:nth-last-of-type(${rowNumber})`)
    .children(`td:nth-child(${columnNumber + 1})`)
    .text()
  points = +season(`.player_stats > tbody > tr:nth-last-of-type(${rowNumber})`)
    .children(`td:nth-child(${columnNumber + 2})`)
    .text()
  shots = +season(`.player_stats > tbody > tr:nth-last-of-type(${rowNumber})`)
    .children(`td:nth-child(${columnNumber + 11})`)
    .text()
  games_played = +season(`.player_stats > tbody > tr:nth-last-of-type(${rowNumber})`)
    .children(`td:nth-child(${columnNumber - 1})`)
    .text()

  return { goals, assists, points, shots, games_played }
}
