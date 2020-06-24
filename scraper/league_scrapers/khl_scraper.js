// EXAMPLE
// {
//   profile_url: "https://en.khl.ru/players/31190/",
//   games_url: "https://en.khl.ru/players/31190/",
//   league: "KHL",
// }

module.exports = {
  seasonScrape(season) {
    let goals = 0;
    let assists = 0;
    let points = 0;
    let shots = 0;
    let games_played = 0;

    // Check to make sure the row scraped is regular season not playoffs
    if (
      season("#pl_Stats > tbody > tr:nth-child(1) > td:nth-child(1)")
        .text()
        .includes("Regular")
    ) {
      goals = season(
        "#pl_Stats > tbody > tr:nth-child(2) > td:nth-child(4)"
      ).text();
      assists = season(
        "#pl_Stats > tbody > tr:nth-child(2) > td:nth-child(5)"
      ).text();
      points = season(
        "#pl_Stats > tbody > tr:nth-child(2) > td:nth-child(6)"
      ).text();
      shots = season(
        "#pl_Stats > tbody > tr:nth-child(2) > td:nth-child(17)"
      ).text();
      games_played = season(
        "#pl_Stats > tbody > tr:nth-child(2) > td:nth-child(3)"
      ).text();
    } else {
      goals = season(
        "#pl_Stats > tbody > tr:nth-child(4) > td:nth-child(4)"
      ).text();
      assists = season(
        "#pl_Stats > tbody > tr:nth-child(4) > td:nth-child(5)"
      ).text();
      points = season(
        "#pl_Stats > tbody > tr:nth-child(4) > td:nth-child(6)"
      ).text();
      shots = season(
        "#pl_Stats > tbody > tr:nth-child(4) > td:nth-child(17)"
      ).text();
      games_played = season(
        "#pl_Stats > tbody > tr:nth-child(4) > td:nth-child(3)"
      ).text();
    }

    return [goals, assists, points, shots, games_played];
  }
};
