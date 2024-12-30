import React, { useEffect, useState } from "react";
import priorityLogo from "../assets/images/priority-icon.png";

const TimeGridTable = ({ tableData }) => {
  const columnsHeaders = tableData?.columns;
  const rowData = tableData?.rows;
  const [total, setTotal] = useState(0);

  const getTotal = () => {
    let sum = 0; 
    rowData.forEach((row) => {
      if (row.logged !== "") {
        sum += parseFloat(row.logged); 
      }
    });
    setTotal(sum); 
  };

  useEffect(() => {
    getTotal(); 
  }, [rowData]); 


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
            <>
              {rowData.length - 1 === index ? (
                <tr>
                  {Object.values(rowData.map((el) => el)[index]).map(
                    (ele, i) => {
                      return (
                        <td className={`table-cell ${i !== 0 ? 'text-center-cell' : ''}`} key={i}>
                          {i == 0 ? (
                            <span className="total-table-txt">
                              Total
                            </span>
                          ): i == 1 ? (
                            <span className="total-table-txt">
                              {total}
                            </span>
                          ) : ele ? (
                            <span className="total-table-txt">
                            {ele}
                            </span>
                          ) : (
                            0
                          )}
                        </td>
                      );
                    }
                  )}
                </tr>
              ) : (
                <tr key={index} className="table-data-row">
                  {Object.entries(row).map(([key, value], i) => {
                    return (
                      <td
                        key={i}
                        className={`table-cell ${
                          key !== "issues" ? "text-center-cell" : ""
                        } ${key == "logged" ? "log-table-txt" : ""}`}
                      >
                        {key == "issues" ? (
                          <div className="issues-txt-sec">
                            <img src={priorityLogo} />
                            <span className="txt-1">{value.split(" ")[0]}</span>
                            <span className="txt-2">
                              {value.split(" ")[1]} {value.split(" ")[2]}
                            </span>
                          </div>
                        ) : (
                          <>{value}</>
                        )}
                      </td>
                    );
                  })}
                </tr>
              )}
            </>
          );
        })}
      </table>
    </div>
  );
};

export default TimeGridTable;
