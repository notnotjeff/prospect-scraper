const cheerio = require('cheerio')
const vhlScraper = require('../vhlScraper')
const utils = require('../../../utils')

describe('vhlScraper()', () => {
  test('gets prospect json and scrapes current season stats', async () => {
    const prospectHtml = require('./__fixtures__/vhl_semyon_kizimov.fixture')
    const prospect = {
      first_name: 'Semyon',
      last_name: 'Kizimov',
      position: 'LW',
      shoots: 'L',
      dob: '2000-01-19',
      draft_round: 7,
      draft_pick: 211,
      draft_year: 2018,
      league_id: '25697',
      statline_url: 'http://www.vhlru.ru/en/players/25697/',
      game_statline_url: 'http://www.vhlru.ru/en/players/25697/games/',
      league: 'VHL',
      ep_url: 'https://www.eliteprospects.com/player/420947/semyon-kizimov',
    }

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const { goals, assists, points, shots, games_played } = await vhlScraper(prospect)

    expect(goals).toEqual(2)
    expect(assists).toEqual(2)
    expect(points).toEqual(4)
    expect(shots).toEqual(4)
    expect(games_played).toEqual(5)
  })

  describe('when null league_id is inputted', () => {
    test('it throws error', async () => {
      const prospect = { league: 'VHL' }

      await expect(vhlScraper(prospect)).rejects.toThrow()
    })
  })

  describe('when last row in table is playoffs', () => {
    test('it looks above to get regular season', async () => {
      const prospectHtml = require('./__fixtures__/vhl_vladislav_kara.fixture')
      const prospect = {
        first_name: 'Vladislav',
        last_name: 'Kara',
        league_id: '22888',
        league: 'VHL',
      }

      jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '18-19')
      jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

      const { goals, assists, points, shots, games_played } = await vhlScraper(prospect)

      expect(goals).toEqual(5)
      expect(assists).toEqual(11)
      expect(points).toEqual(16)
      expect(shots).toEqual(60)
      expect(games_played).toEqual(25)
    })
  })

  describe('when season does not exist', () => {
    test('it returns null values', async () => {
      const prospectHtml = require('./__fixtures__/vhl_vladislav_kara.fixture')
      const prospect = {
        first_name: 'Vladislav',
        last_name: 'Kara',
        league_id: '22888',
        league: 'VHL',
      }

      jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '11-12')
      jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

      const { goals, assists, points, shots, games_played } = await vhlScraper(prospect)

      expect(goals).toEqual(null)
      expect(assists).toEqual(null)
      expect(points).toEqual(null)
      expect(shots).toEqual(null)
      expect(games_played).toEqual(null)
    })
  })
})
