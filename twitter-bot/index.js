require('dotenv').config()
const requestUtils = require('../utils/request')
const TwitterConnection = require('../utils/twitter/TwitterConnection')
const fs = require('fs')

module.exports = async () => {
  const imageFolder = `${__dirname}/images`
  const imagePath = `${imageFolder}/yesterdays_games.png`
  let buffer = null
  let yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  await requestUtils.browserRequest(process.env.GAMES_FE_URL, async page => {
    await page.waitForSelector('.last_name')
    const element = await page.$('#games-yesterday')
    buffer = await element.screenshot({ type: 'png' })
  })

  if (!fs.existsSync(imageFolder)) {
    fs.mkdirSync(imageFolder)
  }
  fs.writeFileSync(imagePath, buffer.toString('binary'), 'binary')

  const message = `Prospect statlines from ${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}: (${
    process.env.GAMES_FE_URL
  }) #LeafsForever #Leafs`
  const altText = `Prospect statlines from ${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}`
  const twitterConnection = new TwitterConnection(
    process.env.TWITTER_CONSUMER_KEY,
    process.env.TWITTER_CONSUMER_SECRET,
    process.env.TWITTER_ACCESS_TOKEN_KEY,
    process.env.TWITTER_ACCESS_TOKEN_SECRET,
  )
  twitterConnection.postImage(imagePath, altText, message)
}
