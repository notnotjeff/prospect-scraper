// EXAMPLE
// {
//   profile_url: "http://liiga.fi/pelaajat/100025980/lindgren-jesper",
//   games_url: "http://liiga.fi/fi/pelaajat/100025980/lindgren-jesper/ottelu-ottelulta",
//   league: "Liiga",
// }

module.exports = {
  seasonScrape(season) {
    let goals = 0;
    let assists = 0;
    let points = 0;
    let shots = 0;
    let games_played = 0;

    const today = new Date();
    const currentSeason =
      today.getMonth() + 1 < 9
        ? `${today.getFullYear() - 1}-${today.getFullYear()}`
        : `${today.getFullYear()}-${today.getFullYear() + 1}`;
    const tableCheckRow = season(
      "#stats-section > table:nth-child(3) > tbody > tr:nth-last-child(1) > td:nth-child(1)"
    )
      .text()
      .trim();
    const table = tableCheckRow === "Yhteensä" ? 3 : 6;
    const tableCheckYear = season(
      `#stats-section > table:nth-child(${table}) > tbody > tr:nth-last-child(2) > td:nth-child(1)`
    )
      .text()
      .trim();
    const row = tableCheckYear === currentSeason ? 2 : 3;

    goals = season(
      `#stats-section > table:nth-child(${table}) > tbody > tr:nth-last-child(${row}) > td:nth-child(5)`
    ).text();
    assists = season(
      `#stats-section > table:nth-child(${table}) > tbody > tr:nth-last-child(${row}) > td:nth-child(6)`
    ).text();
    points = season(
      `#stats-section > table:nth-child(${table}) > tbody > tr:nth-last-child(${row}) > td:nth-child(7)`
    ).text();
    shots = season(
      `#stats-section > table:nth-child(${table}) > tbody > tr:nth-last-child(${row}) > td:nth-child(15)`
    ).text();
    games_played = season(
      `#stats-section > table:nth-child(${table}) > tbody > tr:nth-last-child(${row}) > td:nth-child(4)`
    ).text();

    return [goals, assists, points, shots, games_played];
  }
};
