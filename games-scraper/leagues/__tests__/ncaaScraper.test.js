const cheerio = require('cheerio')
const ncaaScraper = require('../ncaaScraper')
const utils = require('../../../utils')

describe('ncaaScraper()', () => {
  test('it gets prospect html and scrapes for game on date', async () => {
    const prospectHtml = require('./__fixtures__/ncaa_ryan_oconnell.fixture')
    const prospect = {
      first_name: 'Ryan',
      last_name: "O'Connell",
      position: 'D',
      shoots: 'L',
      dob: '1999-04-25',
      draft_round: 7,
      draft_pick: 203,
      draft_year: 2017,
      league_id: 'osum16',
      statline_url: 'http://collegehockeyinc.com/stats/players20.php?osum16',
      game_statline_url: 'http://collegehockeyinc.com/stats/players20.php?osum16',
      league: 'NCAA',
      ep_url: 'https://www.eliteprospects.com/player/286946/ryan-o-connell',
    }
    const date = new Date('2019-11-01 12:00:00')

    jest.spyOn(utils, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))
    jest.spyOn(utils, 'getCurrentSeason').mockImplementation(() => '2019-2020')

    const gameData = await ncaaScraper(prospect, date)

    expect(gameData.goals).toEqual(0)
    expect(gameData.assists).toEqual(1)
    expect(gameData.points).toEqual(1)
    expect(gameData.shots).toEqual(2)
    expect(gameData.penalty_minutes).toEqual(0)
    expect(gameData.date).toEqual('2019-11-01')
  })

  test('it returns null when there is no game on the specified date', async () => {
    const prospectHtml = require('./__fixtures__/ncaa_ryan_oconnell.fixture')
    const prospect = {
      first_name: 'Ryan',
      last_name: "O'Connell",
      position: 'D',
      shoots: 'L',
      dob: '1999-04-25',
      draft_round: 7,
      draft_pick: 203,
      draft_year: 2017,
      league_id: 'osum16',
      statline_url: 'http://collegehockeyinc.com/stats/players20.php?osum16',
      game_statline_url: 'http://collegehockeyinc.com/stats/players20.php?osum16',
      league: 'NCAA',
      ep_url: 'https://www.eliteprospects.com/player/286946/ryan-o-connell',
    }
    const noGameAtdate = new Date('2010-09-26 12:00:00')

    jest.spyOn(utils, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))
    jest.spyOn(utils, 'getCurrentSeason').mockImplementation(() => '2019-2020')

    const gameData = await ncaaScraper(prospect, noGameAtdate)

    expect(gameData).toEqual(null)
  })

  test('it throws error if prospect does not have a league_id', async () => {
    const prospect = {}
    const date = new Date()

    await expect(ncaaScraper(prospect, date)).rejects.toThrow()
  })

  test('it throws an error if the page does not belong to the player', async () => {
    const prospectHtml = require('./__fixtures__/ncaa_ryan_oconnell.fixture')
    const prospect = {
      first_name: 'Unknown',
      last_name: 'Player',
      league_id: 'osum16',
      statline_url: 'http://collegehockeyinc.com/stats/players20.php?osum16',
      game_statline_url: 'http://collegehockeyinc.com/stats/players20.php?osum16',
      league: 'NCAA',
    }
    const date = new Date('2019-11-01 12:00:00')

    jest.spyOn(utils, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))
    jest.spyOn(utils, 'getCurrentSeason').mockImplementation(() => '2019-2020')

    await expect(ncaaScraper(prospect, date)).rejects.toThrow()
  })

  test('it throws an error if the page is not current year', async () => {
    const prospectHtml = require('./__fixtures__/ncaa_ryan_oconnell.fixture')
    const prospect = {
      first_name: 'Ryan',
      last_name: "O'Connell",
      position: 'D',
      shoots: 'L',
      dob: '1999-04-25',
      draft_round: 7,
      draft_pick: 203,
      draft_year: 2017,
      league_id: 'osum16',
      statline_url: 'http://collegehockeyinc.com/stats/players20.php?osum16',
      game_statline_url: 'http://collegehockeyinc.com/stats/players20.php?osum16',
      league: 'NCAA',
      ep_url: 'https://www.eliteprospects.com/player/286946/ryan-o-connell',
    }
    const date = new Date('2010-11-01 12:00:00')

    jest.spyOn(utils, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))
    jest.spyOn(utils, 'getCurrentSeason').mockImplementation(() => '2010-2011')

    await expect(ncaaScraper(prospect, date)).rejects.toThrow()
  })
})
