const cheerio = require('cheerio')
const mestisScraper = require('../mestisScraper')
const utils = require('../../../utils')

describe('mestisScraper()', () => {
  it('gets prospect json and scrapes current season stats', async () => {
    const prospectHtml = require('./__fixtures__/mestis_kasper_simontaival.fixture')
    const prospect = {
      first_name: 'Kasper',
      last_name: 'Simontaival',
      league_id: '31574013',
      league: 'Mestis',
    }

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const { goals, assists, points, shots, games_played } = await mestisScraper(prospect)

    expect(goals).toEqual(3)
    expect(assists).toEqual(4)
    expect(points).toEqual(7)
    expect(shots).toEqual(35)
    expect(games_played).toEqual(5)
  })

  describe('when null league_id is inputted', () => {
    it('it throws error', async () => {
      const prospect = { league: 'Mestis' }

      await expect(mestisScraper(prospect)).rejects.toThrow()
    })
  })
})
