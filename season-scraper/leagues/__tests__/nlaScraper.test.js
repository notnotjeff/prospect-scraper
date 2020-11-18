const nlaScraper = require('../nlaScraper')
const utils = require('../../../utils')

describe('nlaScraper()', () => {
  test('gets prospect json and scrapes current season stats', async () => {
    const prospectJson = require('./__fixtures__/nla_denis_malgin.fixture')
    const prospect = {
      first_name: 'Denis',
      last_name: 'Malgin',
      statline_url:
        'https://data.sihf.ch/Statistic/api/cms/cache300?alias=player&searchQuery=1//1&filterQuery=2020/3092/101151&filterBy=Season,Phase&orderBy=points&orderByDescending=true&take=20&callback=externalStatisticsCallback&skip=-1&language=de',
      games_url: '',
      league: 'NLA',
    }

    jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

    const { goals, assists, points, shots, games_played } = await nlaScraper(prospect)

    expect(goals).toEqual(6)
    expect(assists).toEqual(3)
    expect(points).toEqual(9)
    expect(shots).toEqual(null)
    expect(games_played).toEqual(8)
  })

  describe('when null league_id is inputted', () => {
    test('it throws error', async () => {
      const prospect = { league: 'NLA' }

      await expect(nlaScraper(prospect)).rejects.toThrow()
    })
  })

  describe('when player does not exist', () => {
    test('returns null values', async () => {
      const prospectJson = require('./__fixtures__/nla_denis_malgin.fixture')
      const prospect = {
        first_name: 'Not Denis',
        last_name: 'Not Malgin',
        statline_url:
          'https://data.sihf.ch/Statistic/api/cms/cache300?alias=player&searchQuery=1//1&filterQuery=2020/3092/101151&filterBy=Season,Phase&orderBy=points&orderByDescending=true&take=20&callback=externalStatisticsCallback&skip=-1&language=de',
        games_url: '',
        league: 'NLA',
      }

      jest.spyOn(utils.request, 'jsonRequest').mockImplementation(() => prospectJson)

      const { goals, assists, points, shots, games_played } = await nlaScraper(prospect)

      expect(goals).toEqual(null)
      expect(assists).toEqual(null)
      expect(points).toEqual(null)
      expect(shots).toEqual(null)
      expect(games_played).toEqual(null)
    })
  })
})
