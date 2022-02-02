const cheerio = require('cheerio')
const liigaScraper = require('../liigaScraper')
const utils = require('../../../utils')

describe('liigaScraper()', () => {
  it('it gets prospect html and scrapes for game on date', async () => {
    const prospectHtml = require('./__fixtures__/liiga_topi_niemela.fixture')
    const prospect = {
      first_name: 'Topi',
      last_name: 'Niemela',
      position: 'D',
      shoots: 'R',
      dob: '2002-03-25',
      draft_round: 3,
      draft_pick: 64,
      draft_year: 2020,
      league_id: '31555838',
      statline_url: 'https://liiga.fi/fi/pelaajat/31555838/niemela-topi',
      game_statline_url: 'https://liiga.fi/fi/pelaajat/31555838/niemela-topi/ottelu-ottelulta',
      league: 'Liiga',
      ep_url: 'https://www.eliteprospects.com/player/499424/topi-niemela',
    }
    const date = new Date('2020-10-31 12:00:00')

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const gameData = await liigaScraper(prospect, date)

    expect(gameData.goals).toEqual(0)
    expect(gameData.assists).toEqual(1)
    expect(gameData.points).toEqual(1)
    expect(gameData.shots).toEqual(3)
    expect(gameData.penalty_minutes).toEqual(0)
    expect(gameData.date).toEqual('2020-10-31')
  })

  it('it returns null when there is no game on the specified date', async () => {
    const prospectHtml = require('./__fixtures__/liiga_topi_niemela.fixture')
    const prospect = {
      first_name: 'Topi',
      last_name: 'Niemela',
      position: 'D',
      shoots: 'R',
      dob: '2002-03-25',
      draft_round: 3,
      draft_pick: 64,
      draft_year: 2020,
      league_id: '31555838',
      statline_url: 'https://liiga.fi/fi/pelaajat/31555838/niemela-topi',
      game_statline_url: 'https://liiga.fi/fi/pelaajat/31555838/niemela-topi/ottelu-ottelulta',
      league: 'Liiga',
      ep_url: 'https://www.eliteprospects.com/player/499424/topi-niemela',
    }
    const date = new Date('2010-09-26 12:00:00')

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const gameData = await liigaScraper(prospect, date)

    expect(gameData).toEqual(null)
  })

  it('it throws error if prospect does not have a league_id', async () => {
    const prospect = {}
    const date = new Date()

    await expect(liigaScraper(prospect, date)).rejects.toThrow()
  })
})
