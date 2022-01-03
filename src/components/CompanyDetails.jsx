import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

let count = 0;
function CompanyDetails(){
    const [data, setData] = useState("")
    async function fetchCompanyData () {
        const response = await axios.get("http://localhost:7000/listCompanies");
        const {data} = response.data
        setData(data)
        console.log(data)
    }
    useEffect(() =>{
        if(count === 0){

            fetchCompanyData()
            count++
        }
    })    
    // Description, Name , phone No, No. of emp. , founded year, name of products
    return (
        <div>
        
        <table className="companyTable">
            <thead>
                <tr>
                    <th>
                        Description
                    </th>
                    <th>
                        Name
                    </th>
                    <th>
                        phone No
                    </th>
                    <th>
                        Number of Emp.
                    </th>
                    <th>
                        Founded year
                    </th>
                    <th>
                    Products
                    </th>
                </tr>
            </thead>
            <tbody>
                {data && 
                 data.map(element => { return <>
                    <tr key={element.id}>
                        <td > {element.description} </td>
                        <td> {element.name} </td>
                        <td> {element.phone_number} </td>
                        <td> {element.number_of_employees} </td>
                        <td> {element.founded_year} </td>
                        <td> {element.products.map((p)=> { return <>
                            <tr> <td> {p.name}</td> </tr>
                        </>
                        })} </td>
                    </tr>
                    </>
                })}
            </tbody>
        </table>
        </div>
    )
}


export default CompanyDetails;