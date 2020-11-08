const rp = require('request-promise')
const cheerio = require('cheerio')

module.exports = function (url) {
  return rp({
    url: url,
    transform: body => cheerio.load(body),
  })
}
