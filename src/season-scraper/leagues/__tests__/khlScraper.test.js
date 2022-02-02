const cheerio = require('cheerio')
const khlScraper = require('../khlScraper')
const utils = require('../../../utils')

describe('khlScraper()', () => {
  it('gets prospect json and scrapes current season stats', async () => {
    const prospectHtml = require('./__fixtures__/khl_rodion_amirov.fixture')
    const prospect = {
      first_name: 'Rodion',
      last_name: 'Amirov',
      league_id: '30159',
      league: 'KHL',
    }

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))
    jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2020-2021')

    const { goals, assists, points, shots, games_played } = await khlScraper(prospect)

    expect(goals).toEqual(9)
    expect(assists).toEqual(4)
    expect(points).toEqual(13)
    expect(shots).toEqual(73)
    expect(games_played).toEqual(39)
  })

  describe('when latest season is playoffs', () => {
    it('it skips that row and uses regular season stats', async () => {
      const prospectHtml = require('./__fixtures__/khl_alexander_barabanov.fixture')
      const prospect = {
        first_name: 'Alexander',
        last_name: 'Barabanov',
        league_id: '17210',
        league: 'KHL',
      }

      jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))
      jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2019-2020')

      const { goals, assists, points, shots, games_played } = await khlScraper(prospect)

      expect(goals).toEqual(11)
      expect(assists).toEqual(9)
      expect(points).toEqual(20)
      expect(shots).toEqual(86)
      expect(games_played).toEqual(43)
    })
  })

  describe('when skater has multiple seasons', () => {
    it('it returns summed values', async () => {
      const prospectHtml = require('./__fixtures__/khl_miro_aaltonen.fixture')
      const prospect = {
        first_name: 'Miro',
        last_name: 'Aaltonen',
        league_id: '17585',
        league: 'KHL',
      }

      jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2019-2020')
      jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

      const { goals, assists, points, shots, games_played } = await khlScraper(prospect)

      expect(goals).toEqual(11)
      expect(assists).toEqual(17)
      expect(points).toEqual(28)
      expect(shots).toEqual(99)
      expect(games_played).toEqual(45)
    })
  })

  describe('when null league_id is inputted', () => {
    it('it throws error', async () => {
      const prospect = { league: 'KHL' }

      await expect(khlScraper(prospect)).rejects.toThrow()
    })
  })
})
