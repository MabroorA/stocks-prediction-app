import React, { useState } from "react";

import { LineChart, CartesianGrid, XAxis, Label, YAxis, Tooltip, Legend, Line } from "recharts";


// 
interface TickerInfo {
    timestamp: number;
    value: number;
}
  

export default  function Search_to_display() {
//   const [ticker, setTicker] = useState<string>("");
//   const [searchResult, setSearchResult] = useState<Value[] > ([]);

//   const handleSearch = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/ticker-to-display?ticker=${ticker}`
//       );
//       const data = await response.json();
//       setSearchResult(data.values || []);
//     } catch (error) {
//       console.error("FAILED TO FETCH DATA:", error);
//     }
//   };
  const [searchQuery, setSearchQuery] = useState<string>(""); // State to store the search query
  const [searchResults, setSearchResults] = useState<TickerInfo[]>([]); // State to store the search results

  // Function to handle search query change
  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Function to perform ticker search
  const searchTicker = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/ticker-to-display?ticker=${searchQuery}`
      );
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Error searching ticker:", error);
    }
  };

  // Function to handle search button click
  const handleSearchButtonClick = () => {
    searchTicker();
  };
  return (
    <>
    <div className="search-box">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        placeholder="Enter ticker symbol"
      />
      <button onClick={handleSearchButtonClick}>Search</button>
      {/* {searchResult && ( */}
        <div className="search-result">
          {/* Render search results here */}
          {/* <pre>{JSON.stringify(searchResult, null, 2)}</pre> */}
          <LineChart
            width={400}
            height={280}
            data={searchResults}
            margin={{ top: 10, right: 5, left: 50, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="datetime">
              <Label value="Date" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis dataKey="value">
              <Label value="Value" offset={-35} position="insideLeft" />
            </YAxis>

            <Tooltip />
            <Legend verticalAlign="top" height={30} />
            <Line
              type="monotone"
              dataKey="avgprice"
              name="Nvidia Average Price "
              stroke="#8884d8"
            />
          </LineChart>
        </div>
      {/* )} */}
    </div>
    </>
  );
};
