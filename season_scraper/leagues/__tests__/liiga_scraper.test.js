const cheerio = require('cheerio')
const liigaScraper = require('../liiga_scraper')
const utils = require('../../../utils')

describe('liigaScraper()', () => {
  test('gets prospect json and scrapes current season stats', async () => {
    const prospectHtml = require('./__fixtures__/liiga_mikko_kokkonen.fixture')
    const prospect = {
      first_name: 'Mikko',
      last_name: 'Kokkonen',
      position: 'D',
      shoots: 'L',
      dob: '2001-01-18',
      draft_round: 3,
      draft_pick: 84,
      draft_year: 2019,
      league_id: '31128854',
      statline_url: 'https://liiga.fi/fi/pelaajat/31128854/kokkonen-mikko',
      game_statline_url: 'https://liiga.fi/fi/pelaajat/31128854/kokkonen-mikko/ottelu-ottelulta',
      league: 'Liiga',
      ep_url: 'https://www.eliteprospects.com/player/347571/mikko-kokkonen',
    }

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const { goals, assists, points, shots, games_played } = await liigaScraper(prospect)

    expect(goals).toEqual(0)
    expect(assists).toEqual(0)
    expect(points).toEqual(0)
    expect(shots).toEqual(26)
    expect(games_played).toEqual(10)
  })
})
