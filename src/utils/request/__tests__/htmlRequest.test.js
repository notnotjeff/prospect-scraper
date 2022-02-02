const rp = require('request-promise')
const cheerio = require('cheerio')
const htmlRequest = require('../htmlRequest')

jest.mock('request-promise', function () {
  return jest.fn(({ transform }) => transform('body'))
})

describe('htmlRequest()', () => {
  it('should call request-promise with url, rejectUnauthorized false, and transform body with cheerio', async () => {
    const url = 'http://www.example.com'
    const mockLoad = jest.fn()
    jest.spyOn(cheerio, 'load').mockImplementation(mockLoad)

    await htmlRequest(url)

    expect(rp.mock.calls.length).toEqual(1)
    expect(mockLoad.mock.calls.length).toEqual(1)
    expect(rp.mock.calls[0][0].rejectUnauthorized).toEqual(false)
    expect(rp.mock.calls[0][0].url).toEqual(url)
  })
})
