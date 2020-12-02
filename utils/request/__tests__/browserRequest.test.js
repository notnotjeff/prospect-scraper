const browserRequest = require('../browserRequest')
const puppeteer = require('puppeteer')

describe('browserRequest()', () => {
  it('creates browser/page, goes to passed url, and executes callback', async () => {
    const url = 'www.example.com'

    // Mock Puppeteer
    const mockCallback = jest.fn()
    const mockPage = {
      goto: jest.fn(),
      close: jest.fn(),
      setUserAgent: jest.fn(),
    }
    const mockBrowser = {
      newPage: jest.fn(() => mockPage),
      close: jest.fn(),
    }
    const mockLaunch = jest.fn(() => mockBrowser)
    jest.spyOn(puppeteer, 'launch').mockImplementation(mockLaunch)

    const response = await browserRequest(url, mockCallback)

    expect(response).toEqual(true)
    expect(mockLaunch.mock.calls.length).toEqual(1)
    expect(mockBrowser.newPage.mock.calls.length).toEqual(1)
    expect(mockBrowser.close.mock.calls.length).toEqual(1)
    expect(mockPage.goto.mock.calls.length).toEqual(1)
    expect(mockPage.close.mock.calls.length).toEqual(1)
    expect(mockCallback.mock.calls.length).toEqual(1)
  })

  it('rescues errors in try block by closing page/browser and returning false', async () => {
    const url = 'www.example.com'

    // Mock Puppeteer
    const mockCallback = jest.fn()
    const mockPage = {
      goto: () => {
        throw new Error()
      },
      close: jest.fn(),
      setUserAgent: jest.fn(),
    }
    const mockBrowser = {
      newPage: jest.fn(() => mockPage),
      close: jest.fn(),
    }
    const mockLaunch = jest.fn(() => mockBrowser)
    jest.spyOn(puppeteer, 'launch').mockImplementation(mockLaunch)

    console.error = jest.fn()

    const response = await browserRequest(url, mockCallback)

    expect(response).toEqual(false)
    expect(console.error).toHaveBeenCalledTimes(2)
    expect(mockBrowser.close.mock.calls.length).toEqual(1)
    expect(mockPage.close.mock.calls.length).toEqual(1)
  })
})
