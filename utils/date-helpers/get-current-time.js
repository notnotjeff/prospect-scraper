const isDaylightSavings = require('./utils/is-daylight-savings')

module.exports = function () {
  // Set Time
  const day = new Date()
  let amPm = ''
  let hours = ''
  const minutes = day.getMinutes() < 10 ? `0${day.getMinutes()}` : `${day.getMinutes()}`
  const offsetHours = isDaylightSavings(day) ? 4 : 5

  if (+day.getTimezoneOffset() === 0) {
    day.setHours(day.getHours() - offsetHours)
  }

  if (+day.getHours() < 12) {
    hours = String(day.getHours())
  } else {
    hours = String(day.getHours() - 12)
  }

  amPm = +day.getHours() < 12 ? 'am' : 'pm'
  if (+hours === 0) {
    hours = 12
  }

  return `${hours}:${minutes}${amPm}`
}
