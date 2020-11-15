const getSeasonStartYear = require('../getSeasonStartYear')

describe('getSeasonStartYear()', () => {
  it('returns previous year as start year if the date is before September', () => {
    jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(Date.parse('2020-08-14T11:01:58.135Z')).valueOf())

    const startYear = getSeasonStartYear()

    expect(startYear).toBe(2019)
  })

  it('returns current year as start year if the date is after August', () => {
    jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(Date.parse('2020-09-14T11:01:58.135Z')).valueOf())

    const startYear = getSeasonStartYear()

    expect(startYear).toBe(2020)
  })
})
