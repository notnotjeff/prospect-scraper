const sarja20Scraper = require('../sarja20Scraper')
const utils = require('../../../utils')

describe('sarja20Scraper()', () => {
  it('it gets prospect html and scrapes for game on date', async () => {
    const prospectJson = require('./__fixtures__/sarja20_kalle_loponen.fixture')
    const prospect = {
      first_name: 'Kalle',
      last_name: 'Loponen',
      position: 'D',
      shoots: 'R',
      dob: '2001-03-13',
      draft_round: 7,
      draft_pick: 204,
      draft_year: 2019,
      league_id: '255011063073080359893401',
      statline_url: null,
      game_statline_url: null,
      league: 'Sarja20',
      ep_url: 'https://www.eliteprospects.com/player/395424/kalle-loponen',
    }
    const date = new Date('2020-10-10 12:00:00')

    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const gameData = await sarja20Scraper(prospect, date)

    expect(gameData.goals).toEqual(0)
    expect(gameData.assists).toEqual(2)
    expect(gameData.points).toEqual(2)
    expect(gameData.shots).toEqual(null)
    expect(gameData.penalty_minutes).toEqual(2)
    expect(gameData.date).toEqual('2020-10-10')
  })

  it('it returns null when there is no game on the specified date', async () => {
    const prospectJson = require('./__fixtures__/sarja20_kalle_loponen.fixture')
    const prospect = {
      first_name: 'Kalle',
      last_name: 'Loponen',
      position: 'D',
      shoots: 'R',
      dob: '2001-03-13',
      draft_round: 7,
      draft_pick: 204,
      draft_year: 2019,
      league_id: '255011063073080359893401',
      statline_url: null,
      game_statline_url: null,
      league: 'Sarja20',
      ep_url: 'https://www.eliteprospects.com/player/395424/kalle-loponen',
    }
    const noGameAtdate = new Date('2010-09-26 12:00:00')

    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const gameData = await sarja20Scraper(prospect, noGameAtdate)

    expect(gameData).toEqual(null)
  })

  it('it throws error if prospect does not have a league_id', async () => {
    const prospect = {}
    const date = new Date()

    await expect(sarja20Scraper(prospect, date)).rejects.toThrow()
  })
})
