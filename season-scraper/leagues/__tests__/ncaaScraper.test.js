const cheerio = require('cheerio')
const ncaaScraper = require('../ncaaScraper')
const utils = require('../../../utils')

describe('ncaaScraper()', () => {
  it('gets prospect json and scrapes current season stats', async () => {
    const prospectHtml = require('./__fixtures__/ncaa_nick_abruzzese.fixture')
    const prospect = {
      first_name: 'Nick',
      last_name: 'Abruzzese',
      position: 'C',
      shoots: 'L',
      dob: '1999-06-04',
      draft_round: 4,
      draft_pick: 124,
      draft_year: 2019,
      league_id: 'harm22',
      statline_url: 'http://collegehockeyinc.com/stats/players20.php?harm22',
      game_statline_url: 'http://collegehockeyinc.com/stats/players20.php?harm22',
      league: 'NCAA',
      ep_url: 'https://www.eliteprospects.com/player/201476/nick-abruzzese',
    }

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))
    jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2019-2020')

    const { goals, assists, points, shots, games_played } = await ncaaScraper(prospect)

    expect(goals).toEqual(14)
    expect(assists).toEqual(30)
    expect(points).toEqual(44)
    expect(shots).toEqual(74)
    expect(games_played).toEqual(31)
  })

  describe('when null league_id is inputted', () => {
    it('throws error', async () => {
      const prospect = { league: 'NCAA' }

      await expect(ncaaScraper(prospect)).rejects.toThrow()
    })
  })

  describe('when no games played', () => {
    it('returns null values', async () => {
      const prospectHtml = require('./__fixtures__/ncaa_ryan_oconnell.fixture')
      const prospect = {
        first_name: 'Ryan',
        last_name: "O'Connell",
        league_id: 'osum09',
        league: 'NCAA',
      }

      jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))
      jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2020-2021')

      const { goals, assists, points, shots, games_played } = await ncaaScraper(prospect)

      expect(goals).toEqual(null)
      expect(assists).toEqual(null)
      expect(points).toEqual(null)
      expect(shots).toEqual(null)
      expect(games_played).toEqual(null)
    })
  })

  describe('when player name is not found on page', () => {
    it('throws error', async () => {
      const prospectHtml = require('./__fixtures__/ncaa_nick_abruzzese.fixture')
      const prospect = {
        first_name: 'Not Nick',
        last_name: 'Not Abruzzese',
        league_id: 'harm22',
        league: 'NCAA',
      }

      jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))
      jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2019-2020')

      await expect(ncaaScraper(prospect)).rejects.toThrow()
    })
  })
})
