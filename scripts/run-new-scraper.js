const americanHockeyLeague = require('../season-scraper/leagues/americanHockeyLeague')
const utils = require('../utils')

const testerFunction = async () => {
  const stats = await americanHockeyLeague(6893)
  console.log(stats)
}

testerFunction()