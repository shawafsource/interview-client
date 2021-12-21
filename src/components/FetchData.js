import axios from "axios";
import React, { useEffect, useState } from "react";

function FetchData() {
  const [companies, setCompanies] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [asec, setAsec] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    console.log("fetching Data");
    const response = await axios.get("http://localhost:7000/listCompanies");
    setCompanies(response.data.data);
    setFilteredData(response.data.data);
    console.log(typeof response.data.data);
  }

  function handleSort() {
    companies.sort((a, b) =>
      a.founded_year > b.founded_year
        ? 1
        : b.founded_year > a.founded_year
        ? -1
        : 0
    );
    console.log(companies.map((c) => c.founded_year));
    setCompanies((companies) => [...companies]);
  }

  function handleChange(e) {
    let query = e.target.value.toLowerCase();
    console.log(e.target.value);
    setFilteredData(
      companies.filter((x) => x.name.toLowerCase().includes(query))
    );
  }
  return (
    <div>
      <h1> List of Companies</h1>
      <input type="text" placeholder="Search here..." onChange={handleChange} />
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>No. of employees</th>
              <th>Description</th>
              <th>
                Founded Year <button onClick={() => handleSort()}>Sort</button>
              </th>
              <th>Products</th>
            </tr>
          </thead>
          {filteredData.map((item) => (
            <tr>
              <td>{item.name}</td>
              <td>{item.phone_number ? item.phone_number : "---"}</td>
              <td>{item.number_of_employees ? item.number_of_employees : 0}</td>
              <td>{item.description}</td>
              <td>{item.founded_year}</td>
              <td className="chips">
                {item.products.map((product, index) => (
                  <p>{product.name}</p>
                ))}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default FetchData;

//description
//number of employees
// founded year
// products
// phone number
// name
