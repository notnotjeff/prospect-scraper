const ushlScraper = require('../ushl_scraper')
const utils = require('../../../utils')

describe('ushlScraper()', () => {
  test('gets prospect json and scrapes current season stats', async () => {
    const prospectJson = require('./__fixtures__/ushl_mike_koster.fixture')
    const prospect = {
      first_name: 'Mike',
      last_name: 'Koster',
      position: 'D',
      shoots: 'L',
      dob: '2001-04-13',
      draft_round: 5,
      draft_pick: 146,
      draft_year: 2019,
      league_id: '7842',
      statline_url:
        'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=7842&site_id=0&key=e828f89b243dc43f&client_code=ushl&league_id=&lang=en&statsType=standard&callback=json',
      game_statline_url:
        'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=7842&site_id=0&key=e828f89b243dc43f&client_code=ushl&league_id=&lang=en&statsType=standard&callback=json',
      league: 'USHL',
      ep_url: 'https://www.eliteprospects.com/player/427432/mike-koster',
    }

    jest.spyOn(utils, 'getCurrentSeason').mockImplementation(() => '2019-20')
    jest.spyOn(utils, 'jsonRequest').mockImplementation(() => prospectJson)

    const { goals, assists, points, shots, games_played } = await ushlScraper(prospect)

    expect(goals).toEqual(3)
    expect(assists).toEqual(15)
    expect(points).toEqual(18)
    expect(shots).toEqual(64)
    expect(games_played).toEqual(37)
  })
})
