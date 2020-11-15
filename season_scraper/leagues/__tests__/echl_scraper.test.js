const echlScraper = require('../echl_scraper')
const utils = require('../../../utils')

describe('echlScraper()', () => {
  test('gets prospect json and scrapes current season stats', async () => {
    const prospectJson = require('./__fixtures__/echl_justin_brazeau.fixture')
    const prospect = {
      first_name: 'Justin',
      last_name: 'Brazeau',
      position: 'RW',
      shoots: 'R',
      dob: '1998-02-02',
      draft_round: null,
      draft_pick: null,
      draft_year: null,
      league_id: '7989',
      statline_url: 'https://www.echl.com/api/s3?q=player-5ae4e4e2e12fbdac1ee2e381.json',
      game_statline_url: '',
      league: 'ECHL',
      ep_url: 'http://www.eliteprospects.com/player.php?player=217051',
    }

    jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2019-20')
    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const { goals, assists, points, shots, games_played } = await echlScraper(prospect)

    expect(goals).toEqual(27)
    expect(assists).toEqual(28)
    expect(points).toEqual(55)
    expect(shots).toEqual(158)
    expect(games_played).toEqual(57)
  })
})
