const getMonthName = require('../getMonthName')

describe('getMonthName()', () => {
  it.each([
    [0, 'January'],
    [11, 'December'],
  ])('if passed zero indexed month at index %s it returns full month name %s', (index, result) => {
    const monthName = getMonthName(index, { isZeroIndexed: true, shortendNames: false })

    expect(monthName).toEqual(result)
  })

  it.each([
    [0, 'Jan'],
    [11, 'Dec'],
  ])('if passed zero indexed month at index %s it returns shortened month name %s', (index, result) => {
    const monthName = getMonthName(index, { isZeroIndexed: true, shortendNames: true })

    expect(monthName).toEqual(result)
  })

  it.each([
    [1, 'January'],
    [12, 'December'],
  ])('if passed non-zero indexed month at index %s it returns full month name %s', (index, result) => {
    const monthName = getMonthName(index, { isZeroIndexed: false, shortendNames: false })

    expect(monthName).toEqual(result)
  })

  it.each([
    [1, 'Jan'],
    [12, 'Dec'],
  ])('if passed non-zero indexed month at index %s it returns shortened month name %s', (index, result) => {
    const monthName = getMonthName(index, { isZeroIndexed: false, shortendNames: true })

    expect(monthName).toEqual(result)
  })

  describe('when no parameters are passed', () => {
    it('it does not zero index and uses full names', () => {
      const monthName = getMonthName(1, {})

      expect(monthName).toEqual('January')
    })
  })
})
