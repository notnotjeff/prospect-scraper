const qmjhlScraper = require('../qmjhlScraper')
const utils = require('../../../utils')

describe('qmjhlScraper()', () => {
  it('it gets prospect json and scrapes game on date', async () => {
    const prospectJson = require('./__fixtures__/qmjhl_mikhail_abramov.fixture')
    const prospect = {
      first_name: 'Mikhail',
      last_name: 'Abramov',
      position: 'C',
      shoots: 'L',
      dob: '2001-03-26',
      draft_round: 4,
      draft_pick: 115,
      draft_year: 2019,
      league_id: '17871',
      statline_url: null,
      game_statline_url: null,
      league: 'QMJHL',
      ep_url: 'https://www.eliteprospects.com/player/514653/mikhail-abramov',
    }
    const date = new Date()

    jest.spyOn(utils.date, 'setDateValues').mockImplementation(() => ({ day: '29', month: '09', year: '2019' }))
    jest.spyOn(utils.date, 'getMonthName').mockImplementation(() => 'September')
    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const gameData = await qmjhlScraper(prospect, date)

    expect(gameData.goals).toEqual(1)
    expect(gameData.assists).toEqual(2)
    expect(gameData.points).toEqual(3)
    expect(gameData.shots).toEqual(5)
    expect(gameData.penalty_minutes).toEqual(2)
    expect(gameData.date).toEqual('2019-09-29')
  })

  it('it returns null when there is no game on the specified date', async () => {
    const prospectJson = require('./__fixtures__/qmjhl_mikhail_abramov.fixture')
    const prospect = {
      first_name: 'Mikhail',
      last_name: 'Abramov',
      position: 'C',
      shoots: 'L',
      dob: '2001-03-26',
      draft_round: 4,
      draft_pick: 115,
      draft_year: 2019,
      league_id: '17871',
      statline_url: null,
      game_statline_url: null,
      league: 'QMJHL',
      ep_url: 'https://www.eliteprospects.com/player/514653/mikhail-abramov',
    }
    const date = new Date()

    jest.spyOn(utils.date, 'setDateValues').mockImplementation(() => ({ day: '21', month: '10', year: '1019' }))
    jest.spyOn(utils.date, 'getMonthName').mockImplementation(() => '')
    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const gameData = await qmjhlScraper(prospect, date)

    expect(gameData).toEqual(null)
  })

  it('it throws error if prospect does not have a league_id', async () => {
    const prospect = {}
    const date = new Date()

    await expect(qmjhlScraper(prospect, date)).rejects.toThrow()
  })

  it('it converts "-" to 0 if stat category is blank', async () => {
    const prospectJson = require('./__fixtures__/qmjhl_mikhail_abramov.fixture')
    const prospect = {
      first_name: 'Mikhail',
      last_name: 'Abramov',
      position: 'C',
      shoots: 'L',
      dob: '2001-03-26',
      draft_round: 4,
      draft_pick: 115,
      draft_year: 2019,
      league_id: '17871',
      statline_url: null,
      game_statline_url: null,
      league: 'QMJHL',
      ep_url: 'https://www.eliteprospects.com/player/514653/mikhail-abramov',
    }
    const date = new Date('2019-09-20')

    jest.spyOn(utils.date, 'setDateValues').mockImplementation(() => ({ day: '20', month: '09', year: '2019' }))
    jest.spyOn(utils.date, 'getMonthName').mockImplementation(() => 'September')
    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const gameData = await qmjhlScraper(prospect, date)

    expect(gameData.goals).toEqual(0)
    expect(gameData.assists).toEqual(0)
    expect(gameData.points).toEqual(0)
    expect(gameData.shots).toEqual(0)
    expect(gameData.penalty_minutes).toEqual(0)
  })
})
