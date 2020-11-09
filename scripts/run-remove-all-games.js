const db = require('../db')
const dotenv = require('dotenv')

dotenv.config()

async function removeAllGames() {
  const date = new Date()
  date.setDate(date.getDate() + 5)
  console.log(`Removing games from before ${date}...`)

  await db('games').where('date', '<=', date.toDateString()).del()

  console.log('Finished removing games!')
  process.exit()
}

removeAllGames()
