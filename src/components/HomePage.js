import React, { useEffect, useState } from "react";
import LogTimeModal from "./LogTimeModal";
import TimeGridTable from "./TimeGridTable";
import profileLogo from "../assets/images/profile-icon.svg";
import actionBtnLogo from "../assets/images/action-btn-icon.svg";
import DateRangeField from "./fieldComponents/DateRangeField";
import dropDownIcon from "../assets/images/dropdown-icon.svg";

const HomePage = () => {
  const columnHeaderData = [
    "Issue",
    "Logged",
    "MON-1",
    "TUE-2",
    "WED-3",
    "THU-3",
    "FRI-4",
    "SAT-5",
    "SUN-6",
    "MON-7",
    "TUE-8",
    "WED-9",
    "THU-10",
    "FRI-11",
    "SAT-12",
    "SUN-13",
    "MON-14",
    "TUE-15",
    "WED-16",
    "THU-17",
    "FRI-18",
    "SAT-19",
    "SUN-20",
  ];
  const [logTimeModal, setLogTimeModal] = useState(false);
  const [logTableData, setLogTableData] = useState({
    columns: columnHeaderData,
    rows: [],
  });

  const onCloseModal = () => {
    setLogTimeModal(false);
  };

  useEffect(() => {
    let dateRowsObj = {};
    let rowLogData = [];
    for (const key in logTableData.columns) {
      if (
        logTableData.columns[key].split("-")[1] == "1" ||
        logTableData.columns[key].split("-")[1] == "10" ||
        logTableData.columns[key].split("-")[1] == "17"
      ) {
        dateRowsObj[logTableData.columns[key]] = "4.5";
      } else if (
        logTableData.columns[key] !== "Issue" &&
        logTableData.columns[key] !== "Logged"
      ) {
        dateRowsObj[logTableData.columns[key]] = "";
      }
    }
    for (let index = 0; index < 16; index++) {
      rowLogData.push({
        issues: "ATL-0011 Issue summary",
        logged: "4.5",
        ...dateRowsObj,
      });
    }
    setLogTableData({ ...logTableData, rows: rowLogData });
  }, []);

  return (
    <div>
      <div className="log-date-sec">
        <div className="log-date-left-sec">
          <img src={profileLogo} />
          <span className="profile-name">Divya Shah</span>
        </div>
        <div className="log-date-right-sec">
          <button className="date-selection-btn">
            Days <img src={dropDownIcon} />
          </button>
          <button className="primary-btn" onClick={() => setLogTimeModal(true)}>
            Log Time
          </button>
          <button className="action-btn">
            {" "}
            <img src={actionBtnLogo} />
          </button>
        </div>
      </div>
      <div className="date-range-filter-sec">
        <div>
          <DateRangeField />
        </div>

        <div className="group-by-sec">
          <span className="group-by-txt">Group by</span>
          <div className="group-btn">Issue <img src={dropDownIcon} /></div>
        </div>
      </div>
      <TimeGridTable tableData={logTableData} />
      <LogTimeModal open={logTimeModal} closeModal={onCloseModal} />
    </div>
  );
};

export default HomePage;
