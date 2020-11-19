const db = require('../db')

const dotenv = require('dotenv')
const seasonScraper = require('../season-scraper')
const prospects = require('../prospect_info')
const utils = require('../utils')

dotenv.config()

async function scrapeSeasonStatlines() {
  console.log('Starting Scrape...')
  const date = new Date()
  const created_at = date.toISOString()

  await Promise.all(
    prospects.map(async prospect => {
      try {
        const prospectData = await seasonScraper(prospect)

        if (prospectData) {
          await db('prospects')
            .insert({
              ...prospectData,
              created_at,
              updated_at: created_at,
            })
            .onConflict(['last_name', 'first_name', 'dob'])
            .merge({
              ...prospectData,
              updated_at: created_at,
            })
        }
      } catch (err) {
        console.log(`${prospect.first_name} ${prospect.last_name} (${prospect.league})`)
        console.error(err)

        const age = utils.calculation.ageOnDate(prospect.dob)

        await db('prospects')
          .insert({
            ...prospect,
            age,
            created_at,
            updated_at: created_at,
          })
          .onConflict(['last_name', 'first_name', 'dob'])
          .merge({
            ...prospect,
            age,
            updated_at: created_at,
          })
      }
    }),
  )

  console.log('Finished Scrape!')
  process.exit()
}

scrapeSeasonStatlines()
