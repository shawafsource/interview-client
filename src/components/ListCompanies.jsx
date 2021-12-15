import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Company } from './Company';
export function ListCompanies() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function getCompanyData() {
      const res = await axios.get('http://localhost:7000/listCompanies');
      setData(res.data.data);
      console.log(res.data.data);
    })();
  }, []);
  return (
    <table className='table'>
      <tr>
        <th className='header1'>name</th>
        <th className='header1'>employess</th>
        <th className='header1'>overview</th>
        <th className='header1'>products</th>
      </tr>
      {data.map((dataPoint) => {
        return (
          <tr key={dataPoint.id}>
            <Company
              name={dataPoint.name}
              employees={dataPoint.number_of_employees}
              products={dataPoint.products}
              overview={dataPoint.overview}
            />
          </tr>
        );
      })}
    </table>
  );
}
