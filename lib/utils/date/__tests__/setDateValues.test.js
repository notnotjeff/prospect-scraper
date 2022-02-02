const setDateValues = require('../setDateValues')

describe('setDateValues()', () => {
  describe('when not zero padded', () => {
    it('it returns day, month, and year with no leading zeros', () => {
      const date = new Date('2020-01-01 12:00:00')

      const { day, month, year } = setDateValues(date, { zeroPad: false })

      expect(day).toEqual('1')
      expect(month).toEqual('1')
      expect(year).toEqual('2020')
    })
  })

  describe('when zero padded', () => {
    it('it returns day, month, and year with leading zeros', () => {
      const date = new Date('2020-01-01 12:00:00')

      const { day, month, year } = setDateValues(date, { zeroPad: true })

      expect(day).toEqual('01')
      expect(month).toEqual('01')
      expect(year).toEqual('2020')
    })
  })

  describe('when no options are passed', () => {
    it('it returns day, month, and year with leading zeros', () => {
      const date = new Date('2020-01-01 12:00:00')

      const { day, month, year } = setDateValues(date, {})

      expect(day).toEqual('01')
      expect(month).toEqual('01')
      expect(year).toEqual('2020')
    })
  })
})
