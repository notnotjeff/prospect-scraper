const echlScraper = require('../echlScraper')
const requestUtils = require('../../../utils/request')

describe('echlScraper()', () => {
  describe('when player is on away team', () => {
    it('returns game stats', async () => {
      const scheduleJson = require('./__fixtures__/echl_schedule.fixture')
      const gameJson = require('./__fixtures__/echl_game.fixture')
      const prospect = {
        first_name: 'Joseph',
        last_name: 'Garreffa',
        season_id: '5f4e319b38c0fcf74b12136f',
        team_id: '5c5c2fc55ce4ceb584def768',
        league_id: '11939bb3d311e552551149a7',
        league: 'ECHL',
      }
      const date = new Date('2021-01-01 12:00:00')

      jest.spyOn(requestUtils, 'jsonRequest').mockImplementationOnce(() => scheduleJson)
      jest.spyOn(requestUtils, 'jsonRequest').mockImplementation(() => gameJson)

      const gameData = await echlScraper(prospect, date)

      expect(gameData.goals).toEqual(1)
      expect(gameData.assists).toEqual(1)
      expect(gameData.points).toEqual(2)
      expect(gameData.shots).toEqual(4)
      expect(gameData.penalty_minutes).toEqual(0)
      expect(gameData.date).toEqual('2021-01-01')
    })
  })

  describe('when player is on home team', () => {
    it('returns game stats', async () => {
      const scheduleJson = require('./__fixtures__/echl_schedule.fixture')
      const gameJson = require('./__fixtures__/echl_game.fixture')
      const prospect = {
        first_name: 'Gordie',
        last_name: 'Green',
        season_id: '5f4e319b38c0fcf74b12136f',
        team_id: '31ffb756ae0a30e567dcf226',
        league_id: 'a6ab7f0d8a0a71ff907a1075',
        league: 'ECHL',
      }
      const date = new Date('2021-01-01 12:00:00')

      jest.spyOn(requestUtils, 'jsonRequest').mockImplementationOnce(() => scheduleJson)
      jest.spyOn(requestUtils, 'jsonRequest').mockImplementation(() => gameJson)

      const gameData = await echlScraper(prospect, date)

      expect(gameData.goals).toEqual(0)
      expect(gameData.assists).toEqual(1)
      expect(gameData.points).toEqual(1)
      expect(gameData.shots).toEqual(0)
      expect(gameData.penalty_minutes).toEqual(2)
      expect(gameData.date).toEqual('2021-01-01')
    })
  })

  describe('when player is not on game roster', () => {
    it('it returns null', async () => {
      const scheduleJson = require('./__fixtures__/echl_schedule.fixture')
      const gameJson = require('./__fixtures__/echl_game.fixture')
      const prospect = {
        first_name: 'Gordie',
        last_name: 'Green',
        season_id: '5f4e319b38c0fcf74b12136f',
        team_id: '31ffb756ae0a30e567dcf226',
        league_id: 'not-a-real-id',
        league: 'ECHL',
      }
      const date = new Date('2021-01-01 12:00:00')

      jest.spyOn(requestUtils, 'jsonRequest').mockImplementationOnce(() => scheduleJson)
      jest.spyOn(requestUtils, 'jsonRequest').mockImplementation(() => gameJson)

      const gameData = await echlScraper(prospect, date)

      expect(gameData).toEqual(null)
    })
  })

  describe('when there is no game on date', () => {
    it('it returns null when there is no game on the specified date', async () => {
      const scheduleJson = require('./__fixtures__/echl_schedule.fixture')
      const prospect = {
        first_name: 'Gordie',
        last_name: 'Green',
        season_id: '5f4e319b38c0fcf74b12136f',
        team_id: '31ffb756ae0a30e567dcf226',
        league_id: 'a6ab7f0d8a0a71ff907a1075',
        league: 'ECHL',
      }
      const date = new Date('2020-09-01 12:00:00')

      jest.spyOn(requestUtils, 'jsonRequest').mockImplementation(() => scheduleJson)

      const gameData = await echlScraper(prospect, date)

      expect(gameData).toEqual(null)
    })
  })

  describe('when league_id is null', () => {
    it('it throws error', async () => {
      const prospect = {
        first_name: 'Gordie',
        last_name: 'Green',
        season_id: '5f4e319b38c0fcf74b12136f',
        team_id: '31ffb756ae0a30e567dcf226',
        league: 'ECHL',
      }
      const date = new Date()

      await expect(echlScraper(prospect, date)).rejects.toThrow()
    })
  })

  describe('when season_id is null', () => {
    it('it throws error', async () => {
      const prospect = {
        first_name: 'Gordie',
        last_name: 'Green',
        team_id: '31ffb756ae0a30e567dcf226',
        league_id: 'a6ab7f0d8a0a71ff907a1075',
        league: 'ECHL',
      }
      const date = new Date()

      await expect(echlScraper(prospect, date)).rejects.toThrow()
    })
  })

  describe('when team_id is null', () => {
    it('it throws error', async () => {
      const prospect = {
        first_name: 'Gordie',
        last_name: 'Green',
        season_id: '5f4e319b38c0fcf74b12136f',
        league_id: 'a6ab7f0d8a0a71ff907a1075',
        league: 'ECHL',
      }
      const date = new Date()

      await expect(echlScraper(prospect, date)).rejects.toThrow()
    })
  })
})
