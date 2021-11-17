import React, { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios'

function App() {

  const [companiesList, setCompaniesList] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const getListOfCompaniesFromServer = async () => {
    try {
      const response = await axios.get(`http://localhost:7000/listCompanies`)
      if (response.status === 200) {
        const { data: { data } } = response
        setCompaniesList(data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getListOfCompaniesFromServer()
  }, [])

  const toSearchFunction = (e) => {
    setSearchTerm(e?.target?.value)
  }

  const newCompaniesList = companiesList.filter((company) => {
    const { email_address, phone_number, founded_year, number_of_employees, total_money_raised, description } = company
    const mySearchString = {
      email_address,
      phone_number,
      founded_year,
      number_of_employees,
      total_money_raised,
      description
    }
    const t = Object.values(mySearchString).join("")
    if (t.toLowerCase().includes(searchTerm.toLowerCase())) {
      return company
    }
  })



  const sortFunction = (fieldName) => {

    const filteredNullValues = companiesList.filter((company) => {
      if (company[fieldName] !== null) {
        return company
      }
    })


    const newCompaniesList = filteredNullValues.sort((a, b) => {
      if (a[fieldName] > b[fieldName]) {
        return 1
      }
      if (a[fieldName] < b[fieldName]) {
        return -1
      }

      return 0

    })

    console.log(newCompaniesList, "sorted list")
  }


  return (
    <div className="App">

      <h1 style={{ textAlign: 'center' }}>List of Companies</h1>

      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={toSearchFunction}
          placeholder="Type here"
        />
      </div>

      <table id="companies">
        <thead>
          <tr>
            <th>S.No</th>

            <th> Description </th>

            <th> Email </th>

            <th> Founded Year <button onClick={() => sortFunction("founded_year")}>Sort</button> </th>

            <th> Phone Number </th>

            <th> No. of Employees <button onClick={() => sortFunction("number_of_employees")}>Sort</button> </th>

            <th> Money Raised </th>

            <th> Products </th>
          </tr>
        </thead>

        <tbody>
          {
            companiesList.map((company, index) => {
              return (
                <tr key={company._id}>
                  <td>{index + 1}</td>
                  <td>{company.description}</td>
                  <td>{company.email_address === "" ? ("Empty") : (company.email_address)}</td>
                  <td>{company.founded_year}</td>
                  <td>{company.phone_number === "" ? ("Empty") : (company.phone_number)}</td>
                  <td>{company.number_of_employees === null ? ("-") : (company.number_of_employees)}</td>
                  <td>{company.total_money_raised}</td>
                  <td>{company.products.length > 0 ? (company.products.map((product) => {
                    return (
                      <div key={product.name}>
                        {product.name},
                      </div>
                    )
                  })) : ("No products Found")}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
