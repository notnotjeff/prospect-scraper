const liigaScraper = require('../liigaScraper')
const utils = require('../../../utils')

describe('liigaScraper()', () => {
  beforeEach(() => {
    jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2022-2023')
  })

  it('gets prospect json and scrapes current season stats', async () => {
    const prospectJson = require('./__fixtures__/liiga_juhamatti_aaltonen.fixture')
    const prospect = {
      first_name: 'Juhamatti',
      last_name: 'Aaltonen',
      league_id: '24242404',
      league: 'Liiga',
    }

    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const { goals, assists, points, shots, games_played } = await liigaScraper(prospect)

    expect(goals).toEqual(5)
    expect(assists).toEqual(3)
    expect(points).toEqual(8)
    expect(shots).toEqual(62)
    expect(games_played).toEqual(9)
  })

  describe('when null league_id is inputted', () => {
    it('it throws error', async () => {
      const prospect = { league: 'Liiga' }

      await expect(liigaScraper(prospect)).rejects.toThrow()
    })
  })

  describe('when season is not found in profile', () => {
    it('it returns null values', async () => {
      const prospectJson = require('./__fixtures__/liiga_juhamatti_aaltonen.fixture')
      const prospect = {
        first_name: 'Juhamatti',
        last_name: 'Aaltonen',
        league_id: '24242404',
        league: 'Liiga',
      }

      jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)
      jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '1989-1990')

      const { goals, assists, points, shots, games_played } = await liigaScraper(prospect)

      expect(goals).toEqual(undefined)
      expect(assists).toEqual(undefined)
      expect(points).toEqual(undefined)
      expect(shots).toEqual(undefined)
      expect(games_played).toEqual(undefined)
    })
  })

  describe('when prospect has played on multiple teams in one season', () => {
    it('it returns null values', async () => {
      const prospectJson = require('./__fixtures__/liiga_axel_rindell_two_teams.fixture')
      const prospect = {
        first_name: 'Axel',
        last_name: 'Rindell',
        league_id: '30439447',
        league: 'Liiga',
      }

      jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)
      jest.spyOn(utils.date, 'getCurrentSeason').mockImplementation(() => '2021-2022')

      const { goals, assists, points, shots, games_played } = await liigaScraper(prospect)

      expect(goals).toEqual(1)
      expect(assists).toEqual(16)
      expect(points).toEqual(17)
      expect(shots).toEqual(147)
      expect(games_played).toEqual(42)
    })
  })
})
