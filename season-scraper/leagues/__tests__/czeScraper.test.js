const cheerio = require('cheerio')
const czeScraper = require('../czeScraper')
const utils = require('../../../utils')

describe('czeScraper()', () => {
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
      league: 'CZE',
      ep_url: 'https://www.eliteprospects.com/player/247241/filip-kral',
    }

    jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2020-2021')
    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const { goals, assists, points, shots, games_played } = await czeScraper(prospect)

    expect(goals).toEqual(0)
    expect(assists).toEqual(2)
    expect(points).toEqual(2)
    expect(shots).toEqual(null)
    expect(games_played).toEqual(3)
  })
})