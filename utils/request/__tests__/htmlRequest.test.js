const htmlRequest = require('../htmlRequest')

jest.mock('request-promise', () => {
  return jest.fn(({ transform }) => transform('body'))
})

const rp = require('request-promise')
const cheerio = require('cheerio')

describe('htmlRequest()', () => {
  it('should call request-promise with url, rejectUnauthorized false, and transform body with cheerio', async () => {
    const url = 'www.example.com'
    const mockLoad = jest.fn()
    jest.spyOn(cheerio, 'load').mockImplementation(mockLoad)
    await htmlRequest(url)

    expect(rp.mock.calls.length).toEqual(1)
    expect(mockLoad.mock.calls.length).toEqual(1)
    expect(rp.mock.calls[0][0].rejectUnauthorized).toEqual(false)
    expect(rp.mock.calls[0][0].url).toEqual(url)
  })
})
