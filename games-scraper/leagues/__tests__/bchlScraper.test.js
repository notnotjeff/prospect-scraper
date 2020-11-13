const bchlScraper = require('../bchlScraper')
const utils = require('../../../utils')

describe('bchlScraper()', () => {
  test('it gets prospect json and scrapes game on date', async () => {
    const prospectJson = require('./__fixtures__/bchl_ryan_tverberg.fixture')
    const prospect = {
      first_name: 'Ryan',
      last_name: 'Tverberg',
      position: 'C',
      shoots: 'R',
      dob: '2002-01-30',
      draft_round: 7,
      draft_pick: 213,
      draft_year: 2020,
      league_id: '6748',
      statline_url: '',
      game_statline_url: '',
      league: 'BCHL',
      ep_url: 'https://www.eliteprospects.com/player/201945/ryan-tverberg',
    }
    const date = new Date('2020-10-27 12:00:00')

    jest.spyOn(utils.dateHelpers, 'setDateValues').mockImplementation(() => ({ day: '27', month: '10', year: '2020' }))
    jest.spyOn(utils, 'jsonRequest').mockImplementation(() => prospectJson)

    const gameData = await bchlScraper(prospect, date)

    expect(gameData.goals).toEqual(1)
    expect(gameData.assists).toEqual(1)
    expect(gameData.points).toEqual(2)
    expect(gameData.shots).toEqual(null)
    expect(gameData.penalty_minutes).toEqual(2)
    expect(gameData.date).toEqual('2020-10-27')
  })

  test('it returns null when there is no game on the specified date', async () => {
    const prospectJson = require('./__fixtures__/bchl_ryan_tverberg.fixture')
    const prospect = {
      first_name: 'Ryan',
      last_name: 'Tverberg',
      position: 'C',
      shoots: 'R',
      dob: '2002-01-30',
      draft_round: 7,
      draft_pick: 213,
      draft_year: 2020,
      league_id: '6748',
      statline_url: '',
      game_statline_url: '',
      league: 'BCHL',
      ep_url: 'https://www.eliteprospects.com/player/201945/ryan-tverberg',
    }
    const date = new Date()

    jest.spyOn(utils.dateHelpers, 'setDateValues').mockImplementation(() => ({ day: '21', month: '10', year: '2010' }))
    jest.spyOn(utils, 'jsonRequest').mockImplementation(() => prospectJson)

    const gameData = await bchlScraper(prospect, date)

    expect(gameData).toEqual(null)
  })

  test('it throws error if prospect does not have a league_id', async () => {
    const prospect = {}
    const date = new Date()

    await expect(bchlScraper(prospect, date)).rejects.toThrow()
  })
})