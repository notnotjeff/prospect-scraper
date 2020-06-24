// EXAMPLE
// {
//   profile_url: "http://www.leijonat.fi/modules/mod_playercardseriestats/helper/getplayerseriestats.php?lkq=448645413073080382451268&age=18&season=2019&isgoalie=0&isskater=1",
//   games_url: "http://www.leijonat.fi/modules/mod_playercardseriestats/helper/getplayerseriestats.php?lkq=448645413073080382451268&age=18&season=2019&isgoalie=0&isskater=1",
//   league: "Mestis",
// }

module.exports = {
  seasonScrape(leagues) {
    const shots = null;
    let goals = 0;
    let assists = 0;
    let points = 0;
    let games_played = 0;

    const stats = leagues.SkaterLevels.find(l => l.LevelName === "Mestis");

    if (stats !== undefined) {
      goals = stats.LevelGoals;
      assists = stats.LevelAssists;
      points = stats.LevelPoints;
      games_played = stats.PlayedLevelGames;
    }

    return [goals, assists, points, shots, games_played];
  }
};
