const dotenv = require('dotenv')
const twitterBot = require('../twitter-bot')

dotenv.config()

async function postYesterdaysGamesOnTwitter() {
  console.log('Tweeting games...')
  try {
    await twitterBot()
    console.log('Finished tweeting games!')
  } catch (err) {
    console.error(err)
  }
}

postYesterdaysGamesOnTwitter()
