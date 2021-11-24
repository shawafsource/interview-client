import React, { useState } from "react";
// import parse from "html-react-parser";

const Table = ({ companiesList }) => {
  const [sortedHeader, setSortedHeader] = useState(null);
  let sortedCompanies = [...companiesList];

  sortedCompanies.sort((a, b) => {
    if (a[sortedHeader] > b[sortedHeader]) {
      return 1;
    }
    if (a[sortedHeader] < b[sortedHeader]) {
      return -1;
    }
    return 0;
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>S.no</th>
            <th onClick={() => setSortedHeader("name")}>name</th>
            <th onClick={() => setSortedHeader("email_address")}>
              email_address
            </th>
            <th onClick={() => setSortedHeader("phone_number")}>
              phone_number
            </th>
            <th onClick={() => setSortedHeader("description")}>description</th>
            <th onClick={() => setSortedHeader("founded_year")}>
              founded_year
            </th>
            <th onClick={() => setSortedHeader("founded_month")}>
              founded_month
            </th>
            <th onClick={() => setSortedHeader("number_of_employees")}>
              number_of_employees
            </th>
            <th onClick={() => setSortedHeader("category_code")}>
              category_code
            </th>
            <th onClick={() => setSortedHeader("products")}>products</th>
            {/* <th onClick={() => setSortedHeader("overview")}>overview</th> */}
          </tr>
        </thead>
        <tbody>
          {sortedCompanies.map(
            (
              {
                name,
                number_of_employees,
                founded_year,
                email_address,
                phone_number,
                overview,
                products,
                description,
                category_code,
                founded_month,
              },
              index
            ) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{name}</td>
                  <td>{email_address}</td>
                  <td>{phone_number}</td>
                  <td>{description}</td>
                  <td>{founded_year}</td>
                  <td>{founded_month}</td>
                  <td>{number_of_employees}</td>
                  <td>{category_code}</td>
                  <td>
                    {products.map((product) => {
                      return (
                        <div>
                          <span>{product.name}</span>
                          <span>{product.permalink}</span>
                        </div>
                      );
                    })}
                  </td>
                  {/* <td>{parse(overview)}</td> */}
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
