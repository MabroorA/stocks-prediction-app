import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
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
      <div className="chart-container">
        <LineChart width={800} height={400} data={intradayData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            label={{
              value: "Date",
              position: "insideBottomRight",
              offset: -10,
            }}
          />
          <YAxis
            label={{ value: "Price", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="close" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
}
