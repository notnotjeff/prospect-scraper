module.exports = {
  _type: 'Corebine.Core.Protocol.Response.Array',
  data: [
    {
      _type: 'Corebine.Core.Sport.Match',
      _entityId: '10a7e8d4025639248a1d7e6e',
      externalId: '18117',
      externalSource: 'hockeyTech',
      startDate: '2020-12-12T01:05:00.000Z',
      venue: { _type: 'Corebine.Core.Sport.Arena', _entityId: '22e39d0f69af4bedf427f1dc', name: 'BOK Center' },
      teams: {
        home: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '70002ab8714596f91aa6a514',
          externalId: '71',
          name: 'Tulsa Oilers',
          shortName: 'TUL',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/tulsa-oilers' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/71.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
        away: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '31ffb756ae0a30e567dcf226',
          externalId: '72',
          name: 'Wichita Thunder',
          shortName: 'WIC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/wichita-thunder' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/72.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
      },
      link: {
        _type: 'Corebine.Core.Type.Link.Internal',
        pageEntityId: '1',
        url: '/matches/10a7e8d4025639248a1d7e6e/tulsa-oilers-vs-wichita-thunder',
      },
      status: 'finished',
      state: { _type: 'Corebine.Core.Sport.Event.State', name: 'Final SO', shortName: 'F/SO' },
      results: { _type: 'Corebine.Core.Sport.Match.Results', scores: { _type: 'Corebine.Core.Sport.Match.Scores', home: 2, away: 3 } },
    },
    {
      _type: 'Corebine.Core.Sport.Match',
      _entityId: 'dede1bdba4a625382fabc230',
      externalId: '18165',
      externalSource: 'hockeyTech',
      startDate: '2020-12-27T01:05:00.000Z',
      venue: { _type: 'Corebine.Core.Sport.Arena', _entityId: '03e892d562598a03080b4459', name: 'Cable Dahmer Arena' },
      teams: {
        home: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '8f5ec8b5ced2662a1fe5d335',
          externalId: '68',
          name: 'Kansas City Mavericks',
          shortName: 'KC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: {
              echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/kansas-city-mavericks' },
              echlkansascity: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/team' },
            },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/68_55.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
        away: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '31ffb756ae0a30e567dcf226',
          externalId: '72',
          name: 'Wichita Thunder',
          shortName: 'WIC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/wichita-thunder' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/72.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
      },
      link: {
        _type: 'Corebine.Core.Type.Link.Internal',
        pageEntityId: '1',
        url: '/matches/dede1bdba4a625382fabc230/kansas-city-mavericks-vs-wichita-thunder',
      },
      status: 'finished',
      state: { _type: 'Corebine.Core.Sport.Event.State', name: 'Final', shortName: 'Final' },
      results: { _type: 'Corebine.Core.Sport.Match.Results', scores: { _type: 'Corebine.Core.Sport.Match.Scores', home: 1, away: 3 } },
    },
    {
      _type: 'Corebine.Core.Sport.Match',
      _entityId: '7e7c26c83a2d317acde67197',
      externalId: '18148',
      externalSource: 'hockeyTech',
      startDate: '2021-01-01T00:05:00.000Z',
      venue: { _type: 'Corebine.Core.Sport.Arena', _entityId: 'ef652986070c9d793c51f78e', name: 'Allen Event Center' },
      teams: {
        home: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '5c5c2fc55ce4ceb584def768',
          externalId: '66',
          name: 'Allen Americans',
          shortName: 'ALN',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/allen-americans' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/66.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
        away: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '31ffb756ae0a30e567dcf226',
          externalId: '72',
          name: 'Wichita Thunder',
          shortName: 'WIC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/wichita-thunder' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/72.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
      },
      link: {
        _type: 'Corebine.Core.Type.Link.Internal',
        pageEntityId: '1',
        url: '/matches/7e7c26c83a2d317acde67197/allen-americans-vs-wichita-thunder',
      },
      status: 'finished',
      state: { _type: 'Corebine.Core.Sport.Event.State', name: 'Final', shortName: 'Final' },
      results: { _type: 'Corebine.Core.Sport.Match.Results', scores: { _type: 'Corebine.Core.Sport.Match.Scores', home: 2, away: 7 } },
    },
    {
      _type: 'Corebine.Core.Sport.Match',
      _entityId: '726aeb7bddff5b8567b9230d',
      externalId: '18153',
      externalSource: 'hockeyTech',
      startDate: '2021-01-02T01:05:00.000Z',
      venue: { _type: 'Corebine.Core.Sport.Arena', _entityId: '560dfc549f8c7e516af284ef', name: 'INTRUST Bank Arena' },
      teams: {
        home: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '31ffb756ae0a30e567dcf226',
          externalId: '72',
          name: 'Wichita Thunder',
          shortName: 'WIC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/wichita-thunder' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/72.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
        away: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '5c5c2fc55ce4ceb584def768',
          externalId: '66',
          name: 'Allen Americans',
          shortName: 'ALN',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/allen-americans' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/66.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
      },
      link: {
        _type: 'Corebine.Core.Type.Link.Internal',
        pageEntityId: '1',
        url: '/matches/726aeb7bddff5b8567b9230d/wichita-thunder-vs-allen-americans',
      },
      status: 'finished',
      state: { _type: 'Corebine.Core.Sport.Event.State', name: 'Final', shortName: 'Final' },
      results: { _type: 'Corebine.Core.Sport.Match.Results', scores: { _type: 'Corebine.Core.Sport.Match.Scores', home: 1, away: 5 } },
    },
    {
      _type: 'Corebine.Core.Sport.Match',
      _entityId: '4543cb6638757062ab5a1ed4',
      externalId: '18159',
      externalSource: 'hockeyTech',
      startDate: '2021-01-03T01:05:00.000Z',
      venue: { _type: 'Corebine.Core.Sport.Arena', _entityId: '560dfc549f8c7e516af284ef', name: 'INTRUST Bank Arena' },
      teams: {
        home: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '31ffb756ae0a30e567dcf226',
          externalId: '72',
          name: 'Wichita Thunder',
          shortName: 'WIC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/wichita-thunder' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/72.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
        away: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '5c5c2fc55ce4ceb584def768',
          externalId: '66',
          name: 'Allen Americans',
          shortName: 'ALN',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/allen-americans' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/66.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
      },
      tickets: {
        _type: 'Corebine.Core.Sport.Match.Tickets',
        link: { _type: 'Corebine.Core.Type.Link.External', url: 'http://www.selectaseat.com/organizations/wichita-thunder.php' },
      },
      link: {
        _type: 'Corebine.Core.Type.Link.Internal',
        pageEntityId: '1',
        url: '/matches/4543cb6638757062ab5a1ed4/wichita-thunder-vs-allen-americans',
      },
      audio: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'http://mixlr.com/wichita-thunder/' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'http://radio.securenetsystems.net/v5/AAHC' },
      },
      video: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
      },
      status: 'not-started',
    },
    {
      _type: 'Corebine.Core.Sport.Match',
      _entityId: '4427b1cc35bfb51a8bfd1d71',
      externalId: '18172',
      externalSource: 'hockeyTech',
      startDate: '2021-01-06T01:05:00.000Z',
      venue: { _type: 'Corebine.Core.Sport.Arena', _entityId: '03e892d562598a03080b4459', name: 'Cable Dahmer Arena' },
      teams: {
        home: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '8f5ec8b5ced2662a1fe5d335',
          externalId: '68',
          name: 'Kansas City Mavericks',
          shortName: 'KC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: {
              echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/kansas-city-mavericks' },
              echlkansascity: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/team' },
            },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/68_55.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
        away: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '31ffb756ae0a30e567dcf226',
          externalId: '72',
          name: 'Wichita Thunder',
          shortName: 'WIC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/wichita-thunder' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/72.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
      },
      tickets: {
        _type: 'Corebine.Core.Sport.Match.Tickets',
        link: {
          _type: 'Corebine.Core.Type.Link.External',
          url: 'https://www.ticketmaster.com/kansas-city-mavericks-vs-wichita-thunder-independence-missouri-01-05-2021/event/0600597EEBCC193E',
        },
      },
      audio: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'https://kcmavericks.com/en/multimedia/multimedia-back-pages/listen-live' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'http://mixlr.com/wichita-thunder/' },
      },
      video: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
      },
      status: 'not-started',
    },
    {
      _type: 'Corebine.Core.Sport.Match',
      _entityId: '83450e35147a5236af4a32b2',
      externalId: '18134',
      externalSource: 'hockeyTech',
      startDate: '2021-01-09T01:05:00.000Z',
      venue: { _type: 'Corebine.Core.Sport.Arena', _entityId: '560dfc549f8c7e516af284ef', name: 'INTRUST Bank Arena' },
      teams: {
        home: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '31ffb756ae0a30e567dcf226',
          externalId: '72',
          name: 'Wichita Thunder',
          shortName: 'WIC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/wichita-thunder' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/72.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
        away: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '8f5ec8b5ced2662a1fe5d335',
          externalId: '68',
          name: 'Kansas City Mavericks',
          shortName: 'KC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: {
              echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/kansas-city-mavericks' },
              echlkansascity: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/team' },
            },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/68_55.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
      },
      tickets: {
        _type: 'Corebine.Core.Sport.Match.Tickets',
        link: { _type: 'Corebine.Core.Type.Link.External', url: 'http://www.selectaseat.com/organizations/wichita-thunder.php' },
      },
      audio: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'http://mixlr.com/wichita-thunder/' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'https://kcmavericks.com/en/multimedia/multimedia-back-pages/listen-live' },
      },
      video: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
      },
      status: 'not-started',
    },
    {
      _type: 'Corebine.Core.Sport.Match',
      _entityId: 'bb169361d7b0347c63189474',
      externalId: '18139',
      externalSource: 'hockeyTech',
      startDate: '2021-01-10T01:05:00.000Z',
      venue: { _type: 'Corebine.Core.Sport.Arena', _entityId: '560dfc549f8c7e516af284ef', name: 'INTRUST Bank Arena' },
      teams: {
        home: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '31ffb756ae0a30e567dcf226',
          externalId: '72',
          name: 'Wichita Thunder',
          shortName: 'WIC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/wichita-thunder' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/72.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
        away: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '8f5ec8b5ced2662a1fe5d335',
          externalId: '68',
          name: 'Kansas City Mavericks',
          shortName: 'KC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: {
              echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/kansas-city-mavericks' },
              echlkansascity: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/team' },
            },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/68_55.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
      },
      tickets: {
        _type: 'Corebine.Core.Sport.Match.Tickets',
        link: { _type: 'Corebine.Core.Type.Link.External', url: 'http://www.selectaseat.com/organizations/wichita-thunder.php' },
      },
      audio: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'http://mixlr.com/wichita-thunder/' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'https://kcmavericks.com/en/multimedia/multimedia-back-pages/listen-live' },
      },
      video: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
      },
      status: 'not-started',
    },
    {
      _type: 'Corebine.Core.Sport.Match',
      _entityId: '173ab802fb789a5500b35d20',
      externalId: '18143',
      externalSource: 'hockeyTech',
      startDate: '2021-01-10T22:05:00.000Z',
      venue: { _type: 'Corebine.Core.Sport.Arena', _entityId: '560dfc549f8c7e516af284ef', name: 'INTRUST Bank Arena' },
      teams: {
        home: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '31ffb756ae0a30e567dcf226',
          externalId: '72',
          name: 'Wichita Thunder',
          shortName: 'WIC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/wichita-thunder' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/72.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
        away: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '8f5ec8b5ced2662a1fe5d335',
          externalId: '68',
          name: 'Kansas City Mavericks',
          shortName: 'KC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: {
              echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/kansas-city-mavericks' },
              echlkansascity: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/team' },
            },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/68_55.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
      },
      tickets: {
        _type: 'Corebine.Core.Sport.Match.Tickets',
        link: { _type: 'Corebine.Core.Type.Link.External', url: 'http://www.selectaseat.com/organizations/wichita-thunder.php' },
      },
      audio: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'http://mixlr.com/wichita-thunder/' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'https://kcmavericks.com/en/multimedia/multimedia-back-pages/listen-live' },
      },
      video: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
      },
      status: 'not-started',
    },
    {
      _type: 'Corebine.Core.Sport.Match',
      _entityId: '1cffa93f97e7c37801c0b33d',
      externalId: '18182',
      externalSource: 'hockeyTech',
      startDate: '2021-01-16T01:05:00.000Z',
      venue: { _type: 'Corebine.Core.Sport.Arena', _entityId: 'ef652986070c9d793c51f78e', name: 'Allen Event Center' },
      teams: {
        home: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '5c5c2fc55ce4ceb584def768',
          externalId: '66',
          name: 'Allen Americans',
          shortName: 'ALN',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/allen-americans' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/66.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
        away: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '31ffb756ae0a30e567dcf226',
          externalId: '72',
          name: 'Wichita Thunder',
          shortName: 'WIC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/wichita-thunder' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/72.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
      },
      audio: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'http://radio.securenetsystems.net/v5/AAHC' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'http://mixlr.com/wichita-thunder/' },
      },
      video: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
      },
      status: 'not-started',
    },
    {
      _type: 'Corebine.Core.Sport.Match',
      _entityId: 'c911e7c83c6ae625dd4ae42a',
      externalId: '18188',
      externalSource: 'hockeyTech',
      startDate: '2021-01-17T01:05:00.000Z',
      venue: { _type: 'Corebine.Core.Sport.Arena', _entityId: 'ef652986070c9d793c51f78e', name: 'Allen Event Center' },
      teams: {
        home: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '5c5c2fc55ce4ceb584def768',
          externalId: '66',
          name: 'Allen Americans',
          shortName: 'ALN',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/allen-americans' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/66.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
        away: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '31ffb756ae0a30e567dcf226',
          externalId: '72',
          name: 'Wichita Thunder',
          shortName: 'WIC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/wichita-thunder' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/72.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
      },
      audio: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'http://radio.securenetsystems.net/v5/AAHC' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'http://mixlr.com/wichita-thunder/' },
      },
      video: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
      },
      status: 'not-started',
    },
    {
      _type: 'Corebine.Core.Sport.Match',
      _entityId: 'dadaa72662b34758ba4eba66',
      externalId: '18194',
      externalSource: 'hockeyTech',
      startDate: '2021-01-17T20:05:00.000Z',
      venue: { _type: 'Corebine.Core.Sport.Arena', _entityId: 'ef652986070c9d793c51f78e', name: 'Allen Event Center' },
      teams: {
        home: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '5c5c2fc55ce4ceb584def768',
          externalId: '66',
          name: 'Allen Americans',
          shortName: 'ALN',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/allen-americans' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/66.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
        away: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '31ffb756ae0a30e567dcf226',
          externalId: '72',
          name: 'Wichita Thunder',
          shortName: 'WIC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/wichita-thunder' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/72.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
      },
      audio: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'http://radio.securenetsystems.net/v5/AAHC' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'http://mixlr.com/wichita-thunder/' },
      },
      video: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
      },
      status: 'not-started',
    },
    {
      _type: 'Corebine.Core.Sport.Match',
      _entityId: 'a47ccf7974dbc38c978b83b9',
      externalId: '18202',
      externalSource: 'hockeyTech',
      startDate: '2021-01-22T01:05:00.000Z',
      venue: { _type: 'Corebine.Core.Sport.Arena', _entityId: '560dfc549f8c7e516af284ef', name: 'INTRUST Bank Arena' },
      teams: {
        home: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '31ffb756ae0a30e567dcf226',
          externalId: '72',
          name: 'Wichita Thunder',
          shortName: 'WIC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/wichita-thunder' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/72.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
        away: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '8f5ec8b5ced2662a1fe5d335',
          externalId: '68',
          name: 'Kansas City Mavericks',
          shortName: 'KC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: {
              echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/kansas-city-mavericks' },
              echlkansascity: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/team' },
            },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/68_55.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
      },
      audio: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'http://mixlr.com/wichita-thunder/' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'https://kcmavericks.com/en/multimedia/multimedia-back-pages/listen-live' },
      },
      video: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
      },
      status: 'not-started',
    },
    {
      _type: 'Corebine.Core.Sport.Match',
      _entityId: '23d3107db1e2eb047cd75613',
      externalId: '18217',
      externalSource: 'hockeyTech',
      startDate: '2021-01-24T22:05:00.000Z',
      venue: { _type: 'Corebine.Core.Sport.Arena', _entityId: '560dfc549f8c7e516af284ef', name: 'INTRUST Bank Arena' },
      teams: {
        home: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '31ffb756ae0a30e567dcf226',
          externalId: '72',
          name: 'Wichita Thunder',
          shortName: 'WIC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/wichita-thunder' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/72.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
        away: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '05254743c2d41e7bfe6e8ae0',
          externalId: '65',
          name: 'Indy Fuel',
          shortName: 'IND',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: {
              echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/indy-fuel' },
              echlindyfuel: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/team' },
            },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/65.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Central' },
            ],
          },
        },
      },
      audio: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'http://mixlr.com/wichita-thunder/' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'http://mixlr.com/indyfuel' },
      },
      video: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
      },
      status: 'not-started',
    },
    {
      _type: 'Corebine.Core.Sport.Match',
      _entityId: '1098bb78d7a778c237b2034c',
      externalId: '18224',
      externalSource: 'hockeyTech',
      startDate: '2021-01-30T01:05:00.000Z',
      venue: { _type: 'Corebine.Core.Sport.Arena', _entityId: '560dfc549f8c7e516af284ef', name: 'INTRUST Bank Arena' },
      teams: {
        home: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '31ffb756ae0a30e567dcf226',
          externalId: '72',
          name: 'Wichita Thunder',
          shortName: 'WIC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/wichita-thunder' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/72.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
        away: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: 'd9faf64eaea21fb86ce70a49',
          externalId: '70',
          name: 'Rapid City Rush',
          shortName: 'RC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: {
              echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/rapid-city-rush' },
              echlrapidcity: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/team' },
            },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/70.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
      },
      audio: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'http://mixlr.com/wichita-thunder/' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'https://rapidcityrush.com/en/media-center/listen-live' },
      },
      video: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
      },
      status: 'not-started',
    },
    {
      _type: 'Corebine.Core.Sport.Match',
      _entityId: 'db71d7c7d1d327e4454491ba',
      externalId: '18229',
      externalSource: 'hockeyTech',
      startDate: '2021-01-31T01:05:00.000Z',
      venue: { _type: 'Corebine.Core.Sport.Arena', _entityId: '560dfc549f8c7e516af284ef', name: 'INTRUST Bank Arena' },
      teams: {
        home: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '31ffb756ae0a30e567dcf226',
          externalId: '72',
          name: 'Wichita Thunder',
          shortName: 'WIC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/wichita-thunder' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/72.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
        away: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: 'd9faf64eaea21fb86ce70a49',
          externalId: '70',
          name: 'Rapid City Rush',
          shortName: 'RC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: {
              echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/rapid-city-rush' },
              echlrapidcity: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/team' },
            },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/70.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
      },
      audio: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'http://mixlr.com/wichita-thunder/' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'https://rapidcityrush.com/en/media-center/listen-live' },
      },
      video: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
      },
      status: 'not-started',
    },
    {
      _type: 'Corebine.Core.Sport.Match',
      _entityId: '94eca3352d2c80c84a9b33ea',
      externalId: '18235',
      externalSource: 'hockeyTech',
      startDate: '2021-01-31T22:05:00.000Z',
      venue: { _type: 'Corebine.Core.Sport.Arena', _entityId: '560dfc549f8c7e516af284ef', name: 'INTRUST Bank Arena' },
      teams: {
        home: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '31ffb756ae0a30e567dcf226',
          externalId: '72',
          name: 'Wichita Thunder',
          shortName: 'WIC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/wichita-thunder' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/72.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
        away: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: 'd9faf64eaea21fb86ce70a49',
          externalId: '70',
          name: 'Rapid City Rush',
          shortName: 'RC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: {
              echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/rapid-city-rush' },
              echlrapidcity: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/team' },
            },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/70.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
      },
      audio: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'http://mixlr.com/wichita-thunder/' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'https://rapidcityrush.com/en/media-center/listen-live' },
      },
      video: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
      },
      status: 'not-started',
    },
    {
      _type: 'Corebine.Core.Sport.Match',
      _entityId: 'dc691957061b36dfc6351c32',
      externalId: '18237',
      externalSource: 'hockeyTech',
      startDate: '2021-02-04T01:05:00.000Z',
      venue: { _type: 'Corebine.Core.Sport.Arena', _entityId: 'ef652986070c9d793c51f78e', name: 'Allen Event Center' },
      teams: {
        home: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '5c5c2fc55ce4ceb584def768',
          externalId: '66',
          name: 'Allen Americans',
          shortName: 'ALN',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/allen-americans' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/66.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
        away: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '31ffb756ae0a30e567dcf226',
          externalId: '72',
          name: 'Wichita Thunder',
          shortName: 'WIC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/wichita-thunder' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/72.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
      },
      audio: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'http://radio.securenetsystems.net/v5/AAHC' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'http://mixlr.com/wichita-thunder/' },
      },
      video: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
      },
      status: 'not-started',
    },
    {
      _type: 'Corebine.Core.Sport.Match',
      _entityId: 'e011c30b0ec5fe5d27271e4f',
      externalId: '18241',
      externalSource: 'hockeyTech',
      startDate: '2021-02-06T01:05:00.000Z',
      venue: { _type: 'Corebine.Core.Sport.Arena', _entityId: 'ef652986070c9d793c51f78e', name: 'Allen Event Center' },
      teams: {
        home: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '5c5c2fc55ce4ceb584def768',
          externalId: '66',
          name: 'Allen Americans',
          shortName: 'ALN',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/allen-americans' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/66.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
        away: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '31ffb756ae0a30e567dcf226',
          externalId: '72',
          name: 'Wichita Thunder',
          shortName: 'WIC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/wichita-thunder' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/72.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
      },
      audio: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'http://radio.securenetsystems.net/v5/AAHC' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'http://mixlr.com/wichita-thunder/' },
      },
      video: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
      },
      status: 'not-started',
    },
    {
      _type: 'Corebine.Core.Sport.Match',
      _entityId: '93c94bdb1e755c29df2664db',
      externalId: '18251',
      externalSource: 'hockeyTech',
      startDate: '2021-02-07T01:05:00.000Z',
      venue: { _type: 'Corebine.Core.Sport.Arena', _entityId: '560dfc549f8c7e516af284ef', name: 'INTRUST Bank Arena' },
      teams: {
        home: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '31ffb756ae0a30e567dcf226',
          externalId: '72',
          name: 'Wichita Thunder',
          shortName: 'WIC',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/wichita-thunder' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/72.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
        away: {
          _type: 'Corebine.Core.Sport.Team',
          _entityId: '5c5c2fc55ce4ceb584def768',
          externalId: '66',
          name: 'Allen Americans',
          shortName: 'ALN',
          link: {
            _type: 'Corebine.Core.Type.Link.ClientSpecific',
            clients: { echl: { _type: 'Corebine.Core.Type.Link.Internal', pageEntityId: '1', url: '/teams/allen-americans' } },
          },
          logo: { _type: 'Corebine.Core.Image.Generic', url: 'https://assets.leaguestat.com/echl/logos/66.png' },
          externalSource: 'hockeyTech',
          info: {
            _type: 'Corebine.Core.Sport.Team.Info',
            properties: [
              { _type: 'Corebine.Core.Type.Property.String', name: 'Conference', value: 'Western' },
              { _type: 'Corebine.Core.Type.Property.String', name: 'Division', value: 'Mountain' },
            ],
          },
        },
      },
      audio: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'http://mixlr.com/wichita-thunder/' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'http://radio.securenetsystems.net/v5/AAHC' },
      },
      video: {
        home: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
        away: { _type: 'Corebine.Core.Type.Link.External', url: 'https://bit.ly/37eedUo' },
      },
      status: 'not-started',
    },
  ],
  errors: [],
}
