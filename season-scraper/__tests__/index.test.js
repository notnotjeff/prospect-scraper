const utils = require('../../utils')
const seasonScraper = require('..')

describe('seasonScraper()', () => {
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
      statline_url:
        'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=7314&site_id=1&key=50c2cd9b5e18e390&client_code=ahl&league_id=&lang=en&statsType=standard&callback=json',
      game_statline_url:
        'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=7314&site_id=1&key=50c2cd9b5e18e390&client_code=ahl&league_id=&lang=en&statsType=standard&callback=json',
      league: 'AHL',
      ep_url: 'https://www.eliteprospects.com/player/289453/rasmus-sandin',
    }
    const age = 19

    jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2019-20')
    jest.spyOn(utils.calculation, 'ageOnDate').mockImplementation(() => age)
    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const prospectData = await seasonScraper(prospect)

    expect(prospectData.age).toEqual(age)
    expect(prospectData.goals).toEqual(2)
    expect(prospectData.assists).toEqual(13)
    expect(prospectData.points).toEqual(15)
    expect(prospectData.shots).toEqual(26)
    expect(prospectData.games_played).toEqual(21)
    expect(prospectData.goals_pg).toEqual('0.10')
    expect(prospectData.assists_pg).toEqual('0.62')
    expect(prospectData.points_pg).toEqual('0.71')
    expect(prospectData.shots_pg).toEqual('1.24')
  })

  it('it throws error when the scraper is not found in the LEAGUE_CODES constant', async () => {
    const prospect = {
      league: 'NOT-A-REAL-LEAGUE',
      statline_url: 'http://www.not-real-url.com',
    }

    await expect(seasonScraper(prospect)).rejects.toThrow()
  })
})
