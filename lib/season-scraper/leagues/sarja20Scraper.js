const utils = require('../../utils')

module.exports = async function (prospect) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete Sarja20 scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const currentSeason = utils.date.getCurrentSeason('YYYY-YYYY').split('-')[1]
  const url = `http://www.leijonat.fi/modules/mod_playercardseriestats/helper/getplayerseriestats3.php?lkq=${String(
    prospect.league_id,
  )}&season=${currentSeason}&isgoalie=0&isskater=1`
  const scrapedProspect = await utils.request.jsonRequest(url)

  const season = scrapedProspect.SkaterLevels.find(league => league.LevelName === 'U20 SM-sarja')

  const goals = +season.LevelGoals
  const assists = +season.LevelAssists
  const points = +season.LevelPoints
  const shots = null
  const games_played = +season.PlayedLevelGames

  return { goals, assists, points, shots, games_played }
}
