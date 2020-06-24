// EXAMPLE OHL
// {
//   profile_url: "http://lscluster.hockeytech.com/feed/?feed=modulekit&view=player&key=2976319eb44abe94&fmt=json&client_code=ohl&lang=en&player_id=7146&category=seasonstats",
//   games_url: "http://lscluster.hockeytech.com/feed/?feed=modulekit&view=player&key=2976319eb44abe94&fmt=json&client_code=ohl&lang=en&player_id=7146&category=gamebygame",
//   league: "OHL",
// }

// EXAMPLE WHL
// {
//   profile_url: "http://lscluster.hockeytech.com/feed/?feed=modulekit&view=player&key=41b145a848f4bd67&fmt=json&client_code=whl&lang=en&player_id=27355&category=seasonstats",
//   games_url: "http://lscluster.hockeytech.com/feed/?feed=modulekit&view=player&key=41b145a848f4bd67&fmt=json&client_code=whl&lang=en&player_id=27355&category=gamebygame",
//   league: "WHL",
// }

// EXAMPLE QMJHL (set qmjhl_season_id globably in prospects.js based on current season_id)
// {
//   profile_url: "https://lscluster.hockeytech.com/feed/index.php?feed=widgetkit2&key=f322673b6bcae299&p=1&client_code=lhjmq&view=Teamstat&fmt=json&player_id=17871&lang=en&force_player=0&callback=json",
//   games_url: `https://lscluster.hockeytech.com/feed/index.php?feed=widgetkit2&key=f322673b6bcae299&client_code=lhjmq&view=Gamebygame&lang=en&season_id=${qmjhl_season_id}&fmt=json&dfdsfdsa=2fdsa&player_id=17871&force_player=0&callback=json`,
//   league: "QMJHL",
// }

module.exports = {
  seasonScrape(seasons, currentSeasonYear) {
    const currentSeasons = seasons.filter(season => {
      return season.season_name.includes(currentSeasonYear.toString());
    });

    let goals = 0;
    let assists = 0;
    let points = 0;
    let shots = 0;
    let games_played = 0;

    currentSeasons.forEach(season => {
      goals += season.goals === "-" ? 0 : +season.goals;
      assists += +season.assists;
      points += +season.points;
      shots += +season.shots;
      games_played += +season.games_played;
    });

    return [goals, assists, points, shots, games_played];
  }
};
