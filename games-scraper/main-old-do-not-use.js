/* eslint-disable no-restricted-syntax */
// Use 'node scraper/games_scraper.js' to run script

const rp = require('request-promise')
const cheerio = require('cheerio')
const dotenv = require('dotenv')
const admin = require('firebase-admin')
const backend = require('./prospects.js.js')
const dateHelpers = require('../utils/date-helpers/date_helpers.js')

dotenv.config()
const TESTING_MODE = false

admin.initializeApp({
  credential: admin.credential.cert({
    private_key: process.env.FIREBASE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_EMAIL,
    project_id: 'leafs-prospects',
  }),
  databaseURL: 'https://leafs-prospects.firebaseio.com',
})

// Get And Set Backend Prospect Array
const { prospects } = backend

// Select a specific player, must also turn on TESTING_MODE
const testingProspect = 'Koster'

// eslint-disable-next-line no-shadow
async function scrape_games(prospects) {
  const todaysGames = []
  const yesterdaysGames = []
  const filteredProspects = TESTING_MODE ? prospects.filter(player => player.last_name === testingProspect) : prospects

  const { day, month, year, yDay, yMonth, yYear } = dateHelpers.setDateValues()

  for (const prospect of filteredProspects) {
    let urlData = {}
    if (
      prospect.league === 'OHL' ||
      prospect.league === 'AHL' ||
      prospect.league === 'WHL' ||
      prospect.league === 'USHL' ||
      prospect.league === 'QMJHL'
    ) {
      urlData = {
        url: prospect.games_url,
        json: true,
      }
    } else if (prospect.league === 'ECHL' || prospect.league === 'NLA') {
      continue
    } else {
      urlData = {
        url: prospect.games_url,
        transform: body => cheerio.load(body),
      }
    }

    if (urlData.url !== undefined) {
      let scrapedProspect = null
      try {
        scrapedProspect = await rp(urlData)
      } catch (error) {
        continue
      }

      if (prospect.league === 'SHL') {
        const date = scrapedProspect('.rmss_t-stat-table__row').first().children('td:nth-child(1)').text()
        const yesterdayDate = scrapedProspect('.rmss_t-stat-table__row').first().next().children('td:nth-child(1)').text()

        if (`${year}-${month}-${day}` === date) {
          const goals = +scrapedProspect('.rmss_t-stat-table__row').first().children('td:nth-child(5)').text()
          const assists = +scrapedProspect('.rmss_t-stat-table__row').first().children('td:nth-child(6)').text()
          const points = +scrapedProspect('.rmss_t-stat-table__row').first().children('td:nth-child(7)').text()
          const penaltyMinutes = +scrapedProspect('.rmss_t-stat-table__row').first().children('td:nth-child(9)').text()
          const shots = +scrapedProspect('.rmss_t-stat-table__row').first().children('td:nth-child(13)').text()

          todaysGames.push({
            fullName: `${prospect.first_name} ${prospect.last_name}`,
            league: prospect.league,
            goals,
            assists,
            points,
            shots,
            penaltyMinutes,
            gameDate: `${year}-${month}-${day}`,
          })
        }

        if (`${yYear}-${yMonth}-${yDay}` === date) {
          const goals = +scrapedProspect('.rmss_t-stat-table__row').first().children('td:nth-child(5)').text()
          const assists = +scrapedProspect('.rmss_t-stat-table__row').first().children('td:nth-child(6)').text()
          const points = +scrapedProspect('.rmss_t-stat-table__row').first().children('td:nth-child(7)').text()
          const penaltyMinutes = +scrapedProspect('.rmss_t-stat-table__row').first().children('td:nth-child(9)').text()
          const shots = +scrapedProspect('.rmss_t-stat-table__row').first().children('td:nth-child(13)').text()

          yesterdaysGames.push({
            fullName: `${prospect.first_name} ${prospect.last_name}`,
            league: prospect.league,
            goals,
            assists,
            points,
            shots,
            penaltyMinutes,
            gameDate: `${year}-${month}-${day}`,
          })
        }

        if (`${yYear}-${yMonth}-${yDay}` === yesterdayDate) {
          const goals = +scrapedProspect('.rmss_t-stat-table__row').first().next().children('td:nth-child(5)').text()
          const assists = +scrapedProspect('.rmss_t-stat-table__row').first().next().children('td:nth-child(6)').text()
          const points = +scrapedProspect('.rmss_t-stat-table__row').first().next().children('td:nth-child(7)').text()
          const penaltyMinutes = +scrapedProspect('.rmss_t-stat-table__row').first().next().children('td:nth-child(9)').text()
          const shots = +scrapedProspect('.rmss_t-stat-table__row').first().next().children('td:nth-child(13)').text()

          yesterdaysGames.push({
            fullName: `${prospect.first_name} ${prospect.last_name}`,
            league: prospect.league,
            goals,
            assists,
            points,
            shots,
            penaltyMinutes,
            gameDate: `${year}-${month}-${day}`,
          })
        }
      } else if (prospect.league === 'VHL') {
        const date = dateHelpers.getDateFromArray(
          scrapedProspect('#laConteiner > table > tbody > tr:nth-last-child(1) > td:nth-child(1)').text().split('.'),
          2,
          1,
          0,
        )
        const secondLastDate = dateHelpers.getDateFromArray(
          scrapedProspect('#laConteiner > table > tbody > tr:nth-last-child(2) > td:nth-child(1)').text().split('.'),
          2,
          1,
          0,
        )

        if (`${year}-${month}-${day}` === date) {
          const goals = +scrapedProspect('#laConteiner > table > tbody > tr:nth-last-child(1) > td:nth-child(6)').text()
          const assists = +scrapedProspect('#laConteiner > table > tbody > tr:nth-last-child(1) > td:nth-child(7)').text()
          const points = +scrapedProspect('#laConteiner > table > tbody > tr:nth-last-child(1) > td:nth-child(8)').text()
          const shots = +scrapedProspect('#laConteiner > table > tbody > tr:nth-last-child(1) > td:nth-child(17)').text()
          const penaltyMinutes = +scrapedProspect('#laConteiner > table > tbody > tr:nth-last-child(1) > td:nth-child(10)').text()

          todaysGames.push({
            fullName: `${prospect.first_name} ${prospect.last_name}`,
            league: prospect.league,
            goals,
            assists,
            points,
            shots,
            penaltyMinutes,
            gameDate: `${year}-${month}-${day}`,
          })
        }

        if (`${yYear}-${yMonth}-${yDay}` === date) {
          const goals = +scrapedProspect('#laConteiner > table > tbody > tr:nth-last-child(1) > td:nth-child(6)').text()
          const assists = +scrapedProspect('#laConteiner > table > tbody > tr:nth-last-child(1) > td:nth-child(7)').text()
          const points = +scrapedProspect('#laConteiner > table > tbody > tr:nth-last-child(1) > td:nth-child(8)').text()
          const shots = +scrapedProspect('#laConteiner > table > tbody > tr:nth-last-child(1) > td:nth-child(17)').text()
          const penaltyMinutes = +scrapedProspect('#laConteiner > table > tbody > tr:nth-last-child(1) > td:nth-child(10)').text()

          yesterdaysGames.push({
            fullName: `${prospect.first_name} ${prospect.last_name}`,
            league: prospect.league,
            goals,
            assists,
            points,
            shots,
            penaltyMinutes,
            gameDate: `${year}-${month}-${day}`,
          })
        }

        if (`${yYear}-${yMonth}-${yDay}` === secondLastDate) {
          const goals = +scrapedProspect('#laConteiner > table > tbody > tr:nth-last-child(2) > td:nth-child(6)').text()
          const assists = +scrapedProspect('#laConteiner > table > tbody > tr:nth-last-child(2) > td:nth-child(7)').text()
          const points = +scrapedProspect('#laConteiner > table > tbody > tr:nth-last-child(2) > td:nth-child(8)').text()
          const shots = +scrapedProspect('#laConteiner > table > tbody > tr:nth-last-child(2) > td:nth-child(17)').text()
          const penaltyMinutes = +scrapedProspect('#laConteiner > table > tbody > tr:nth-last-child(2) > td:nth-child(10)').text()

          yesterdaysGames.push({
            fullName: `${prospect.first_name} ${prospect.last_name}`,
            league: prospect.league,
            goals,
            assists,
            points,
            shots,
            penaltyMinutes,
            gameDate: `${year}-${month}-${day}`,
          })
        }
      } else if (prospect.league === 'NCAA') {
        const date = dateHelpers.getDateFromArray(
          scrapedProspect(
            'body > div.page.text-center > main > section > div > div > div > div.playerstatsfull > table:nth-child(3) > tbody > tr:nth-last-child(2) > td:nth-child(1)',
          )
            .text()
            .split('/'),
          2,
          0,
          1,
        )
        const yesterdayDate = dateHelpers.getDateFromArray(
          scrapedProspect(
            'body > div.page.text-center > main > section > div > div > div > div.playerstatsfull > table:nth-child(3) > tbody > tr:nth-last-child(3) > td:nth-child(1)',
          )
            .text()
            .split('/'),
          2,
          1,
          0,
        )

        const statGroup = scrapedProspect(
          'body > div.page.text-center > main > section > div > div > div > div.playerstatsfull > table:nth-child(3) > tbody > tr:nth-last-child(2) > td:nth-child(4)',
        )
          .text()
          .split('-')
        if (statGroup.length > 3) {
          continue
        }

        if (`${year}-${month}-${day}` === date) {
          const goals = +statGroup[0]
          const assists = +statGroup[1]
          const points = +statGroup[2]
          const shots = +scrapedProspect(
            'body > div.page.text-center > main > section > div > div > div > div.playerstatsfull > table:nth-child(3) > tbody > tr:nth-last-child(2) > td:nth-child(12)',
          ).text()
          const penaltyMinutes = +scrapedProspect(
            'body > div.page.text-center > main > section > div > div > div > div.playerstatsfull > table:nth-child(3) > tbody > tr:nth-last-child(2) > td:nth-child(11)',
          )
            .text()
            .split('/')[1]

          todaysGames.push({
            fullName: `${prospect.first_name} ${prospect.last_name}`,
            league: prospect.league,
            goals,
            assists,
            points,
            shots,
            penaltyMinutes,
            gameDate: `${year}-${month}-${day}`,
          })
        }

        if (`${yYear}-${yMonth}-${yDay}` === date) {
          const goals = +statGroup[0]
          const assists = +statGroup[1]
          const points = +statGroup[2]
          const shots = +scrapedProspect(
            'body > div.page.text-center > main > section > div > div > div > div.playerstatsfull > table:nth-child(3) > tbody > tr:nth-last-child(2) > td:nth-child(12)',
          ).text()
          const penaltyMinutes = +scrapedProspect(
            'body > div.page.text-center > main > section > div > div > div > div.playerstatsfull > table:nth-child(3) > tbody > tr:nth-last-child(2) > td:nth-child(11)',
          )
            .text()
            .split('/')[1]

          yesterdaysGames.push({
            fullName: `${prospect.first_name} ${prospect.last_name}`,
            league: prospect.league,
            goals,
            assists,
            points,
            shots,
            penaltyMinutes,
            gameDate: `${year}-${month}-${day}`,
          })
        }

        if (`${yYear}-${yMonth}-${yDay}` === yesterdayDate) {
          const goals = +statGroup[0]
          const assists = +statGroup[1]
          const points = +statGroup[2]
          const shots = +scrapedProspect(
            'body > div.page.text-center > main > section > div > div > div > div.playerstatsfull > table:nth-child(3) > tbody > tr:nth-last-child(3) > td:nth-child(12)',
          ).text()
          const penaltyMinutes = +scrapedProspect(
            'body > div.page.text-center > main > section > div > div > div > div.playerstatsfull > table:nth-child(3) > tbody > tr:nth-last-child(3) > td:nth-child(11)',
          )
            .text()
            .split('/')[1]

          yesterdaysGames.push({
            fullName: `${prospect.first_name} ${prospect.last_name}`,
            league: prospect.league,
            goals,
            assists,
            points,
            shots,
            penaltyMinutes,
            gameDate: `${year}-${month}-${day}`,
          })
        }
      }
    }
  }

  return { todaysGames, yesterdaysGames }
}

async function addGames() {
  // eslint-disable-next-line no-console
  console.log('Start Scrape...')
  const { todaysGames, yesterdaysGames } = await scrape_games(prospects)
  // eslint-disable-next-line no-console
  console.log('Completed Scrape!')

  if (!TESTING_MODE) {
    const time = dateHelpers.getCurrentTime()

    const allTransactionPromises = []
    const todaysRef = admin.database().ref('todaysGames')
    const yesterdaysRef = admin.database().ref('yesterdaysGames')
    const ranAtRef = admin.database().ref('gamesScrapedTime')

    todaysRef.set({})
    yesterdaysRef.set({})
    ranAtRef.set({})

    allTransactionPromises.push(ranAtRef.push({ updatedAt: time }))

    for (const game of todaysGames) {
      const transactionPromise = todaysRef.push(game)
      allTransactionPromises.push(transactionPromise)
    }

    for (const game of yesterdaysGames) {
      const transactionPromise = yesterdaysRef.push(game)
      allTransactionPromises.push(transactionPromise)
    }

    await Promise.all(allTransactionPromises)
    // eslint-disable-next-line no-console
    console.log('Shutting Down DB Ref')
    admin.app().delete()
  } else {
    // Cycle Through Today's Games
    for (const game of todaysGames) {
      // Log Specific Game:
      // if (game.last_name === "Korshkov") { console.log(game) };

      // Log All Games
      // eslint-disable-next-line no-console
      console.log(game)
    }

    // Cycle Through Yesterdays's Games
    for (const game of yesterdaysGames) {
      // Log Specific Game:
      if (game.last_name === 'Korshkov') {
        // eslint-disable-next-line no-console
        console.log(game)
      }

      // Log All Games
      // console.log(game);
    }
  }
}

addGames()
