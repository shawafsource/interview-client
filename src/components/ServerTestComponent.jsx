import React, { useState, useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";

const tableHeaders = [
  "Name",
  "No. of employees",
  "overview",
  "phone no",
  "email",
  "category",
  "Products",
];
const allTds = [
  "name",
  "number_of_employees",
  "overview",
  "phone_number",
  "email_address",
  "category_code",
  "products",
];

function ServerTestComponent() {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [globalSearch, setGlobalSearch] = useState("");
  async function fetchData() {
    console.log("fetching Data");
    const response = await axios.get("http://localhost:7000/listCompanies");
    if (response.status === 200) {
      setCompanies(response.data.data);
    }
  }
  const sortData = (selectedHeader) => {
    let sortedData = [];
    if (selectedHeader === "name") {
      sortedData = filteredCompanies.sort((c1, c2) =>
        c1[selectedHeader].localeCompare(c2[selectedHeader])
      );
    } else {
      sortedData = filteredCompanies.sort(
        (c1, c2) => c1[selectedHeader] < c2[selectedHeader]
      );
    }
    setFilteredCompanies([...sortedData]);
  };

  const globalFilter = (e) => {
    setGlobalSearch(e.target.value);
    if (e.target.value === "") {
      setFilteredCompanies([...companies]);
    } else {
      const filterCompanies = companies.filter((c) => {
        const companyValues = Object.values(c);
        const filteredCol = companyValues.filter((v) => {
          if (typeof v === "string") {
            return v.startsWith(e.target.value);
          } else if (Array.isArray(v)) {
            const filteredArr = v.filter((item) => {
              if (typeof item === "string") {
                return item.startsWith(e.target.value);
              } else if (typeof item === "object") {
                //   console.log("debug: ", item);
                return item?.name.startsWith(e.target.value);
              }
              return false;
            });
            if (filteredArr.length > 0) {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        });
        if (filteredCol.length > 0) {
          return true;
        } else {
          return false;
        }
      });
      setFilteredCompanies([...filterCompanies]);
    }
  };

  useEffect(() => {
    setFilteredCompanies([...companies]);
  }, [companies]);

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      <input
        type="text"
        name="glovalSearch"
        id=""
        value={globalSearch}
        onChange={globalFilter}
      />
      <div className="companies-wrapper">
        {companies.length === 0 ? (
          "No companies."
        ) : (
          <table>
            <tr>
              {tableHeaders.map((h, headerIndex) => (
                <th
                  onClick={() => {
                    const selectedHeader = allTds[headerIndex];
                    console.log(selectedHeader);
                    sortData(selectedHeader);
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
            {filteredCompanies.map((company) => (
              <tr>
                {allTds.map((tdKey) => {
                  if (tdKey === "overview" && company[tdKey]) {
                    return <td>{parse(company[tdKey])}</td>;
                  } else if (tdKey === "products") {
                    return (
                      <td>
                        {company[tdKey].map((prod) => (
                          <div>{prod.name}</div>
                        ))}
                      </td>
                    );
                  } else {
                    return <td>{company[tdKey]}</td>;
                  }
                })}
              </tr>
            ))}
          </table>
        )}
      </div>
    </div>
  );
}

export default ServerTestComponent;
