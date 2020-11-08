const rp = require('request-promise')

module.exports = function (url) {
  return rp({
    url: url,
    json: true,
  })
}
