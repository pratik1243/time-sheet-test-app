export const addDays = (days) => {
  let daysArr = [];
  for (let index = 1; index < days + 1; index++) {
    daysArr.push(index);
  }
  return daysArr;
};

export const dateFormat = (dateRangeArr, year, index) => {
  const day = dateRangeArr[index]?.split(" ")[1];
  const month = months[dateRangeArr[index]?.split(" ")[0]];
  const dateValue = dateRangeArr?.length > 0 ? `${day?.length == 1 ? `0${day}` : day}/${month}/${year}` : "MM/dd/yyyy";
  return dateValue;
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
    days: addDays(31),
  },
  {
    month: "February",
    days: addDays(28),
  },
  {
    month: "March",
    days: addDays(31),
  },
  {
    month: "April",
    days: addDays(30),
  },
  {
    month: "May",
    days: addDays(31),
  },
  {
    month: "June",
    days: addDays(30),
  },
  {
    month: "July",
    days: addDays(31),
  },
  {
    month: "August",
    days: addDays(31),
  },
  {
    month: "September",
    days: addDays(30),
  },
  {
    month: "October",
    days: addDays(31),
  },
  {
    month: "November",
    days: addDays(30),
  },
  {
    month: "December",
    days: addDays(31),
  }, 
];
