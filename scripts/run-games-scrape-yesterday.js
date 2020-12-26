const db = require('../db')

const dotenv = require('dotenv')
const gamesScraper = require('../games-scraper')
const prospects = require('../prospect_info')

dotenv.config()

async function scrapeCurrentGames() {
  const [month, day, year] = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York' }).format(new Date()).split('/')
  const date = new Date(new Date(Date.UTC(+year, +month - 1, +day - 1, 12, 0, 0)).toUTCString())
  console.log(`Starting Games Scrape for ${date.toString()}...`)
  const currentDate = new Date()
  const created_at = currentDate.toISOString()

  await Promise.all(
    prospects.map(async prospect => {
      try {
        const game = await gamesScraper(prospect, date)

        if (game) {
          await db('games')
            .insert({
              ...game,
              date_time: `${game.date} 12:00:00`,
              created_at,
              updated_at: created_at,
            })
            .onConflict(['last_name', 'first_name', 'date'])
            .merge({
              ...game,
              date_time: `${game.date} 12:00:00`,
              updated_at: created_at,
            })
        }
      } catch (err) {
        console.log(`${prospect.first_name} ${prospect.last_name} (${prospect.league})`)
        console.error(err)
      }
    }),
  )

  console.log('Finished Games Scrape!')
  process.exit()
}

scrapeCurrentGames()
