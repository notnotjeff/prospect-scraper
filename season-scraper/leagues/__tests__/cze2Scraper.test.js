const cheerio = require('cheerio')
const cze2Scraper = require('../cze2Scraper')
const utils = require('../../../utils')

describe('cze2Scraper()', () => {
  it('gets prospect html table and scrapes current season', async () => {
    const prospectHtml = require('./__fixtures__/cze_kral_profile.fixture')
    const prospect = {
      first_name: 'Filip',
      last_name: 'Kral',
      league_id: '23461',
      league: 'CZE2',
    }

    jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2020-2021')
    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const { goals, assists, points, shots, games_played } = await cze2Scraper(prospect)

    expect(goals).toEqual(2)
    expect(assists).toEqual(8)
    expect(points).toEqual(10)
    expect(shots).toEqual(null)
    expect(games_played).toEqual(7)
  })

  describe('when null league_id is inputted', () => {
    it('it throws error', async () => {
      const prospect = { league: 'CZE2' }

      await expect(cze2Scraper(prospect)).rejects.toThrow()
    })
  })

  describe('when season does not exist', () => {
    it('returns null values', async () => {
      const prospectHtml = require('./__fixtures__/cze_kral_profile.fixture')
      const prospect = {
        first_name: 'Filip',
        last_name: 'Kral',
        league_id: '23461',
        league: 'CZE2',
      }

      jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2010-2011')
      jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

      const { goals, assists, points, shots, games_played } = await cze2Scraper(prospect)

      expect(goals).toEqual(null)
      expect(assists).toEqual(null)
      expect(points).toEqual(null)
      expect(shots).toEqual(null)
      expect(games_played).toEqual(null)
    })
  })
})
