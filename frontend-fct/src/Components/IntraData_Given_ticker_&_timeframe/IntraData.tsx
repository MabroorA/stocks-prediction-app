import { useState, useEffect } from "react";
import "./IntraData.css"

interface IntradayData {
  date: string;
  open: number;
  low: number;
  high: number;
  close: number;
  volume: number;
}
export default function IntraData() {
  const [searchQuery, setSearchQuery] = useState<string>(""); // State to store the search query
  const [intradayData, setIntradayData] = useState<IntradayData[]>([]); // State to store intraday data

  // Function to handle search query change
  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Function to perform intraday data search
  const searchIntradayData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/intraday?ticker=${searchQuery}`
      );
      const data = await response.json();
      setIntradayData(data || []);
    } catch (error) {
      console.error("Error searching intraday data:", error);
    }
  };

  // Function to handle search button click
  const handleSearchButtonClick = () => {
    searchIntradayData();
  };

  useEffect(() => {
    // Fetch intraday data when search query changes
    if (searchQuery) {
      searchIntradayData();
    }
  }, [searchQuery]); 
  return (
    <div className="intra-data">
      <h1>Intraday Data</h1>
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Enter ticker symbol"
        />
        <button onClick={handleSearchButtonClick}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Open</th>
            <th>Low</th>
            <th>High</th>
            <th>Close</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {intradayData.map((data, index) => (
            <tr key={index}>
              <td>{data.date}</td>
              <td>{data.open}</td>
              <td>{data.low}</td>
              <td>{data.high}</td>
              <td>{data.close}</td>
              <td>{data.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
