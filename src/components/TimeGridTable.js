import React from "react";
import priorityLogo from "../assets/images/priority-icon.png";

const TimeGridTable = ({ tableData }) => {
  const columnsHeaders = tableData?.columns;
  const rowData = tableData?.rows;

  return (
    <div className="table-container">
      <table className="table-section">
        <tr>
          {columnsHeaders.map((head, index) => {
            return (
              <th
                key={index}
                className={`table-head ${
                  head !== "Issue" ? "text-center-cell" : ""
                }`}
              >
                {head.includes("-") ? (
                  <div className="date-head-sec">
                    <span className="date-week-head">{head.split("-")[0]}</span>
                    <span
                      className={`date-day-head ${
                        head.split("-")[1] == "10" ? "current-selected-day" : ""
                      }`}
                    >
                      {head.split("-")[1]}
                    </span>
                  </div>
                ) : (
                  head
                )}
              </th>
            );
          })}
        </tr>

        {rowData.map((row, index) => {
          return (
            <tr key={index} className="table-data-row">
              {Object.entries(row).map(([key, value], index) => {
                return (
                  <td
                    className={`table-cell ${
                      key !== "issues" ? "text-center-cell" : ""
                    } ${key == "logged" ? "log-table-txt" : ""}`}
                    key={index}
                  >
                    {key == "issues" && <img src={priorityLogo} />}
                    {value}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default TimeGridTable;
