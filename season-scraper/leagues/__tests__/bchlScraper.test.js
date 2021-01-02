const bchlScraper = require('../bchlScraper')
const utils = require('../../../utils')

describe('bchlScraper()', () => {
  it('gets prospect json and scrapes current season stats', async () => {
    const prospectJson = require('./__fixtures__/bchl_dawson_tritt.fixture')
    const prospect = {
      first_name: 'Dawson',
      last_name: 'Tritt',
      league_id: '5115',
      league: 'BCHL',
    }

    jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2019-20')
    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const { goals, assists, points, shots, games_played } = await bchlScraper(prospect)

    expect(goals).toEqual(18)
    expect(assists).toEqual(13)
    expect(points).toEqual(31)
    expect(shots).toEqual(null)
    expect(games_played).toEqual(58)
  })

  describe('when null league_id is inputted', () => {
    it('it throws error', async () => {
      const prospect = { league: 'BCHL' }

      await expect(bchlScraper(prospect)).rejects.toThrow()
    })
  })

  describe('when season does not exist', () => {
    it('it returns null values', async () => {
      const prospectJson = require('./__fixtures__/bchl_dawson_tritt.fixture')
      const prospect = {
        first_name: 'Dawson',
        last_name: 'Tritt',
        league_id: '5115',
        league: 'BCHL',
      }

      jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2010-11')
      jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

      const { goals, assists, points, shots, games_played } = await bchlScraper(prospect)

      expect(goals).toEqual(null)
      expect(assists).toEqual(null)
      expect(points).toEqual(null)
      expect(shots).toEqual(null)
      expect(games_played).toEqual(null)
    })
  })
})
