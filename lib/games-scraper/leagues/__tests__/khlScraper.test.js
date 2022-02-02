const cheerio = require('cheerio')
const khlScraper = require('../khlScraper')
const utils = require('../../../utils')

describe('khlScraper()', () => {
  it('it gets prospect html and scrapes for game on date', async () => {
    const prospectHtml = require('./__fixtures__/khl_rodion_amirov.fixture')
    const prospect = {
      first_name: 'Rodion',
      last_name: 'Amirov',
      position: 'LW',
      shoots: 'L',
      dob: '2001-10-02',
      draft_round: 1,
      draft_pick: 15,
      draft_year: 2020,
      league_id: '30159',
      statline_url: 'https://en.khl.ru/players/30159/',
      game_statline_url: 'https://en.khl.ru/players/30159/',
      league: 'KHL',
      ep_url: 'https://www.eliteprospects.com/player/518585/rodion-amirov',
    }
    const date = new Date('2020-09-26 12:00:00')

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const gameData = await khlScraper(prospect, date)

    expect(gameData.goals).toEqual(2)
    expect(gameData.assists).toEqual(1)
    expect(gameData.points).toEqual(3)
    expect(gameData.shots).toEqual(4)
    expect(gameData.penalty_minutes).toEqual(2)
    expect(gameData.date).toEqual('2020-09-26')
  })

  it('it gets prospect html and scrapes for game on date if day of month is single digit', async () => {
    const prospectHtml = require('./__fixtures__/khl_rodion_amirov.fixture')
    const prospect = {
      first_name: 'Rodion',
      last_name: 'Amirov',
      position: 'LW',
      shoots: 'L',
      dob: '2001-10-02',
      draft_round: 1,
      draft_pick: 15,
      draft_year: 2020,
      league_id: '30159',
      statline_url: 'https://en.khl.ru/players/30159/',
      game_statline_url: 'https://en.khl.ru/players/30159/',
      league: 'KHL',
      ep_url: 'https://www.eliteprospects.com/player/518585/rodion-amirov',
    }
    const date = new Date('2020-09-05 12:00:00')

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const gameData = await khlScraper(prospect, date)

    expect(gameData.goals).toEqual(0)
    expect(gameData.assists).toEqual(1)
    expect(gameData.points).toEqual(1)
    expect(gameData.shots).toEqual(2)
    expect(gameData.penalty_minutes).toEqual(0)
    expect(gameData.date).toEqual('2020-09-05')
  })

  it('it returns null when there is no game on the specified date', async () => {
    const prospectHtml = require('./__fixtures__/khl_rodion_amirov.fixture')
    const prospect = {
      first_name: 'Rodion',
      last_name: 'Amirov',
      position: 'LW',
      shoots: 'L',
      dob: '2001-10-02',
      draft_round: 1,
      draft_pick: 15,
      draft_year: 2020,
      league_id: '30159',
      statline_url: 'https://en.khl.ru/players/30159/',
      game_statline_url: 'https://en.khl.ru/players/30159/',
      league: 'KHL',
      ep_url: 'https://www.eliteprospects.com/player/518585/rodion-amirov',
    }
    const date = new Date('2010-09-26 12:00:00')

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const gameData = await khlScraper(prospect, date)

    expect(gameData).toEqual(null)
  })

  it('it throws error if prospect does not have a league_id', async () => {
    const prospect = {}
    const date = new Date()

    await expect(khlScraper(prospect, date)).rejects.toThrow()
  })
})
