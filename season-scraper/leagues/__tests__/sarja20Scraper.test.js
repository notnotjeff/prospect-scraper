const sarja20Scraper = require('../sarja20Scraper')
const utils = require('../../../utils')

describe('sarja20Scraper()', () => {
  it('gets prospect json and scrapes current season stats', async () => {
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

    jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2020-2021')
    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const { goals, assists, points, shots, games_played } = await sarja20Scraper(prospect)

    expect(goals).toEqual(3)
    expect(assists).toEqual(7)
    expect(points).toEqual(10)
    expect(shots).toEqual(null)
    expect(games_played).toEqual(16)
  })

  describe('when null league_id is inputted', () => {
    it('it throws error', async () => {
      const prospect = { league: 'Sarja20' }

      await expect(sarja20Scraper(prospect)).rejects.toThrow()
    })
  })
})
