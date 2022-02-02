const fs = require('fs')
const Twit = require('twit')
require('dotenv').config()

module.exports = class TwitterConnection {
  constructor(consumerKey, consumerSecret, token, tokenSecret) {
    this.twitterInstance = new Twit({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      access_token: token,
      access_token_secret: tokenSecret,
    })
  }

  postImage(imagePath, altText, message) {
    const b64content = fs.readFileSync(imagePath, { encoding: 'base64' })
    const bot = this.twitterInstance

    bot.post('media/upload', { media_data: b64content }, function (err, data) {
      if (!err) {
        const mediaIdStr = data.media_id_string
        const metaParams = { media_id: mediaIdStr, alt_text: { text: altText } }
        bot.post('media/metadata/create', metaParams, function (err) {
          if (!err) {
            bot.post('statuses/update', { status: message, media_ids: [mediaIdStr] })
          }
        })
      }
    })

    fs.unlinkSync(imagePath)
  }
}
