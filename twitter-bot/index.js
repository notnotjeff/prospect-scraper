require('dotenv').config()
const requestUtils = require('../utils/request')
const TwitterConnection = require('../utils/twitter/TwitterConnection')
const fs = require('fs')
const path = require('path')

module.exports = async () => {
  console.log('THIS IS DIRNAME:', __dirname)
  const imagePath = `${__dirname}/images/yesterdays_games.png`
  console.log('THIS IS IMAGEPATH (index.js):', imagePath)
  let buffer = null
  let yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  await requestUtils.browserRequest(process.env.GAMES_FE_URL, async page => {
    await page.waitForSelector('.last_name')
    const element = await page.$('#games-yesterday')
    buffer = await element.screenshot({ type: 'png' })
  })

  fs.writeFileSync(imagePath, buffer.toString('binary'), 'binary')

  const message = `Prospect statlines from ${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}: (${process.env.GAMES_FE_URL})`
  const altText = `Prospect statlines from ${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}`
  const twitterConnection = new TwitterConnection(
    process.env.TWITTER_CONSUMER_KEY,
    process.env.TWITTER_CONSUMER_SECRET,
    process.env.TWITTER_ACCESS_TOKEN_KEY,
    process.env.TWITTER_ACCESS_TOKEN_SECRET,
  )
  twitterConnection.postImage(imagePath, altText, message)
}
