const { TestScheduler } = require('jest')
const ageOnDate = require('../ageOnDate')

describe('ageOnDate()', () => {
  it('it calculates age based on todays date', () => {
    const prospect = {
      dob: '2000-01-01',
    }

    jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(Date.parse('2020-01-01T11:01:58.135Z')).valueOf())

    const age = ageOnDate(prospect.dob)

    expect(age).toEqual(20)
  })

  it('it rounds to one decimal place', () => {
    const prospect = {
      dob: '2000-01-01',
    }

    jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(Date.parse('2020-04-21T11:01:58.135Z')).valueOf())

    const age = ageOnDate(prospect.dob)

    expect(age).toEqual(20.3)
  })
})
