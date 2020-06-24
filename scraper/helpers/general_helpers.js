// Get age of player from todays date
module.exports = {
  getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    const age = today - birthDate;
    return Math.floor((age / 31557600000) * 10) / 10;
  },

  // Get current season
  getCurrentSeason() {
    // Return string in format YYYY-YY eg: 2018-19
    const date = new Date();
    const month = date.getMonth() + 1;

    if (month > 8) {
      return `${date.getFullYear()}-${(date.getFullYear() + 1)
        .toString()
        .substr(-2)}`;
    }

    date.setFullYear(date.getFullYear() - 1);
    return `${date.getFullYear()}-${(date.getFullYear() + 1)
      .toString()
      .substr(-2)}`;
  }
};
