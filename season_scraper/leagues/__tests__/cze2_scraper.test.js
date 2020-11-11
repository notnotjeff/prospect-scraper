const cheerio = require('cheerio')
const czech2Scraper = require('../cze2_scraper')
const utils = require('../../../utils')

describe('czech2Scraper()', () => {
  test('gets prospect html table and scrapes current season', async () => {
    const prospectHtml = require('./__fixtures__/cze_kral_profile.fixture')
    const prospect = {
      first_name: 'Filip',
      last_name: 'Kral',
      position: 'D',
      shoots: 'L',
      dob: '1999-10-20',
      draft_round: 5,
      draft_pick: 149,
      draft_year: 2018,
      league_id: '23461',
      statline_url: 'https://www.hokej.cz/hrac/23461/career?t=224&stats-section=all',
      game_statline_url: 'https://www.hokej.cz/hrac/23461?t=224',
      league: 'CZE2',
      ep_url: 'https://www.eliteprospects.com/player/247241/filip-kral',
    }

    jest.spyOn(utils, 'getCurrentSeason').mockImplementation(() => '2020-2021')
    jest.spyOn(utils, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const { goals, assists, points, shots, games_played } = await czech2Scraper(prospect)

    expect(goals).toEqual(2)
    expect(assists).toEqual(8)
    expect(points).toEqual(10)
    expect(shots).toEqual(null)
    expect(games_played).toEqual(7)
  })
})
