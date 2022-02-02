const cheerio = require('cheerio')
const allsvenskanScraper = require('../allsvenskanScraper')
const utils = require('../../../utils')

describe('allsvenskanScraper()', () => {
  it('gets prospect json and scrapes current season stats', async () => {
    const prospectHtml = require('./__fixtures__/allsvenskan_jesper_lindgren.fixture')
    const prospect = {
      first_name: 'Jesper',
      last_name: 'Lindgren',
      team_id: '110b-110bJcIAI',
      league: 'Allsv',
    }

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const { goals, assists, points, shots, games_played } = await allsvenskanScraper(prospect)

    expect(goals).toEqual(0)
    expect(assists).toEqual(7)
    expect(points).toEqual(7)
    expect(shots).toEqual(33)
    expect(games_played).toEqual(10)
  })

  describe('when null league_id is inputted', () => {
    it('it throws error', async () => {
      const prospect = { league: 'Allsv' }

      await expect(allsvenskanScraper(prospect)).rejects.toThrow()
    })
  })
})
