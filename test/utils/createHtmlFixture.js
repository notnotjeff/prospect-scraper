const fsLibrary = require('fs')
const path = require('path')

// The data variable should be the response from the request after it's been parsed by cheerio
// Example usage: testUtils.createHtmlFixture('testing', await utils.request.htmlRequest('https://en.khl.ru/players/30159/'))
module.exports = function (filename, data) {
  const fixturePath = path.resolve(__dirname, `created-fixtures/${filename}.fixture.js`)
  const fixtureFile = `module.exports = \`${data.html()}\``
  fsLibrary.writeFile(fixturePath, fixtureFile, error => {
    if (error) throw new Error('Unable to create fixture file')
  })
  console.log(`Created fixture in ${fixturePath}`)
}
