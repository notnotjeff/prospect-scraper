const cheerio = require('cheerio')
const liigaScraper = require('../liigaScraper')
const utils = require('../../../utils')

describe('liigaScraper()', () => {
  beforeEach(() => {
    jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2020-2021')
  })

  it('gets prospect json and scrapes current season stats', async () => {
    const prospectHtml = require('./__fixtures__/liiga_mikko_kokkonen.fixture')
    const prospect = {
      first_name: 'Mikko',
      last_name: 'Kokkonen',
      league_id: '31128854',
      league: 'Liiga',
    }

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const { goals, assists, points, shots, games_played } = await liigaScraper(prospect)

    expect(goals).toEqual(0)
    expect(assists).toEqual(0)
    expect(points).toEqual(0)
    expect(shots).toEqual(26)
    expect(games_played).toEqual(10)
  })

  describe('when null league_id is inputted', () => {
    it('it throws error', async () => {
      const prospect = { league: 'Liiga' }

      await expect(liigaScraper(prospect)).rejects.toThrow()
    })
  })

  describe('when season is not found in profile', () => {
    it('it returns null values', async () => {
      const prospectHtml = require('./__fixtures__/liiga_mikko_kokkonen.fixture')
      const prospect = {
        first_name: 'Mikko',
        last_name: 'Kokkonen',
        league_id: '31128854',
        league: 'Liiga',
      }

      jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))
      jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2011-2012')

      const { goals, assists, points, shots, games_played } = await liigaScraper(prospect)

      expect(goals).toEqual(null)
      expect(assists).toEqual(null)
      expect(points).toEqual(null)
      expect(shots).toEqual(null)
      expect(games_played).toEqual(null)
    })
  })

  describe('when prospect has played on multiple teams in one season', () => {
    it('it returns null values', async () => {
      const prospectHtml = require('./__fixtures__/liiga_axel_rindell_two_teams.fixture')
      const prospect = {
        first_name: 'Axel',
        last_name: 'Rindell',
        league_id: '30439447',
        league: 'Liiga',
      }

      jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))
      jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2021-2022')

      const { goals, assists, points, shots, games_played } = await liigaScraper(prospect)

      expect(goals).toEqual(1)
      expect(assists).toEqual(13)
      expect(points).toEqual(14)
      expect(shots).toEqual(112)
      expect(games_played).toEqual(27)
    })
  })
})
