import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import Table from "./components/Table";

function App() {
  const [companiesList, setCompaniesList] = useState([]);
  const [searchText, setSearchText] = useState("");

  console.log(searchText);

  async function fetchCompaniesList() {
    console.log("fetching Data");
    try {
      const {
        data: { data },
      } = await axios.get("http://localhost:7000/listCompaniesFast");
      setCompaniesList(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCompaniesList();
  }, []);

  let searchedCompaniesList = companiesList.filter((company) => {
    const {
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
    } = company;

    let productValues = JSON.stringify(products);

    let serachItems = {
      name,
      number_of_employees,
      founded_year,
      email_address,
      phone_number,
      overview,
      productValues,
      description,
      category_code,
      founded_month,
    };

    let x = Object.values(serachItems).join("");

    if (x.toLowerCase().includes(searchText.toLowerCase())) {
      return company;
    }
  });

  return (
    <div className="App">
      <h1>Hello World</h1>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Table companiesList={searchedCompaniesList} />
    </div>
  );
}

export default App;
