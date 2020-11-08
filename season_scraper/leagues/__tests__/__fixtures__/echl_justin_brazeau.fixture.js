const response = {
  _type: 'Corebine.Core.Protocol.Response.Object',
  data: {
    _type: 'Corebine.Core.Sport.Player',
    _entityId: '5ae4e4e2e12fbdac1ee2e381',
    externalId: '8155',
    firstName: 'Justin',
    lastName: 'Brazeau',
    number: 17,
    position: { _type: 'Corebine.Core.Sport.Athlete.Position', name: 'Forward', shortName: 'F', category: 'Forwards', order: 1, categoryOrder: 1 },
    avatar: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/120x160/8155.jpg' },
    source: {
      _type: 'Corebine.Core.Feed.Sport',
      feedType: 'player',
      person: { _type: 'Corebine.Core.Sport.Player', _entityId: '5ae4e4e2e12fbdac1ee2e381', firstName: 'Justin', lastName: 'Brazeau' },
      query: 'player-5ae4e4e2e12fbdac1ee2e381.json',
    },
    team: {
      _type: 'Corebine.Core.Sport.Team',
      _entityId: '85d844375151b8806ccdc6b5',
      externalId: '89',
      name: 'Newfoundland Growlers',
      shortName: 'NFL',
      link: {
        _type: 'Corebine.Core.Type.Link.ClientSpecific',
        clients: {
          echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/newfoundland-growlers' },
          echlnewfoundland: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/team' },
        },
      },
      logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/89.png' },
    },
    info: {
      _type: 'Corebine.Core.Person.Info',
      properties: [
        { _type: 'Corebine.Core.Type.Property.String', name: 'Height', shortName: 'H', value: '6-6' },
        { _type: 'Corebine.Core.Type.Property.Integer', name: 'Weight', shortName: 'W', value: 225 },
        { _type: 'Corebine.Core.Type.Property.Date', format: 'utc', name: 'Birth Date', value: '1998-02-02' },
        { _type: 'Corebine.Core.Type.Property.String', name: 'Birth Place', shortName: 'BP', value: 'New Liskeard' },
        { _type: 'Corebine.Core.Type.Property.String', name: 'Shoots', shortName: 'S', value: 'R' },
      ],
    },
    stats: {
      _type: 'Corebine.Core.Sport.Athlete.Stats',
      history: [
        {
          _type: 'Corebine.Core.Sport.Athlete.Stats',
          season: { _type: 'Corebine.Core.Sport.Season', _entityId: 'cd56ccb42b787a950e354ab7', name: '2019-20 Regular Season' },
          team: {
            _type: 'Corebine.Core.Sport.Team',
            _entityId: 'dbb897f16e6c66a09250a475',
            externalId: '89',
            name: 'Newfoundland Growlers',
            shortName: 'NFL',
            link: {
              _type: 'Corebine.Core.Type.Link.ClientSpecific',
              clients: {
                echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/newfoundland-growlers' },
                echlnewfoundland: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/team' },
              },
            },
            logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/89.png' },
          },
          properties: [
            { _type: 'Corebine.Core.Type.Property.Integer', name: 'Games Played', shortName: 'GP', value: 57, priority: 1 },
            { _type: 'Corebine.Core.Type.Property.Integer', name: 'Goals', priority: 1, shortName: 'G', value: 27 },
            { _type: 'Corebine.Core.Type.Property.Integer', name: 'Assists', priority: 1, shortName: 'A', value: 28 },
            { _type: 'Corebine.Core.Type.Property.Integer', name: 'Points', priority: 1, shortName: 'PTS', value: 55 },
            { _type: 'Corebine.Core.Type.Property.Integer', name: 'Plus/Minus', units: 'plus-minus', shortName: '+/-', value: 9 },
            { _type: 'Corebine.Core.Type.Property.Integer', name: 'Penalty Minutes', shortName: 'PIM', value: 12 },
            { _type: 'Corebine.Core.Type.Property.Integer', name: 'Power Play Goals', shortName: 'PPG', value: 9 },
            { _type: 'Corebine.Core.Type.Property.Integer', name: 'Short Handed Goals', shortName: 'SHG', value: 0 },
            { _type: 'Corebine.Core.Type.Property.Number', name: 'Points per Game', shortName: 'Pt/G', value: 0.96 },
            { _type: 'Corebine.Core.Type.Property.Number', name: 'Penalty Minutes per Game', shortName: 'PIMPG', value: 0.21 },
            { _type: 'Corebine.Core.Type.Property.Integer', name: 'Shootout Goals', shortName: 'SOG', value: 0 },
            { _type: 'Corebine.Core.Type.Property.Integer', name: 'Shots', shortName: 'SH', value: 158 },
            { _type: 'Corebine.Core.Type.Property.Integer', name: 'Power Play Assists', shortName: 'PPA', value: 11 },
            { _type: 'Corebine.Core.Type.Property.Integer', name: 'Short Handed Assists', shortName: 'SHA', value: 0 },
            { _type: 'Corebine.Core.Type.Property.Integer', name: 'Game Winning Goals', shortName: 'GWG', value: 6 },
            { _type: 'Corebine.Core.Type.Property.Integer', name: 'First Goals', shortName: 'FG', value: 5 },
            { _type: 'Corebine.Core.Type.Property.Integer', name: 'Insurance Goals', shortName: 'IG', value: 1 },
            { _type: 'Corebine.Core.Type.Property.Integer', name: 'Overtime Goals', shortName: 'OTG', value: 0 },
            { _type: 'Corebine.Core.Type.Property.Integer', name: 'Unassisted Goals', shortName: 'UA', value: 1 },
            { _type: 'Corebine.Core.Type.Property.Integer', name: 'Empty Net', shortName: 'EN', value: 0 },
          ],
        },
      ],
    },
  },
  errors: [],
}

module.exports = response
