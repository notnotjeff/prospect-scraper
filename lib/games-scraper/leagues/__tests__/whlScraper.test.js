const whlScraper = require('../whlScraper')
const utils = require('../../../utils')

describe('whlScraper()', () => {
  it('it gets prospect json and scrapes game on date', async () => {
    const prospectJson = require('./__fixtures__/whl_riley_stotts.fixture')
    const prospect = {
      first_name: 'Riley',
      last_name: 'Stotts',
      position: 'C',
      shoots: 'L',
      dob: '2000-01-05',
      draft_round: 3,
      draft_pick: 83,
      draft_year: 2018,
      league_id: '27355',
      statline_url:
        'http://lscluster.hockeytech.com/feed/?feed=modulekit&view=player&key=41b145a848f4bd67&fmt=json&client_code=whl&lang=en&player_id=27355&category=seasonstats',
      game_statline_url:
        'http://lscluster.hockeytech.com/feed/?feed=modulekit&view=player&key=41b145a848f4bd67&fmt=json&client_code=whl&lang=en&player_id=27355&category=gamebygame',
      league: 'WHL',
      ep_url: 'https://www.eliteprospects.com/player/201715/riley-stotts',
    }
    const date = new Date()

    jest.spyOn(utils.date, 'setDateValues').mockImplementation(() => ({ day: '25', month: '10', year: '2019' }))
    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const gameData = await whlScraper(prospect, date)

    expect(gameData.goals).toEqual(1)
    expect(gameData.assists).toEqual(1)
    expect(gameData.points).toEqual(2)
    expect(gameData.shots).toEqual(1)
    expect(gameData.penalty_minutes).toEqual(0)
    expect(gameData.date).toEqual('2019-10-25')
  })

  it('it returns null when there is no game on the specified date', async () => {
    const prospectJson = require('./__fixtures__/whl_riley_stotts.fixture')
    const prospect = {
      first_name: 'Riley',
      last_name: 'Stotts',
      position: 'C',
      shoots: 'L',
      dob: '2000-01-05',
      draft_round: 3,
      draft_pick: 83,
      draft_year: 2018,
      league_id: '27355',
      statline_url:
        'http://lscluster.hockeytech.com/feed/?feed=modulekit&view=player&key=41b145a848f4bd67&fmt=json&client_code=whl&lang=en&player_id=27355&category=seasonstats',
      game_statline_url:
        'http://lscluster.hockeytech.com/feed/?feed=modulekit&view=player&key=41b145a848f4bd67&fmt=json&client_code=whl&lang=en&player_id=27355&category=gamebygame',
      league: 'WHL',
      ep_url: 'https://www.eliteprospects.com/player/201715/riley-stotts',
    }
    const date = new Date()

    jest.spyOn(utils.date, 'setDateValues').mockImplementation(() => ({ day: '21', month: '10', year: '2019' }))
    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const gameData = await whlScraper(prospect, date)

    expect(gameData).toEqual(null)
  })

  it('it throws error if prospect does not have a league_id', async () => {
    const prospect = {}
    const date = new Date()

    await expect(whlScraper(prospect, date)).rejects.toThrow()
  })
})
