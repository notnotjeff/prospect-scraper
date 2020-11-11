module.exports = function (date, { zeroPad = true }) {
  let day = String(date.getDate())
  let month = String(date.getMonth() + 1)
  const year = String(date.getFullYear())

  day = zeroPad && day < 10 ? `0${day}` : `${day}`
  month = zeroPad && month < 10 ? `0${month}` : `${month}`

  return {
    day,
    month,
    year,
  }
}
