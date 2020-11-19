# prospect-scraper

A set of node scripts that scrape non-NHL hockey leauges for player stats and currently played games.

# Adding a Scraper

When adding a scraper for a new league there are a few steps to follow:

1. Add a file for the scraper in the appropriate folder (if it's for a season scrape it goes in `season-scraper/leagues` and if it's for a game scraper it goes into `game-scraper/leagues`)
2. Import/export the scraper file that was created in step 1 in the `index.js` inside the same `/leagues` folder so the main scraper file can find it
3. Add the scraper to the `LEAGUE_CODES` constant in the `index.js` file of the scraper (if it's for a season scrape it goes in `season-scraper/index.js` and if it's for a game scraper it goes into `game-scraper/index.js`). Use the name of the league that shows up in `prospect_info.js` under a prospect's `league` key (e.g. KHL, AHL, SHL) and the value should be what you named the scraper in step 2 (e.g. khlScraper, ahlScraper, shlScraper)
4. Add appropriate test for the league and make sure the request is stubbed using `jest.spyOn` (see other tests on how to accomplish this)

## Finnish Leagues

When looking to add a Finnish league check out [this aggregate site](http://www.leijonat.fi/) for links to various league websites.

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
  league_id: 'If a player has a league id put it here, some leagues require one in order to scrape the prospects [string]',
  statline_url: 'The url to the page/json data to scrape a players season statistics [string]',
  game_statline_url: 'The url to the page/json data to scrape a players individual played games [string]',
  league: 'The shorthand version of the current league that the player is playing in (check the LEAGUE_CODES constant to see the available leagues) [string]',
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
  ep_url: 'http://www.eliteprospects.com/player.php?player=224910',
  league_id: '6893',
  statline_url:
    'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=6893&site_id=1&key=50c2cd9b5e18e390&client_code=ahl&league_id=&lang=en&statsType=standard&callback=json',
  game_statline_url:
    'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=6893&site_id=1&key=50c2cd9b5e18e390&client_code=ahl&league_id=&lang=en&statsType=standard&callback=json',
  league: 'AHL',
}
```

The fields `league_id`, `statline_url`, `game_statline_url`, and `league` are important to how the scraper works (both when scraping games or season statlines). The following section (Finding Prospect URLs) will break down how to fill out these fields for different leagues in order for the scraper to work properly.

# Finding Prospect URLs

After adding a prospect object to the `prospect_info.js` file (see Adding a Prospect section) you'll need to get the prospect's `statline_url` (the link to where the scraper can find the player's full season stats) and the `game_statline_url` (the link to where the scraper can find the prospect's played games). These URLs (along with the league field) determine how a prospect's statistics will be scraped

Every league is a bit different in how to obtain URLs so there will be a section on how to find the appropriate URL for each league. The needed fields at the beginning of each section will tell you which fields need to be filled out for each league in order for it's scraper to function. **Any fields that aren't need are marked null**

1. [AHL](#AHL)
2. [Allsvenskan](#Allsvenskan)
3. [KHL](#KHL)
4. [Liiga](#Liiga)
5. [MHL](#MHL)
6. [OHL](#OHL)
7. [QMJHL](#QMJHL)
8. [SM-Sarja U20](#SM-Sarja)
9. [SHL](#SHL)
10. [USHL](#USHL)
11. [VHL](#VHL)
12. [WHL](#WHL)

## AHL

Needed fields:
```
league_id: '7314',
statline_url:
  'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=7314&site_id=1&key=50c2cd9b5e18e390&client_code=ahl&league_id=&lang=en&statsType=standard&callback=json',
game_statline_url: null,
league: 'AHL',
```

To get the league_id for the prospect:

1. [Go to the AHL's search page](https://theahl.com/?s=) and enter the prospect's name.
2. Click on the `Players` button to show the players with the name you just searched
3. Click on the player's name to go to their profile.
4. Copy the number in the browser's address bar into the `league_id` field for the prospect. For example, for the following URL `https://theahl.com/stats/player/7314/rasmus-sandin` the id is `7314`

## Allsvenskan

Needed fields:
```
league_id: null,
statline_url: 'https://www.hockeyallsvenskan.se/statistik/spelare?gameType=regular&position=All&team=110b-110bJcIAI',
game_statline_url: null,
league: 'Allsv',
```

To get the `statline_url` of a prospect playing in the Allsvenskan you'll need to:

1. Go to the [Allsvenskan player statistics page](https://www.hockeyallsvenskan.se/statistik/spelare) and select the team that the prospect plays on (make sure to select the right year and)
2. Copy the URL from the address bar into the prospect's `statline_url` field
3. Remove the `season=<YEAR>&` portion of the URL so that this can remain dynamic if the prospect remains in the league an additional year:
```
https://www.hockeyallsvenskan.se/statistik/spelare?season=2020&gameType=regular&position=All&team=110b-110bJcIAI

# Changes to:

https://www.hockeyallsvenskan.se/statistik/spelare?gameType=regular&position=All&team=110b-110bJcIAI
```
4. Use the prospect's name from this table **exactly** for the prospect's `first_name` and `last_name` fields **including the accents** because the scraper uses the prospect's name to match which statline to use from the table on this page.

At the moment there is no scraper for getting a prospects individual games so you can set the `game_statline_url` to `null`

## KHL

Needed fields:
```
statline_url: null,
game_statline_url: null,
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
statline_url: 'https://liiga.fi/fi/pelaajat/31555838/niemela-topi',
game_statline_url: null,
league: 'Liiga',
```

1. [Go to the Liiga player page](https://liiga.fi/fi/pelaajat/) and search for the prospect (by team or by name).
2. Click on the prospect's name in the table to go to their profile page.
3. Copy the number from the URL in the browser's address bar and paste it into the prospect's `league_id`. For example, in the URL `https://liiga.fi/fi/pelaajat/31555838/niemela-topi/` the prospect's id would be `31555838`

## MHL

Needed fields:
```
statline_url: null,
game_statline_url: null,
league_id: '31214',
league: 'MHL',
```

This league only needs the prospect's `league_id` field to function. To get the id:

1. Go to [the league's player page](https://engmhl.khl.ru/players/) and search for the prospect in the search bar on the left side
2. Click the player's name in order to head to the profile page
3. In the browser's address bar, copy the number and paste it into the player's `league_id` field. For example, Dmitry Ovchinnikov's profile URL is `https://engmhl.khl.ru/players/31214/`, therefore his `league_id` is `31214`

At the moment the game scraper is not built for the MHL

## OHL

Needed fields:
```
statline_url: null,
game_statline_url: null,
league_id: '7662',
league: 'OHL',
```

1. [Go to the OHL's search people page](https://ontariohockeyleague.com/searchpeople) and enter the prospect name.
2. Click on the prospect you are looking for which goes to their profile page.
3. Copy the number from the URL in the browser's address bar into the prospect's `league_id` field. For example, with the URL `https://ontariohockeyleague.com/players/7662` the player's id would be `7662`

## QMJHL

Needed fields:
```
statline_url: null,
game_statline_url: null,
league_id: '17871',
league: 'QMJHL',
```

1. [Go to the QMJHL's search people page](https://theqmjhl.ca/searchpeople) and enter the prospect name.
2. Click on the prospect you are looking for which goes to their profile page.
3. Copy the number from the URL in the browser's address bar into the prospect's `league_id` field. For example, with the URL `https://theqmjhl.ca/players/17871` the player's id would be `17871`

## SM-Sarja

Needed fields:
```
statline_url: null,
game_statline_url: null,
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
league_id: '1a71-1a71gTHKh__lulea-hockey/qRm-1ykhbTRK4__filip-hallander',
statline_url: 'https://www.shl.se/lag/1a71-1a71gTHKh__lulea-hockey/qRm-1ykhbTRK4__filip-hallander/statistics',
game_statline_url: null,
league: 'SHL',
```

In order to get the statline_url you'll need to:

1. [Go to the SHL player statistics page](https://www.shl.se/statistik/spelare) and sort by the team that the prospect is on.
2. Change the `Lag` (team) filter to the team that the prospect plays for
3. Click on the prospect's name in the table to go to their profile
4. Click on the `Statistik` heading beside the profile picture to go to the statistics table
5. Copy the url in the browser's address bar and paste it in the prospect's `statline_url` field. It looks like: `https://www.shl.se/lag/1a71-1a71gTHKh__lulea-hockey/qRm-1ykhbTRK4__filip-hallander/statistics`

For the SHL the game scraper uses the player's id which is a combination of the team name and id along with the player name and id. To get the `league_id` you'll continue from step 5:

6. Copy the text in the URL from the browser's address bar between the `lag/` and the `/statistics`. For example, with this URL `https://www.shl.se/lag/1a71-1a71gTHKh__lulea-hockey/qRm-1ykhbTRK4__filip-hallander/statistics` the player's id would be `1a71-1a71gTHKh__lulea-hockey/qRm-1ykhbTRK4__filip-hallander`. Notice how it includes the team along with the player. Do not include the beginning or ending `/` characters.

## USHL

Needed fields:
```
league_id: '7842',
statline_url:
  'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=7842&site_id=0&key=e828f89b243dc43f&client_code=ushl&league_id=&lang=en&statsType=standard&callback=json',
game_statline_url: null,
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
statline_url: 'http://www.vhlru.ru/en/players/25697/',
game_statline_url: null,
league: 'VHL',
```

In order to get a VHL prospect to scrape properly you'll need their profile link in the `statline_url` field and the `league_id` field filled out. To get that information:

1. [Go to the VHL's player page](http://www.vhlru.ru/en/players/) and search for the prospect.
2. Click on their name in the table to get to their profile page.
3. Copy the URL in the browser's address bar into the `statline_url` field. The URL looks like: `http://www.vhlru.ru/en/players/25697/` where the number is the player's id
4. Copy the player id in the URL from step 3 and paste it into the prospect's `league_id` field. For example, the URL `http://www.vhlru.ru/en/players/25697/` has a player id of `25697`

## WHL

Needed fields:
```
statline_url: 'http://lscluster.hockeytech.com/feed/?feed=modulekit&view=player&key=41b145a848f4bd67&fmt=json&client_code=whl&lang=en&player_id=27355&category=seasonstats',
game_statline_url: null,
league_id: '27355',
league: 'WHL',
```

1. [Go to the WHL's search people page](https://whl.ca/searchpeople) and enter the prospect name.
2. Click on the prospect you are looking for which goes to their profile page.
3. Copy the number from the URL in the browser's address bar into the prospect's `league_id` field. For example, with the URL `https://whl.ca/players/27355` the player's id would be `27355`

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

This method doesn't work for all scrapers because by copying this way you introduce additional new line characters which can break how the scraper interprets the HTML (see KHL game scraper). For those you can use a test utility called `createHtmlFixture()`. To use it pass in a file name and the response from `htmlRequest()` (await the response) and it will create a fixture for you within `test/utils/created-fixtures` which you can move to the `__fixtures__` folder for your tests. You can run this function in a test to build the appropriate fixture (make sure to import the module first).

```javascript
const testUtils = require('path_to_test/utils')
testUtils.createHtmlFixture('testing', await utils.request.htmlRequest('https://en.khl.ru/players/30159/'))

// Creates the file testing.fixture.js in test/utils/created-fixtures
```

