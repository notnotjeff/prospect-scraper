const liigaScraper = require('../liigaScraper')
const utils = require('../../../utils')

describe('liigaScraper()', () => {
  it('gets prospect html and scrapes for game on date', async () => {
    const prospectJson = require('./__fixtures__/liiga_axel_rindell.fixture')
    const prospect = {
      first_name: 'Axel',
      last_name: 'Rindell',
      league_id: '30439447',
      league: 'Liiga',
    }
    const date = new Date('2021-11-06T15:00:00Z')

    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const gameData = await liigaScraper(prospect, date)

    expect(gameData.goals).toEqual(0)
    expect(gameData.assists).toEqual(4)
    expect(gameData.points).toEqual(4)
    expect(gameData.shots).toEqual(1)
    expect(gameData.penalty_minutes).toEqual(0)
    expect(gameData.date).toEqual('2021-11-06')
  })

  it('returns null when there is no game on the specified date', async () => {
    const prospectJson = require('./__fixtures__/liiga_axel_rindell.fixture')
    const prospect = {
      first_name: 'Axel',
      last_name: 'Rindell',
      league_id: '30439447',
      position: 'D',
      shoots: 'R',
      league: 'Liiga',
    }
    const date = new Date('2010-09-26 12:00:00')

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => prospectJson)

    const gameData = await liigaScraper(prospect, date)

    expect(gameData).toEqual(null)
  })

  it('it throws error if prospect does not have a league_id', async () => {
    const prospect = {}
    const date = new Date()

    await expect(liigaScraper(prospect, date)).rejects.toThrow()
  })
})
