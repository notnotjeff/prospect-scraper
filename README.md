# prospect-scraper

A set of node scripts that scrape non-NHL hockey leauges for player stats and currently played games.

# Adding a Scraper

When adding a scraper for a new league there are a few steps to follow:

1. Add a file for the scraper in the appropriate folder (if it's for a season scrape it goes in `season-scraper/leagues` and if it's for a game scraper it goes into `game-scraper/leagues`)
2. Import/export the scraper file that was created in step 1 in the `index.js` inside the same `/leagues` folder so the main scraper file can find it
3. Add the scraper to the `LEAGUE_CODES` constant in the `index.js` file of the scraper (if it's for a season scrape it goes in `season-scraper/index.js` and if it's for a game scraper it goes into `game-scraper/index.js`). Use the name of the league that shows up in `prospect_info.js` under a prospect's `league` key (e.g. KHL, AHL, SHL) and the value should be what you named the scraper in step 2 (e.g. khlScraper, ahlScraper, shlScraper)
4. Add appropriate test for the league and make sure the request is stubbed using `jest.spyOn` (see other tests on how to accomplish this)

# Adding a Prospect

For a prospect to have their data scraped it must exist inside `prospect_info.js`. Here there is an array of prospect objects that contain all the information necessary to find their stats and upload to the database in a format to be shown to the end user. In order to add a prospect you'll need to add a new object for the desired prospect and make sure it has all these fields:

```javascript
{
  first_name: 'The players first name [string]',
  last_name: 'The players last name [string]',
  position: 'The players position (LW, RW, C, D) [string]',
  shoots: 'The handedness of the player (L, R) [string]',
  dob: 'The players date of birth (YYYY-MM-DD format) [string]',
  draft_round: 'The round that the player was picked in (set as null if undrafted) [integer]',
  draft_pick: 'The exact pick number the player was taken at in their draft (set as null if undrafted) [integer]',
  draft_year: 'Year the player was drafted (set as null if undrafted) [integer]',
  ep_url: 'The link to the prospects Eliteprospects page which is shown to the user to allow them to have easy access to other seasons beyond the current one being scraped [string]',
}
```

An example of a filled out prospect looks like this:

```javascript
{
  first_name: 'Timothy',
  last_name: 'Liljegren',
  position: 'D',
  shoots: 'R',
  dob: '1999-04-20',
  draft_round: 1,
  draft_pick: 17,
  draft_year: 2017,
  ep_url: 'http://www.eliteprospects.com/player.php?player=224910'
}
```

# Scraping a Prospect

After adding a prospect object to the `prospect_info.js` file (see Adding a Prospect section) you'll need to get the necessary information in order for the scraper to gather the player's season/game data. Depending on the league you'll need to fill out specific fields. Potential fields include:

```javascript
{
  league_id: 'Most leagues require a players unique league_id in order to scrape the prospects [string]',
  team_id: 'Some leagues also need the unique id of the team the player plays for in order to find their stats [string]',
  season_id: 'Some leagues also need the unique id of the season the prospect is playing in [string]',
  league: 'The shorthand version of the current league that the player is playing in so that the scraper knows where to find their stats [string]'
}
```

Every league is a bit different in how to obtain URLs so there will be a section on how to find the appropriate URL for each league. The needed fields at the beginning of each section will tell you which fields need to be filled out for each league in order for it's scraper to function.

1. [AHL](#AHL)
2. [Allsvenskan](#Allsvenskan)
3. [BCHL](#BCHL)
4. [CZE](#CZE)
5. [CZE2](#CZE2)
6. [ECHL](#ECHL)
7. [KHL](#KHL)
8. [Liiga](#Liiga)
9. [Mestis](#Mestis)
10. [MHL](#MHL)
11. [NCAA](#NCAA)
12. [NL](#NL)
13. [OHL](#OHL)
14. [QMJHL](#QMJHL)
15. [SM-Sarja U20](#SM-Sarja)
16. [SHL](#SHL)
17. [USHL](#USHL)
18. [VHL](#VHL)
19. [WHL](#WHL)
20. [WJC](#WJC)

## AHL

Needed fields:
```
league_id: '7314',
league: 'AHL',
```

To get the league_id for the prospect:

1. [Go to the AHL's search page](https://theahl.com/?s=) and enter the prospect's name.
2. Click on the `Players` button to show the players with the name you just searched
3. Click on the player's name to go to their profile.
4. Copy the number in the browser's address bar into the `league_id` field for the prospect. For example, for the following URL `https://theahl.com/stats/player/7314/rasmus-sandin` the id is `7314`

## Allsvenskan

**There is no game scraper for this league**

Needed fields:
```
first_name: 'Jesper',
last_name: 'Lindgren',
team_id: '110b-110bJcIAI'
league: 'Allsv',
```

For the Allsvenskan you'll need the prospect's `first name`, `last_name`, and `team_id` fields filled out:

1. Go to the [Allsvenskan player statistics page](https://www.hockeyallsvenskan.se/statistik/spelare) and select the team that the prospect plays on (make sure to select the right year and)
2. From the URL in the browser's address bar into the prospect's `team_id` by getting the characters after the `&team=` portion. For example the URL `https://www.hockeyallsvenskan.se/statistik/spelare?season=2020&gameType=regular&position=All&team=110b-110bJcIAI` the `team_id` would be `110b-110bJcIAI`.
3. On the team page for the prospect make sure the `first_name` and `last_name` fields have the same spelling and characters as the page indicates or else the scraper won't find the player.

## BCHL

Needed fields:
```
league_id: '7314',
league: 'BCHL',
```

To get the league_id for the prospect:

1. [Go to the BCHL's search page](https://bchl.ca/?s=) and enter the prospect's name.
2. Click on the `Players` button to show the players with the name you just searched
3. Click on the player's name to go to their profile.
4. Copy the number in the browser's address bar into the `league_id` field for the prospect. For example, for the following URL `https://bchl.ca/stats/player/6748/ryan-tverberg` the id is `6748`

## CZE

Needed fields:
```
league_id: '23461',
league: 'CZE',
```

To get the league_id for the prospect:

1. [Go to the CZE's search page](https://www.hokej.cz/vyhledavani) and enter the prospect's name.
2. Click on the appropriate link for the player's profile
3. Copy the number in the browser's address bar into the `league_id` field for the prospect. For example, for the following URL `https://www.hokej.cz/hrac/23461` the id is `23461`

## CZE2

Needed fields:
```
league_id: '23461',
league: 'CZE2',
```

To get the league_id for the prospect:

1. [Go to the CZE's search page](https://www.hokej.cz/vyhledavani) and enter the prospect's name.
2. Click on the appropriate link for the player's profile
3. Copy the number in the browser's address bar into the `league_id` field for the prospect. For example, for the following URL `https://www.hokej.cz/hrac/23461` the id is `23461`

## ECHL

**The games scraper for this league can only do day of games**

Needed fields:
```
season_id: '5f4e319b38c0fcf74b12136f',
team_id: '5c5c2fc55ce4ceb584def768',
league_id: '11939bb3d311e552551149a7',
league: 'ECHL',
```

To get the `league_id` for the prospect:

1. [Go to the ECHL's Team Directory page](https://www.echl.com/en/pages/team-directory) and click on the appropriate link for the team the prospect plays for.
2. Click on the `Roster` link
3. Click on the desired player's table row to bring up the profile
4. Open the browser developer tools to the Network Tab
5. Look for the JSON response for the player (query params look like `s3?q=player-<id>`)
6. Copy the number from the JSON request into the player's `league_id` field. For example the request `https://www.echl.com/api/s3?q=player-69906a5633645b14f186782b.json` would yield a `league_id` of `69906a5633645b14f186782b`

To get the `season_id` and `team_id`:

1. [Go to the ECHL's Team Directory page](https://www.echl.com/en/pages/team-directory) and click on the appropriate link for the team the prospect plays for.
2. Click on the schedule page.
3. Using the Network inspector look for the json request `s3?q=schedule`.
4. Using the URL of that request grab the two id values, the first is the `season_id` and the second is the `team_id`. For example, using the URL `https://www.echl.com/api/s3?q=schedule-5f4e319b38c0fcf74b12136f-31ffb756ae0a30e567dcf226.json` the `season_id` is `5f4e319b38c0fcf74b12136f` and the `team_id` is `31ffb756ae0a30e567dcf226`

## KHL

Needed fields:
```
league_id: '30159',
league: 'KHL',
```

1. [Go to the KHL's player page](https://en.khl.ru/players/) and use the search bar on the left side to look up the prospect.
2. Click on the player you searched to go to their profile page.
3. Copy the number from the URL in the browser's address bar into the prospect's `league_id`. For example, with this URL `https://en.khl.ru/players/30159/` the prospect id is `30159`

## Liiga

Needed fields:
```
league_id: '31555838',
league: 'Liiga',
```

1. [Go to the Liiga player page](https://liiga.fi/fi/pelaajat/) and search for the prospect (by team or by name).
2. Click on the prospect's name in the table to go to their profile page.
3. Copy the number from the URL in the browser's address bar and paste it into the prospect's `league_id`. For example, in the URL `https://liiga.fi/fi/pelaajat/31555838/niemela-topi/` the prospect's id would be `31555838`

## Mestis

Needed fields:
```
league_id: '29969148',
league: 'Mestis',
```

1. [Go to the Mestis player page](https://mestis.fi/en/pelaajat/) and search for the prospect (by team or by name).
2. Click on the prospect's name in the table to go to their profile page.
3. Copy the number from the URL in the browser's address bar and paste it into the prospect's `league_id`. For example, in the URL `https://mestis.fi/en/pelaajat/29969148/aalto-santeri` the prospect's id would be `29969148`

## MHL

Needed fields:
```
league_id: '31214',
league: 'MHL',
```

This league only needs the prospect's `league_id` field to function. To get the id:

1. Go to [the league's player page](https://engmhl.khl.ru/players/) and search for the prospect in the search bar on the left side
2. Click the player's name in order to head to the profile page
3. In the browser's address bar, copy the number and paste it into the player's `league_id` field. For example, Dmitry Ovchinnikov's profile URL is `https://engmhl.khl.ru/players/31214/`, therefore his `league_id` is `31214`

## NCAA

Needed fields:
```
league_id: '57164',
league: 'NCAA',
```

This league only needs the prospect's `league_id` field to function. To get the id:

1. Go to [the league's team page](http://collegehockeyinc.com/teams-and-conferences.php) and locate the name of the team the player plays for
2. Click the team's name in order to head to the profile page for the team
3. Click on the `Roster` button to load the team's roster
4. Locate the player's name on the roster and click on it
5. In the browser's address bar, copy the number after the `/career/` and paste it into the player's `league_id` field. For example, Ryan Tverberg's profile URL is `http://collegehockeyinc.com/players/career/57164/`, therefore his `league_id` is `57164`

## NL

**There is no games scraper for this league**

Needed fields:
```
first_name: 'Denis',
last_name: 'Malgin',
season_id: '3092',
team_id: '101151',
league: 'NL',
```

1. [Go to the NL's player statistics page](https://www.sihf.ch/de/game-center/national-league#/players/points/desc/page/0/).
2. Filter by the team the desired prospect plays for.
3. From the URL you'll need the `season_id` and `team_id` which you can get with second and third numbers after the `&filterQuery=` portion of the URL. For example: `https://www.sihf.ch/de/game-center/national-league#/players/points/desc/page/0/2021/3478/101151` would have a `season_id` of `3478` and a `team_id` of `101151`.
4. Also make sure to use the same spelling that is used in the table of players (including accents!)

## OHL

Needed fields:
```
league_id: '7662',
league: 'OHL',
```

1. [Go to the OHL's search people page](https://ontariohockeyleague.com/searchpeople) and enter the prospect name.
2. Click on the prospect you are looking for which goes to their profile page.
3. Copy the number from the URL in the browser's address bar into the prospect's `league_id` field. For example, with the URL `https://ontariohockeyleague.com/players/7662` the player's id would be `7662`

## QMJHL

Needed fields:
```
league_id: '17871',
league: 'QMJHL',
```

1. [Go to the QMJHL's search people page](https://theqmjhl.ca/searchpeople) and enter the prospect name.
2. Click on the prospect you are looking for which goes to their profile page.
3. Copy the number from the URL in the browser's address bar into the prospect's `league_id` field. For example, with the URL `https://theqmjhl.ca/players/17871` the player's id would be `17871`

## SM-Sarja

Needed fields:
```
league_id: 255011063073080359893401,
league: 'Sarja20',
```

This scraper uses the prospect's `league_id` field to determine the URL so all you need is to find the player's id and it will work. To do that:

1. [Go to this page](http://www.leijonat.fi/index.php/pelaajat) and search for the desired prospect (see the search bar on the right side of the page)
2. In the list of prospects that should now appear after searching, click on the desired prospect to get to their profile page
3. Get the prospect id from the url (see the browser's address bar). For example, Kalle Loponen's profile page URL is `http://www.leijonat.fi/index.php/pelaajat?lkq=255011063073080359893401` and therefore his `league_id` would be: `255011063073080359893401`

## SHL

Needed fields:
```
team_id: '1a71-1a71gTHKh__lulea-hockey',
league_id: 'qRm-1ykhbTRK4__filip-hallander',
league: 'SHL',
```

In order to get the `team_id` and `league_id` you'll need to:

1. [Go to the SHL player statistics page](https://www.shl.se/statistik/spelare) and sort by the team that the prospect is on.
2. Change the `Lag` (team) filter to the team that the prospect plays for
3. Click on the prospect's name in the table to go to their profile
4. Click on the `Statistik` heading beside the profile picture to go to the statistics table
5. From the url in the browser's address bar grab the `team_id` from the text between the first `/` characters after `lag` (has the prospect's team name in it) as well as the `league_id` from the text between the next set of `/` characters (has the prospect's name in it). For example, the URL `https://www.shl.se/lag/1a71-1a71gTHKh__lulea-hockey/qRm-1ykhbTRK4__filip-hallander/statistics` has a `team_id` of `1a71-1a71gTHKh__lulea-hockey` and a `league_id` of `qRm-1ykhbTRK4__filip-hallander`

## USHL

Needed fields:
```
league_id: '7842',
league: 'USHL',
```

In order to get the `league_id` for the prospect you'll need to:

1. [Go to the USHL top scorers page](https://www.ushl.com/view#/player-stats)
2. Filter by the team the player plays for (`All Teams` dropdown then hit submit)
3. Find player in the table, and click on their name to go to their profile page
4. Copy the first number in the URL in the browser's address bar, the first number is the player's id, the second is the season id. For example: `https://www.ushl.com/view#/player/8956/73/cole-burtch` this URL has a player id of `8956`. The `73` is the season id.

## VHL

Needed fields:
```
league_id: '25697',
league: 'VHL',
```

In order to get a VHL prospect to scrape properly you'll need the `league_id` field filled out:

1. [Go to the VHL's player page](http://www.vhlru.ru/en/players/) and search for the prospect.
2. Click on their name in the table to get to their profile page.
3. Using the URL in the browser's address bar grab the `league_id`. The `league_id` are the numbers between the `/` characters after the `players` portion. For example, the URL `http://www.vhlru.ru/en/players/25697/` has a `league_id` of `25697`

## WHL

Needed fields:
```
league_id: '27355',
league: 'WHL',
```

1. [Go to the WHL's search people page](https://whl.ca/searchpeople) and enter the prospect name.
2. Click on the prospect you are looking for which goes to their profile page.
3. Copy the number from the URL in the browser's address bar into the prospect's `league_id` field. For example, with the URL `https://whl.ca/players/27355` the player's id would be `27355`

## WJC

Needed fields:
```
league_id: '3126259',
team_id: 'RUS', // Options: RUS, SVK, SUI, GER, FIN, RUS, USA, SWE, CZE, AUT, CAN (if team name is not listed here check IIHF Games page for which abbreviation is used)
league: 'WJC',
```

1. [Go to the IIHF's WJC page](https://www.iihf.com/en/events/2021/wm20) and go to the games section (this is 2021, you'll need to find the current year).
2. Go to the `Teams` page using the menu
3. Find the team of the prospect you need and click on the logo.
4. Find the prospect in the Players list and inspect the element.
5. Copy the id number from the players `<tr>` for the table. It is listed under the `data-fwk-id` tag. For instance, Mikhail Abramov's id is `3126259`


# Removing a Prospect

To remove a prospect from the system you'll need to:

1. Remove the prospect's object from the array in `prospect_info.js` so it is not scraped again. 
2. Run the command `npm run seasons:reset` to wipe the database and re-scrape the prospect's season statlines.

# Testing

## Creating HTML Fixtures

For the most part you can just copy a browser console query of the body object:

1. Go to page in browser
2. Open developer tools
3. Go to console
4. Enter following command to get the body object: `document.querySelector('body')`
5. Right click on the response and select `Copy Object` (in Firefox, Chrome may be different)
6. Create a fixture file in the appropriate `__fixtures__` folder (within the `__tests__` folder you created for the module tests)
7. Paste the copied body into a module exports string:

```javascript
module.exports = `BODY_CODE_GOES_INSIDE_STRING`
```

# Twitter Bot

To run the Twitter bot you need to:

1. Setup the environment variables. Make sure your `.env` file has all of these filled out:
```javascript
TWITTER_CONSUMER_KEY='<CONSUMER_KEY_HERE>'
TWITTER_CONSUMER_SECRET='<CONSUMER_SECRET_HERE>'
TWITTER_ACCESS_TOKEN_KEY='<ACCESS_TOKEN_HERE>'
TWITTER_ACCESS_TOKEN_SECRET='<ACCESS_TOKEN_SECRET_HERE>'
GAMES_FE_URL='localhost:3000/games' // Page for the puppeteer browser to go to and get the content
```
2. Start the server (if in development) or make sure the project is hosted (in production)
3. Run the following command in console:
```
npm run twitter:games-recap
```

By default you can find the Leafs development Twitter bot at `@leafsprospects2`. Anytime you use the run command in the development environment it will post 