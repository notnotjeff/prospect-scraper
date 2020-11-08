const utils = require('../../utils')

// EXAMPLE PROSPECT.JS JSON
// {
//    league_id: '255011063073080359893401',
//    statline_url: null
//    game_statline_url: null
//    league: "Sarja20",
// }

module.exports = async function (prospect) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete USHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const currentSeason = utils.getCurrentSeason('YYYY-YYYY').split('-')[1]
  const url = `http://www.leijonat.fi/modules/mod_playercardseriestats/helper/getplayerseriestats3.php?lkq=${String(
    prospect.league_id,
  )}&season=${currentSeason}&isgoalie=0&isskater=1`
  const scrapedProspect = await utils.jsonRequest(url)

  const season = scrapedProspect.SkaterLevels.find(league => league.LevelName === 'U20 SM-sarja')

  const goals = +season.LevelGoals
  const assists = +season.LevelAssists
  const points = +season.LevelPoints
  const shots = null
  const games_played = +season.PlayedLevelGames

  return { goals, assists, points, shots, games_played }
}
