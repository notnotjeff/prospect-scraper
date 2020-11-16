const ohlScraper = require('../ohlScraper')
const utils = require('../../../utils')

describe('ohlScraper()', () => {
  test('gets prospect json and scrapes current season stats', async () => {
    const prospectJson = require('./__fixtures__/ohl_nick_robertson.fixture')
    const prospect = {
      first_name: 'Nick',
      last_name: 'Robertson',
      position: 'LW',
      shoots: 'L',
      dob: '2001-09-11',
      draft_round: 2,
      draft_pick: 53,
      draft_year: 2019,
      league_id: '7662',
      statline_url: null,
      game_statline_url: null,
      league: 'OHL',
      ep_url: 'https://www.eliteprospects.com/player/359539/nicholas-robertson',
    }

    jest.spyOn(utils.date, 'getSeasonStartYear').mockImplementation(() => 2019)
    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const { goals, assists, points, shots, games_played } = await ohlScraper(prospect)

    expect(goals).toEqual(55)
    expect(assists).toEqual(31)
    expect(points).toEqual(86)
    expect(shots).toEqual(255)
    expect(games_played).toEqual(46)
  })

  describe('when null league_id is inputted', () => {
    test('it throws error', async () => {
      const prospect = { league: 'OHL' }

      await expect(ohlScraper(prospect)).rejects.toThrow()
    })
  })

  describe('when season does not exist', () => {
    test('gets prospect json and scrapes current season stats', async () => {
      const prospectJson = require('./__fixtures__/ohl_nick_robertson.fixture')
      const prospect = {
        first_name: 'Nick',
        last_name: 'Robertson',
        league_id: '7662',
        statline_url: null,
        game_statline_url: null,
        league: 'OHL',
      }

      jest.spyOn(utils.date, 'getSeasonStartYear').mockImplementation(() => 2011)
      jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

      const { goals, assists, points, shots, games_played } = await ohlScraper(prospect)

      expect(goals).toEqual(null)
      expect(assists).toEqual(null)
      expect(points).toEqual(null)
      expect(shots).toEqual(null)
      expect(games_played).toEqual(null)
    })
  })

  describe('when player has no stats for season replace - with 0', () => {
    test('gets prospect json and scrapes current season stats', async () => {
      const prospectJson = require('./__fixtures__/ohl_nick_robertson.fixture')
      const prospect = {
        first_name: 'Nick',
        last_name: 'Robertson',
        league_id: '7662',
        statline_url: null,
        game_statline_url: null,
        league: 'OHL',
      }

      jest.spyOn(utils.date, 'getSeasonStartYear').mockImplementation(() => 2018)
      jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

      const { goals, assists, points, shots, games_played } = await ohlScraper(prospect)

      expect(goals).toEqual(0)
      expect(assists).toEqual(0)
      expect(points).toEqual(0)
      expect(shots).toEqual(0)
      expect(games_played).toEqual(0)
    })
  })
})
