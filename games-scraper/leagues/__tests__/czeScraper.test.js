const cheerio = require('cheerio')
const czeScraper = require('../czeScraper')
const utils = require('../../../utils')

describe('czeScraper()', () => {
  it('it gets prospect html and scrapes for game on date', async () => {
    const prospectHtml = require('./__fixtures__/cze_filip_kral.fixture')
    const prospect = {
      first_name: 'Filip',
      last_name: 'Kral',
      position: 'D',
      shoots: 'L',
      dob: '1999-10-20',
      draft_round: 5,
      draft_pick: 149,
      draft_year: 2018,
      league_id: '23461',
      statline_url: 'https://www.hokej.cz/hrac/23461/career?t=224&stats-section=all',
      game_statline_url: 'https://www.hokej.cz/hrac/23461?t=224',
      league: 'CZE2',
      ep_url: 'https://www.eliteprospects.com/player/247241/filip-kral',
    }
    const date = new Date('2020-11-09 12:00:00')

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const gameData = await czeScraper(prospect, date)

    expect(gameData.goals).toEqual(0)
    expect(gameData.assists).toEqual(1)
    expect(gameData.points).toEqual(1)
    expect(gameData.shots).toEqual(null)
    expect(gameData.penalty_minutes).toEqual(0)
    expect(gameData.date).toEqual('2020-11-09')
  })

  it('it returns null when there is no game on the specified date', async () => {
    const prospectHtml = require('./__fixtures__/cze_filip_kral.fixture')
    const prospect = {
      first_name: 'Filip',
      last_name: 'Kral',
      position: 'D',
      shoots: 'L',
      dob: '1999-10-20',
      draft_round: 5,
      draft_pick: 149,
      draft_year: 2018,
      league_id: '23461',
      statline_url: 'https://www.hokej.cz/hrac/23461/career?t=224&stats-section=all',
      game_statline_url: 'https://www.hokej.cz/hrac/23461?t=224',
      league: 'CZE',
      ep_url: 'https://www.eliteprospects.com/player/247241/filip-kral',
    }
    const date = new Date('2010-05-10 12:00:00')

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const gameData = await czeScraper(prospect, date)

    expect(gameData).toEqual(null)
  })

  it('it will not scrape games from other Czech leagues', async () => {
    const prospectHtml = require('./__fixtures__/cze_filip_kral.fixture')
    const prospect = {
      first_name: 'Filip',
      last_name: 'Kral',
      position: 'D',
      shoots: 'L',
      dob: '1999-10-20',
      draft_round: 5,
      draft_pick: 149,
      draft_year: 2018,
      league_id: '23461',
      statline_url: 'https://www.hokej.cz/hrac/23461/career?t=224&stats-section=all',
      game_statline_url: 'https://www.hokej.cz/hrac/23461?t=224',
      league: 'CZE2',
      ep_url: 'https://www.eliteprospects.com/player/247241/filip-kral',
    }
    const date = new Date('2010-10-07 12:00:00')

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const gameData = await czeScraper(prospect, date)

    expect(gameData).toEqual(null)
  })

  it('it throws error if prospect does not have a league_id', async () => {
    const prospect = {}
    const date = new Date()

    await expect(czeScraper(prospect, date)).rejects.toThrow()
  })
})
