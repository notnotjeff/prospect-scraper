const cheerio = require('cheerio')
const ncaaScraper = require('../ncaaScraper')
const utils = require('../../../utils')

describe('ncaaScraper()', () => {
  it('gets prospect data and scrapes current season stats', async () => {
    const prospectHtml = require('./__fixtures__/ncaa_ryan_tverberg.fixture')
    const prospect = {
      first_name: 'Ryan',
      last_name: 'Tverberg',
      league_id: '57164',
      league: 'NCAA',
    }

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))
    jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2020-21')

    const { goals, assists, points, shots, games_played } = await ncaaScraper(prospect)

    expect(games_played).toEqual(14)
    expect(goals).toEqual(4)
    expect(assists).toEqual(3)
    expect(points).toEqual(7)
    expect(shots).toEqual(28)
  })

  describe('when null league_id is inputted', () => {
    it('throws error', async () => {
      const prospectHtml = require('./__fixtures__/ncaa_ryan_tverberg.fixture')
      const prospect = {
        first_name: 'Ryan',
        last_name: 'Tverberg',
        league: 'NCAA',
      }

      jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))
      jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2010-2011')

      await expect(ncaaScraper(prospect)).rejects.toThrow()
    })
  })

  describe('when no season', () => {
    it('returns null', async () => {
      const prospectHtml = require('./__fixtures__/ncaa_ryan_tverberg.fixture')
      const prospect = {
        first_name: 'Ryan',
        last_name: 'Tverberg',
        league_id: '57164',
        league: 'NCAA',
      }

      jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))
      jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2010-2011')

      const season = await ncaaScraper(prospect)

      expect(season).toEqual(null)
    })
  })
})
