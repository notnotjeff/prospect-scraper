const cheerio = require('cheerio')
const mhlScraper = require('../mhlScraper')
const utils = require('../../../utils')

describe('mhlScraper()', () => {
  it('gets prospect json and scrapes current season stats', async () => {
    const prospectHtml = require('./__fixtures__/mhl_dmitry_ovchinnikov.fixture')
    const prospect = {
      first_name: 'Dmitry',
      last_name: 'Ovchinnikov',
      league_id: '31214',
      league: 'MHL',
    }

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const { goals, assists, points, shots, games_played } = await mhlScraper(prospect)

    expect(goals).toEqual(9)
    expect(assists).toEqual(9)
    expect(points).toEqual(18)
    expect(shots).toEqual(35)
    expect(games_played).toEqual(12)
  })

  it('it throws error when league_id field does not exist or is null', async () => {
    const prospect = {}
    await expect(mhlScraper(prospect)).rejects.toThrow()
  })

  describe('when latest statline is playoffs', () => {
    it('it looks further down the table to grab stats', async () => {
      const prospectHtml = require('./__fixtures__/mhl_rodion_amirov.fixture')
      const prospect = {
        first_name: 'Rodion',
        last_name: 'Amirov',
        league_id: '30159',
        league: 'MHL',
      }

      jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

      const { goals, assists, points, shots, games_played } = await mhlScraper(prospect)

      expect(goals).toEqual(10)
      expect(assists).toEqual(12)
      expect(points).toEqual(22)
      expect(shots).toEqual(85)
      expect(games_played).toEqual(17)
    })
  })
})
