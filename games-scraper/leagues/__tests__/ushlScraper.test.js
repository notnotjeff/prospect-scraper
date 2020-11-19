const ushlScraper = require('../ushlScraper')
const utils = require('../../../utils')

describe('ushlScraper()', () => {
  it('it gets prospect json and scrapes game on date', async () => {
    const prospectJson = require('./__fixtures__/ushl_mike_koster.fixture')
    const prospect = {
      first_name: 'Mike',
      last_name: 'Koster',
      position: 'D',
      shoots: 'L',
      dob: '2001-04-13',
      draft_round: 5,
      draft_pick: 146,
      draft_year: 2019,
      league_id: '7842',
      statline_url:
        'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=7842&site_id=0&key=e828f89b243dc43f&client_code=ushl&league_id=&lang=en&statsType=standard&callback=json',
      game_statline_url: null,
      league: 'USHL',
      ep_url: 'https://www.eliteprospects.com/player/427432/mike-koster',
    }
    const date = new Date('2020-01-04')

    jest.spyOn(utils.date, 'setDateValues').mockImplementation(() => ({ day: '04', month: '01', year: '2020' }))
    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const gameData = await ushlScraper(prospect, date)

    expect(gameData.goals).toEqual(1)
    expect(gameData.assists).toEqual(0)
    expect(gameData.points).toEqual(1)
    expect(gameData.shots).toEqual(5)
    expect(gameData.penalty_minutes).toEqual(0)
    expect(gameData.date).toEqual('2020-01-04')
  })

  it('it returns null when there is no game on the specified date', async () => {
    const prospectJson = require('./__fixtures__/ushl_mike_koster.fixture')
    const prospect = {
      first_name: 'Mike',
      last_name: 'Koster',
      position: 'D',
      shoots: 'L',
      dob: '2001-04-13',
      draft_round: 5,
      draft_pick: 146,
      draft_year: 2019,
      league_id: '7842',
      statline_url:
        'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=7842&site_id=0&key=e828f89b243dc43f&client_code=ushl&league_id=&lang=en&statsType=standard&callback=json',
      game_statline_url:
        'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=7842&site_id=0&key=e828f89b243dc43f&client_code=ushl&league_id=&lang=en&statsType=standard&callback=json',
      league: 'USHL',
      ep_url: 'https://www.eliteprospects.com/player/427432/mike-koster',
    }
    const date = new Date()

    jest.spyOn(utils.date, 'setDateValues').mockImplementation(() => ({ day: '21', month: '10', year: '2019' }))
    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const gameData = await ushlScraper(prospect, date)

    expect(gameData).toEqual(null)
  })

  it('it throws error if prospect does not have a league_id', async () => {
    const prospect = {}
    const date = new Date()

    await expect(ushlScraper(prospect, date)).rejects.toThrow()
  })
})
