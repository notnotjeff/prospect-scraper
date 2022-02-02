module.exports = function (dateString) {
  const today = new Date(Date.now())
  const birthDate = new Date(dateString)
  const age = today - birthDate

  return Math.floor((age / 31557600000) * 10) / 10
}
