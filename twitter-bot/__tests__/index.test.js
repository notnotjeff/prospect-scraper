const twitterBot = require('../')
const requestUtils = require('../../utils/request')
const TwitterConnection = require('../../classes/TwitterConnection')

// Mock TwitterConnection class
jest.mock('../../classes/TwitterConnection')

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
      screenshot: jest.fn(async () => Promise.resolve()),
    }
    const mockPage = {
      waitForResponse: jest.fn(async callback => Promise.resolve(callback({ url: () => '' }))),
      $: jest.fn(async () => mockElement),
    }
    const mockBrowserRequest = jest.fn(async (_url, callback) => callback(mockPage))
    jest.spyOn(requestUtils, 'browserRequest').mockImplementation(mockBrowserRequest)

    await twitterBot()

    expect(mockElement.screenshot.mock.calls.length).toEqual(1)
    expect(mockPage.waitForResponse.mock.calls.length).toEqual(1)
    expect(mockPage.$.mock.calls.length).toEqual(1)
    expect(TwitterConnection).toHaveBeenCalledTimes(1)

    const mockTwitterConnectionInstance = TwitterConnection.mock.instances[0]
    expect(mockTwitterConnectionInstance.postImage.mock.calls.length).toEqual(1)
  })
})
