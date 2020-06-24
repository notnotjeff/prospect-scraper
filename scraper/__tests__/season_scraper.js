const seasonScraper = require("../season_scraper");
const prospects = require("../../test/sample_data/prospects");
const nockBack = require("nock").back;

beforeAll(() => {
  nockBack.fixtures = `${__dirname}/fixtures/`;
  nockBack.setMode("record");
});

afterAll(() => {
  nockBack.setMode("wild");
});

test.each([
  ["OHL", "Robertson", "ohlSeason", 46, 55, 31, 86, 255],
  ["AHL", "Sandin", "ahlSeason", 21, 2, 13, 15, 26],
  ["WHL", "Kral", "whlSeason", 53, 12, 37, 49, 129],
  ["QMJHL", "Abramov", "qmjhlSeason", 63, 35, 41, 76, 244],
  ["USHL", "Koster", "ushlSeason", 37, 3, 15, 18, 64],
  ["ECHL", "Brazeau", "echlSeason", 57, 27, 28, 55, 158],
  ["KHL", "Rasanen", "khlSeason", 17, 0, 0, 0, 10],
  ["Liiga", "Kokkonen", "liigaSeason", 39, 3, 7, 10, 113],
  ["NCAA", "Abruzzese", "ncaaSeason", 31, 14, 30, 44, 74],
  ["SHL", "Holmberg", "shlSeason", 52, 7, 10, 17, 39],
  ["VHL", "Chebykin", "vhlSeason", 44, 5, 13, 18, 109],
  ["VHL", "Kizimov", "vhlWithoutSummarySeason", 45, 5, 8, 13, 55],
])(
  "it successfully scrapes %s player stats for %s (%s)",
  async (
    league,
    player,
    nockName,
    gamesPlayed,
    goals,
    assists,
    points,
    shots
  ) => {
    const { nockDone } = await nockBack(`${nockName}.json`, {});
    const leagueProspects = prospects.filter(
      (prospect) => prospect.league === league && prospect.last_name === player
    );
    const scrapedProspects = await seasonScraper(leagueProspects);
    const statline = scrapedProspects[0];

    expect(statline.league).toBe(league);
    expect(statline.games_played).toBe(gamesPlayed);
    expect(statline.goals).toBe(goals);
    expect(statline.assists).toBe(assists);
    expect(statline.points).toBe(points);
    expect(statline.shots).toBe(shots);

    nockDone();
  }
);
