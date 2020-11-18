const cheerio = require('cheerio')
const mhlScraper = require('../mhlScraper')
const utils = require('../../../utils')

describe('mhlScraper()', () => {
  test('gets prospect json and scrapes current season stats', async () => {
    const prospectHtml = require('./__fixtures__/mhl_dmitry_ovchinnikov.fixture')
    const prospect = {
      first_name: 'Dmitry',
      last_name: 'Ovchinnikov',
      position: 'C',
      shoots: 'L',
      dob: '2002-08-19',
      draft_round: 2,
      draft_pick: 59,
      draft_year: 2020,
      league_id: '31214',
      statline_url: 'https://engmhl.khl.ru/players/31214/',
      game_statline_url: 'https://engmhl.khl.ru/players/31214/games/',
      league: 'MHL',
      ep_url: 'https://www.eliteprospects.com/player/534929/dmitri-ovchinnikov',
    }

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const { goals, assists, points, shots, games_played } = await mhlScraper(prospect)

    expect(goals).toEqual(9)
    expect(assists).toEqual(9)
    expect(points).toEqual(18)
    expect(shots).toEqual(35)
    expect(games_played).toEqual(12)
  })

  test('it throws error when league_id field does not exist or is null', async () => {
    const prospect = {}
    await expect(mhlScraper(prospect)).rejects.toThrow()
  })

  describe('when latest statline is playoffs', () => {
    test('it looks further down the table to grab stats', async () => {
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
