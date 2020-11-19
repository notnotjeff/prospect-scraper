// EXAMPLE (See 'scraper/leagueScraper' individual files for specific URLs for each league)
// {
//   first_name: 'Timothy',
//   last_name: 'Liljegren',
//   position: 'D',
//   shoots: 'R',
//   dob: '1999-04-20',
//   draft_round: 1,
//   draft_pick: 17,
//   draft_year: 2017,
//   league_id: '6893',
//   statline_url: 'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=6893&site_id=1&key=50c2cd9b5e18e390&client_code=ahl&league_id=&lang=en&statsType=standard&callback=json',
//   game_statline_url: 'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=6893&site_id=1&key=50c2cd9b5e18e390&client_code=ahl&league_id=&lang=en&statsType=standard&callback=json',
//   league: 'AHL',
//   ep_url: 'http://www.eliteprospects.com/player.php?player=224910'
// }

module.exports = [
  {
    first_name: 'Eemeli',
    last_name: 'Rasanen',
    position: 'D',
    shoots: 'R',
    dob: '1999-03-06',
    draft_round: 2,
    draft_pick: 59,
    draft_year: 2017,
    league_id: '30492028',
    statline_url: 'https://liiga.fi/en/pelaajat/30492028/rasanen-eemeli',
    game_statline_url: 'https://liiga.fi/en/pelaajat/30492028/rasanen-eemeli/ottelu-ottelulta',
    league: 'Liiga',
    ep_url: 'http://www.eliteprospects.com/player.php?player=302228',
  },
  {
    first_name: 'Yegor',
    last_name: 'Korshkov',
    position: 'RW',
    shoots: 'L',
    dob: '1996-07-10',
    draft_round: 2,
    draft_pick: 31,
    draft_year: 2016,
    league_id: '20766',
    statline_url: 'https://en.khl.ru/players/20766/',
    game_statline_url: 'https://en.khl.ru/players/20766/',
    league: 'KHL',
    ep_url: 'https://www.eliteprospects.com/player/176637/yegor-korshkov',
  },
  {
    first_name: 'Mikko',
    last_name: 'Lehtonen',
    position: 'D',
    shoots: 'L',
    dob: '1994-01-16',
    draft_round: null,
    draft_pick: null,
    draft_year: null,
    league_id: '24807',
    statline_url: 'https://en.khl.ru/players/24807/',
    game_statline_url: 'https://en.khl.ru/players/24807/',
    league: 'KHL',
    ep_url: 'https://www.eliteprospects.com/player/56196/mikko-lehtonen',
  },
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
  },
  {
    first_name: 'Vladislav',
    last_name: 'Kara',
    position: 'C',
    shoots: 'L',
    dob: '1998-04-20',
    draft_round: 4,
    draft_pick: 124,
    draft_year: 2017,
    league_id: '22888',
    // statline_url: 'http://www.vhlru.ru/en/players/22888/',
    // game_statline_url: 'http://www.vhlru.ru/en/players/22888/games',
    statline_url: 'https://en.khl.ru/players/22888/',
    game_statline_url: 'https://en.khl.ru/players/22888/',
    league: 'KHL',
    ep_url: 'http://www.eliteprospects.com/player.php?player=322627',
  },
  {
    first_name: 'Nikolai',
    last_name: 'Chebykin',
    position: 'W',
    shoots: 'L',
    dob: '1997-08-01',
    draft_round: 7,
    draft_pick: 182,
    draft_year: 2016,
    league_id: '22161',
    statline_url: 'http://www.vhlru.ru/en/players/22161/',
    game_statline_url: 'http://www.vhlru.ru/en/players/22161/games/',
    league: 'VHL',
    ep_url: 'http://www.eliteprospects.com/player.php?player=300931',
  },
  {
    first_name: 'Vladimir',
    last_name: 'Bobylyov',
    position: 'W',
    shoots: 'L',
    dob: '1997-04-18',
    draft_round: 5,
    draft_pick: 122,
    draft_year: 2016,
    league_id: '21313',
    statline_url: 'http://www.vhlru.ru/en/players/21313/',
    game_statline_url: 'http://www.vhlru.ru/en/players/21313/games/',
    // statline_url: 'https://en.khl.ru/players/21313/', KHL
    // game_statline_url: 'https://en.khl.ru/players/21313/', KHL
    league: 'VHL',
    ep_url: 'http://www.eliteprospects.com/player.php?player=268059',
  },
  {
    first_name: 'Ryan',
    last_name: "O'Connell",
    position: 'D',
    shoots: 'L',
    dob: '1999-04-25',
    draft_round: 7,
    draft_pick: 203,
    draft_year: 2017,
    league_id: 'osum16',
    statline_url: 'http://collegehockeyinc.com/stats/players20.php?osum16',
    game_statline_url: 'http://collegehockeyinc.com/stats/players20.php?osum16',
    league: 'NCAA',
    ep_url: 'https://www.eliteprospects.com/player/286946/ryan-o-connell',
  },
  {
    first_name: 'James',
    last_name: 'Greenway',
    position: 'D',
    shoots: 'L',
    dob: '1998-04-27',
    draft_round: 3,
    draft_pick: 72,
    draft_year: 2016,
    league_id: 'mnem23',
    statline_url: 'http://collegehockeyinc.com/stats/players20.php?mnem23',
    game_statline_url: 'http://collegehockeyinc.com/stats/players20.php?mnem23',
    league: 'NCAA',
    ep_url: 'http://www.eliteprospects.com/player.php?player=226438',
  },
  {
    first_name: 'Rasmus',
    last_name: 'Sandin',
    position: 'D',
    shoots: 'L',
    dob: '2000-03-07',
    draft_round: 1,
    draft_pick: 29,
    draft_year: 2018,
    league_id: '7314',
    statline_url:
      'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=7314&site_id=1&key=50c2cd9b5e18e390&client_code=ahl&league_id=&lang=en&statsType=standard&callback=json',
    game_statline_url:
      'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=7314&site_id=1&key=50c2cd9b5e18e390&client_code=ahl&league_id=&lang=en&statsType=standard&callback=json',
    league: 'AHL',
    ep_url: 'https://www.eliteprospects.com/player/289453/rasmus-sandin',
  },
  {
    first_name: 'Joey',
    last_name: 'Anderson',
    position: 'RW',
    shoots: 'R',
    dob: '1998-06-19',
    draft_round: 3,
    draft_pick: 73,
    draft_year: 2016,
    league_id: '7297',
    statline_url:
      'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=7297&site_id=1&key=50c2cd9b5e18e390&client_code=ahl&league_id=&lang=en&statsType=standard&callback=json',
    game_statline_url:
      'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=7297&site_id=1&key=50c2cd9b5e18e390&client_code=ahl&league_id=&lang=en&statsType=standard&callback=json',
    league: 'AHL',
    ep_url: 'https://www.eliteprospects.com/player/247964/joey-anderson',
  },
  {
    first_name: 'Semyon',
    last_name: 'Der-Arguchintsev',
    position: 'C',
    shoots: 'R',
    dob: '2000-09-15',
    draft_round: 3,
    draft_pick: 76,
    draft_year: 2018,
    league_id: '39846',
    statline_url: 'https://en.khl.ru/players/39846/',
    game_statline_url: 'https://en.khl.ru/players/39846/',
    league: 'KHL',
    ep_url: 'https://www.eliteprospects.com/player/315260/semyon-der-arguchintsev',
  },
  {
    first_name: 'Mac',
    last_name: 'Hollowell',
    position: 'D',
    shoots: 'R',
    dob: '1998-09-26',
    draft_round: 4,
    draft_pick: 118,
    draft_year: 2018,
    league_id: '60490663', // MESTIS ID
    statline_url: 'https://mestis.fi/en/pelaajat/60490663/hollowell-mac',
    game_statline_url: 'https://mestis.fi/en/pelaajat/60490663/hollowell-mac/ottelu-ottelulta',
    // league_id: 'c8ff052d590070ffd158a1c4', // ECHL ID
    // statline_url: 'https://www.echl.com/api/s3?q=player-b7ea99e8a16f1597fada3b6d.json',
    // game_statline_url: '',
    // league_id: '7303', // AHL ID
    // statline_url: 'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=7303&site_id=1&key=50c2cd9b5e18e390&client_code=ahl&league_id=&lang=en&statsType=standard&callback=json',
    // game_statline_url: 'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=7303&site_id=1&key=50c2cd9b5e18e390&client_code=ahl&league_id=&lang=en&statsType=standard&callback=json',
    league: 'Mestis',
    ep_url: 'https://www.eliteprospects.com/player/267652/mac-hollowell',
  },
  {
    first_name: 'Filip',
    last_name: 'Kral',
    position: 'D',
    shoots: 'L',
    dob: '1999-10-20',
    draft_round: 5,
    draft_pick: 149,
    draft_year: 2018,
    league_id: '23461',
    statline_url: 'https://www.hokej.cz/hrac/23461/career?t=224&stats-section=all',
    game_statline_url: 'https://www.hokej.cz/hrac/23461?t=224',
    league: 'CZE',
    ep_url: 'https://www.eliteprospects.com/player/247241/filip-kral',
  },
  {
    first_name: 'Pontus',
    last_name: 'Holmberg',
    position: 'LW',
    shoots: 'L',
    dob: '1999-03-09',
    draft_round: 6,
    draft_pick: 156,
    draft_year: 2018,
    league_id: 'fe02-fe02mf1FN__vaxjo-lakers/qTK-4a8Y9mMrn__pontus-holmberg',
    statline_url: 'https://www.shl.se/lag/fe02-fe02mf1FN__vaxjo-lakers/qTK-4a8Y9mMrn__pontus-holmberg/statistics',
    game_statline_url: 'https://www.shl.se/lag/fe02-fe02mf1FN__vaxjo-lakers/qTK-4a8Y9mMrn__pontus-holmberg/gamelog',
    league: 'SHL',
    ep_url: 'https://www.eliteprospects.com/player/265859/pontus-holmberg',
  },
  {
    first_name: 'Semyon',
    last_name: 'Kizimov',
    position: 'LW',
    shoots: 'L',
    dob: '2000-01-19',
    draft_round: 7,
    draft_pick: 211,
    draft_year: 2018,
    league_id: '25697',
    statline_url: 'http://www.vhlru.ru/en/players/25697/',
    game_statline_url: 'http://www.vhlru.ru/en/players/25697/games/',
    league: 'VHL',
    ep_url: 'https://www.eliteprospects.com/player/420947/semyon-kizimov',
  },
  {
    first_name: 'Joseph',
    last_name: 'Duszak',
    position: 'D',
    shoots: 'R',
    dob: '1997-07-22',
    draft_round: null,
    draft_pick: null,
    draft_year: null,
    statline_url: null,
    game_statline_url: null,
    league_id: 'a7a81ba19f324b9a59b9c0ea', // ECHL ID
    // league_id: '7517', // AHL ID
    league: 'ECHL',
    ep_url: 'http://www.eliteprospects.com/player.php?player=262071',
  },
  {
    first_name: 'Colton',
    last_name: 'Conrad',
    position: 'C',
    shoots: 'R',
    dob: '1997-04-27',
    draft_round: null,
    draft_pick: null,
    draft_year: null,
    league_id: 'c8ff052d590070ffd158a1c4', // ECHL ID
    // league_id: '7544', // AHL ID
    league: 'ECHL',
    ep_url: 'http://www.eliteprospects.com/player.php?player=199895',
  },
  {
    first_name: 'Justin',
    last_name: 'Brazeau',
    position: 'RW',
    shoots: 'R',
    dob: '1998-02-02',
    draft_round: null,
    draft_pick: null,
    draft_year: null,
    statline_url: null,
    game_statline_url: null,
    league_id: '5ae4e4e2e12fbdac1ee2e381', // ECHL ID
    // league_id: '7989', // AHL ID
    league: 'ECHL',
    ep_url: 'http://www.eliteprospects.com/player.php?player=217051',
  },
  {
    first_name: 'Nick',
    last_name: 'Robertson',
    position: 'LW',
    shoots: 'L',
    dob: '2001-09-11',
    draft_round: 2,
    draft_pick: 53,
    draft_year: 2019,
    league_id: '7662',
    statline_url:
      'http://lscluster.hockeytech.com/feed/?feed=modulekit&view=player&key=2976319eb44abe94&fmt=json&client_code=ohl&lang=en&player_id=7662&category=seasonstats',
    game_statline_url:
      'http://lscluster.hockeytech.com/feed/?feed=modulekit&view=player&key=2976319eb44abe94&fmt=json&client_code=ohl&lang=en&player_id=7662&category=gamebygame',
    league: 'OHL',
    ep_url: 'https://www.eliteprospects.com/player/359539/nicholas-robertson',
  },
  {
    first_name: 'Mikko',
    last_name: 'Kokkonen',
    position: 'D',
    shoots: 'L',
    dob: '2001-01-18',
    draft_round: 3,
    draft_pick: 84,
    draft_year: 2019,
    league_id: '31128854',
    statline_url: 'https://liiga.fi/fi/pelaajat/31128854/kokkonen-mikko',
    game_statline_url: 'https://liiga.fi/fi/pelaajat/31128854/kokkonen-mikko/ottelu-ottelulta',
    league: 'Liiga',
    ep_url: 'https://www.eliteprospects.com/player/347571/mikko-kokkonen',
  },
  {
    first_name: 'Mikhail',
    last_name: 'Abramov',
    position: 'C',
    shoots: 'L',
    dob: '2001-03-26',
    draft_round: 4,
    draft_pick: 115,
    draft_year: 2019,
    league_id: '17871',
    statline_url: null,
    game_statline_url: null,
    league: 'QMJHL',
    ep_url: 'https://www.eliteprospects.com/player/514653/mikhail-abramov',
  },
  {
    first_name: 'Nick',
    last_name: 'Abruzzese',
    position: 'C',
    shoots: 'L',
    dob: '1999-06-04',
    draft_round: 4,
    draft_pick: 124,
    draft_year: 2019,
    league_id: 'harm22',
    statline_url: 'http://collegehockeyinc.com/stats/players20.php?harm22',
    game_statline_url: 'http://collegehockeyinc.com/stats/players20.php?harm22',
    league: 'NCAA',
    ep_url: 'https://www.eliteprospects.com/player/201476/nick-abruzzese',
  },
  {
    first_name: 'Mike',
    last_name: 'Koster',
    position: 'D',
    shoots: 'L',
    dob: '2001-04-13',
    draft_round: 5,
    draft_pick: 146,
    draft_year: 2019,
    league_id: '7842',
    statline_url:
      'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=7842&site_id=0&key=e828f89b243dc43f&client_code=ushl&league_id=&lang=en&statsType=standard&callback=json',
    game_statline_url:
      'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=7842&site_id=0&key=e828f89b243dc43f&client_code=ushl&league_id=&lang=en&statsType=standard&callback=json',
    league: 'USHL',
    ep_url: 'https://www.eliteprospects.com/player/427432/mike-koster',
  },
  {
    first_name: 'Kalle',
    last_name: 'Loponen',
    position: 'D',
    shoots: 'R',
    dob: '2001-03-13',
    draft_round: 7,
    draft_pick: 204,
    draft_year: 2019,
    league_id: '255011063073080359893401',
    statline_url: null,
    game_statline_url: null,
    league: 'Sarja20',
    ep_url: 'https://www.eliteprospects.com/player/395424/kalle-loponen',
  },
  {
    first_name: 'Filip',
    last_name: 'Hallander',
    position: 'C',
    shoots: 'L',
    dob: '2000-06-29',
    draft_round: 2,
    draft_pick: 58,
    draft_year: 2018,
    league_id: '1a71-1a71gTHKh__lulea-hockey/qRm-1ykhbTRK4__filip-hallander',
    statline_url: 'https://www.shl.se/lag/1a71-1a71gTHKh__lulea-hockey/qRm-1ykhbTRK4__filip-hallander/statistics',
    game_statline_url: 'https://www.shl.se/lag/1a71-1a71gTHKh__lulea-hockey/qRm-1ykhbTRK4__filip-hallander/gamelog',
    league: 'SHL',
    ep_url: 'https://www.eliteprospects.com/player/293387/filip-hallander',
  },
  {
    first_name: 'Rodion',
    last_name: 'Amirov',
    position: 'LW',
    shoots: 'L',
    dob: '2001-10-02',
    draft_round: 1,
    draft_pick: 15,
    draft_year: 2020,
    league_id: '30159',
    statline_url: 'https://en.khl.ru/players/30159/',
    game_statline_url: 'https://en.khl.ru/players/30159/',
    league: 'KHL',
    ep_url: 'https://www.eliteprospects.com/player/518585/rodion-amirov',
  },
  {
    first_name: 'Roni',
    last_name: 'Hirvonen',
    position: 'C',
    shoots: 'L',
    dob: '2002-01-10',
    draft_round: 2,
    draft_pick: 59,
    draft_year: 2020,
    league_id: '32269686',
    statline_url: 'https://liiga.fi/fi/pelaajat/32269686/hirvonen-roni',
    game_statline_url: 'https://liiga.fi/fi/pelaajat/32269686/hirvonen-roni/ottelu-ottelulta',
    league: 'Liiga',
    ep_url: 'https://www.eliteprospects.com/player/448946/roni-hirvonen',
  },
  {
    first_name: 'Topi',
    last_name: 'Niemela',
    position: 'D',
    shoots: 'R',
    dob: '2002-03-25',
    draft_round: 3,
    draft_pick: 64,
    draft_year: 2020,
    league_id: '31555838',
    statline_url: 'https://liiga.fi/fi/pelaajat/31555838/niemela-topi',
    game_statline_url: 'https://liiga.fi/fi/pelaajat/31555838/niemela-topi/ottelu-ottelulta',
    league: 'Liiga',
    ep_url: 'https://www.eliteprospects.com/player/499424/topi-niemela',
  },
  {
    first_name: 'William',
    last_name: 'Villeneuve',
    position: 'D',
    shoots: 'R',
    dob: '2002-03-20',
    draft_round: 4,
    draft_pick: 122,
    draft_year: 2020,
    league_id: '17505',
    statline_url: null,
    game_statline_url: null,
    league: 'QMJHL',
    ep_url: 'https://www.eliteprospects.com/player/410562/william-villeneuve',
  },
  {
    first_name: 'Dmitry',
    last_name: 'Ovchinnikov',
    position: 'C',
    shoots: 'L',
    dob: '2002-08-19',
    draft_round: 5,
    draft_pick: 137,
    draft_year: 2020,
    league_id: '31214',
    statline_url: 'https://engmhl.khl.ru/players/31214/',
    game_statline_url: 'https://engmhl.khl.ru/players/31214/games/',
    league: 'MHL',
    ep_url: 'https://www.eliteprospects.com/player/534929/dmitri-ovchinnikov',
  },
  {
    first_name: 'Veeti',
    last_name: 'Miettinen',
    position: 'RW',
    shoots: 'L',
    dob: '2001-09-20',
    draft_round: 6,
    draft_pick: 168,
    draft_year: 2020,
    league_id: '',
    statline_url: '',
    game_statline_url: '',
    league: 'NCAA',
    ep_url: 'https://www.eliteprospects.com/player/396163/veeti-miettinen',
  },
  {
    first_name: 'Axel',
    last_name: 'Rindell',
    position: 'D',
    shoots: 'R',
    dob: '2000-04-23',
    draft_round: 6,
    draft_pick: 177,
    draft_year: 2020,
    league_id: '30439447',
    statline_url: 'https://liiga.fi/fi/pelaajat/30439447/rindell-axel',
    game_statline_url: 'https://liiga.fi/fi/pelaajat/30439447/rindell-axel/ottelu-ottelulta',
    league: 'Liiga',
    ep_url: 'https://www.eliteprospects.com/player/375833/axel-rindell',
  },
  {
    first_name: 'Joe',
    last_name: 'Miller',
    position: 'C',
    shoots: 'R',
    dob: '2002-09-15',
    draft_round: 6,
    draft_pick: 180,
    draft_year: 2020,
    league_id: '8431',
    statline_url:
      'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=8431&site_id=0&key=e828f89b243dc43f&client_code=ushl&league_id=&lang=en&statsType=standard&callback=json',
    game_statline_url:
      'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=8431&site_id=0&key=e828f89b243dc43f&client_code=ushl&league_id=&lang=en&statsType=standard&callback=json',
    league: 'USHL',
    ep_url: 'https://www.eliteprospects.com/player/201857/joe-miller',
  },
  {
    first_name: 'John',
    last_name: 'Fusco',
    position: 'D',
    shoots: 'R',
    dob: '2001-06-13',
    draft_round: 7,
    draft_pick: 189,
    draft_year: 2020,
    league_id: '',
    statline_url: '',
    game_statline_url: '',
    league: 'USHL',
    ep_url: 'https://www.eliteprospects.com/player/541027/john-fusco',
  },
  {
    first_name: 'Wyatt',
    last_name: 'Schingoethe',
    position: 'C',
    shoots: 'L',
    dob: '2002-08-03',
    draft_round: 7,
    draft_pick: 195,
    draft_year: 2020,
    league_id: '8172',
    statline_url:
      'https://lscluster.hockeytech.com/feed/index.php?feed=statviewfeed&view=player&player_id=8172&site_id=0&key=e828f89b243dc43f&client_code=ushl&league_id=&lang=en&statsType=standard&callback=json',
    game_statline_url: null,
    league: 'USHL',
    ep_url: 'https://www.eliteprospects.com/player/201729/wyatt-schingoethe',
  },
  {
    first_name: 'Ryan',
    last_name: 'Tverberg',
    position: 'C',
    shoots: 'R',
    dob: '2002-01-30',
    draft_round: 7,
    draft_pick: 213,
    draft_year: 2020,
    league_id: '6748',
    statline_url: '',
    game_statline_url: '',
    league: 'BCHL',
    ep_url: 'https://www.eliteprospects.com/player/201945/ryan-tverberg',
  },
]
