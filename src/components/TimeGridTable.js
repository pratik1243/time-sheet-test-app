import React from "react";
import priorityLogo from "../assets/images/priority-icon.png";

const TimeGridTable = ({ tableData }) => {
  const columnsHeaders = tableData?.columns;
  const rowData = tableData?.rows;

  console.log("tableData", tableData);

  return (
    <div className="table-container">
      <table className="table-section">
        <tr>
          {columnsHeaders.map((head, index) => {
            return (
              <th key={index} className="table-head">
                {head.includes("-") ? (
                  <div className="date-head-sec">
                    <span className="date-week-head">{head.split("-")[0]}</span>
                    <span className={`date-day-head ${head.split("-")[1] == "12" ? 'current-selected-day' : ''}`}>{head.split("-")[1]}</span>
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
            <tr key={index}>
              <td className="table-cell">
                <img src={priorityLogo} /> {row.issues}
              </td>
              <td className="table-cell">{row.logged}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default TimeGridTable;
