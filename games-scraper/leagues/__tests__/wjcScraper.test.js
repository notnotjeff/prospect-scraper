const cheerio = require('cheerio')
const wjcScraper = require('../wjcScraper')
const utils = require('../../../utils')

describe('wjcScraper()', () => {
  it('it gets prospect json and scrapes game on date', async () => {
    const prospectIndexHtml = require('./__fixtures__/wjc_index.fixture')
    const prospectGameHtml = require('./__fixtures__/wjc_swiss.fixture')
    const prospect = {
      first_name: 'Michal',
      last_name: 'Mrazik',
      team_id: 'SVK',
      league_id: '45612',
    }
    const date = new Date()

    jest.spyOn(utils.date, 'setDateValues').mockImplementation(() => ({ day: '25', month: '12', year: '2020' }))
    jest.spyOn(utils.request, 'htmlRequest').mockImplementationOnce(() => cheerio.load(prospectIndexHtml))
    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectGameHtml))

    const gameData = await wjcScraper(prospect, date)

    expect(gameData.goals).toEqual(0)
    expect(gameData.assists).toEqual(1)
    expect(gameData.points).toEqual(1)
    expect(gameData.shots).toEqual(3)
    expect(gameData.penalty_minutes).toEqual(0)
    expect(gameData.date).toEqual('2020-12-25')
  })

  it('returns null when there is no game on the specified date', async () => {
    const prospectIndexHtml = require('./__fixtures__/wjc_index.fixture')
    const prospectGameHtml = require('./__fixtures__/wjc_swiss.fixture')
    const prospect = {
      first_name: 'Michal',
      last_name: 'Mrazik',
      team_id: 'SVK',
      league_id: '45612',
    }
    const date = new Date()

    jest.spyOn(utils.date, 'setDateValues').mockImplementation(() => ({ day: '10', month: '12', year: '2020' }))
    jest.spyOn(utils.request, 'htmlRequest').mockImplementationOnce(() => cheerio.load(prospectIndexHtml))
    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectGameHtml))

    const gameData = await wjcScraper(prospect, date)

    expect(gameData).toEqual(null)
  })

  describe('when no league_id', () => {
    it('throws error', async () => {
      const prospect = {
        first_name: 'Michal',
        last_name: 'Mrazik',
        team_id: 'SVK',
        league_id: null,
      }
      const date = new Date()

      await expect(wjcScraper(prospect, date)).rejects.toThrow()
    })
  })

  describe('when no team_id', () => {
    it('throws error', async () => {
      const prospect = {
        first_name: 'Michal',
        last_name: 'Mrazik',
        team_id: null,
        league_id: '45612',
      }
      const date = new Date()

      await expect(wjcScraper(prospect, date)).rejects.toThrow()
    })
  })

  describe('when game is played in January', () => {
    it('uses the right year in the url', async () => {
      const prospectIndexHtml = require('./__fixtures__/wjc_index.fixture')
      const prospectGameHtml = require('./__fixtures__/wjc_swiss.fixture')
      const prospect = {
        first_name: 'Michal',
        last_name: 'Mrazik',
        team_id: 'SVK',
        league_id: '45612',
      }
      const date = new Date()

      jest.spyOn(utils.date, 'setDateValues').mockImplementation(() => ({ day: '03', month: '01', year: '2021' }))
      jest.spyOn(utils.request, 'htmlRequest').mockImplementationOnce(() => cheerio.load(prospectIndexHtml))
      jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectGameHtml))

      await wjcScraper(prospect, date)

      expect(utils.request.htmlRequest.mock.calls[0]).toEqual(['https://www.iihf.com/en/events/2021/wm20/schedule'])
    })
  })

  describe('when game exists but has not started yet', () => {
    it('catches error and returns null', async () => {
      const prospectIndexHtml = require('./__fixtures__/wjc_index.fixture')
      const prospect = {
        first_name: 'Michal',
        last_name: 'Mrazik',
        team_id: 'SVK',
        league_id: '45612',
      }
      const date = new Date()

      jest.spyOn(utils.date, 'setDateValues').mockImplementation(() => ({ day: '25', month: '12', year: '2020' }))
      jest.spyOn(utils.request, 'htmlRequest').mockImplementationOnce(() => cheerio.load(prospectIndexHtml))
      jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => {
        throw new Error('Game has not started!')
      })

      const gameData = await wjcScraper(prospect, date)

      expect(gameData).toEqual(null)
      expect(utils.request.htmlRequest.mock.calls[1]).toEqual(['https://www.iihf.com/en/events/2021/wm20/gamecenter/statistics/22716/1-sui-vs-svk'])
    })
  })

  describe('when player is not playing in teams game', () => {
    it('returns null', async () => {
      const prospectIndexHtml = require('./__fixtures__/wjc_index.fixture')
      const prospectGameHtml = require('./__fixtures__/wjc_swiss.fixture')
      const prospect = {
        first_name: 'Michal',
        last_name: 'Mrazik',
        team_id: 'SVK',
        league_id: '1',
      }
      const date = new Date()

      jest.spyOn(utils.date, 'setDateValues').mockImplementation(() => ({ day: '25', month: '12', year: '2020' }))
      jest.spyOn(utils.request, 'htmlRequest').mockImplementationOnce(() => cheerio.load(prospectIndexHtml))
      jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectGameHtml))

      const gameData = await wjcScraper(prospect, date)

      expect(gameData).toEqual(null)
      expect(utils.request.htmlRequest.mock.calls.length).toEqual(2)
    })
  })
})
