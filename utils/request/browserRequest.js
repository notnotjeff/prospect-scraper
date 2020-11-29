const puppeteer = require('puppeteer')

module.exports = async function (url, callback) {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  try {
    await page.goto(url)
    await callback(page)
    await page.close()
    await browser.close()
    return true
  } catch (error) {
    console.error('Unable to open page or execute callback')
    console.error(error)
    await page.close()
    await browser.close()
    return false
  }
}
