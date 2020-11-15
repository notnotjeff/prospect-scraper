const cheerio = require('cheerio')
const khlScraper = require('../khl_scraper')
const utils = require('../../../utils')

describe('khlScraper()', () => {
  test('gets prospect json and scrapes current season stats', async () => {
    const prospectHtml = require('./__fixtures__/khl_rodion_amirov.fixture')
    const prospect = {
      first_name: 'Rodion',
      last_name: 'Amirov',
      position: 'LW',
      shoots: 'L',
      dob: '2001-10-02',
      draft_round: 1,
      draft_pick: 15,
      draft_year: 2020,
      league_id: '30159',
      statline_url: 'https://en.khl.ru/players/30159/',
      game_statline_url: 'https://en.khl.ru/players/30159/',
      league: 'KHL',
      ep_url: 'https://www.eliteprospects.com/player/518585/rodion-amirov',
    }

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const { goals, assists, points, shots, games_played } = await khlScraper(prospect)

    expect(goals).toEqual(3)
    expect(assists).toEqual(3)
    expect(points).toEqual(6)
    expect(shots).toEqual(30)
    expect(games_played).toEqual(19)
  })
})
