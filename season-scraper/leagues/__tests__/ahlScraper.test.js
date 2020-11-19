const ahlScraper = require('../ahlScraper')
const utils = require('../../../utils')

describe('ahlScraper()', () => {
  it('gets prospect json and scrapes current season stats', async () => {
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

    jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2019-20')
    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const { goals, assists, points, shots, games_played } = await ahlScraper(prospect)

    expect(goals).toEqual(2)
    expect(assists).toEqual(13)
    expect(points).toEqual(15)
    expect(shots).toEqual(26)
    expect(games_played).toEqual(21)
  })

  describe('when null league_id is inputted', () => {
    it('it throws error', async () => {
      const prospect = { league: 'AHL' }

      await expect(ahlScraper(prospect)).rejects.toThrow()
    })
  })

  describe('when season does not exist', () => {
    it('it returns null values', async () => {
      const prospectJson = require('./__fixtures__/ahl_rasmus_sandin.fixture')
      const prospect = {
        first_name: 'Rasmus',
        last_name: 'Sandin',
        league_id: '7314',
        league: 'AHL',
      }

      jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2010-11')
      jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

      const { goals, assists, points, shots, games_played } = await ahlScraper(prospect)

      expect(goals).toEqual(null)
      expect(assists).toEqual(null)
      expect(points).toEqual(null)
      expect(shots).toEqual(null)
      expect(games_played).toEqual(null)
    })
  })
})
