const TwitterConnection = require('../TwitterConnection')
const T = require('twit')
const fs = require('fs')

jest.mock('twit')
jest.mock('fs')

const consumerKey = ''
const consumerSecretKey = ''
const accessTokenKey = ''
const accessTokenSecret = ''
const imagePath = ''
const altText = 'Alt text!'
const message = 'Message!'
const fileReturn = 'file-return-value'
const mediaString = 'media-string'

describe('TwitterConnection', () => {
  it('creates new class with connection to Twitter', () => {
    new TwitterConnection(consumerKey, consumerSecretKey, accessTokenKey, accessTokenSecret)

    expect(T).toHaveBeenCalledTimes(1)
  })

  describe('#postImage()', () => {
    it('uses Twitter connection to post image to connected account', () => {
      fs.readFileSync.mockReturnValue(fileReturn)
      const twitterConnection = new TwitterConnection(consumerKey, consumerSecretKey, accessTokenKey, accessTokenSecret)

      jest.spyOn(twitterConnection.twitterInstance, 'post').mockImplementation(function (method, data, callback) {
        switch (method) {
          case 'media/upload':
            callback(false, { media_id_string: mediaString })
            break
          case 'media/metadata/create':
            callback(false)
            break
          case 'statuses/update':
            break
          default:
            break
        }
      })

      twitterConnection.postImage(imagePath, altText, message)

      expect(twitterConnection.twitterInstance.post.mock.calls[0]).toEqual(expect.arrayContaining(['media/upload', { media_data: fileReturn }]))
      expect(twitterConnection.twitterInstance.post.mock.calls[1]).toEqual(
        expect.arrayContaining(['media/metadata/create', { media_id: mediaString, alt_text: { text: altText } }]),
      )
      expect(twitterConnection.twitterInstance.post.mock.calls[2]).toEqual(
        expect.arrayContaining(['statuses/update', { media_ids: [mediaString], status: message }]),
      )
    })

    it('will not make call to media/metadata/create or statuses/update if error is true after media/upload stage', () => {
      fs.readFileSync.mockReturnValue(fileReturn)
      const twitterConnection = new TwitterConnection(consumerKey, consumerSecretKey, accessTokenKey, accessTokenSecret)

      jest.spyOn(twitterConnection.twitterInstance, 'post').mockImplementation(function (method, data, callback) {
        switch (method) {
          case 'media/upload':
            callback(true, { media_id_string: mediaString })
            break
          case 'media/metadata/create':
            callback(false)
            break
          case 'statuses/update':
            break
          default:
            break
        }
      })

      twitterConnection.postImage(imagePath, altText, message)

      expect(twitterConnection.twitterInstance.post.mock.calls.length).toEqual(1)
    })

    it('will not make call to statuses/update if error is true after media/metadata/create', () => {
      fs.readFileSync.mockReturnValue(fileReturn)
      const twitterConnection = new TwitterConnection(consumerKey, consumerSecretKey, accessTokenKey, accessTokenSecret)

      jest.spyOn(twitterConnection.twitterInstance, 'post').mockImplementation(function (method, data, callback) {
        switch (method) {
          case 'media/upload':
            callback(false, { media_id_string: mediaString })
            break
          case 'media/metadata/create':
            callback(true)
            break
          case 'statuses/update':
            break
          default:
            break
        }
      })

      twitterConnection.postImage(imagePath, altText, message)

      expect(twitterConnection.twitterInstance.post.mock.calls.length).toEqual(2)
    })
  })
})
