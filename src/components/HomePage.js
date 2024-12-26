import React, { useState } from "react";
import LogTimeModal from "./LogTimeModal";
import TimeGridTable from "./TimeGridTable";
import profileLogo from "../assets/images/profile-icon.svg";
import actionBtnLogo from "../assets/images/action-btn-icon.svg";
import { DateRangePicker } from "rsuite";
import "rsuite/DateRangePicker/styles/index.css";

const HomePage = () => {
  const [logTimeModal, setLogTimeModal] = useState(false);
  const [logTableData, setLogTableData] = useState({
    columns: [
      "Issue",
      "Logged",
      "MON-1",
      "TUE-2",
      "Wed-3",
      "THU-3",
      "FRI-4",
      "SAT-5",
      "SUN-6",
      "MON-7",
      "TUE-8",
      "Wed-9",
      "THU-10",
      "FRI-11",
      "SAT-12",
      "SUN-13",
      "MON-14",
      "TUE-15",
      "Wed-16",
      "THU-17",
      "FRI-18",
    ],
    rows: [
      {
        issues: "ATL-0011 Issue summary",
        logged: "4.5",
      },
      {
        issues: "ATL-0011 Issue summary",
        logged: "4.5",
      },
      {
        issues: "ATL-0011 Issue summary",
        logged: "4.5",
      },
      {
        issues: "ATL-0011 Issue summary",
        logged: "4.5",
      },
      {
        issues: "ATL-0011 Issue summary",
        logged: "4.5",
      },
      {
        issues: "ATL-0011 Issue summary",
        logged: "4.5",
      },
      {
        issues: "ATL-0011 Issue summary",
        logged: "4.5",
      },
      {
        issues: "ATL-0011 Issue summary",
        logged: "4.5",
      },
      {
        issues: "ATL-0011 Issue summary",
        logged: "4.5",
      },
      {
        issues: "ATL-0011 Issue summary",
        logged: "4.5",
      },
      {
        issues: "ATL-0011 Issue summary",
        logged: "4.5",
      },
      {
        issues: "ATL-0011 Issue summary",
        logged: "4.5",
      },
      {
        issues: "ATL-0011 Issue summary",
        logged: "4.5",
      },
      {
        issues: "ATL-0011 Issue summary",
        logged: "4.5",
      },

      {
        issues: "ATL-0011 Issue summary",
        logged: "4.5",
      },
      {
        issues: "ATL-0011 Issue summary",
        logged: "4.5",
      },
      {
        issues: "ATL-0011 Issue summary",
        logged: "4.5",
      },
    ],
  });

  const onCloseModal = () => {
    setLogTimeModal(false);
  };

  return (
    <div>
      <div className="log-date-sec">
        <div className="log-date-left-sec">
          <img src={profileLogo} />
          <span className="profile-name">Divya Shah</span>
        </div>

        <div className="log-date-right-sec">
          <button className="primary-btn" onClick={() => setLogTimeModal(true)}>
            Log Time
          </button>
          <button className="action-btn">
            {" "}
            <img src={actionBtnLogo} />
          </button>
        </div>
      </div>

      <DateRangePicker showHeader={false} format="MM/dd/yyyy" character=" – " />
      <LogTimeModal open={logTimeModal} closeModal={onCloseModal} />
      <TimeGridTable tableData={logTableData} />
    </div>
  );
};

export default HomePage;
