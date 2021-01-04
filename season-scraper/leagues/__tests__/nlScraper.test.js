const nlScraper = require('../nlScraper')
const utils = require('../../../utils')

describe('nlScraper()', () => {
  it('gets prospect json and scrapes current season stats', async () => {
    const prospectJson = require('./__fixtures__/nl_denis_malgin.fixture')
    const prospect = {
      first_name: 'Denis',
      last_name: 'Malgin',
      season_id: '3092',
      team_id: '101151',
      league: 'NL',
    }

    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const { goals, assists, points, shots, games_played } = await nlScraper(prospect)

    expect(goals).toEqual(11)
    expect(assists).toEqual(10)
    expect(points).toEqual(21)
    expect(shots).toEqual(null)
    expect(games_played).toEqual(19)
  })

  describe('when null season_id is inputted', () => {
    it('it throws error', async () => {
      const prospect = {
        first_name: 'Denis',
        last_name: 'Malgin',
        team_id: '101151',
        league: 'NL',
      }

      await expect(nlScraper(prospect)).rejects.toThrow()
    })
  })

  describe('when null team_id is inputted', () => {
    it('it throws error', async () => {
      const prospect = {
        first_name: 'Denis',
        last_name: 'Malgin',
        season_id: '3092',
        league: 'NL',
      }

      await expect(nlScraper(prospect)).rejects.toThrow()
    })
  })

  describe('when null first_name is inputted', () => {
    it('it throws error', async () => {
      const prospect = {
        last_name: 'Malgin',
        season_id: '3092',
        team_id: '101151',
        league: 'NL',
      }

      await expect(nlScraper(prospect)).rejects.toThrow()
    })
  })

  describe('when null last_name is inputted', () => {
    it('it throws error', async () => {
      const prospect = {
        first_name: 'Denis',
        season_id: '3092',
        team_id: '101151',
        league: 'NL',
      }

      await expect(nlScraper(prospect)).rejects.toThrow()
    })
  })

  describe('when player does not exist', () => {
    it('returns null values', async () => {
      const prospectJson = require('./__fixtures__/nl_denis_malgin.fixture')
      const prospect = {
        first_name: 'Not Denis',
        last_name: 'Not Malgin',
        season_id: '3092',
        team_id: '101151',
        league: 'NL',
      }

      jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

      const { goals, assists, points, shots, games_played } = await nlScraper(prospect)

      expect(goals).toEqual(null)
      expect(assists).toEqual(null)
      expect(points).toEqual(null)
      expect(shots).toEqual(null)
      expect(games_played).toEqual(null)
    })
  })
})
