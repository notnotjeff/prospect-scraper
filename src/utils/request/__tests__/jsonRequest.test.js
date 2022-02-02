const jsonRequest = require('../jsonRequest')

jest.mock('request-promise', () => {
  return jest.fn()
})

const rp = require('request-promise')

describe('jsonRequest()', () => {
  it('should call request-promise with url, rejectUnauthorized false, and transform body with cheerio', async () => {
    const url = 'www.example.com'
    await jsonRequest(url)

    expect(rp.mock.calls.length).toEqual(1)
    expect(rp.mock.calls[0][0].json).toEqual(true)
    expect(rp.mock.calls[0][0].url).toEqual(url)
  })
})
