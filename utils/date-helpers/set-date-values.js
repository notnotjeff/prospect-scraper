const isDaylightSavings = require('./utils/is-daylight-savings')

module.exports = function setDateValues() {
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  const todayIsDaylightSavings = isDaylightSavings(today)
  const yesterdayIsDaylightSavings = isDaylightSavings(yesterday)

  if (+today.getTimezoneOffset() === 0) {
    const todayOffset = todayIsDaylightSavings ? 4 : 5
    const yesterdayOffset = yesterdayIsDaylightSavings ? 4 : 5
    today.setHours(today.getHours() - todayOffset)
    yesterday.setHours(yesterday.getHours() - yesterdayOffset)
  } else {
    const todayOffset = todayIsDaylightSavings ? 0 : 1
    const yesterdayOffset = yesterdayIsDaylightSavings ? 0 : 1
    today.setHours(today.getHours() - todayOffset)
    yesterday.setHours(yesterday.getHours() - yesterdayOffset)
  }

  let day = String(today.getDate())
  let month = String(today.getMonth() + 1)
  const year = String(today.getFullYear())

  let yDay = String(yesterday.getDate())
  let yMonth = String(yesterday.getMonth() + 1)
  const yYear = String(yesterday.getFullYear())

  // Add leading 0's to month and day if they're less than 10
  day = day < 10 ? `0${day}` : `${day}`
  yDay = yDay < 10 ? `0${yDay}` : `${yDay}`
  month = month < 10 ? `0${month}` : `${month}`
  yMonth = yMonth < 10 ? `0${yMonth}` : `${yMonth}`

  return {
    day,
    month,
    year,
    yDay,
    yMonth,
    yYear,
  }
}
