// Set year/month/day for current day and previous day
module.exports = {
  setDateValues() {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (+today.getTimezoneOffset() === 0) {
      const todayOffset = this.isDaylightSavings(today) ? 4 : 5;
      const yesterdayOffset = this.isDaylightSavings(yesterday) ? 4 : 5;
      today.setHours(today.getHours() - todayOffset);
      yesterday.setHours(yesterday.getHours() - yesterdayOffset);
    } else {
      const todayOffset = this.isDaylightSavings(today) ? 0 : 1;
      const yesterdayOffset = this.isDaylightSavings(yesterday) ? 0 : 1;
      today.setHours(today.getHours() - todayOffset);
      yesterday.setHours(yesterday.getHours() - yesterdayOffset);
    }

    let day = String(today.getDate());
    let month = String(today.getMonth() + 1);
    const year = String(today.getFullYear());

    let yDay = String(yesterday.getDate());
    let yMonth = String(yesterday.getMonth() + 1);
    const yYear = String(yesterday.getFullYear());

    // Add leading 0's to month and day if they're less than 10
    day = day < 10 ? `0${day}` : `${day}`;
    yDay = yDay < 10 ? `0${yDay}` : `${yDay}`;
    month = month < 10 ? `0${month}` : `${month}`;
    yMonth = yMonth < 10 ? `0${yMonth}` : `${yMonth}`;

    return {
      day,
      month,
      year,
      yDay,
      yMonth,
      yYear
    };
  },

  // Turns inputed date into the correct format (y, m, d are set to integers for the order of the date)
  // E.G. 2000-01-29 should be set as y=0, m=1, d=3 (and date should be split into array beforehand)
  getDateFromArray(date, y, m, d) {
    let day = date[d];
    let month = date[m];
    const year = date[y];

    month = new Date(Date.parse(`${month} 1, 2012`)).getMonth() + 1;
    month = month < 10 ? `0${month}` : `${month}`;

    day = day < 10 ? `0${day}` : `${day}`;

    return `${year}-${month}-${day}`;
  },

  // Gets month name from integer of a month, for QMJHL game by game
  getMonthName(month, isArrayFriendly = false) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    return monthNames[+month - (isArrayFriendly ? 0 : 1)];
  },

  // FUNCTIONS FOR DAYLIGHT SAVINGS TIME
  isDaylightSavings(today) {
    const dstStart = this.getDateOfSundayInMonth(2, 3);
    const dstEnd = this.getDateOfSundayInMonth(1, 11);
    const offsetHours = today.getTimezoneOffset() === 0 ? 0 : 4; // If run locally in EST you need to offset for time difference from UTC

    // If today is the start of daylight savings, check if it's past 2AM EST from UTC (should be 5 hours ahead during non-DST period)
    if (
      `${today.getMonth()}-${today.getDate()}` ===
      `${dstStart.getMonth()}-${dstStart.getDate()}`
    ) {
      return today.getHours() >= 7 - offsetHours ? true : false;
    }
    // If today is end of daylight savings, check if it's past 2AM EST from UTC (should be 4 hours ahead during DST period)
    if (
      `${today.getMonth()}-${today.getDate()}` ===
      `${dstEnd.getMonth()}-${dstEnd.getDate()}`
    ) {
      return today.getHours() >= 6 - offsetHours ? false : true;
    }

    // It is in between the DST period and return the proper value
    return today < dstEnd && today >= dstStart ? true : false;
  },

  // Finds date of a specific Sunday so that determining if daylight savings time is occuring is possible
  getDateOfSundayInMonth(sn, m) {
    // Format variables from real world values to computer values
    const sundayNumber = (sn - 1) * 7;
    const month = m - 1;

    const currentYear = new Date().getFullYear();
    const start = new Date(currentYear, month, sundayNumber);
    const sunday = sundayNumber + (7 - start.getDay());

    return new Date(currentYear, month, sunday);
  },

  // Gets current time and displays in hours and minutes
  getCurrentTime() {
    // Set Time
    const day = new Date();
    let amPm = "";
    let hours = "";
    const minutes =
      day.getMinutes() < 10 ? `0${day.getMinutes()}` : `${day.getMinutes()}`;
    const offsetHours = this.isDaylightSavings(day) ? 4 : 5;

    if (+day.getTimezoneOffset() === 0) {
      day.setHours(day.getHours() - offsetHours);
    }

    if (+day.getHours() < 12) {
      hours = String(day.getHours());
    } else {
      hours = String(day.getHours() - 12);
    }

    amPm = +day.getHours() < 12 ? "am" : "pm";
    if (+hours === 0) {
      hours = 12;
    }

    return `${hours}:${minutes}${amPm}`;
  },

  // Get year for the start of the current hockey season
  getSeasonStartYear() {
    const today = new Date();
    if (today.getMonth() + 1 < 9) {
      return today.getFullYear() - 1;
    }

    return today.getFullYear();
  }
};
