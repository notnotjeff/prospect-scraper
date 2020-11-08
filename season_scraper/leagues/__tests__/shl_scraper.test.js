const cheerio = require('cheerio')
const shlScraper = require('../shl_scraper')
const utils = require('../../../utils')

describe('shlScraper()', () => {
  test('gets prospect json and scrapes current season stats', async () => {
    const prospectHtml = require('./__fixtures__/shl_pontus_holmberg.fixture')
    const prospect = {
      first_name: 'Pontus',
      last_name: 'Holmberg',
      position: 'LW',
      shoots: 'L',
      dob: '1999-03-09',
      draft_round: 6,
      draft_pick: 156,
      draft_year: 2018,
      league_id: '0',
      statline_url: 'https://www.shl.se/lag/fe02-fe02mf1FN__vaxjo-lakers/qTK-4a8Y9mMrn__pontus-holmberg/statistics',
      game_statline_url: 'https://www.shl.se/lag/fe02-fe02mf1FN__vaxjo-lakers/qTK-4a8Y9mMrn__pontus-holmberg/gamelog',
      league: 'SHL',
      ep_url: 'https://www.eliteprospects.com/player/265859/pontus-holmberg',
    }

    jest.spyOn(utils, 'getCurrentSeason').mockImplementation(() => '2019-2020')
    jest.spyOn(utils, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const { goals, assists, points, shots, games_played } = await shlScraper(prospect)

    expect(goals).toEqual(7)
    expect(assists).toEqual(10)
    expect(points).toEqual(17)
    expect(shots).toEqual(39)
    expect(games_played).toEqual(52)
  })
})
