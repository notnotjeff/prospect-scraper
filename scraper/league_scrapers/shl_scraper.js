// EXAMPLE
// {
//   profile_url: "https://www.shl.se/lag/fe02-fe02mf1FN__vaxjo-lakers/qTK-4a8Y9mMrn__pontus-holmberg/statistics",
//   games_url: "https://www.shl.se/lag/fe02-fe02mf1FN__vaxjo-lakers/qTK-4a8Y9mMrn__pontus-holmberg/gamelog",
//   league: "SHL",
// }

module.exports = {
  seasonScrape(season) {
    let goals = 0;
    let assists = 0;
    let points = 0;
    let shots = 0;
    let games_played = 0;

    // If Row Says Playoffs, Take Previous Regular Season Instead
    if (
      season(".rmss_t-stat-table__row")
        .last()
        .children("td:nth-child(2)")
        .text() === "Slutspel"
    ) {
      goals = season(".rmss_t-stat-table__row:nth-last-of-type(2)")
        .children("td:nth-child(5)")
        .text();
      assists = season(".rmss_t-stat-table__row:nth-last-of-type(2)")
        .children("td:nth-child(6)")
        .text();
      points = season(".rmss_t-stat-table__row:nth-last-of-type(2)")
        .children("td:nth-child(7)")
        .text();
      shots = season(".rmss_t-stat-table__row:nth-last-of-type(2)")
        .children("td:nth-child(10)")
        .text();
      games_played = season(".rmss_t-stat-table__row:nth-last-of-type(2)")
        .children("td:nth-child(4)")
        .text();
    } else {
      goals = season(".rmss_t-stat-table__row")
        .last()
        .children("td:nth-child(5)")
        .text();
      assists = season(".rmss_t-stat-table__row")
        .last()
        .children("td:nth-child(6)")
        .text();
      points = season(".rmss_t-stat-table__row")
        .last()
        .children("td:nth-child(7)")
        .text();
      shots = season(".rmss_t-stat-table__row")
        .last()
        .children("td:nth-child(10)")
        .text();
      games_played = season(".rmss_t-stat-table__row")
        .last()
        .children("td:nth-child(4)")
        .text();
    }

    return [goals, assists, points, shots, games_played];
  }
};
