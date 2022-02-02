const getCurrentSeason = require('../getCurrentSeason')

describe('getCurrentSeason()', () => {
  describe('when month is greater than 8 (still the current season)', () => {
    it.each([
      ['YYYY-YY', '2020-21'],
      ['YYYY-YYYY', '2020-2021'],
      ['YY-YYYY', '20-2021'],
      ['YY-YY', '20-21'],
    ])('it uses %s format', (format, result) => {
      jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(Date.parse('2020-09-14T11:01:58.135Z')).valueOf())
      const currentYear = getCurrentSeason(format)

      expect(currentYear).toEqual(result)
    })

    it('it uses YYYY-YY format when none is passed', () => {
      jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(Date.parse('2020-09-14T11:01:58.135Z')).valueOf())
      const currentYear = getCurrentSeason()

      expect(currentYear).toEqual('2020-21')
    })
  })

  describe('when month is less than 8 (still the current season)', () => {
    it.each([
      ['YYYY-YY', '2020-21'],
      ['YYYY-YYYY', '2020-2021'],
      ['YY-YYYY', '20-2021'],
      ['YY-YY', '20-21'],
    ])('uses %s format', (format, result) => {
      jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(Date.parse('2021-03-14T11:01:58.135Z')).valueOf())
      const currentYear = getCurrentSeason(format)

      expect(currentYear).toEqual(result)
    })

    it('it uses YYYY-YY format when none is passed', () => {
      jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(Date.parse('2021-03-14T11:01:58.135Z')).valueOf())
      const currentYear = getCurrentSeason()

      expect(currentYear).toEqual('2020-21')
    })
  })
})
