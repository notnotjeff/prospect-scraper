function getDateOfSundayInMonth(sn, m) {
  // Format variables from real world values to computer values
  const sundayNumber = (sn - 1) * 7
  const month = m - 1

  const currentYear = new Date().getFullYear()
  const start = new Date(currentYear, month, sundayNumber)
  const sunday = sundayNumber + (7 - start.getDay())

  return new Date(currentYear, month, sunday)
}

module.exports = function (today) {
  const dstStart = getDateOfSundayInMonth(2, 3)
  const dstEnd = getDateOfSundayInMonth(1, 11)
  const offsetHours = today.getTimezoneOffset() === 0 ? 0 : 4 // If run locally in EST you need to offset for time difference from UTC

  // If today is the start of daylight savings, check if it's past 2AM EST from UTC (should be 5 hours ahead during non-DST period)
  if (`${today.getMonth()}-${today.getDate()}` === `${dstStart.getMonth()}-${dstStart.getDate()}`) {
    return today.getHours() >= 7 - offsetHours ? true : false
  }
  // If today is end of daylight savings, check if it's past 2AM EST from UTC (should be 4 hours ahead during DST period)
  if (`${today.getMonth()}-${today.getDate()}` === `${dstEnd.getMonth()}-${dstEnd.getDate()}`) {
    return today.getHours() >= 6 - offsetHours ? false : true
  }

  // It is in between the DST period and return the proper value
  return today < dstEnd && today >= dstStart ? true : false
}
