const bchlScraper = require('../bchlScraper')
const utils = require('../../../utils')

describe('bchlScraper()', () => {
  test('gets prospect json and scrapes current season stats', async () => {
    const prospectJson = require('./__fixtures__/bchl_dawson_tritt.fixture')
    const prospect = {
      first_name: 'Dawson',
      last_name: 'Tritt',
      league_id: '5115',
      statline_url: '',
      game_statline_url: '',
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
})
