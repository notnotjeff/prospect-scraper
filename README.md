# prospect-scraper

A set of node scripts that scrape non-NHL hockey leauges for player stats and currently played games.

# Adding a Scraper

When adding a scraper for a new league there are a few steps to follow:

1. Add a file for the scraper in the appropriate folder (if it's for a season scrape it goes in `season-scraper/leagues` and if it's for a game scraper it goes into `game-scraper/leagues`)
2. Import/export the scraper file that was created in step 1 in the `index.js` inside the same `/leagues` folder so the main scraper file can find it
3. Add the scraper to the `LEAGUE_CODES` constant in the `index.js` file of the scraper (if it's for a season scrape it goes in `season-scraper/index.js` and if it's for a game scraper it goes into `game-scraper/index.js`). Use the name of the league that shows up in `prospect_info.js` under a prospect's `league` key (e.g. KHL, AHL, SHL) and the value should be what you named the scraper in step 2 (e.g. khlScraper, ahlScraper, shlScraper)
4. Add appropriate test for the league and make sure the request is stubbed using `jest.spyOn` (see other tests on how to accomplish this)

## Finnish Leagues

When looking to add a Finnish league check out [this aggregate site](http://www.leijonat.fi/) for details links to various league websites.

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
  league_id: 'If a player has a league id put it here, this is not used at the moment so it is optional (you can set it to null if preferable) [string]',
  statline_url: 'The url to the page/json data to scrape a players season statistics [string]',
  game_statline_url: 'The url to the page/json data to scrape a players individual played games [string]',
  league: 'The shorthand version of the current league that the player is playing in (check the LEAGUE_CODES constant to see the available leagues) [string]',
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
  league_id: '6893',
  statline_url:
    'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=6893&site_id=1&key=50c2cd9b5e18e390&client_code=ahl&league_id=&lang=en&statsType=standard&callback=json',
  game_statline_url:
    'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=6893&site_id=1&key=50c2cd9b5e18e390&client_code=ahl&league_id=&lang=en&statsType=standard&callback=json',
  league: 'AHL',
  ep_url: 'http://www.eliteprospects.com/player.php?player=224910',
}
```

# Finding Prospect URLs

After adding a prospect object to the `prospect_info.js` file (see Adding a Prospect section) you'll need to get the prospect's `statline_url` (the link to where the scraper can find the player's full season stats) and the `game_statline_url` (the link to where the scraper can find the prospect's played games). These URLs (along with the league field) determine how a prospect's statistics will be scraped

Every league is a bit different in how to obtain URLs so there will be a section on how to find the appropriate URL for each league:

## Allsvenskan

Example URLs
```
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

# MHL

Example URLs
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

## SM-Sarja U20

Example URLs
```
statline_url: null,
game_statline_url: null,
league_id: 255011063073080359893401,
league: 'Sarja20',
```

This scraper works a bit different than most other ones as it uses the prospect's `league_id` field to determine the URL so all you need is to find the player's id and it will work (games scraper still needs to be built)! To do that:

1. [Go to this page](http://www.leijonat.fi/index.php/pelaajat) and search for the desired prospect (see the search bar on the right side of the page)
2. In the list of prospects that should now appear after searching, click on the desired prospect to get to their profile page
3. Get the prospect id from the url (see the browser's address bar). For example, Kalle Loponen's profile page URL is `http://www.leijonat.fi/index.php/pelaajat?lkq=255011063073080359893401` and therefore his `league_id` would be: `255011063073080359893401`

## SHL

Example URLs
```
statline_url: 'https://www.shl.se/lag/1a71-1a71gTHKh__lulea-hockey/qRm-1ykhbTRK4__filip-hallander/statistics',
game_statline_url: 'https://www.shl.se/lag/1a71-1a71gTHKh__lulea-hockey/qRm-1ykhbTRK4__filip-hallander/gamelog',
league: 'SHL',
```

In order to get the statline_url you'll need to:

1. [Go to the SHL player statistics page](https://www.shl.se/statistik/spelare) and sort by the team that the prospect is on.
2. Change the `Lag` (team) filter to the team that the prospect plays for
3. Click on the prospect's name in the table to go to their profile
4. Click on the `Statistik` heading beside the profile picture to go to the statistics table
5. Copy the url in the browser's address bar and paste it in the prospect's `statline_url` field. It looks like: `https://www.shl.se/lag/1a71-1a71gTHKh__lulea-hockey/qRm-1ykhbTRK4__filip-hallander/statistics`

To get the `game_statline_url` you'll continue from step 5:

6. Click on the `Matcher` heading beside the prospect's profile picture to go to the game log page
7. Copy the URL from the browser's address bar and paste it in the prospect's `game_statline_url` field. It should look like: `https://www.shl.se/lag/1a71-1a71gTHKh__lulea-hockey/qRm-1ykhbTRK4__filip-hallander/gamelog`

