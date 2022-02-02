const whlScraper = require('../whlScraper')
const utils = require('../../../utils')

describe('whlScraper()', () => {
  it('gets prospect json and scrapes current season stats', async () => {
    const prospectJson = require('./__fixtures__/whl_filip_kral.fixture')
    const prospect = {
      first_name: 'Filip',
      last_name: 'Kral',
      league_id: '27960',
      league: 'WHL',
    }

    jest.spyOn(utils.date, 'getSeasonStartYear').mockImplementation(() => 2019)
    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const { goals, assists, points, shots, games_played } = await whlScraper(prospect)

    expect(goals).toEqual(12)
    expect(assists).toEqual(37)
    expect(points).toEqual(49)
    expect(shots).toEqual(129)
    expect(games_played).toEqual(53)
  })

  describe('when null league_id is inputted', () => {
    it('it throws error', async () => {
      const prospect = { league: 'WHL' }

      await expect(whlScraper(prospect)).rejects.toThrow()
    })
  })

  describe('when season does not exist', () => {
    it('gets prospect json and scrapes current season stats', async () => {
      const prospectJson = require('./__fixtures__/whl_filip_kral.fixture')
      const prospect = {
        first_name: 'Filip',
        last_name: 'Kral',
        league_id: '27960',
        league: 'WHL',
      }

      jest.spyOn(utils.date, 'getSeasonStartYear').mockImplementation(() => 2011)
      jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

      const { goals, assists, points, shots, games_played } = await whlScraper(prospect)

      expect(goals).toEqual(null)
      expect(assists).toEqual(null)
      expect(points).toEqual(null)
      expect(shots).toEqual(null)
      expect(games_played).toEqual(null)
    })
  })

  describe('when player has no stats for season replace - with 0', () => {
    it('gets prospect json and scrapes current season stats', async () => {
      const prospectJson = require('./__fixtures__/whl_filip_kral.fixture')
      const prospect = {
        first_name: 'Filip',
        last_name: 'Kral',
        league_id: '27960',
        league: 'WHL',
      }

      jest.spyOn(utils.date, 'getSeasonStartYear').mockImplementation(() => 2018)
      jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

      const { goals, assists, points, shots, games_played } = await whlScraper(prospect)

      expect(goals).toEqual(0)
      expect(assists).toEqual(0)
      expect(points).toEqual(0)
      expect(shots).toEqual(0)
      expect(games_played).toEqual(0)
    })
  })
})
