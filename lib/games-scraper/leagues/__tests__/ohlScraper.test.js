const ohlScraper = require('../ohlScraper')
const utils = require('../../../utils')

describe('ohlScraper()', () => {
  it('it gets prospect json and scrapes game on date', async () => {
    const prospectJson = require('./__fixtures__/ohl_nick_robertson.fixture')
    const prospect = {
      first_name: 'Nick',
      last_name: 'Robertson',
      position: 'LW',
      shoots: 'L',
      dob: '2001-09-11',
      draft_round: 2,
      draft_pick: 53,
      draft_year: 2019,
      league_id: '7662',
      statline_url:
        'http://lscluster.hockeytech.com/feed/?feed=modulekit&view=player&key=2976319eb44abe94&fmt=json&client_code=ohl&lang=en&player_id=7662&category=seasonstats',
      game_statline_url:
        'http://lscluster.hockeytech.com/feed/?feed=modulekit&view=player&key=2976319eb44abe94&fmt=json&client_code=ohl&lang=en&player_id=7662&category=gamebygame',
      league: 'OHL',
      ep_url: 'https://www.eliteprospects.com/player/359539/nicholas-robertson',
    }
    const date = new Date('2019-12-05')

    jest.spyOn(utils.date, 'setDateValues').mockImplementation(() => ({ day: '05', month: '12', year: '2019' }))
    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const gameData = await ohlScraper(prospect, date)

    expect(gameData.goals).toEqual(1)
    expect(gameData.assists).toEqual(1)
    expect(gameData.points).toEqual(2)
    expect(gameData.shots).toEqual(5)
    expect(gameData.penalty_minutes).toEqual(0)
    expect(gameData.date).toEqual('2019-12-05')
  })

  it('it returns null when there is no game on the specified date', async () => {
    const prospectJson = require('./__fixtures__/ohl_nick_robertson.fixture')
    const prospect = {
      first_name: 'Nick',
      last_name: 'Robertson',
      position: 'LW',
      shoots: 'L',
      dob: '2001-09-11',
      draft_round: 2,
      draft_pick: 53,
      draft_year: 2019,
      league_id: '7662',
      statline_url:
        'http://lscluster.hockeytech.com/feed/?feed=modulekit&view=player&key=2976319eb44abe94&fmt=json&client_code=ohl&lang=en&player_id=7662&category=seasonstats',
      game_statline_url:
        'http://lscluster.hockeytech.com/feed/?feed=modulekit&view=player&key=2976319eb44abe94&fmt=json&client_code=ohl&lang=en&player_id=7662&category=gamebygame',
      league: 'OHL',
      ep_url: 'https://www.eliteprospects.com/player/359539/nicholas-robertson',
    }
    const date = new Date('2010-01-01')

    jest.spyOn(utils.date, 'setDateValues').mockImplementation(() => ({ day: '21', month: '10', year: '2019' }))
    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const gameData = await ohlScraper(prospect, date)

    expect(gameData).toEqual(null)
  })

  it('it throws error if prospect does not have a league_id', async () => {
    const prospect = {}
    const date = new Date()

    await expect(ohlScraper(prospect, date)).rejects.toThrow()
  })
})
