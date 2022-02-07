//ahl scraper for npm module

const utils = require('../../utils')

function getSeasons(prospect) {
  const unFilteredSeasons = [...prospect.careerStats[0].sections[0].data, ...prospect.careerStats[0].sections[1].data].map((season) => season.row)
  
  //The raw data has a season called 'total' in both arrays.  Removing it for now
  const filteredSeasons = unFilteredSeasons.filter((season) => season.season_name != 'Total')
  return filteredSeasons.map((season) => getFormattedSeason(season))

}

function getInfo(info) {
  const age = utils.calculation.ageOnDate(info.birthDate)

  return {
    number: info.jerseyNumber,
    position: info.position,
    age: age
  }
}
//checks if season is the playoffs and returns all associated properties
function getSeasonTypeProperties (seasonName) {
  const startYear = parseInt(seasonName.substr(0,4))
  let type = '', endYear = 0, formattedSeasonName = ''

  if(seasonName[4] === '-') {
    type = 'Regular'
    endYear = startYear + 1 
    formattedSeasonName = `${startYear}-${endYear}`
  } else {
    type = 'playoffs'
    endYear = startYear
    formattedSeasonName = String(startYear)
  }
  return {
    type: type,
    startYear: startYear,
    endYear: endYear,
    seasonName: formattedSeasonName
  }

}

//takes in a season object and formats it with correct property names and information
function getFormattedSeason(season) {
  const seasonTypeProperties = getSeasonTypeProperties(season.season_name)

  return { 
    ...seasonTypeProperties,
      goals: season.goals, 
      assists: season.assists,
      gamesPlayed: season.games_played,
      shots: season.shots,
      points: season.points,
      plusMinus: season.plus_minus,
      penalityMinutes: season.penalty_minutes,
      powerPlayGoals: season.power_play_goals,
      shootoutAttemps: season.shootout_attempts,
      shootoutGoals: season.shootout_goals,
      shootoutPercentage:season.shootout_percentage,
      gameWinningGoals: season.game_winning_goals,
      teamName: season.team_name,
      shortHandedGoals: season.short_handed_goals
      
    }
}


module.exports = async function (playerId) {
  // if (!prospect.league_id) {
  //   throw new Error(`Cannot complete AHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  // }
  const url = `https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=${playerId}&site_id=1&key=50c2cd9b5e18e390&client_code=ahl&league_id=&lang=en&statsType=standard&callback=json`
  const scrapedProspect = await utils.request.jsonRequest(url)    
  const parsedProspect = JSON.parse(String(scrapedProspect).slice(5, -1))
  const seasons = getSeasons(parsedProspect)
  const info = getInfo(parsedProspect.info)

  return {data: {info: info, seasons: seasons}}

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
