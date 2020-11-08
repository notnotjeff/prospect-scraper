/* eslint-disable no-restricted-syntax */
// Use 'node scraper/games_scraper.js' to run script

const rp = require('request-promise')
const cheerio = require('cheerio')
const dotenv = require('dotenv')
const admin = require('firebase-admin')
const backend = require('./prospects.js')
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

      if (prospect.league === 'OHL' || prospect.league === 'WHL') {
        const gameIndex = scrapedProspect.SiteKit.Player.games.length - 1

        // Skip If No Games
        if (gameIndex === -1) {
          continue
        }

        if (scrapedProspect.SiteKit.Player.games[gameIndex].date_played === `${year}-${month}-${day}`) {
          const goals = +scrapedProspect.SiteKit.Player.games[gameIndex].goals
          const assists = +scrapedProspect.SiteKit.Player.games[gameIndex].assists
          const points = +scrapedProspect.SiteKit.Player.games[gameIndex].points
          const shots = +scrapedProspect.SiteKit.Player.games[gameIndex].shots
          const penaltyMinutes = +scrapedProspect.SiteKit.Player.games[gameIndex].penalty_minutes

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

        if (scrapedProspect.SiteKit.Player.games[gameIndex].date_played === `${yYear}-${yMonth}-${yDay}`) {
          const goals = +scrapedProspect.SiteKit.Player.games[gameIndex].goals
          const assists = +scrapedProspect.SiteKit.Player.games[gameIndex].assists
          const points = +scrapedProspect.SiteKit.Player.games[gameIndex].points
          const shots = +scrapedProspect.SiteKit.Player.games[gameIndex].shots
          const penaltyMinutes = +scrapedProspect.SiteKit.Player.games[gameIndex].penalty_minutes

          yesterdaysGames.push({
            fullName: `${prospect.first_name} ${prospect.last_name}`,
            league: prospect.league,
            goals,
            assists,
            points,
            shots,
            penaltyMinutes,
            gameDate: `${yYear}-${yMonth}-${yDay}`,
          })
        }

        if (gameIndex - 1 === -1) {
          continue
        }

        if (scrapedProspect.SiteKit.Player.games[gameIndex - 1].date_played === `${yYear}-${yMonth}-${yDay}`) {
          const goals = +scrapedProspect.SiteKit.Player.games[gameIndex - 1].goals
          const assists = +scrapedProspect.SiteKit.Player.games[gameIndex - 1].assists
          const points = +scrapedProspect.SiteKit.Player.games[gameIndex - 1].points
          const shots = +scrapedProspect.SiteKit.Player.games[gameIndex - 1].shots
          const penaltyMinutes = +scrapedProspect.SiteKit.Player.games[gameIndex - 1].penalty_minutes

          yesterdaysGames.push({
            fullName: `${prospect.first_name} ${prospect.last_name}`,
            league: prospect.league,
            goals,
            assists,
            points,
            shots,
            penaltyMinutes,
            gameDate: `${yYear}-${yMonth}-${yDay}`,
          })
        }
      } else if (prospect.league === 'QMJHL') {
        const parsedData = JSON.parse(scrapedProspect.substr(5, scrapedProspect.length - 6))

        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)
        const todaysGamesQMJHLMonth = parsedData.SiteKit.Gamebygame.games[dateHelpers.getMonthName(today.getMonth(), true)] || []
        const yesterdaysGamesQMJHLMonth = parsedData.SiteKit.Gamebygame.games[dateHelpers.getMonthName(yesterday.getMonth(), true)] || []
        const todaysGamesQMJHL = todaysGamesQMJHLMonth.filter(({ date_played }) => date_played === `${year}-${month}-${day}`)
        const yesterdaysGamesQMJHL = yesterdaysGamesQMJHLMonth.filter(({ date_played }) => date_played === `${yYear}-${yMonth}-${yDay}`)

        if (todaysGamesQMJHL.length > 0) {
          const goals = todaysGamesQMJHL[0].goals === '-' ? 0 : +todaysGamesQMJHL[0].goals
          const assists = todaysGamesQMJHL[0].assists === '-' ? 0 : +todaysGamesQMJHL[0].assists
          const points = todaysGamesQMJHL[0].points === '-' ? 0 : +todaysGamesQMJHL[0].points
          const shots = todaysGamesQMJHL[0].shots === '-' ? 0 : +todaysGamesQMJHL[0].shots
          const penaltyMinutes = todaysGamesQMJHL[0].penalty_minutes === '-' ? 0 : +todaysGamesQMJHL[0].penalty_minutes

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

        if (yesterdaysGamesQMJHL.length > 0) {
          const goals = yesterdaysGamesQMJHL[0].goals === '-' ? 0 : +yesterdaysGamesQMJHL[0].goals
          const assists = yesterdaysGamesQMJHL[0].assists === '-' ? 0 : +yesterdaysGamesQMJHL[0].assists
          const points = yesterdaysGamesQMJHL[0].points === '-' ? 0 : +yesterdaysGamesQMJHL[0].points
          const shots = yesterdaysGamesQMJHL[0].shots === '-' ? 0 : +yesterdaysGamesQMJHL[0].shots
          const penaltyMinutes = yesterdaysGamesQMJHL[0].penalty_minutes === '-' ? 0 : +yesterdaysGamesQMJHL[0].penalty_minutes

          yesterdaysGames.push({
            fullName: `${prospect.first_name} ${prospect.last_name}`,
            league: prospect.league,
            goals,
            assists,
            points,
            shots,
            penaltyMinutes,
            gameDate: `${yYear}-${yMonth}-${yDay}`,
          })
        }
      } else if (prospect.league === 'USHL') {
        const parsedData = JSON.parse(scrapedProspect.substr(5, scrapedProspect.length - 6))
        const parsedGames = parsedData.gameByGame[0].sections[0].data

        const todaysGameUSHL = parsedGames.filter(({ row: { date_played } }) => date_played === `${year}-${month}-${day}`)
        const yesterdaysGameUSHL = parsedGames.filter(({ row: { date_played } }) => date_played === `${yYear}-${yMonth}-${yDay}`)

        if (todaysGameUSHL.length > 0) {
          const goals = todaysGameUSHL[0].row.goals === '-' ? 0 : +todaysGameUSHL[0].row.goals
          const assists = todaysGameUSHL[0].row.assists === '-' ? 0 : +todaysGameUSHL[0].row.assists
          const points = todaysGameUSHL[0].row.points === '-' ? 0 : +todaysGameUSHL[0].row.points
          const shots = todaysGameUSHL[0].row.shots === '-' ? 0 : +todaysGameUSHL[0].row.shots
          const penaltyMinutes = todaysGameUSHL[0].row.penalty_minutes === '-' ? 0 : +todaysGameUSHL[0].row.penalty_minutes

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

        if (yesterdaysGameUSHL.length > 0) {
          const goals = yesterdaysGameUSHL[0].row.goals === '-' ? 0 : +yesterdaysGameUSHL[0].row.goals
          const assists = yesterdaysGameUSHL[0].row.assists === '-' ? 0 : +yesterdaysGameUSHL[0].row.assists
          const points = yesterdaysGameUSHL[0].row.points === '-' ? 0 : +yesterdaysGameUSHL[0].row.points
          const shots = yesterdaysGameUSHL[0].row.shots === '-' ? 0 : +yesterdaysGameUSHL[0].row.shots
          const penaltyMinutes = yesterdaysGameUSHL[0].row.penalty_minutes === '-' ? 0 : +yesterdaysGameUSHL[0].row.penalty_minutes

          yesterdaysGames.push({
            fullName: `${prospect.first_name} ${prospect.last_name}`,
            league: prospect.league,
            goals,
            assists,
            points,
            shots,
            penaltyMinutes,
            gameDate: `${yYear}-${yMonth}-${yDay}`,
          })
        }
      } else if (prospect.league === 'AHL') {
        let data = scrapedProspect.slice(5, scrapedProspect.length - 1)
        data = JSON.parse(data)

        const games = data.gameByGame[0].sections[0].data
        const gameIndex = games.length - 1

        // Skip If No Games
        if (gameIndex === -1) {
          continue
        }

        if (games[gameIndex].row.date_played === `${year}-${month}-${day}`) {
          const goals = +games[gameIndex].row.goals
          const assists = +games[gameIndex].row.assists
          const points = +games[gameIndex].row.points
          const shots = +games[gameIndex].row.shots
          const penaltyMinutes = +games[gameIndex].row.penalty_minutes

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

        if (games[gameIndex].row.date_played === `${yYear}-${yMonth}-${yDay}`) {
          const goals = +games[gameIndex].row.goals
          const assists = +games[gameIndex].row.assists
          const points = +games[gameIndex].row.points
          const shots = +games[gameIndex].row.shots
          const penaltyMinutes = +games[gameIndex].row.penalty_minutes

          yesterdaysGames.push({
            fullName: `${prospect.first_name} ${prospect.last_name}`,
            league: prospect.league,
            goals,
            assists,
            points,
            shots,
            penaltyMinutes,
            gameDate: `${yYear}-${yMonth}-${yDay}`,
          })
        }

        if (gameIndex - 1 === -1) {
          continue
        }

        if (games[gameIndex - 1].row.date_played === `${yYear}-${yMonth}-${yDay}`) {
          const goals = +games[gameIndex - 1].row.goals
          const assists = +games[gameIndex - 1].row.assists
          const points = +games[gameIndex - 1].row.points
          const shots = +games[gameIndex - 1].row.shots
          const penaltyMinutes = +games[gameIndex - 1].row.penalty_minutes

          yesterdaysGames.push({
            fullName: `${prospect.first_name} ${prospect.last_name}`,
            league: prospect.league,
            goals,
            assists,
            points,
            shots,
            penaltyMinutes,
            gameDate: `${yYear}-${yMonth}-${yDay}`,
          })
        }
      } else if (prospect.league === 'KHL') {
        const date = dateHelpers.getDateFromArray(
          scrapedProspect('#pl_Games > tbody > tr:nth-last-child(1) > td:nth-child(4)').text().split(' '),
          2,
          1,
          0,
        )
        const secondLastDate = dateHelpers.getDateFromArray(
          scrapedProspect('#pl_Games > tbody > tr:nth-last-child(2) > td:nth-child(4)').text().split(' '),
          2,
          1,
          0,
        )

        if (`${year}-${month}-${day}` === date) {
          const goals = +scrapedProspect('#pl_Games > tbody > tr:nth-last-child(1) > td:nth-child(8)').text()
          const assists = +scrapedProspect('#pl_Games > tbody > tr:nth-last-child(1) > td:nth-child(9)').text()
          const points = +scrapedProspect('#pl_Games > tbody > tr:nth-last-child(1) > td:nth-child(10)').text()
          const shots = +scrapedProspect('#pl_Games > tbody > tr:nth-last-child(1) > td:nth-child(21)').text()
          const penaltyMinutes = +scrapedProspect('#pl_Games > tbody > tr:nth-last-child(1) > td:nth-child(14)').text()

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
          const goals = +scrapedProspect('#pl_Games > tbody > tr:nth-last-child(1) > td:nth-child(8)').text()
          const assists = +scrapedProspect('#pl_Games > tbody > tr:nth-last-child(1) > td:nth-child(9)').text()
          const points = +scrapedProspect('#pl_Games > tbody > tr:nth-last-child(1) > td:nth-child(10)').text()
          const shots = +scrapedProspect('#pl_Games > tbody > tr:nth-last-child(1) > td:nth-child(21)').text()
          const penaltyMinutes = +scrapedProspect('#pl_Games > tbody > tr:nth-last-child(1) > td:nth-child(14)').text()

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
          const goals = +scrapedProspect('#pl_Games > tbody > tr:nth-last-child(2) > td:nth-child(8)').text()
          const assists = +scrapedProspect('#pl_Games > tbody > tr:nth-last-child(2) > td:nth-child(9)').text()
          const points = +scrapedProspect('#pl_Games > tbody > tr:nth-last-child(2) > td:nth-child(10)').text()
          const shots = +scrapedProspect('#pl_Games > tbody > tr:nth-last-child(2) > td:nth-child(21)').text()
          const penaltyMinutes = +scrapedProspect('#pl_Games > tbody > tr:nth-last-child(2) > td:nth-child(14)').text()

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
      } else if (prospect.league === 'Liiga') {
        // Skip To Next Prospect If No Games Have Been Played
        if (!scrapedProspect('#stats-section > table > tbody > tr:nth-child(1) > td:nth-child(1)').text().split('.').length === 3) {
          continue
        }

        // Get Date of Last Played Game
        const date = dateHelpers.getDateFromArray(
          scrapedProspect('#stats-section > table > tbody > tr:nth-last-child(3) > td:nth-child(1)').text().split('.'),
          2,
          1,
          0,
        )
        // If Prior Row Is a Monthly Total, Skip It, Then Use Row Number To Get Date of Second Last Played Game
        const row = scrapedProspect('#stats-section > table > tbody > tr:nth-last-child(4) > td:nth-child(1)').text().includes('yht.') ? 5 : 4
        const secondDate = dateHelpers.getDateFromArray(
          scrapedProspect(`#stats-section > table > tbody > tr:nth-last-child(${row}) > td:nth-child(1)`).text().split('.'),
          2,
          1,
          0,
        )

        if (`${year}-${month}-${day}` === date) {
          const goals = +scrapedProspect('#stats-section > table > tbody > tr:nth-last-child(3) > td:nth-child(3)').text()
          const assists = +scrapedProspect('#stats-section > table > tbody > tr:nth-last-child(3) > td:nth-child(4)').text()
          const points = +scrapedProspect('#stats-section > table > tbody > tr:nth-last-child(3) > td:nth-child(5)').text()
          const shots = +scrapedProspect('#stats-section > table > tbody > tr:nth-last-child(3) > td:nth-child(13)').text()
          const penaltyMinutes = +scrapedProspect('#stats-section > table > tbody > tr:nth-last-child(3) > td:nth-child(6)').text()

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
          const goals = +scrapedProspect('#stats-section > table > tbody > tr:nth-last-child(3) > td:nth-child(3)').text()
          const assists = +scrapedProspect('#stats-section > table > tbody > tr:nth-last-child(3) > td:nth-child(4)').text()
          const points = +scrapedProspect('#stats-section > table > tbody > tr:nth-last-child(3) > td:nth-child(5)').text()
          const shots = +scrapedProspect('#stats-section > table > tbody > tr:nth-last-child(3) > td:nth-child(13)').text()
          const penaltyMinutes = +scrapedProspect('#stats-section > table > tbody > tr:nth-last-child(3) > td:nth-child(6)').text()

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

        if (`${yYear}-${yMonth}-${yDay}` === secondDate) {
          const goals = +scrapedProspect(`#stats-section > table > tbody > tr:nth-last-child(${row}) > td:nth-child(3)`).text()
          const assists = +scrapedProspect(`#stats-section > table > tbody > tr:nth-last-child(${row}) > td:nth-child(4)`).text()
          const points = +scrapedProspect(`#stats-section > table > tbody > tr:nth-last-child(${row}) > td:nth-child(5)`).text()
          const shots = +scrapedProspect(`#stats-section > table > tbody > tr:nth-last-child(${row}) > td:nth-child(13)`).text()
          const penaltyMinutes = +scrapedProspect(`#stats-section > table > tbody > tr:nth-last-child(${row}) > td:nth-child(6)`).text()

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
      } else if (prospect.league === 'SHL') {
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
