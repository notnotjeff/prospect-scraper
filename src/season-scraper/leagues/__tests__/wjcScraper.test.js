const cheerio = require('cheerio')
const wjcScraper = require('../wjcScraper')
const utils = require('../../../utils')

describe('wjcScraper()', () => {
  it('gets prospect json and scrapes game on date', async () => {
    const prospectIndexHtml = require('./__fixtures__/wjc_team_index.fixture')
    const prospectTeamHtml = require('./__fixtures__/wjc_finland_team.fixture')
    const prospect = {
      first_name: 'Topi',
      last_name: 'Niemela',
      team_id: 'FIN',
      league_id: '3125883',
    }
    const date = new Date()

    jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2020-2021')
    jest.spyOn(utils.request, 'htmlRequest').mockImplementationOnce(() => cheerio.load(prospectIndexHtml))
    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectTeamHtml))

    const seasonData = await wjcScraper(prospect, date)

    expect(seasonData.games_played).toEqual(1)
    expect(seasonData.goals).toEqual(1)
    expect(seasonData.assists).toEqual(1)
    expect(seasonData.points).toEqual(2)
    expect(seasonData.shots).toEqual(4)
  })

  describe('when player is not on team roster', () => {
    it('returns null statline', async () => {
      const prospectIndexHtml = require('./__fixtures__/wjc_team_index.fixture')
      const prospectTeamHtml = require('./__fixtures__/wjc_finland_team.fixture')
      const prospect = {
        first_name: 'Not Topi',
        last_name: 'Not Niemela',
        team_id: 'FIN',
        league_id: '111111',
      }
      const date = new Date()

      jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2020-2021')
      jest.spyOn(utils.request, 'htmlRequest').mockImplementationOnce(() => cheerio.load(prospectIndexHtml))
      jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectTeamHtml))

      const seasonData = await wjcScraper(prospect, date)

      expect(seasonData.games_played).toEqual(null)
      expect(seasonData.goals).toEqual(null)
      expect(seasonData.assists).toEqual(null)
      expect(seasonData.points).toEqual(null)
      expect(seasonData.shots).toEqual(null)
    })
  })

  describe('when player has not played any games yet', () => {
    it('returns null statline', async () => {
      const prospectIndexHtml = require('./__fixtures__/wjc_team_index.fixture')
      const prospectTeamHtml = require('./__fixtures__/wjc_rus_abramov_no_gp.fixture')
      const prospect = {
        first_name: 'Mikhail',
        last_name: 'Abramov',
        team_id: 'RUS',
        league_id: '3126259',
      }
      const date = new Date()

      jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2020-2021')
      jest.spyOn(utils.request, 'htmlRequest').mockImplementationOnce(() => cheerio.load(prospectIndexHtml))
      jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectTeamHtml))

      const seasonData = await wjcScraper(prospect, date)

      expect(seasonData.games_played).toEqual(null)
      expect(seasonData.goals).toEqual(null)
      expect(seasonData.assists).toEqual(null)
      expect(seasonData.points).toEqual(null)
      expect(seasonData.shots).toEqual(null)
    })
  })

  describe('when player has played games with empty stats', () => {
    it('returns null statline with games played filled', async () => {
      const prospectIndexHtml = require('./__fixtures__/wjc_team_index.fixture')
      const prospectTeamHtml = require('./__fixtures__/wjc_fin_topi_no_stats.fixture')
      const prospect = {
        first_name: 'Topi',
        last_name: 'Niemela',
        team_id: 'FIN',
        league_id: '3125883',
      }
      const date = new Date()

      jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2020-2021')
      jest.spyOn(utils.request, 'htmlRequest').mockImplementationOnce(() => cheerio.load(prospectIndexHtml))
      jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectTeamHtml))

      const seasonData = await wjcScraper(prospect, date)

      expect(seasonData.games_played).toEqual(1)
      expect(seasonData.goals).toEqual(null)
      expect(seasonData.assists).toEqual(null)
      expect(seasonData.points).toEqual(null)
      expect(seasonData.shots).toEqual(null)
    })
  })

  describe('when no league_id', () => {
    it('throws error', async () => {
      const prospect = {
        first_name: 'Topi',
        last_name: 'Niemela',
        team_id: 'FIN',
        league_id: null,
      }
      const date = new Date()

      await expect(wjcScraper(prospect, date)).rejects.toThrow()
    })
  })

  describe('when no team_id', () => {
    it('throws error', async () => {
      const prospect = {
        first_name: 'Topi',
        last_name: 'Niemela',
        team_id: null,
        league_id: '3125883',
      }
      const date = new Date()

      await expect(wjcScraper(prospect, date)).rejects.toThrow()
    })
  })

  describe('when team does not exist on team index page', () => {
    it('returns null stats', async () => {
      const prospectIndexHtml = require('./__fixtures__/wjc_team_index.fixture')
      const prospectTeamHtml = require('./__fixtures__/wjc_finland_team.fixture')
      const prospect = {
        first_name: 'Michal',
        last_name: 'Mrazik',
        team_id: 'NOT-SVK',
        league_id: '1',
      }
      const date = new Date()

      jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2020-2021')
      jest.spyOn(utils.request, 'htmlRequest').mockImplementationOnce(() => cheerio.load(prospectIndexHtml))
      jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectTeamHtml))

      const seasonData = await wjcScraper(prospect, date)

      expect(seasonData.games_played).toEqual(null)
      expect(seasonData.goals).toEqual(null)
      expect(seasonData.assists).toEqual(null)
      expect(seasonData.points).toEqual(null)
      expect(seasonData.shots).toEqual(null)
    })
  })
})
