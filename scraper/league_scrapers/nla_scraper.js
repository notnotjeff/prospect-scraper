// EXAMPLE
// {
//   profile_url: 'https://data.sihf.ch/Statistic/api/cms/cache300?alias=player&searchQuery=1//1&filterQuery=2020/3092/101151&filterBy=Season,Phase&orderBy=points&orderByDescending=true&take=20&callback=externalStatisticsCallback&skip=-1&language=de',
//   games_url: '',
//   league: 'NLA',
// },

module.exports = {
  seasonScrape(teamData, name) {
    let goals = 0;
    let assists = 0;
    let points = 0;
    const shots = 0;
    let games_played = 0;

    const prospect = teamData.filter(player => {
      return player[1] === name;
    });

    if (prospect.length > 0) {
      games_played = prospect[0][4];
      goals = prospect[0][5];
      assists = prospect[0][6];
      points = prospect[0][7];
    }

    return [goals, assists, points, shots, games_played];
  }
};
