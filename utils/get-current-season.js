module.exports = function (format = 'YYYY-YY') {
  // Return string in format YYYY-YY || YY-YY || YY-YYYY || YYYY-YYYY
  const date = new Date(Date.now())
  const month = date.getMonth() + 1
  const removeThisYearDigits = format.split('-')[0] === 'YY' ? -2 : 0
  const removeLastYearDigits = format.split('-')[1] === 'YY' ? -2 : 0

  if (month < 8) {
    date.setFullYear(date.getFullYear() - 1)
  }

  return `${date.getFullYear().toString().substr(removeThisYearDigits)}-${(date.getFullYear() + 1).toString().substr(removeLastYearDigits)}`
}
