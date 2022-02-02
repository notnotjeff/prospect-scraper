const cheerio = require('cheerio')
const vhlScraper = require('../vhlScraper')
const utils = require('../../../utils')

describe('vhlScraper()', () => {
  it('it gets prospect html and scrapes for game on date', async () => {
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
    const date = new Date('2020-10-26 12:00:00')

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const gameData = await vhlScraper(prospect, date)

    expect(gameData.goals).toEqual(0)
    expect(gameData.assists).toEqual(2)
    expect(gameData.points).toEqual(2)
    expect(gameData.shots).toEqual(1)
    expect(gameData.penalty_minutes).toEqual(2)
    expect(gameData.date).toEqual('2020-10-26')
  })

  it('it returns null when there is no game on the specified date', async () => {
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
    const noGameAtdate = new Date('2010-09-26 12:00:00')

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const gameData = await vhlScraper(prospect, noGameAtdate)

    expect(gameData).toEqual(null)
  })

  it('it throws error if prospect does not have a league_id', async () => {
    const prospect = {}
    const date = new Date()

    await expect(vhlScraper(prospect, date)).rejects.toThrow()
  })
})
