const db = require('../db')
const dotenv = require('dotenv')

dotenv.config()

async function removeOldGames() {
  const date = new Date()
  date.setDate(date.getDate() - 3)
  console.log(`Removing games from before ${date}...`)

  await db('games').where('created_at', '<=', date.toISOString()).del()

  console.log('Finished removing games!')
  process.exit()
}

removeOldGames()
