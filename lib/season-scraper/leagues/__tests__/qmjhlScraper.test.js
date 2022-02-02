const qmjhlScraper = require('../qmjhlScraper')
const utils = require('../../../utils')

describe('qmjhlScraper()', () => {
  it('gets prospect json and scrapes current season stats', async () => {
    const prospectJson = require('./__fixtures__/qmjhl_mikhail_abramov.fixture')
    const prospect = {
      first_name: 'Mikhail',
      last_name: 'Abramov',
      league_id: '17871',
      league: 'QMJHL',
    }

    jest.spyOn(utils.date, 'getSeasonStartYear').mockImplementation(() => 2019)
    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const { goals, assists, points, shots, games_played } = await qmjhlScraper(prospect)

    expect(goals).toEqual(35)
    expect(assists).toEqual(41)
    expect(points).toEqual(76)
    expect(shots).toEqual(244)
    expect(games_played).toEqual(63)
  })

  describe('when null league_id is inputted', () => {
    it('it throws error', async () => {
      const prospect = { league: 'QMJHL' }

      await expect(qmjhlScraper(prospect)).rejects.toThrow()
    })
  })

  describe('when season does not exist', () => {
    it('gets prospect json and scrapes current season stats', async () => {
      const prospectJson = require('./__fixtures__/qmjhl_mikhail_abramov.fixture')
      const prospect = {
        first_name: 'Mikhail',
        last_name: 'Abramov',
        league_id: '17871',
        league: 'QMJHL',
      }

      jest.spyOn(utils.date, 'getSeasonStartYear').mockImplementation(() => 2011)
      jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

      const { goals, assists, points, shots, games_played } = await qmjhlScraper(prospect)

      expect(goals).toEqual(null)
      expect(assists).toEqual(null)
      expect(points).toEqual(null)
      expect(shots).toEqual(null)
      expect(games_played).toEqual(null)
    })
  })

  describe('when player has no stats for season replace - with 0', () => {
    it('gets prospect json and scrapes current season stats', async () => {
      const prospectJson = require('./__fixtures__/qmjhl_mikhail_abramov.fixture')
      const prospect = {
        first_name: 'Mikhail',
        last_name: 'Abramov',
        league_id: '17871',
        league: 'QMJHL',
      }

      jest.spyOn(utils.date, 'getSeasonStartYear').mockImplementation(() => 2018)
      jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

      const { goals, assists, points, shots, games_played } = await qmjhlScraper(prospect)

      expect(goals).toEqual(0)
      expect(assists).toEqual(0)
      expect(points).toEqual(0)
      expect(shots).toEqual(0)
      expect(games_played).toEqual(0)
    })
  })
})
