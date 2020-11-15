const ahlScraper = require('../ahl_scraper')
const utils = require('../../../utils')

describe('ahlScraper()', () => {
  test('gets prospect json and scrapes current season stats', async () => {
    const prospectJson = require('./__fixtures__/ahl_rasmus_sandin.fixture')
    const prospect = {
      first_name: 'Rasmus',
      last_name: 'Sandin',
      position: 'D',
      shoots: 'L',
      dob: '2000-03-07',
      draft_round: 1,
      draft_pick: 29,
      draft_year: 2018,
      league_id: '7314',
      statline_url:
        'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=7314&site_id=1&key=50c2cd9b5e18e390&client_code=ahl&league_id=&lang=en&statsType=standard&callback=json',
      game_statline_url:
        'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=7314&site_id=1&key=50c2cd9b5e18e390&client_code=ahl&league_id=&lang=en&statsType=standard&callback=json',
      league: 'AHL',
      ep_url: 'https://www.eliteprospects.com/player/289453/rasmus-sandin',
    }

    jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2019-20')
    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const { goals, assists, points, shots, games_played } = await ahlScraper(prospect)

    expect(goals).toEqual(2)
    expect(assists).toEqual(13)
    expect(points).toEqual(15)
    expect(shots).toEqual(26)
    expect(games_played).toEqual(21)
  })
})
