const echlScraper = require('../echlScraper')
const utils = require('../../../utils')

describe('echlScraper()', () => {
  it('gets prospect json and scrapes current season stats', async () => {
    const prospectJson = require('./__fixtures__/echl_justin_brazeau.fixture')
    const prospect = {
      first_name: 'Justin',
      last_name: 'Brazeau',
      league_id: '5ae4e4e2e12fbdac1ee2e381',
      league: 'ECHL',
    }

    jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2019-20')
    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const { goals, assists, points, shots, games_played } = await echlScraper(prospect)

    expect(goals).toEqual(27)
    expect(assists).toEqual(28)
    expect(points).toEqual(55)
    expect(shots).toEqual(158)
    expect(games_played).toEqual(57)
  })

  describe('when null league_id is inputted', () => {
    it('it throws error', async () => {
      const prospect = { league: 'ECHL' }

      await expect(echlScraper(prospect)).rejects.toThrow()
    })
  })

  describe('when season cannot be found', () => {
    it('it returns null values', async () => {
      const prospectJson = require('./__fixtures__/echl_justin_brazeau.fixture')
      const prospect = {
        first_name: 'Justin',
        last_name: 'Brazeau',
        league_id: '5ae4e4e2e12fbdac1ee2e381',
        league: 'ECHL',
      }

      jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2010-11')
      jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

      const { goals, assists, points, shots, games_played } = await echlScraper(prospect)

      expect(goals).toEqual(null)
      expect(assists).toEqual(null)
      expect(points).toEqual(null)
      expect(shots).toEqual(null)
      expect(games_played).toEqual(null)
    })
  })
})
