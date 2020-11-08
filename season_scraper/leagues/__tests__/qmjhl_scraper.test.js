const qmjhlScraper = require('../qmjhl_scraper')
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
      league_id: '7662',
      statline_url:
        'https://lscluster.hockeytech.com/feed/index.php?feed=widgetkit2&key=f322673b6bcae299&p=1&client_code=lhjmq&view=Teamstat&fmt=json&player_id=17871&lang=en&force_player=0&callback=json',
      game_statline_url: `https://lscluster.hockeytech.com/feed/index.php?feed=widgetkit2&key=f322673b6bcae299&client_code=lhjmq&view=Gamebygame&lang=en&season_id=193&fmt=json&dfdsfdsa=2fdsa&player_id=17871&force_player=0&callback=json`,
      league: 'QMJHL',
      ep_url: 'https://www.eliteprospects.com/player/514653/mikhail-abramov',
    }

    jest.spyOn(utils.dateHelpers, 'getSeasonStartYear').mockImplementation(() => 2019)
    jest.spyOn(utils, 'jsonRequest').mockImplementation(() => prospectJson)

    const { goals, assists, points, shots, games_played } = await qmjhlScraper(prospect)

    expect(goals).toEqual(35)
    expect(assists).toEqual(41)
    expect(points).toEqual(76)
    expect(shots).toEqual(244)
    expect(games_played).toEqual(63)
  })
})
