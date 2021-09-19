const db = require('../db')
const dotenv = require('dotenv')

dotenv.config()

async function removeAllGames() {
  console.log(`Removing all games...`)

  await db('games').whereNot('id', null).del()

  console.log('Finished removing games!')
  process.exit()
}

removeAllGames()
