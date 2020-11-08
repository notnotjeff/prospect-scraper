module.exports = function getDateFromArray(date, y, m, d) {
  let day = date[d]
  let month = date[m]
  const year = date[y]

  month = new Date(Date.parse(`${month} 1, 2012`)).getMonth() + 1
  month = month < 10 ? `0${month}` : `${month}`

  day = day < 10 ? `0${day}` : `${day}`

  return `${year}-${month}-${day}`
}
