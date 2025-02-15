let disableDates = {
  0: [["29", "30", "31"], ["1"]],
  1: [["26", "27", "28", "29", "30", "31"], ["1"]],
  2: [
    ["23", "24", "25", "26", "27", "28"],
    ["1", "2", "3", "4", "5"],
  ],
  3: [
    ["30", "31"],
    ["1", "2", "3"],
  ],
  4: [["27", "28", "29", "30"], []],
  5: [[], ["1", "2", "3", "4", "5"]],
  6: [
    ["29", "30"],
    ["1", "2"],
  ],
  7: [
    ["27", "28", "29", "30", "31"],
    ["1", "2", "3", "4", "5", "6"],
  ],
  8: [["31"], ["1", "2", "3", "4", "5", "6"]],
  9: [["28", "29", "30"], ["1"]],
  10: [
    ["26", "27", "28", "29", "30", "31"],
    ["1", "2", "3", "4", "5", "6"],
  ],
  11: [["30"], ["1", "2", "3"]],
};

export const addDays = (days, i) => {
  let daysArr = [];
  for (let index = 1; index < days + 1; index++) {
    daysArr.push(index);
  }
  let newDaysArr = [...disableDates[i][0], ...daysArr, ...disableDates[i][1]];
  return newDaysArr;
};

export const dateFormat = (dateRangeArr, year, index) => {
  const day = dateRangeArr[index]?.split(" ")[1];
  const month = months[dateRangeArr[index]?.split(" ")[0]];
  const dateValue =
    dateRangeArr?.length > 0 && day && month
      ? `${day?.length == 1 ? `0${day}` : day}/${month}/${year}`
      : "MM/dd/yyyy";
  return dateValue;
};

export const getLastWeekAndCurrentDates = (lastNum) => {
  const today = new Date();
  const dates = {
    currentWeek: [],
    lastWeek: [],
    currentMonth: [],
    lastMonth: [],
    getDaysBefore: [],
    getDaysAfter: [],
  };

  const currentDay = today.getDay();
  const currentMonth = today.getMonth();
  const lastMonth = new Date(today);
  lastMonth.setMonth(currentMonth - 1);

  const startOfWeek = new Date(today);
  if (!lastNum) {
    startOfWeek.setDate(today.getDate() - currentDay);
  }

  const startOfPreviousWeek = new Date(startOfWeek);
  startOfPreviousWeek.setDate(startOfWeek.getDate() - 7);

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    dates.currentWeek.push(
      date.toLocaleDateString("en-US", { month: "long", day: "numeric" })
    );
  }

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfPreviousWeek);
    date.setDate(startOfPreviousWeek.getDate() + i);
    dates.lastWeek.push(
      date.toLocaleDateString("en-US", { month: "long", day: "numeric" })
    );
  }

  const currentMonthDates = [];
  const currentMonthStart = new Date(today.getFullYear(), currentMonth, 1);
  const currentMonthEnd = new Date(today.getFullYear(), currentMonth + 1, 0);

  for (
    let i = currentMonthStart.getDate();
    i <= currentMonthEnd.getDate();
    i++
  ) {
    const date = new Date(today.getFullYear(), currentMonth, i);
    currentMonthDates.push(
      date.toLocaleDateString("en-US", { month: "long", day: "numeric" })
    );
  }

  dates.currentMonth = currentMonthDates;

  const lastMonthDates = [];
  const lastMonthStart = new Date(today.getFullYear(), currentMonth - 1, 1);
  const lastMonthEnd = new Date(today.getFullYear(), currentMonth, 0);

  for (let i = lastMonthStart.getDate(); i <= lastMonthEnd.getDate(); i++) {
    const date = new Date(today.getFullYear(), currentMonth - 1, i);
    lastMonthDates.push(
      date.toLocaleDateString("en-US", { month: "long", day: "numeric" })
    );
  }

  dates.lastMonth = lastMonthDates;

  for (let i = (lastNum - 1); i >= 0; i--) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() - i);
    dates.getDaysBefore.push(
      date.toLocaleDateString("en-US", { month: "long", day: "numeric" })
    );
  }

  for (let i = 0; i < lastNum; i++) {
    const date = new Date(startOfPreviousWeek);
    date.setDate(startOfPreviousWeek.getDate() + i);
    dates.getDaysAfter.push(date.toLocaleDateString("en-US", { month: "long", day: "numeric" }));
  }

  return dates;
};

export const months = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

export const dates = [
  {
    month: "January",
    days: addDays(31, 0),
  },
  {
    month: "February",
    days: addDays(28, 1),
  },
  {
    month: "March",
    days: addDays(31, 2),
  },
  {
    month: "April",
    days: addDays(30, 3),
  },
  {
    month: "May",
    days: addDays(31, 4),
  },
  {
    month: "June",
    days: addDays(30, 5),
  },
  {
    month: "July",
    days: addDays(31, 6),
  },
  {
    month: "August",
    days: addDays(31, 7),
  },
  {
    month: "September",
    days: addDays(30, 8),
  },
  {
    month: "October",
    days: addDays(31, 9),
  },
  {
    month: "November",
    days: addDays(30, 10),
  },
  {
    month: "December",
    days: addDays(31, 11),
  },
];
