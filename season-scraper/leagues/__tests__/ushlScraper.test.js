const ushlScraper = require('../ushlScraper')
const utils = require('../../../utils')

describe('ushlScraper()', () => {
  it('gets prospect json and scrapes current season stats', async () => {
    const prospectJson = require('./__fixtures__/ushl_mike_koster.fixture')
    const prospect = {
      first_name: 'Mike',
      last_name: 'Koster',
      league_id: '7842',
      league: 'USHL',
    }

    jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2019-20')
    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const { goals, assists, points, shots, games_played } = await ushlScraper(prospect)

    expect(goals).toEqual(3)
    expect(assists).toEqual(15)
    expect(points).toEqual(18)
    expect(shots).toEqual(64)
    expect(games_played).toEqual(37)
  })

  describe('when null league_id is inputted', () => {
    it('it throws error', async () => {
      const prospect = { league: 'ECHL' }

      await expect(ushlScraper(prospect)).rejects.toThrow()
    })
  })

  describe('when season does not exist', () => {
    it('gets prospect json and scrapes current season stats', async () => {
      const prospectJson = require('./__fixtures__/ushl_mike_koster.fixture')
      const prospect = {
        first_name: 'Mike',
        last_name: 'Koster',
        league_id: '7842',
        statline_url: null,
        game_statline_url: null,
        league: 'USHL',
      }

      jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2011-12')
      jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

      const { goals, assists, points, shots, games_played } = await ushlScraper(prospect)

      expect(goals).toEqual(null)
      expect(assists).toEqual(null)
      expect(points).toEqual(null)
      expect(shots).toEqual(null)
      expect(games_played).toEqual(null)
    })
  })
})
