const ohlScraper = require('../ohl_scraper')
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
      statline_url:
        'http://lscluster.hockeytech.com/feed/?feed=modulekit&view=player&key=2976319eb44abe94&fmt=json&client_code=ohl&lang=en&player_id=7662&category=seasonstats',
      game_statline_url:
        'http://lscluster.hockeytech.com/feed/?feed=modulekit&view=player&key=2976319eb44abe94&fmt=json&client_code=ohl&lang=en&player_id=7662&category=gamebygame',
      league: 'OHL',
      ep_url: 'https://www.eliteprospects.com/player/359539/nicholas-robertson',
    }

    jest.spyOn(utils.dateHelpers, 'getSeasonStartYear').mockImplementation(() => 2019)
    jest.spyOn(utils, 'jsonRequest').mockImplementation(() => prospectJson)

    const { goals, assists, points, shots, games_played } = await ohlScraper(prospect)

    expect(goals).toEqual(55)
    expect(assists).toEqual(31)
    expect(points).toEqual(86)
    expect(shots).toEqual(255)
    expect(games_played).toEqual(46)
  })
})
