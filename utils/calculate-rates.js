module.exports = ({ games_played, goals, assists, points, shots }) => {
  let goals_pg = null
  let assists_pg = null
  let points_pg = null
  let shots_pg = null

  if (Number(games_played) > 0) {
    games_played = Number(games_played)
    goals_pg = goals && (goals / games_played).toFixed(2)
    assists_pg = assists && (assists / games_played).toFixed(2)
    points_pg = points && (points / games_played).toFixed(2)
    shots_pg = shots && (shots / games_played).toFixed(2)
  }

  return { goals_pg, assists_pg, points_pg, shots_pg }
}
