const cheerio = require('cheerio')
const mhlScraper = require('../mhlScraper')
const utils = require('../../../utils')

describe('mhlScraper()', () => {
  it('it gets prospect html and scrapes for game on date', async () => {
    const prospectHtml = require('./__fixtures__/mhl_dmitry_ovchinnikov.fixture')
    const prospect = {
      first_name: 'Dmitry',
      last_name: 'Ovchinnikov',
      position: 'C',
      shoots: 'L',
      dob: '2002-08-19',
      draft_round: 5,
      draft_pick: 137,
      draft_year: 2020,
      league_id: '31214',
      statline_url: 'https://engmhl.khl.ru/players/31214/',
      game_statline_url: 'https://engmhl.khl.ru/players/31214/games/',
      league: 'MHL',
      ep_url: 'https://www.eliteprospects.com/player/534929/dmitri-ovchinnikov',
    }
    const date = new Date('2020-10-09 12:00:00')

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const gameData = await mhlScraper(prospect, date)

    expect(gameData.goals).toEqual(1)
    expect(gameData.assists).toEqual(0)
    expect(gameData.points).toEqual(1)
    expect(gameData.shots).toEqual(3)
    expect(gameData.penalty_minutes).toEqual(2)
    expect(gameData.date).toEqual('2020-10-09')
  })

  it('it returns null when there is no game on the specified date', async () => {
    const prospectHtml = require('./__fixtures__/mhl_dmitry_ovchinnikov.fixture')
    const prospect = {
      first_name: 'Dmitry',
      last_name: 'Ovchinnikov',
      position: 'C',
      shoots: 'L',
      dob: '2002-08-19',
      draft_round: 5,
      draft_pick: 137,
      draft_year: 2020,
      league_id: '31214',
      statline_url: 'https://engmhl.khl.ru/players/31214/',
      game_statline_url: 'https://engmhl.khl.ru/players/31214/games/',
      league: 'MHL',
      ep_url: 'https://www.eliteprospects.com/player/534929/dmitri-ovchinnikov',
    }
    const noGameAtdate = new Date('2010-09-26 12:00:00')

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const gameData = await mhlScraper(prospect, noGameAtdate)

    expect(gameData).toEqual(null)
  })

  it('it throws error if prospect does not have a league_id', async () => {
    const prospect = {}
    const date = new Date()

    await expect(mhlScraper(prospect, date)).rejects.toThrow()
  })
})
