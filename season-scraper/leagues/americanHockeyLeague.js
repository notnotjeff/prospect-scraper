//ahl scraper for npm module

const utils = require('../../utils')
const axios = require('axios').default;

module.exports = async function (playerId) {
  // if (!prospect.league_id) {
  //   throw new Error(`Cannot complete AHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  // }

  // const url = `https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=${playerId}&site_id=1&key=50c2cd9b5e18e390&client_code=ahl&league_id=&lang=en&statsType=standard&callback=json`
  // const scrapedProspect = await utils.request.jsonRequest(url)
  
  const url = `https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=${playerId}&site_id=1&key=50c2cd9b5e18e390&client_code=ahl&league_id=&lang=en&statsType=standard&callback=json`
  const data = await axios.get(url)
  console.log(JSON.parse(data.data).slice(5,-1))
  
  // const parsedProspect = JSON.parse(String(scrapedProspect).slice(5, -1))
  // const seasons = parsedProspect.careerStats[0].sections[0].data
  // return seasons 
  // const currentSeason = utils.date.getCurrentSeason()
  // const season = seasons.find(season => {
  //   return season.row.season_name === `${currentSeason} Regular Season`
  // })

  // if (!season) {
  //   return { goals : null, assists: null, points: null, shots: null, games_played: null }
  // }

  // return {
  //   goals: +season.row.goals,
  //   assists: +season.row.assists,
  //   points: +season.row.points,
  //   shots: +season.row.shots,
  //   games_played: +season.row.games_played,
  // }
}
