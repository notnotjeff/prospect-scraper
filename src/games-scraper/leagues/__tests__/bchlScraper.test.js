const bchlScraper = require('../bchlScraper')
const utils = require('../../../utils')

describe('bchlScraper()', () => {
  it('it gets prospect json and scrapes game on date', async () => {
    const prospectJson = require('./__fixtures__/bchl_ryan_tverberg.fixture')
    const prospect = {
      first_name: 'Ryan',
      last_name: 'Tverberg',
      league_id: '6748',
      league: 'BCHL',
    }
    const date = new Date('2020-10-27 12:00:00')

    jest.spyOn(utils.date, 'setDateValues').mockImplementation(() => ({ day: '27', month: '10', year: '2020' }))
    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const gameData = await bchlScraper(prospect, date)

    expect(gameData.goals).toEqual(1)
    expect(gameData.assists).toEqual(1)
    expect(gameData.points).toEqual(2)
    expect(gameData.shots).toEqual(null)
    expect(gameData.penalty_minutes).toEqual(2)
    expect(gameData.date).toEqual('2020-10-27')
  })

  it('it returns null when there is no game on the specified date', async () => {
    const prospectJson = require('./__fixtures__/bchl_ryan_tverberg.fixture')
    const prospect = {
      first_name: 'Ryan',
      last_name: 'Tverberg',
      league_id: '6748',
      league: 'BCHL',
    }
    const date = new Date()

    jest.spyOn(utils.date, 'setDateValues').mockImplementation(() => ({ day: '21', month: '10', year: '2010' }))
    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const gameData = await bchlScraper(prospect, date)

    expect(gameData).toEqual(null)
  })

  it('it throws error if prospect does not have a league_id', async () => {
    const prospect = {}
    const date = new Date()

    await expect(bchlScraper(prospect, date)).rejects.toThrow()
  })
})
