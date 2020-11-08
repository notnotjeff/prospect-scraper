const rp = require('request-promise')
const cheerio = require('cheerio')

module.exports = function jsonRequest(url) {
  return rp({
    url: url,
    transform: body => cheerio.load(body),
  })
}
