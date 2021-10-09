const cheerio = require('cheerio')
const ncaaScraper = require('../ncaaScraper')
const utils = require('../../../utils')

describe('ncaaScraper()', () => {
  it('gets prospect html and scrapes for game on date', async () => {
    const prospectHtml = require('./__fixtures__/ncaa_ryan_tverberg.fixture')
    const prospect = {
      first_name: 'Ryan',
      last_name: 'Tverberg',
      league_id: '57164',
      league: 'NCAA',
    }
    const date = new Date('2021-01-16 12:00:00')

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))
    jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2020-21')

    const gameData = await ncaaScraper(prospect, date)

    expect(gameData.goals).toEqual(1)
    expect(gameData.assists).toEqual(1)
    expect(gameData.points).toEqual(2)
    expect(gameData.shots).toEqual(null)
    expect(gameData.penalty_minutes).toEqual(0)
    expect(gameData.date).toEqual('2021-01-16')
  })

  describe('when there is no season on specified date', () => {
    it('returns null', async () => {
      const prospectHtml = require('./__fixtures__/ncaa_ryan_tverberg.fixture')
      const prospect = {
        first_name: 'Ryan',
        last_name: 'Tverberg',
        league_id: '57164',
        league: 'NCAA',
      }
      const noGameAtdate = new Date('2010-09-26 12:00:00')

      jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))
      jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2010-11')

      const gameData = await ncaaScraper(prospect, noGameAtdate)

      expect(gameData).toEqual(null)
    })
  })

  describe('when there is no game on the specified date', () => {
    it('returns null', async () => {
      const prospectHtml = require('./__fixtures__/ncaa_ryan_tverberg.fixture')
      const prospect = {
        first_name: 'Ryan',
        last_name: 'Tverberg',
        league_id: '57164',
        league: 'NCAA',
      }
      const noGameAtdate = new Date('2020-09-26 12:00:00')

      jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))
      jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2020-21')

      const gameData = await ncaaScraper(prospect, noGameAtdate)

      expect(gameData).toEqual(null)
    })
  })

  describe('when prospect does not have a league_id', () => {
    it('it throws error', async () => {
      const prospect = {}
      const date = new Date()

      await expect(ncaaScraper(prospect, date)).rejects.toThrow()
    })
  })
})
