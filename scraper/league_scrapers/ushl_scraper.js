// EXAMPLE
// {
//   profile_url: "https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=7631&site_id=0&key=e828f89b243dc43f&client_code=ushl&league_id=&lang=en&statsType=standard&callback=json",
//   games_url: "https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=7631&season_id=67&site_id=0&key=e828f89b243dc43f&client_code=ushl&league_id=&lang=en&statsType=standard&callback=json",
//   league: "USHL",
// }

module.exports = {
  seasonScrape(seasons, currentSeason) {
    const currentSeasons = seasons.filter(season => {
      return season.row.season_name === `${currentSeason}`;
    });

    let goals = 0;
    let assists = 0;
    let points = 0;
    let shots = 0;
    let games_played = 0;

    currentSeasons.forEach(season => {
      goals += +season.row.goals;
      assists += +season.row.assists;
      points += +season.row.points;
      shots += +season.row.shots;
      games_played += +season.row.games_played;
    });

    return [goals, assists, points, shots, games_played];
  }
};
