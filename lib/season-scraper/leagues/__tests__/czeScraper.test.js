const cheerio = require('cheerio')
const czeScraper = require('../czeScraper')
const utils = require('../../../utils')

describe('czeScraper()', () => {
  it('gets prospect html table and scrapes current season', async () => {
    const prospectHtml = require('./__fixtures__/cze_kral_profile.fixture')
    const prospect = {
      first_name: 'Filip',
      last_name: 'Kral',
      league_id: '23461',
      league: 'CZE',
    }

    jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2020-2021')
    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const { goals, assists, points, shots, games_played } = await czeScraper(prospect)

    expect(goals).toEqual(0)
    expect(assists).toEqual(2)
    expect(points).toEqual(2)
    expect(shots).toEqual(null)
    expect(games_played).toEqual(3)
  })

  describe('when null league_id is inputted', () => {
    it('it throws error', async () => {
      const prospect = { league: 'CZE' }

      await expect(czeScraper(prospect)).rejects.toThrow()
    })
  })

  describe('when season does not exist', () => {
    it('returns null values', async () => {
      const prospectHtml = require('./__fixtures__/cze_kral_profile.fixture')
      const prospect = {
        first_name: 'Filip',
        last_name: 'Kral',
        league_id: '23461',
        league: 'CZE',
      }

      jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2010-2011')
      jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

      const { goals, assists, points, shots, games_played } = await czeScraper(prospect)

      expect(goals).toEqual(null)
      expect(assists).toEqual(null)
      expect(points).toEqual(null)
      expect(shots).toEqual(null)
      expect(games_played).toEqual(null)
    })
  })
})
