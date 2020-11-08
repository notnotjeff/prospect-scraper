const cheerio = require('cheerio')
const ncaaScraper = require('../ncaa_scraper')
const utils = require('../../../utils')

describe('ncaaScraper()', () => {
  test('gets prospect json and scrapes current season stats', async () => {
    const prospectHtml = require('./__fixtures__/ncaa_nick_abruzzese.fixture')
    const prospect = {
      first_name: 'Nick',
      last_name: 'Abruzzese',
      position: 'C',
      shoots: 'L',
      dob: '1999-06-04',
      draft_round: 4,
      draft_pick: 124,
      draft_year: 2019,
      league_id: '7631',
      statline_url: 'http://collegehockeyinc.com/stats/players20.php?harm22',
      game_statline_url: 'http://collegehockeyinc.com/stats/players20.php?harm22',
      league: 'NCAA',
      ep_url: 'https://www.eliteprospects.com/player/201476/nick-abruzzese',
    }

    jest.spyOn(utils, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const { goals, assists, points, shots, games_played } = await ncaaScraper(prospect)

    expect(goals).toEqual(14)
    expect(assists).toEqual(30)
    expect(points).toEqual(44)
    expect(shots).toEqual(74)
    expect(games_played).toEqual(31)
  })
})
