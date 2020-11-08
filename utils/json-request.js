const rp = require('request-promise')

module.exports = function jsonRequest(url) {
  return rp({
    url: url,
    json: true,
  })
}
