const cheerio = require('cheerio')
const shlScraper = require('../shlScraper')
const utils = require('../../../utils')

describe('shlScraper()', () => {
  it('it gets prospect html and scrapes for game on date', async () => {
    const prospectHtml = require('./__fixtures__/shl_filip_hallander.fixture')
    const prospect = {
      first_name: 'Filip',
      last_name: 'Hallander',
      position: 'C',
      shoots: 'L',
      dob: '2000-06-29',
      draft_round: 2,
      draft_pick: 58,
      draft_year: 2018,
      league_id: '1a71-1a71gTHKh__lulea-hockey/qRm-1ykhbTRK4__filip-hallander',
      statline_url: 'https://www.shl.se/lag/1a71-1a71gTHKh__lulea-hockey/qRm-1ykhbTRK4__filip-hallander/statistics',
      game_statline_url: 'https://www.shl.se/lag/1a71-1a71gTHKh__lulea-hockey/qRm-1ykhbTRK4__filip-hallander/gamelog',
      league: 'SHL',
      ep_url: 'https://www.eliteprospects.com/player/293387/filip-hallander',
    }
    const date = new Date('2020-10-03 12:00:00')

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const gameData = await shlScraper(prospect, date)

    expect(gameData.goals).toEqual(1)
    expect(gameData.assists).toEqual(0)
    expect(gameData.points).toEqual(1)
    expect(gameData.shots).toEqual(4)
    expect(gameData.penalty_minutes).toEqual(2)
    expect(gameData.date).toEqual('2020-10-03')
  })

  it('it returns null when there is no game on the specified date', async () => {
    const prospectHtml = require('./__fixtures__/shl_filip_hallander.fixture')
    const prospect = {
      first_name: 'Filip',
      last_name: 'Hallander',
      position: 'C',
      shoots: 'L',
      dob: '2000-06-29',
      draft_round: 2,
      draft_pick: 58,
      draft_year: 2018,
      league_id: '1a71-1a71gTHKh__lulea-hockey/qRm-1ykhbTRK4__filip-hallander',
      statline_url: 'https://www.shl.se/lag/1a71-1a71gTHKh__lulea-hockey/qRm-1ykhbTRK4__filip-hallander/statistics',
      game_statline_url: 'https://www.shl.se/lag/1a71-1a71gTHKh__lulea-hockey/qRm-1ykhbTRK4__filip-hallander/gamelog',
      league: 'SHL',
      ep_url: 'https://www.eliteprospects.com/player/293387/filip-hallander',
    }
    const noGameAtdate = new Date('2010-09-26 12:00:00')

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const gameData = await shlScraper(prospect, noGameAtdate)

    expect(gameData).toEqual(null)
  })

  it('it throws error if prospect does not have a league_id', async () => {
    const prospect = {}
    const date = new Date()

    await expect(shlScraper(prospect, date)).rejects.toThrow()
  })

  it('asdf', async () => {
    const prospectHtml = require('./__fixtures__/shl_pontus_holmberg.fixture')
    const prospect = {
      first_name: 'Pontus',
      last_name: 'Holmberg',
      position: 'LW',
      shoots: 'L',
      dob: '1999-03-09',
      draft_round: 6,
      draft_pick: 156,
      draft_year: 2018,
      league_id: 'fe02-fe02mf1FN__vaxjo-lakers/qTK-4a8Y9mMrn__pontus-holmberg',
      statline_url: 'https://www.shl.se/lag/fe02-fe02mf1FN__vaxjo-lakers/qTK-4a8Y9mMrn__pontus-holmberg/statistics',
      game_statline_url: 'https://www.shl.se/lag/fe02-fe02mf1FN__vaxjo-lakers/qTK-4a8Y9mMrn__pontus-holmberg/gamelog',
      league: 'SHL',
      ep_url: 'https://www.eliteprospects.com/player/265859/pontus-holmberg',
    }
    const date = new Date('2020-11-10 12:00:00')

    jest.spyOn(utils.request, 'htmlRequest').mockImplementation(() => cheerio.load(prospectHtml))

    const gameData = await shlScraper(prospect, date)

    expect(gameData).toEqual(null)
  })
})
