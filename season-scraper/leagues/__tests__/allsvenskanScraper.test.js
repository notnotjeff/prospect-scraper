const cheerio = require('cheerio')
const allsvenskanScraper = require('../allsvenskanScraper')
const utils = require('../../../utils')

describe('allsvenskanScraper()', () => {
  it('gets prospect json and scrapes current season stats', async () => {
    const prospectHtml = require('./__fixtures__/allsvenskan_jesper_lindgren.fixture')
    const prospect = {
      first_name: 'Jesper',
      last_name: 'Lindgren',
      position: 'D',
      shoots: 'R',
      dob: '1997-05-19',
      draft_round: 4,
      draft_pick: 95,
      draft_year: 2015,
      league_id: '6756',
      statline_url: 'https://www.hockeyallsvenskan.se/statistik/spelare?season=2020&gameType=regular&position=All&team=110b-110bJcIAI',
      game_statline_url: 'https://www.hockeyallsvenskan.se/statistik/spelare?season=2020&gameType=regular&position=All&team=110b-110bJcIAI',
      league: 'Allsv',
      ep_url: 'http://www.eliteprospects.com/player.php?player=187806',
    }

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const { goals, assists, points, shots, games_played } = await allsvenskanScraper(prospect)

    expect(goals).toEqual(0)
    expect(assists).toEqual(7)
    expect(points).toEqual(7)
    expect(shots).toEqual(33)
    expect(games_played).toEqual(10)
  })

  describe('when null league_id is inputted', () => {
    it('it throws error', async () => {
      const prospect = { league: 'Allsv' }

      await expect(allsvenskanScraper(prospect)).rejects.toThrow()
    })
  })
})
