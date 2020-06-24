// Use 'node scraper/season_scraper.js' to run script

const db = require("../db");

const dotenv = require("dotenv");
const seasonScraper = require("../scraper/season_scraper");

dotenv.config();

async function scrapeSeasonStatlines() {
  console.log("Starting Scrape...");
  const prospects = await db.select().from("prospects");
  const prospectData = await seasonScraper(prospects);
  console.log("Completed Scrape");

  console.log("Starting Insert...");
  await Promise.all(
    prospectData.map(
      async ({
        id,
        goals,
        assists,
        shots,
        points,
        points_pg,
        assists_pg,
        goals_pg,
        shots_pg,
        games_played,
        age,
      }) => {
        await db("prospects").where({ id }).update({
          goals,
          assists,
          shots,
          points,
          points_pg,
          assists_pg,
          goals_pg,
          shots_pg,
          games_played,
          age,
        });
      }
    )
  );
  console.log("Completed Insert");
}

scrapeSeasonStatlines();
