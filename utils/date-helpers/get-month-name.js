module.exports = function getMonthName(month, isZeroIndexed = false) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  return monthNames[+month - (isZeroIndexed ? 0 : 1)]
}
