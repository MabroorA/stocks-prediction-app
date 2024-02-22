import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
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
    <div style={{ width: "100%" }}>
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
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={intradayData}
            syncId="anyId"
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="close" stroke="#8884d8" />
            <Line type="monotone" dataKey="open" stroke="#FF0000" name="Open" />
            <Line type="monotone" dataKey="low" stroke="#00FF00" name="Low" />
            <Line type="monotone" dataKey="high" stroke="#0000FF" name="High" />
            <Line
              type="monotone"
              dataKey="close"
              stroke="#8884d8"
              name="Close"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="area-chart-container">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={intradayData}
            syncId="anyId"
            margin={{
              top: 10,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="volume"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
