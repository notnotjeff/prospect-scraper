const cheerio = require('cheerio')
const shlScraper = require('../shlScraper')
const utils = require('../../../utils')

describe('shlScraper()', () => {
  it('gets prospect json and scrapes current season stats', async () => {
    const prospectHtml = require('./__fixtures__/shl_pontus_holmberg.fixture')
    const prospect = {
      first_name: 'Pontus',
      last_name: 'Holmberg',
      league_id: 'qTK-4a8Y9mMrn__pontus-holmberg',
      team_id: 'fe02-fe02mf1FN__vaxjo-lakers',
      league: 'SHL',
      ep_url: 'https://www.eliteprospects.com/player/265859/pontus-holmberg',
    }

    jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2019-2020')
    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const { goals, assists, points, shots, games_played } = await shlScraper(prospect)

    expect(goals).toEqual(7)
    expect(assists).toEqual(10)
    expect(points).toEqual(17)
    expect(shots).toEqual(39)
    expect(games_played).toEqual(52)
  })

  describe('when null league_id is inputted', () => {
    it('it throws error', async () => {
      const prospect = { league: 'SHL' }

      await expect(shlScraper(prospect)).rejects.toThrow()
    })
  })
})
