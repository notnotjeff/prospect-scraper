const twitterBot = require('../')
const requestUtils = require('../../utils/request')
const TwitterConnection = require('../../utils/twitter/TwitterConnection')
const fs = require('fs')

// Mock TwitterConnection class
jest.mock('../../utils/twitter/TwitterConnection')

describe('twitterBot()', () => {
  it('makes puppeteer browser request to leafs-prospects/games and takes screenshot of yesterdays games', async () => {
    // Set ENV variables
    process.env.GAMES_FE_URL = 'https://testing-fe-url.com/games'
    process.env.GAMES_BE_URL = 'https://testing-be-url.com/games'
    process.env.TWITTER_CONSUMER_KEY = ''
    process.env.TWITTER_CONSUMER_SECRET = ''
    process.env.TWITTER_ACCESS_TOKEN_KEY = ''
    process.env.TWITTER_ACCESS_TOKEN_SECRET = ''

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
    const mockWriteFileSync = jest.fn(async () => true)
    jest.spyOn(requestUtils, 'browserRequest').mockImplementation(mockBrowserRequest)
    jest.spyOn(fs, 'writeFileSync').mockImplementation(mockWriteFileSync)

    await twitterBot()

    expect(mockElement.screenshot.mock.calls.length).toEqual(1)
    expect(mockPage.waitForSelector.mock.calls.length).toEqual(1)
    expect(mockPage.$.mock.calls.length).toEqual(1)
    expect(TwitterConnection).toHaveBeenCalledTimes(1)
    expect(mockWriteFileSync).toHaveBeenCalledTimes(1)

    const mockTwitterConnectionInstance = TwitterConnection.mock.instances[0]
    expect(mockTwitterConnectionInstance.postImage.mock.calls.length).toEqual(1)
  })
})
