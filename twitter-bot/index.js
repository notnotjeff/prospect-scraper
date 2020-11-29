require('dotenv').config()
const requestUtils = require('../utils/request')
const TwitterConnection = require('../classes/TwitterConnection')

module.exports = async () => {
  const imagePath = './twitter-bot/images/yesterdays_games.jpg'
  let yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  await requestUtils.browserRequest(process.env.GAMES_FE_URL, async page => {
    await page.waitForResponse(response => response.url() === process.env.GAMES_BE_URL)
    const element = await page.$('#games-yesterday')
    await element.screenshot({ path: imagePath, type: 'jpeg' })
  })

  const message = `Prospect statlines from ${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}: \n`
  const twitterConnection = new TwitterConnection(
    process.env.TWITTER_CONSUMER_KEY,
    process.env.TWITTER_CONSUMER_SECRET,
    process.env.TWITTER_ACCESS_TOKEN_KEY,
    process.env.TWITTER_ACCESS_TOKEN_SECRET,
  )
  twitterConnection.postImage(imagePath, message, message)
}
