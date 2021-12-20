import axios from "axios";
import React, { useEffect, useState } from "react";
import "./table.css";

const TableComponent = () => {
  const [columns, setColumns] = useState([]);
  const [filterSortingCol, setFilterSortingCol] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:7000/listCompanies");
    const { data } = response.data;
    transformData(data);
  };
  const transformData = (data) => {
    const transformDataRows = [];
    data.forEach((ele) =>
      transformDataRows.push({
        description: ele.description,
        founded_year: ele.founded_year,
        number_of_employees: ele.number_of_employees || 0,
        phone_number: ele.phone_number || "null",

        products: ele.products.map((item) => item.name) || "no Products",
      })
    );
    setColumns(
      transformDataRows.length > 0 ? Object.keys(transformDataRows[0]) : []
    );
    setFilteredData(transformDataRows);
  };

  const renderItem = (data, key) => {
    if (Array.isArray(data)) {
      return data.map((item) => <span key={key}>{item}</span>);
    }
    return data;
  };

  const sortFunction = (data, sortingType) => {
    if (data === []) {
      return [];
    }
    if (sortingType === "") {
      return data;
    }
    if (sortingType === "ASC") {
      return data.sort((a, b) => a.founded_year - b.founded_year);
    }
    return data.sort((a, b) => b.founded_year - a.founded_year);
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((ele, index) => (
              <th key={index}>
                {ele === "founded_year" ? (
                  <>
                    <span>{ele}</span>
                    <button
                      style={{ color: "green", margin: "50px" }}
                      onClick={() =>
                        setFilterSortingCol((prev) =>
                          prev === "" ? "ASC" : prev === "ASC" ? "DSC" : "ASC"
                        )
                      }>
                      SORT
                    </button>
                  </>
                ) : (
                  <>{ele}</>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortFunction(filteredData, filterSortingCol).map((ele, index) => (
            <tr key={index}>
              {Object.keys(ele).map((key) => (
                <td key={`${Math.random()}`}>
                  {renderItem(filteredData[index][key], key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
