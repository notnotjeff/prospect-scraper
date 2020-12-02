const puppeteer = require('puppeteer')

module.exports = async function (url, callback) {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36')
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
