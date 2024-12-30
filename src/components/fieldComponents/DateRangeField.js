import React, { useEffect, useMemo, useState } from "react";
import InputField from "./InputField";
import dropDownIcon from "../../assets/images/dropdown-icon.svg";
import calendarIcon from "../../assets/images/calendar-icon.png";
import { dateFormat, months, dates } from "../../assets/utils/dateRangeUtils";

const DateRangeField = () => {
  const currentDate = new Date()
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .split(" ");
  const [dateRangeArr, setDateRangeArr] = useState([]);
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [monthDaysPanel, setMonthDaysPanel] = useState([]);
  const [dateRangeValue, setDateRangeValue] = useState();
  const [middleEndPanel, setMiddleEndPanel] = useState(false);
  const [openDateRange, setOpenDateRange] = useState(false);
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
    "Last quarter",
    "Current quarter",
  ]);

  const [customDateType, setCustomDateType] = useState("");

  const prevDateFunc = () => {
    if (calendar1 == 0) {
      setCalendar1(10);
      setCalendar2(11);
      setYear(year - 1);
      setMiddleEndPanel(true);
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
      setMiddleEndPanel(true);
    } else {
      setCalendar1((prev) => prev + 1);
      setCalendar2((prev) => prev + 1);
    }
  };

  const dateSelect = (month, day) => {
    let dateSelected = `${month} ${day}`;
    if (dateRangeArr.length == 2) {
      setDateRangeArr([dateSelected]);
      setSelectedRanges([]);
    } else {
      setDateRangeArr((prev) => [...prev, dateSelected]);
    }
    setCustomDateType("");
    setMonth(month);
  };

  const applyDate = () => {
    setOpenDateRange(false);
    setDateRangeValue(dateRange);
  };

  const cancelDate = () => {
    setOpenDateRange(false);
    setSelectedRanges([]);
    setDateRangeArr([]);
    setDateRangeValue();
    setShowMonthPanel(false);
    setDateRange({
      ...dateRange,
      startDate: "MM/dd/yyyy",
      endDate: "MM/dd/yyyy",
    });
  };

  const monthyearSelect = (ele, i) => {
    let ind = i - 1;
    setYear(ele?.year);
    setCalendar1(ind);
    setCalendar2(ind + 1);
    setShowMonthPanel(false);
  };

  const selectedRangesFunc = () => {
    let selectedRange = [];
    for (let i = 0; i < dates.length; i++) {
      for (let j = 0; j < dates[i]?.days.length; j++) {
        selectedRange.push(`${dates[i]?.month} ${dates[i]?.days[j]}`);
      }
    }
    return selectedRange;
  };

  const monthListFunc = () => {
    let yearMonthList = [];
    for (let index = 1950; index < 2044; index++) {
      yearMonthList.push({
        year: index,
        months: Object.values(months).map((el) => el),
      });
    }
    return yearMonthList;
  };

  const renderSelectedRanges = () => {
    let filterRanges = [];
    let currentDateDay = `${currentDate[0]} ${currentDate[1]}`.slice(0, -1);
    let currentDateIndex = daylist.indexOf(currentDateDay);
    let startDateIndex = daylist.indexOf(dateRangeArr[0]);
    let endDateIndex = daylist.indexOf(
      currentHoverDate ? currentHoverDate : dateRangeArr[1]
    );
    if (startDateIndex < endDateIndex) {
      filterRanges = daylist.slice(startDateIndex, endDateIndex + 1);
    } else if (customDateType == "Current week") {
      if (currentDateIndex > 362) {
        filterRanges = [
          ...daylist.slice(currentDateIndex - 1),
          ...daylist.slice(0, endDateIndex + 5),
        ];
      } else {
        filterRanges = daylist.slice(
          currentDateIndex + 8,
          currentDateIndex + 1
        );
      }
    } else if (customDateType == "Last week") {
      filterRanges = daylist.slice(currentDateIndex - 8, currentDateIndex - 1);
    } else {
      filterRanges = daylist.slice(endDateIndex, startDateIndex + 1);
    }

    if (middleEndPanel) {
      let filteredArray = daylist.slice(startDateIndex);
      let filteredArray2 = daylist.slice(0, endDateIndex + 1);
      filterRanges = [...filteredArray, ...filteredArray2];
      if (filterRanges.length > 300 || filterRanges.length > 365) {
        setMiddleEndPanel(false);
        setSelectedRanges([]);
      }
    }

    return filterRanges;
  };

  const onCustomDateSelect = (ele) => {
    setDateRangeArr([]);
    setCustomDateType(ele);

    if (ele == "Current month") {
      setMonth(currentDate[0]);
    } else if (ele == "Last month") {
      let currentDate = new Date();
      let currentMonth = currentDate.getMonth();
      let previousMonth = currentMonth - 1;
      let previousMonthDate = new Date(currentDate.setMonth(previousMonth));
      let previousMonthText = previousMonthDate.toLocaleString("default", {
        month: "long",
      });

      setMonth(previousMonthText);
    }
  };

  const memoizedRangeRenderFunc = useMemo(
    () => selectedRangesFunc(),
    [daylist]
  );
  const memoizedMonthListRenderFunc = useMemo(() => monthListFunc(), [year]);
  const memoizedSeletecRangesFunc = useMemo(
    () => renderSelectedRanges(),
    [selectedRanges, customDateType]
  );

  useEffect(() => {
    let currentMonthIndex =
      dates.map((el) => el?.month).indexOf(currentDate[0]) - 1;
    setDayList(memoizedRangeRenderFunc);
    setMonthDaysPanel(memoizedMonthListRenderFunc);
    setYear(parseInt(currentDate[2]));
    setCalendar1(currentMonthIndex);
    setCalendar2(currentMonthIndex + 1);
  }, []);

  useEffect(() => {
    setDateRangePanel([dates[calendar1], dates[calendar2]]);
  }, [calendar1, calendar2]);

  useEffect(() => {
    setSelectedRanges(memoizedSeletecRangesFunc);
    setDateRange({
      ...dateRange,
      startDate: dateFormat(dateRangeArr, year, 0),
      endDate: dateFormat(dateRangeArr, year, 1),
    });
  }, [dateRangeArr, customDateType, currentHoverDate]);

  return (
    <div className="date-range-picker">
      <img src={calendarIcon} className="input-calendar-icon" />
      <input
        type="text"
        readOnly={true}
        className="input-field-sec"
        value={
          dateRangeValue
            ? `${dateRangeValue?.startDate} - ${dateRangeValue?.endDate}`
            : "MM/dd/yyyy - MM/dd/yyyy"
        }
        onClick={() => {
          setOpenDateRange(true);
        }}
      />
      <button className="input-navigate-btn prev" onClick={prevDateFunc}>
        <img src={dropDownIcon} />
      </button>
      <button className="input-navigate-btn next" onClick={nextDateFunc}>
        <img src={dropDownIcon} />
      </button>
      {openDateRange && (
        <div className="datepicker-range-sec">
          <div className="date-inner-range-sec">
            <div>
              <div className="date-range-input-sec">
                <div className="input-sec">
                  <InputField
                    value={dateRange.startDate}
                    placeholder={"2/18/1993"}
                    readOnly
                    label="Start date"
                    endIcon={calendarIcon}
                  />
                </div>
                <div className="input-sec">
                  <InputField
                    value={dateRangeArr[1] ? dateRange.endDate : "MM/dd/yyyy"}
                    readOnly
                    placeholder={"2/18/1993"}
                    label="End date"
                    endIcon={calendarIcon}
                  />
                </div>
              </div>

              {showMonthPanel ? (
                <div className="month-year-select-panel">
                  {monthDaysPanel?.map((ele, index) => {
                    return (
                      <div key={index} className="year-day-select-section">
                        <span className="year-txt">{ele?.year}</span>

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
                      <div
                        className={`month-sec ${index == 0 ? "pr-1" : "pl-1"}`}
                        key={index}
                      >
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

                        <div className="week-head-sec">
                          <span>SUN</span>
                          <span>MON</span>
                          <span>TUE</span>
                          <span>WED</span>
                          <span>THU</span>
                          <span>FRI</span>
                          <span>SAT</span>
                        </div>

                        <div className="day-sec">
                          {date?.days.map((el, i) => {
                            return (
                              <div
                                key={i}
                                className={`days-btn ${
                                  selectedRanges?.includes(
                                    `${date?.month} ${el}`
                                  ) ||
                                  (customDateType == "Current month" &&
                                    month == date.month) ||
                                  (customDateType == "Last month" &&
                                    month == date.month)
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

            <div className="custom-date-sec">
              {customDates?.map((ele, index) => {
                return (
                  <a
                    key={index}
                    className="custom-type-btn"
                    onClick={() => {
                      onCustomDateSelect(ele);
                    }}
                  >
                    {ele}
                  </a>
                );
              })}

              <div className="custom-days-field">
                <input type={"text"} value={7} /> <span>Days</span>
              </div>
            </div>
          </div>
          <div className="apply-date-sec">
            <button
              className="secondary-btn cancel-date-btn"
              onClick={cancelDate}
            >
              Cancel
            </button>
            <button className="primary-btn" onClick={applyDate}>
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeField;
