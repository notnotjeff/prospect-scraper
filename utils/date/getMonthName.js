module.exports = function (month, { isZeroIndexed = false, shortendNames = false }) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const shortenedMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  if (shortendNames) {
    return shortenedMonthNames[+month - (isZeroIndexed ? 0 : 1)]
  } else {
    return monthNames[+month - (isZeroIndexed ? 0 : 1)]
  }
}
