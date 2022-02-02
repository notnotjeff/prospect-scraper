const cheerio = require('cheerio')
const mestisScraper = require('../mestisScraper')
const utils = require('../../../utils')

describe('mestisScraper()', () => {
  it('it gets prospect html and scrapes for game on date', async () => {
    const prospectHtml = require('./__fixtures__/mestis_mac_hollowell.fixture')
    const prospect = {
      first_name: 'Mac',
      last_name: 'Hollowell',
      position: 'D',
      shoots: 'R',
      dob: '1998-09-26',
      draft_round: 4,
      draft_pick: 118,
      draft_year: 2018,
      league_id: '60490663',
      statline_url: 'https://mestis.fi/en/pelaajat/60490663/hollowell-mac',
      game_statline_url: 'https://mestis.fi/en/pelaajat/60490663/hollowell-mac/ottelu-ottelulta',
      league: 'Mestis',
      ep_url: 'https://www.eliteprospects.com/player/267652/mac-hollowell',
    }
    const date = new Date('2020-11-12 12:00:00')

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const gameData = await mestisScraper(prospect, date)

    expect(gameData.goals).toEqual(0)
    expect(gameData.assists).toEqual(0)
    expect(gameData.points).toEqual(0)
    expect(gameData.shots).toEqual(2)
    expect(gameData.penalty_minutes).toEqual(4)
    expect(gameData.date).toEqual('2020-11-12')
  })

  it('it returns null when there is no game on the specified date', async () => {
    const prospectHtml = require('./__fixtures__/mestis_mac_hollowell.fixture')
    const prospect = {
      first_name: 'Mac',
      last_name: 'Hollowell',
      position: 'D',
      shoots: 'R',
      dob: '1998-09-26',
      draft_round: 4,
      draft_pick: 118,
      draft_year: 2018,
      league_id: '60490663',
      statline_url: 'https://mestis.fi/en/pelaajat/60490663/hollowell-mac',
      game_statline_url: 'https://mestis.fi/en/pelaajat/60490663/hollowell-mac/ottelu-ottelulta',
      league: 'Mestis',
      ep_url: 'https://www.eliteprospects.com/player/267652/mac-hollowell',
    }
    const noGameAtdate = new Date('2010-09-26 12:00:00')

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const gameData = await mestisScraper(prospect, noGameAtdate)

    expect(gameData).toEqual(null)
  })

  it('it throws error if prospect does not have a league_id', async () => {
    const prospect = {}
    const date = new Date()

    await expect(mestisScraper(prospect, date)).rejects.toThrow()
  })
})
