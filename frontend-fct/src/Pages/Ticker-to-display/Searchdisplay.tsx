import React, { useEffect, useState } from "react";

import { LineChart, CartesianGrid, XAxis, Label, YAxis, Tooltip, Legend, Line } from "recharts";
import NavBar from "../../Components/Navbar/NavBar";

interface TickerData {
    timestamp: number;
    value: number;
}

interface ServerResponse {
    results: {
      values: TickerData[];
    };
    status: string;
    request_id: string;
    next_url: string;
}
export default function Searchdisplay() {
    const [searchQuery, setSearchQuery] = useState<string>("");
  const [data, setData] = useState<TickerData[]>([]);

  async function searchTicker(): Promise<ServerResponse> {
    try {
      const serverRequest = await fetch(
        `http://localhost:3000/ticker-to-display?ticker=${searchQuery}`
      );
      const response = await serverRequest.json();
      console.log(response, "SERVER SENT TICKER DATA");
      return response;
    } catch (error) {
      console.error("Error searching ticker:", error);
      throw error; // Re-throw the error to handle it outside
    }
  }

  const handleSearchQueryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchButtonClick = async () => {
    if (searchQuery.trim() !== "") { // Check if searchQuery has value
      try {
        const response = await searchTicker();
        setData(response.results.values);
        console.log("Ticker search View Working");
      } catch (error) {
        console.error("Error fetching ticker data:", error);
      }
    }
  };

  useEffect(() => {
    // No initial fetch data
  }, []);
    return (
    <>
      <NavBar/>
      <div className="search-box">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Search ticker symbol"
        />
        <button onClick={handleSearchButtonClick}>Search</button>
        {/* {searchResult && ( */}
        <div className="search-result">
          <LineChart
            width={400}
            height={280}
            data={data}
            // margin={{ top: 10, right: 5, left: 50, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="timestamp">
              <Label value="timestamp" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis dataKey="value">
              <Label value="value" offset={-35} position="insideLeft" />
            </YAxis>

            <Tooltip />
            <Legend verticalAlign="top" height={30} />
            <Line
              type="monotone"
              dataKey="value"
              name="Simple Moving Average"
              stroke="#8884d8"
            />
          </LineChart>
        </div>
        {/* )} */}
      </div>
      
    </>
  );
}
