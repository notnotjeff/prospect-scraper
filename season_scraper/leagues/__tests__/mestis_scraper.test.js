const cheerio = require('cheerio')
const mestisScraper = require('../mestis_scraper')
const utils = require('../../../utils')

describe('mestisScraper()', () => {
  test('gets prospect json and scrapes current season stats', async () => {
    const prospectHtml = require('./__fixtures__/mestis_kasper_simontaival.fixture')
    const prospect = {
      first_name: 'Kasper',
      last_name: 'Simontaival',
      statline_url: 'https://mestis.fi/fi/pelaajat/31574013/simontaival-kasper',
      game_statline_url: 'https://mestis.fi/fi/pelaajat/31574013/simontaival-kasper/ottelu-ottelulta',
      league: 'Mestis',
    }

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const { goals, assists, points, shots, games_played } = await mestisScraper(prospect)

    expect(goals).toEqual(3)
    expect(assists).toEqual(4)
    expect(points).toEqual(7)
    expect(shots).toEqual(35)
    expect(games_played).toEqual(5)
  })
})
