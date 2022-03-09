import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

function CompaniesListComponent() {
  const [company, setCompany] = useState([]);
  const [search, setSearch] = React.useState("");
  useEffect(() => {
    async function fetchCompanyData() {
      console.log("fetching Data");
      const response = await axios.get("http://localhost:9000/listCompanies");
      if (response.data) {
        setCompany(response.data.data);
      }
    }
    fetchCompanyData();
  }, []);
  let i = 0;
  let str = "";
  const productData = (products) => {
    products.forEach((element) => {
      str = str + element.name + ",";
    });
    return str;
  };
  const thheader = (
    <tr>
      <th>Name</th>
      <th>number_of_employees</th>
      <th>founded_year</th>
      <th>phone_number</th>
      <th>products</th>
    </tr>
  );
  const tdata = company.map((ele, j) => {
    return (
      <tr key={i++}>
        <td>{ele.name}</td>
        <td>{ele.number_of_employees}</td>
        <td>{ele.founded_year}</td>
        <td>{ele.phone_number}</td>
        <td>{productData(ele.products)}</td>
      </tr>
    );
  });

  const findValue = () => {
    const value = search;
    let arr = [];
    for (let i = 0; i < company.length; i++) {
      let element = company[i];
      console.log(element.name.toUpperCase(), value.toUpperCase());
      if (element.name.toUpperCase() === value.toUpperCase()) {
        arr.push(element);
        continue;
      }
      if (element.number_of_employees === value) {
        arr.push(element);
        continue;
      }
      if (element.founded_year === value) {
        arr.push(element);
        continue;
      }
      if (element.phone_number === value) {
        arr.push(element);
        continue;
      }
      if (element.products.length) {
        for (let j = 0; j < element.products.length; j++) {
          let ele = element.products[j];
          if (ele.name.toUpperCase() === value.toUpperCase(value)) {
            arr.push(element);
            break;
          }
        }
        continue;
      }
    }
    setCompany(arr);
  };
  return (
    <div>
      <div>
        <label htmlFor="search">
          <input
            id="search"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={findValue}>Submit</button>
        </label>
      </div>
      <table>
        {thheader}
        {tdata}
      </table>
    </div>
  );
}

export default CompaniesListComponent;

/*
name
number_of_employees
founded_year
phone_number
products
*/
