import React, { useEffect, useMemo, useState } from "react";
import InputField from "./InputField";
import dropDownIcon from "../../assets/images/dropdown-icon.svg";
import calendarIcon from "../../assets/images/calendar-icon.png";
import {
  dateFormat,
  months,
  dates,
  getLastWeekAndCurrentDates,
} from "../../assets/utils/dateRangeUtils";

const DateRangeField = ({ isSingleDateRange }) => {
  const [daylist, setDayList] = useState([]);
  const [dateRangeArr, setDateRangeArr] = useState([]);
  const [currentHoverDate, setCurrentHoverDate] = useState("");

  let direction = null;
  let filterRanges = [];
  let currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .split(" ");
  let startDateIndex = daylist.indexOf(dateRangeArr[0]);
  let endDateIndex = daylist.indexOf(
    currentHoverDate ? currentHoverDate : dateRangeArr[1]
  );
  let currentMonthIndex = dates.map((el) => el?.month).indexOf(currentDate[0]);

  const [selectedRanges, setSelectedRanges] = useState([]);
  const [monthDaysPanel, setMonthDaysPanel] = useState([]);
  const [dateRangeValue, setDateRangeValue] = useState();
  const [middleEndPanel, setMiddleEndPanel] = useState(false);
  const [openDateRange, setOpenDateRange] = useState(false);
  const [dir, setDir] = useState(false);
  const [year, setYear] = useState();
  const [calendar1, setCalendar1] = useState(0);
  const [calendar2, setCalendar2] = useState(1);
  const [month, setMonth] = useState("");
  const [showMonthPanel, setShowMonthPanel] = useState(false);
  const [dateRangePanel, setDateRangePanel] = useState(
    isSingleDateRange
      ? [dates[calendar1]]
      : [dates[calendar1], dates[calendar2]]
  );
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
      if (dateRangeArr.length > 0) {
        setMiddleEndPanel(true);
      }
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

  const prevDateFunc1 = () => {
    if (calendar1 == 0) {
      setCalendar1(11);
      setYear(year - 1);
      if (dateRangeArr.length > 0) {
        setMiddleEndPanel(true);
      }
    } else {
      setCalendar1((prev) => prev - 1);
    }
  };

  const nextDateFunc1 = () => {
    if (calendar1 == 11) {
      setCalendar1(0);
      setYear(year + 1);
      setMiddleEndPanel(true);
    } else {
      setCalendar1((prev) => prev + 1);
    }
  };

  const dateSelect = (month, day) => {
    let dateSelected = `${month} ${day}`;
    if (dateRangeArr.length == 2) {
      setDateRangeArr([dateSelected]);
      setSelectedRanges([]);
      setMiddleEndPanel(false);
      direction = null;
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
    setCustomDateType("");
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

    if (isSingleDateRange) {
      setCalendar1(ind + 1);
    } else {
      if (i == 0) {
        setCalendar1(0);
        setCalendar2(1);
      } else {
        setCalendar1(ind);
        setCalendar2(ind + 1);
      }
    }
    setShowMonthPanel(false);
  };

  const selectedRangesFunc = () => {
    let selectedRange = [];
    for (let i = 0; i < dates.length; i++) {
      for (let j = 0; j < dates[i]?.days.length; j++) {
        if (typeof dates[i]?.days[j] !== "string") {
          selectedRange.push(`${dates[i]?.month} ${dates[i]?.days[j]}`);
        }
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
    let filteredArray1 = [];
    let filteredArray2 = [];

    if (dateRangeArr.length > 0 || customDateType) {
      if (customDateType == "Last week") {
        filterRanges = memoizedCustomDateFunc.lastWeek;
        setDateRangeArr([
          filterRanges[0],
          filterRanges[filterRanges.length - 1],
        ]);
      } else if (customDateType == "Current week") {
        filterRanges = memoizedCustomDateFunc.currentWeek;
        setDateRangeArr([
          filterRanges[0],
          filterRanges[filterRanges.length - 1],
        ]);
      } else if (customDateType == "Last month") {
        filterRanges = memoizedCustomDateFunc.lastMonth;
        setDateRangeArr([
          filterRanges[0],
          filterRanges[filterRanges.length - 1],
        ]);
      } else if (customDateType == "Current month") {
        filterRanges = memoizedCustomDateFunc.currentMonth;
        setDateRangeArr([
          filterRanges[0],
          filterRanges[filterRanges.length - 1],
        ]);
      } else if (startDateIndex < endDateIndex && !middleEndPanel) {
        if (calendar1 == 11 && middleEndPanel) {
          direction = "left";
          setDir(true);
        } else {
          direction = "right";
          setDir(false);
        }
        filterRanges = memoizedRangeRenderFunc.slice(
          startDateIndex,
          endDateIndex + 1
        );
      } else {
        filterRanges = memoizedRangeRenderFunc.slice(
          endDateIndex,
          startDateIndex + 1
        );
        if (calendar1 == 0 && middleEndPanel) {
          direction = "right";
          setDir(false);
        } else {
          direction = "left";
          setDir(true);
        }
      }

      if (middleEndPanel && direction == "left") {
        filteredArray1 = memoizedRangeRenderFunc.slice(0, startDateIndex);
        filteredArray2 = memoizedRangeRenderFunc.slice(endDateIndex);
        filterRanges = [...filteredArray1, ...filteredArray2];
        setDir(true);
      } else if (middleEndPanel && direction == "right") {
        filteredArray1 = memoizedRangeRenderFunc.slice(startDateIndex);
        filteredArray2 = memoizedRangeRenderFunc.slice(0, endDateIndex + 1);
        filterRanges = [...filteredArray1, ...filteredArray2];
        setDir(false);
      }
    }
    return filterRanges;
  };

  const onCustomDateSelect = (ele) => {
    setDateRangeArr([]);
    setCustomDateType(ele);

    if(!middleEndPanel){
      setYear(parseInt(currentDate[2]));
    }
  };

  const memoizedRangeRenderFunc = useMemo(
    () => selectedRangesFunc(),
    [daylist]
  );
  const memoizedMonthListRenderFunc = useMemo(
    () => monthListFunc(),
    [monthDaysPanel]
  );
  const memoizedCustomDateFunc = useMemo(
    () => getLastWeekAndCurrentDates(),
    []
  );
  const memoizedSeletecRangesFunc = useMemo(
    () => renderSelectedRanges(),
    [selectedRanges, customDateType]
  );

  useEffect(() => {
    if(openDateRange){
      setDayList(memoizedRangeRenderFunc);
      setMonthDaysPanel(memoizedMonthListRenderFunc);
      setYear(parseInt(currentDate[2]));
      setMonth(currentDate[0]);
      setCalendar1(currentMonthIndex);
      setCalendar2(currentMonthIndex + 1);
      if(!middleEndPanel){
        setDateRangeArr([`${currentDate[0]} ${currentDate[1].slice(0, -1)}`, `${currentDate[0]} ${currentDate[1].slice(0, -1)}`])
      }
    }
  }, [openDateRange]);

  useEffect(() => {
    if (isSingleDateRange) {
      setDateRangePanel([dates[calendar1]]);
    } else {
      setDateRangePanel([dates[calendar1], dates[calendar2]]);
    }
  }, [calendar1, calendar2]);

  useEffect(() => {
    if (dateRangeArr.length > 0) {
      setSelectedRanges(memoizedSeletecRangesFunc);
      setDateRange({
        ...dateRange,
        startDate: dateFormat(dateRangeArr, year, dir == true ? 1 : 0),
        endDate: dateFormat(dateRangeArr, year, dir == true ? 0 : 1),
      });
    }
  }, [dateRangeArr, currentHoverDate]);

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
      <button
        className="input-navigate-btn prev"
        onClick={isSingleDateRange ? prevDateFunc1 : prevDateFunc}
      >
        <img src={dropDownIcon} />
      </button>
      <button
        className="input-navigate-btn next"
        onClick={isSingleDateRange ? nextDateFunc1 : nextDateFunc}
      >
        <img src={dropDownIcon} />
      </button>
      {openDateRange && (
        <div className="datepicker-range-sec">
          <div className="date-inner-range-sec">
            <div className="date-range-panel">
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
                    value={dateRange.endDate}
                    readOnly
                    placeholder={"2/18/1993"}
                    label="End date"
                    endIcon={calendarIcon}
                  />
                </div>
              </div>

              {showMonthPanel ? (
                <div className="month-year-select-panel">
                  {memoizedMonthListRenderFunc?.map((ele, index) => {
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
                        className={`month-sec ${
                          !isSingleDateRange
                            ? index == 0
                              ? "pr-1"
                              : "pl-1"
                            : ""
                        }`}
                        key={index}
                      >
                        <div className="month-head-sec">
                          {index == 0 && (
                            <button
                              onClick={
                                isSingleDateRange ? prevDateFunc1 : prevDateFunc
                              }
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
                          {!isSingleDateRange && index == 0 && <div></div>}
                          {index !== 0 && (
                            <button
                              onClick={nextDateFunc}
                              className="date-navigate-btn next"
                            >
                              <img src={dropDownIcon} />
                            </button>
                          )}
                          {isSingleDateRange && (
                            <button
                              onClick={nextDateFunc1}
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
                                  memoizedSeletecRangesFunc?.includes(
                                    `${date?.month} ${el}`
                                  )
                                    ? "ranges-selected"
                                    : ""
                                } 
                                  ${
                                    (dateRangeArr[0] ==
                                      `${date?.month} ${el}` &&
                                      typeof el !== "string") ||
                                    (dateRangeArr[1] ==
                                      `${date?.month} ${el}` &&
                                      typeof el !== "string")
                                      ? "selected"
                                      : ""
                                  } ${
                                  typeof el == "string" ? "disable-day" : ""
                                }`}
                                onClick={() => dateSelect(date?.month, el)}
                                onMouseOver={() => {
                                  if (
                                    dateRangeArr.length > 0 &&
                                    dateRangeArr.length !== 2 &&
                                    typeof el !== "string"
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
