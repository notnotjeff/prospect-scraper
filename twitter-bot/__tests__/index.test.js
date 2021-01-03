const twitterBot = require('../')
const requestUtils = require('../../utils/request')
const TwitterConnection = require('../../utils/twitter/TwitterConnection')
const fs = require('fs')

// Mock TwitterConnection class
jest.mock('../../utils/twitter/TwitterConnection')
jest.mock('fs')

describe('twitterBot()', () => {
  it('makes puppeteer browser request to leafs-prospects/games and takes screenshot of yesterdays games', async () => {
    // Set ENV variables
    process.env.GAMES_FE_URL = 'https://testing-fe-url.com/games'
    process.env.TWITTER_CONSUMER_KEY = ''
    process.env.TWITTER_CONSUMER_SECRET = ''
    process.env.TWITTER_ACCESS_TOKEN_KEY = ''
    process.env.TWITTER_ACCESS_TOKEN_SECRET = ''

    // Mock fs
    fs.existsSync.mockReturnValue(true)
    fs.writeFileSync.mockReturnValue(true)

    // Mock puppeteer request
    const mockElement = {
      screenshot: jest.fn(async () => true),
    }
    const mockPage = {
      $: jest.fn(async () => mockElement),
      setUserAgent: jest.fn(async () => true),
      waitForSelector: jest.fn(async () => true),
    }
    const mockBrowserRequest = jest.fn(async (_url, callback) => callback(mockPage))
    jest.spyOn(requestUtils, 'browserRequest').mockImplementation(mockBrowserRequest)

    await twitterBot()

    expect(mockElement.screenshot.mock.calls.length).toEqual(1)
    expect(mockPage.waitForSelector.mock.calls.length).toEqual(1)
    expect(mockPage.$.mock.calls.length).toEqual(1)
    expect(TwitterConnection).toHaveBeenCalledTimes(1)

    const mockTwitterConnectionInstance = TwitterConnection.mock.instances[0]
    expect(mockTwitterConnectionInstance.postImage.mock.calls.length).toEqual(1)
  })

  describe('when image folder does not exist', () => {
    it('makes directory before saving image', async () => {
      // Set ENV variables
      process.env.GAMES_FE_URL = 'https://testing-fe-url.com/games'
      process.env.TWITTER_CONSUMER_KEY = ''
      process.env.TWITTER_CONSUMER_SECRET = ''
      process.env.TWITTER_ACCESS_TOKEN_KEY = ''
      process.env.TWITTER_ACCESS_TOKEN_SECRET = ''

      // Mock fs
      const mockMkdirSync = jest.fn(() => true)
      fs.existsSync.mockReturnValue(false)
      jest.spyOn(fs, 'mkdirSync').mockImplementation(mockMkdirSync)
      fs.writeFileSync.mockReturnValue(true)

      // Mock puppeteer request
      const mockElement = {
        screenshot: jest.fn(async () => true),
      }
      const mockPage = {
        $: jest.fn(async () => mockElement),
        setUserAgent: jest.fn(async () => true),
        waitForSelector: jest.fn(async () => true),
      }
      const mockBrowserRequest = jest.fn(async (_url, callback) => callback(mockPage))
      jest.spyOn(requestUtils, 'browserRequest').mockImplementation(mockBrowserRequest)

      await twitterBot()

      expect(mockMkdirSync.mock.calls.length).toEqual(1)
    })
  })
})
