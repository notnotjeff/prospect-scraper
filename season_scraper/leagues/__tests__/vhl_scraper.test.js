const cheerio = require('cheerio')
const vhlScraper = require('../vhl_scraper')
const utils = require('../../../utils')

describe('vhlScraper()', () => {
  test('gets prospect json and scrapes current season stats', async () => {
    const prospectHtml = require('./__fixtures__/vhl_semyon_kizimov.fixture')
    const prospect = {
      first_name: 'Semyon',
      last_name: 'Kizimov',
      position: 'LW',
      shoots: 'L',
      dob: '2000-01-19',
      draft_round: 7,
      draft_pick: 211,
      draft_year: 2018,
      league_id: '25697',
      statline_url: 'http://www.vhlru.ru/en/players/25697/',
      game_statline_url: 'http://www.vhlru.ru/en/players/25697/games/',
      league: 'VHL',
      ep_url: 'https://www.eliteprospects.com/player/420947/semyon-kizimov',
    }

    jest.spyOn(utils, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const { goals, assists, points, shots, games_played } = await vhlScraper(prospect)

    expect(goals).toEqual(2)
    expect(assists).toEqual(2)
    expect(points).toEqual(4)
    expect(shots).toEqual(4)
    expect(games_played).toEqual(5)
  })
})
