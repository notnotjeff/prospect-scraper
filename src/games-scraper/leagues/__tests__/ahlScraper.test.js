const ahlScraper = require('../ahlScraper')
const utils = require('../../../utils')

describe('ahlScraper()', () => {
  it('it gets prospect json and scrapes game on date', async () => {
    const prospectJson = require('./__fixtures__/ahl_rasmus_sandin.fixture')
    const prospect = {
      first_name: 'Rasmus',
      last_name: 'Sandin',
      position: 'D',
      shoots: 'L',
      dob: '2000-03-07',
      draft_round: 1,
      draft_pick: 29,
      draft_year: 2018,
      league_id: '7314',
      statline_url: null,
      game_statline_url: null,
      league: 'AHL',
      ep_url: 'https://www.eliteprospects.com/player/289453/rasmus-sandin',
    }
    const date = new Date()

    jest.spyOn(utils.date, 'setDateValues').mockImplementation(() => ({ day: '20', month: '10', year: '2019' }))
    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const gameData = await ahlScraper(prospect, date)

    expect(gameData.goals).toEqual(1)
    expect(gameData.assists).toEqual(1)
    expect(gameData.points).toEqual(2)
    expect(gameData.shots).toEqual(2)
    expect(gameData.penalty_minutes).toEqual(0)
    expect(gameData.date).toEqual('2019-10-20')
  })

  it('it returns null when there is no game on the specified date', async () => {
    const prospectJson = require('./__fixtures__/ahl_rasmus_sandin.fixture')
    const prospect = {
      first_name: 'Rasmus',
      last_name: 'Sandin',
      position: 'D',
      shoots: 'L',
      dob: '2000-03-07',
      draft_round: 1,
      draft_pick: 29,
      draft_year: 2018,
      league_id: '7314',
      statline_url: null,
      game_statline_url: null,
      league: 'AHL',
      ep_url: 'https://www.eliteprospects.com/player/289453/rasmus-sandin',
    }
    const date = new Date()

    jest.spyOn(utils.date, 'setDateValues').mockImplementation(() => ({ day: '21', month: '10', year: '2019' }))
    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const gameData = await ahlScraper(prospect, date)

    expect(gameData).toEqual(null)
  })

  it('it throws error if prospect does not have a league_id', async () => {
    const prospect = {}
    const date = new Date()

    await expect(ahlScraper(prospect, date)).rejects.toThrow()
  })
})
