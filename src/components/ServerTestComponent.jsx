import React, { useState } from "react";
import axios from "axios";

function ServerTestComponent() {
  const [message, setMessage] = useState("");
  async function fetchData() {
    console.log("fetching Data");
    const response = await axios.get("http://localhost:7000/");
    const { msg } = response.data;
    setMessage(msg);
    console.log(msg);
  }
  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      {message && (
        <>
          <h1>{message}</h1>
          <button onClick={() => setMessage("")}>Clear</button>
        </>
      )}
    </div>
  );
}

export default ServerTestComponent;
