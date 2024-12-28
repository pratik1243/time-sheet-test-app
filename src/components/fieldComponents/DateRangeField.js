import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import dropDownIcon from "../../assets/images/dropdown-icon.svg";
import { dateFormat, months, dates } from "../../assets/utils/dateRangeUtils";

const DateRangeField = () => {
  let currentDate = new Date()
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .split(" ");
  const [dateRangeArr, setDateRangeArr] = useState([]);
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [monthDaysPanel, setMonthDaysPanel] = useState([]);
  const [year, setYear] = useState();
  const [daylist, setDayList] = useState([]);
  const [calendar1, setCalendar1] = useState(0);
  const [calendar2, setCalendar2] = useState(1);
  const [month, setMonth] = useState("");
  const [showMonthPanel, setShowMonthPanel] = useState(false);
  const [currentHoverDate, setCurrentHoverDate] = useState("");
  const [dateRangePanel, setDateRangePanel] = useState([
    dates[calendar1],
    dates[calendar2],
  ]);
  const [dateRange, setDateRange] = useState({
    startDate: "MM/dd/yyyy",
    endDate: "MM/dd/yyyy",
  });
  const [customDates, setCustomDates] = useState([
    "Current week",
    "Last week",
    "Current month",
    "Last month",
  ]);

  const [customDateType, setCustomDateType] = useState("");

  const prevDateFunc = () => {
    if (calendar1 == 0) {
      setCalendar1(10);
      setCalendar2(11);
      setYear(year - 1);
    } else {
      setCalendar1((prev) => prev - 1);
      setCalendar2((prev) => prev - 1);
    }
  };

  const nextDateFunc = () => {
    if (calendar2 == 11) {
      setCalendar1(0);
      setCalendar2(1);
      setYear(year + 1);
    } else {
      setCalendar1((prev) => prev + 1);
      setCalendar2((prev) => prev + 1);
    }
  };

  const dateSelect = (month, day) => {
    let dateSelected = `${month} ${day}`;
    if (dateRangeArr.length == 2) {
      setDateRangeArr([dateSelected]);
    } else {
      setDateRangeArr((prev) => [...prev, dateSelected]);
    }
    setCustomDateType("");
    setMonth(month);
  };

  const applyDate = () => {
    setDateRange({
      ...dateRange,
      startDate: dateFormat(dateRangeArr, year, 0),
      endDate: dateFormat(dateRangeArr, year, 1),
    });
  };

  const monthyearSelect = (ele, i) => {
    let ind = i - 1;
    setYear(ele?.year);
    setCalendar1(ind);
    setCalendar2(ind + 1);
    setShowMonthPanel(false);
  };

  useEffect(() => {
    let selectedRange = [];
    let yearMonthList = [];
    let currentMonthIndex =
      dates.map((el) => el?.month).indexOf(currentDate[0]) - 1;

    for (let i = 0; i < dates.length; i++) {
      for (let j = 0; j < dates[i]?.days.length; j++) {
        selectedRange.push(`${dates[i]?.month} ${dates[i]?.days[j]}`);
      }
    }
    for (let index = 1950; index < 2044; index++) {
      yearMonthList.push({
        year: index,
        months: Object.values(months).map((el) => el),
      });
    }
    setDayList(selectedRange);
    setMonthDaysPanel(yearMonthList);
    setYear(parseInt(currentDate[2]));
    setCalendar1(currentMonthIndex);
    setCalendar2(currentMonthIndex + 1);
  }, []);

  useEffect(() => {
    setDateRangePanel([dates[calendar1], dates[calendar2]]);
  }, [calendar1, calendar2]);

  useEffect(() => {
    let filterRanges = [];
    let currentDateDay = `${currentDate[0]} ${currentDate[1]}`.slice(0, -1);
    let currentDateIndex = daylist.indexOf(currentDateDay);
    let startDateIndex = daylist.indexOf(dateRangeArr[0]);
    let endDateIndex = daylist.indexOf(currentHoverDate ? currentHoverDate : dateRangeArr[1]);
    if (startDateIndex < endDateIndex) {
      filterRanges = daylist.slice(startDateIndex, endDateIndex + 1);
    } else if (customDateType == "Current week") {
      filterRanges = daylist.slice(currentDateIndex - 7, currentDateIndex);
    } else if (customDateType == "Current month") {
      filterRanges = daylist.slice(currentDateIndex - 30, currentDateIndex);
    } else if (customDateType == "Last week") {
      filterRanges = daylist.slice(currentDateIndex - 14, currentDateIndex - 7);
    } else {
      filterRanges = daylist.slice(endDateIndex, startDateIndex + 1);
    }
    setSelectedRanges(filterRanges);
  }, [dateRangeArr, customDateType, currentHoverDate]);

  return (
    <div className="datepicker-range-sec">
      <div className="date-inner-range-sec">
        <div>
          <div className="date-range-input-sec">
            <div>
              <InputField
                value={dateRange.startDate}
                placeholder={"2/18/1993"}
                label="Start date"
              />
            </div>
            <div>
              <InputField
                value={dateRange.endDate}
                placeholder={"2/18/1993"}
                label="End date"
              />
            </div>
          </div>

          {showMonthPanel ? (
            <div className="month-year-select-panel">
              {monthDaysPanel?.map((ele, index) => {
                return (
                  <div key={index}>
                    <span>{ele?.year}</span>

                    <div className="month-panel-grid">
                      {ele?.months.map((el, i) => {
                        return (
                          <span
                            key={i}
                            className="month-btn"
                            onClick={() => monthyearSelect(ele, i)}
                          >
                            {el}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="data-range-calendar-sec">
              {dateRangePanel?.map((date, index) => {
                return (
                  <div className="month-sec" key={index}>
                    <div className="month-head-sec">
                      {index == 0 && (
                        <button
                          onClick={prevDateFunc}
                          className="date-navigate-btn prev"
                        >
                          <img src={dropDownIcon} />
                        </button>
                      )}{" "}
                      {index !== 0 && <div></div>}
                      <span
                        className="date-month-txt"
                        onClick={() => setShowMonthPanel(true)}
                      >
                        {date?.month} {year}
                      </span>
                      {index == 0 && <div></div>}
                      {index !== 0 && (
                        <button
                          onClick={nextDateFunc}
                          className="date-navigate-btn next"
                        >
                          <img src={dropDownIcon} />
                        </button>
                      )}
                    </div>

                    <div className="day-sec">
                      {date?.days.map((el, i) => {
                        return (
                          <div
                            key={i}
                            className={`days-btn ${
                              selectedRanges?.includes(`${date?.month} ${el}`)
                                ? "ranges-selected"
                                : ""
                            } ${
                              dateRangeArr[0] == `${date?.month} ${el}` ||
                              dateRangeArr[1] == `${date?.month} ${el}`
                                ? "selected"
                                : ""
                            }`}
                            onClick={() => dateSelect(date?.month, el)}
                            onMouseOver={() => {
                              if (
                                dateRangeArr.length > 0 &&
                                dateRangeArr.length !== 2
                              ) {
                                setCurrentHoverDate(`${date?.month} ${el}`);
                              } else {
                                setCurrentHoverDate();
                              }
                            }}
                          >
                            {el}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div>
          {customDates?.map((ele, index) => {
            return (
              <div key={index}>
                <a
                  onClick={() => {
                    setDateRangeArr([]);
                    setCustomDateType(ele);
                  }}
                >
                  {ele}
                </a>
              </div>
            );
          })}
        </div>
      </div>
      <div className="apply-date-sec">
        <button className="secondary-btn">cancel</button>
        <button className="primary-btn" onClick={applyDate}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default DateRangeField;
