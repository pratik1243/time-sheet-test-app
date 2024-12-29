import React from "react";
import priorityLogo from "../assets/images/priority-icon.png";

const TimeGridTable = ({ tableData }) => {
  let count = 0;
  let totalNum = [];
  const columnsHeaders = tableData?.columns;
  const rowData = tableData?.rows;

  const getTotal = (values) => {
    totalNum.push(values);
    for (let index = 0; index < totalNum.length; index++) {
      if (totalNum[index] !== "") {
        count = parseInt(totalNum[index]) + count;
      }
    }

    return count;
  };

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
              {Object.entries(row).map(([key, value], i) => {
                return (
                  <>
                    {rowData.length - 1 === index && i == 0 ? (
                      <td className="table-cell" key={i}>
                        {" "}
                        <span className="total-table-txt">Total </span>
                      </td>
                    ) : (
                      <td
                        key={i}
                        className={`table-cell ${
                          key !== "issues" ? "text-center-cell" : ""
                        } ${key == "logged" ? "log-table-txt" : ""}`}
                      >
                        {rowData.length - 1 === index ? (
                          <>{getTotal(value)}</>
                        ) : (
                          <>
                            {key == "issues" ? (
                              <div className="issues-txt-sec">
                                <img src={priorityLogo} />
                                <span className="txt-1">{value.split(" ")[0]}</span>
                                <span className="txt-2">{value.split(" ")[1]} {value.split(" ")[2]}</span>
                              </div>
                            ): <>{value}</>}
                          </>
                        )}
                      </td>
                    )}
                  </>
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
