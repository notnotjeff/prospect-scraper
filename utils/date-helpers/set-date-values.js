const isDaylightSavings = require('./utils/is-daylight-savings')

module.exports = function (date, { zeroPad = true }) {
  // const dateIsDaylightSavings = isDaylightSavings(date)

  // if (+date.getTimezoneOffset() === 0) {
  //   const dateOffset = dateIsDaylightSavings ? 4 : 5
  //   date.setHours(date.getHours() - dateOffset)
  // } else {
  //   const dateOffset = dateIsDaylightSavings ? 0 : 1
  //   date.setHours(date.getHours() - dateOffset)
  // }

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
