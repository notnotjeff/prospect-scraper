const qmjhlScraper = require('../qmjhlScraper')
const utils = require('../../../utils')

describe('qmjhlScraper()', () => {
  test('gets prospect json and scrapes current season stats', async () => {
    const prospectJson = require('./__fixtures__/qmjhl_mikhail_abramov.fixture')
    const prospect = {
      first_name: 'Mikhail',
      last_name: 'Abramov',
      position: 'C',
      shoots: 'L',
      dob: '2001-03-26',
      draft_round: 4,
      draft_pick: 115,
      draft_year: 2019,
      league_id: '17871',
      statline_url:
        'https://lscluster.hockeytech.com/feed/index.php?feed=widgetkit2&key=f322673b6bcae299&p=1&client_code=lhjmq&view=Teamstat&fmt=json&player_id=17871&lang=en&force_player=0&callback=json',
      game_statline_url: `https://lscluster.hockeytech.com/feed/index.php?feed=widgetkit2&key=f322673b6bcae299&client_code=lhjmq&view=Gamebygame&lang=en&season_id=193&fmt=json&dfdsfdsa=2fdsa&player_id=17871&force_player=0&callback=json`,
      league: 'QMJHL',
      ep_url: 'https://www.eliteprospects.com/player/514653/mikhail-abramov',
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
    test('it throws error', async () => {
      const prospect = { league: 'QMJHL' }

      await expect(qmjhlScraper(prospect)).rejects.toThrow()
    })
  })

  describe('when season does not exist', () => {
    test('gets prospect json and scrapes current season stats', async () => {
      const prospectJson = require('./__fixtures__/qmjhl_mikhail_abramov.fixture')
      const prospect = {
        first_name: 'Mikhail',
        last_name: 'Abramov',
        league_id: '17871',
        statline_url: null,
        game_statline_url: null,
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
    test('gets prospect json and scrapes current season stats', async () => {
      const prospectJson = require('./__fixtures__/qmjhl_mikhail_abramov.fixture')
      const prospect = {
        first_name: 'Mikhail',
        last_name: 'Abramov',
        league_id: '17871',
        statline_url: null,
        game_statline_url: null,
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
