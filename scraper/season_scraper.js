// Use 'node scraper/season_scraper.js' to run script

const rp = require("request-promise");
const cheerio = require("cheerio");
const dotenv = require("dotenv");

const dateHelpers = require("./helpers/date_helpers.js");
const generalHelpers = require("./helpers/general_helpers.js");

const chlScraper = require("./league_scrapers/chl_scraper.js");
const ahlScraper = require("./league_scrapers/ahl_scraper.js");
const ushlScraper = require("./league_scrapers/ushl_scraper.js");
const echlScraper = require("./league_scrapers/echl_scraper.js");
const khlScraper = require("./league_scrapers/khl_scraper.js");
const shlScraper = require("./league_scrapers/shl_scraper.js");
const vhlScraper = require("./league_scrapers/vhl_scraper.js");
const ncaaScraper = require("./league_scrapers/ncaa_scraper.js");
const nlaScraper = require("./league_scrapers/nla_scraper.js");
const liigaScraper = require("./league_scrapers/liiga_scraper.js");
const mestisScraper = require("./league_scrapers/mestis_scraper.js");

dotenv.config();

const parseCounts = (league, prospect, { first_name, last_name }) => {
  const seasonStartYear = dateHelpers.getSeasonStartYear();

  let goals = 0;
  let assists = 0;
  let points = 0;
  let shots = 0;
  let games_played = 0;

  if (league === "OHL") {
    [goals, assists, points, shots, games_played] = chlScraper.seasonScrape(
      prospect.SiteKit.Player.regular,
      seasonStartYear
    );
  } else if (league === "WHL") {
    [goals, assists, points, shots, games_played] = chlScraper.seasonScrape(
      prospect.SiteKit.Player.regular,
      seasonStartYear
    );
  } else if (league === "QMJHL") {
    const parsedData = JSON.parse(prospect.substr(5, prospect.length - 6));
    [goals, assists, points, shots, games_played] = chlScraper.seasonScrape(
      parsedData.SiteKit.Teamstat.seasons.regular,
      seasonStartYear
    );
  } else if (league === "AHL") {
    const parsedData = JSON.parse(prospect.slice(5, prospect.length - 1));
    [goals, assists, points, shots, games_played] = ahlScraper.seasonScrape(
      parsedData.careerStats[0].sections[0].data,
      generalHelpers.getCurrentSeason()
    );
  } else if (league === "USHL") {
    const parsedData = JSON.parse(prospect.slice(5, prospect.length - 1));
    [goals, assists, points, shots, games_played] = ushlScraper.seasonScrape(
      parsedData.careerStats[0].sections[0].data,
      generalHelpers.getCurrentSeason()
    );
  } else if (league === "NLA") {
    const nlaRegex = /\(([^)]+)\)/;
    const parsedData = JSON.parse(nlaRegex.exec(prospect)[1]);
    [goals, assists, points, shots, games_played] = nlaScraper.seasonScrape(
      parsedData.data,
      `${last_name} ${first_name}`
    );
  } else if (league === "ECHL") {
    [goals, assists, points, shots, games_played] = echlScraper.seasonScrape(
      prospect.data.stats.history,
      generalHelpers.getCurrentSeason()
    );
  } else if (league === "KHL") {
    [goals, assists, points, shots, games_played] = khlScraper.seasonScrape(
      prospect
    );
  } else if (league === "SHL") {
    [goals, assists, points, shots, games_played] = shlScraper.seasonScrape(
      prospect
    );
  } else if (league === "VHL") {
    [goals, assists, points, shots, games_played] = vhlScraper.seasonScrape(
      prospect
    );
  } else if (league === "NCAA") {
    [goals, assists, points, shots, games_played] = ncaaScraper.seasonScrape(
      prospect
    );
  } else if (league === "Liiga") {
    [goals, assists, points, shots, games_played] = liigaScraper.seasonScrape(
      prospect
    );
  } else if (league === "Mestis") {
    [goals, assists, points, shots, games_played] = mestisScraper.seasonScrape(
      prospect
    );
  }

  return {
    games_played: Number(games_played),
    goals: Number(goals),
    assists: Number(assists),
    points: Number(points),
    shots: Number(shots),
  };
};

const parseRates = ({ games_played, goals, assists, points, shots }) => {
  let goals_pg = null;
  let assists_pg = null;
  let points_pg = null;
  let shots_pg = null;

  if (Number(games_played) > 0) {
    games_played = Number(games_played);
    goals_pg = (goals / games_played).toFixed(2);
    assists_pg = (assists / games_played).toFixed(2);
    points_pg = (points / games_played).toFixed(2);
    shots_pg = (shots / games_played).toFixed(2);
  }

  return { goals_pg, assists_pg, points_pg, shots_pg };
};

module.exports = async (prospects = []) => {
  const scrapedProspectData = await Promise.all(
    prospects.map(async (prospect) => {
      const urlData = [
        "OHL",
        "AHL",
        "ECHL",
        "WHL",
        "USHL",
        "QMJHL",
        "Mestis",
        "NLA",
      ].includes(prospect.league)
        ? {
            url: prospect.statline_url,
            json: true,
          }
        : {
            url: prospect.statline_url,
            transform: (body) => cheerio.load(body),
          };

      try {
        const prospectData = await rp(urlData);

        const countingStats = parseCounts(prospect.league, prospectData, {
          first_name: prospect.first_name,
          last_name: prospect.last_name,
        });
        const rateStats = parseRates(countingStats);
        const age = generalHelpers.getAge(prospect.dob);

        return {
          ...prospect,
          age,
          ...countingStats,
          ...rateStats,
        };
      } catch (err) {
        console.error(err);
      }
    })
  );

  return scrapedProspectData;
};
