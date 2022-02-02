const utils = require('../../utils')
const gamesScraper = require('../')
const leaguesScraper = require('../leagues')

describe('gamesScraper()', () => {
  it('it successfully scrapes player stats', async () => {
    const prospectJson = require('./__fixtures__/rasmus_sandin.fixture')
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
    const date = new Date('2019-10-20 12:00:00')

    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const prospectData = await gamesScraper(prospect, date)

    expect(prospectData.goals).toEqual(1)
    expect(prospectData.assists).toEqual(1)
    expect(prospectData.points).toEqual(2)
    expect(prospectData.shots).toEqual(2)
    expect(prospectData.penalty_minutes).toEqual(0)
    expect(prospectData.date).toEqual('2019-10-20')
  })

  it('it throws error when the scraper is not found in the LEAGUE_CODES constant', async () => {
    const prospect = {
      league: 'NOT-A-REAL-LEAGUE',
    }
    const date = new Date('2019-10-20 12:00:00')

    await expect(gamesScraper(prospect, date)).rejects.toThrow()
  })

  it('it returns null if there is no game data returned by leagueScraper', async () => {
    const prospect = {
      league: 'AHL',
    }
    const date = new Date('2019-10-20 12:00:00')

    jest.spyOn(leaguesScraper, 'ahlScraper').mockImplementation(() => null)

    const prospectData = await gamesScraper(prospect, date)

    expect(prospectData).toEqual(null)
  })
})
