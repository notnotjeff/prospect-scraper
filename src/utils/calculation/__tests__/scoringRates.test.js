const scoringRates = require('../scoringRates')

describe('scoringRates()', () => {
  it('it calculates per game rates for a prospects statline', () => {
    const statline = { goals: 6, assists: 6, points: 6, shots: 6, games_played: 9 }

    const { goals_pg, assists_pg, points_pg, shots_pg } = scoringRates(statline)

    expect(goals_pg).toEqual('0.67')
    expect(assists_pg).toEqual('0.67')
    expect(points_pg).toEqual('0.67')
    expect(shots_pg).toEqual('0.67')
  })

  describe('when stats passed in are null', () => {
    it('it returns null per game rates', () => {
      const { goals_pg, assists_pg, points_pg, shots_pg } = scoringRates({})

      expect(goals_pg).toEqual(null)
      expect(assists_pg).toEqual(null)
      expect(points_pg).toEqual(null)
      expect(shots_pg).toEqual(null)
    })
  })
})
