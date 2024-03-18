import { useState } from "react";
// import { Line } from "react-chartjs-2";
// import { getAquisitionsByYear } from "./api";

interface TickerHistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adjClose: number;
  volume: number;
  unadjustedVolume: number;
  change: number;
  changePercent: number;
  vwap: number;
  label: string;
  changeOverTime: number;
}

export default function ChartsLineGraph() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<TickerHistoricalData[]>(
    []
  );
  // handling search query change
  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };


  // performing ticker search
  const searchTicker = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/daily-historical?ticker=${searchQuery}`
      );
      const data = await response.json();
      setSearchResults(data.historical.slice(0, 5).reverse());
      console.log(data);
    } catch (error) {
      console.error("Error searching ticker:", error);
    }
  };
  // on search button click
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
          placeholder="Enter Ticker To Predict"
        />
        <button onClick={handleSearchButtonClick}>Search</button>
      </div>
      <div className="search-result">
        <h3>Last 5 Days Historical Data</h3>
        <ul>
          {searchResults.map((result, index) => (
            <li key={index} className="search-result">
              <div>Date: {result.date}</div>
              <div>Open: {result.open}</div>
              <div>High: {result.high}</div>
              <div>Low: {result.low}</div>
              <div>Close: {result.close}</div>
              <div>Adj Close: {result.adjClose}</div>
              <div>Volume: {result.volume}</div>
              <div>Unadjusted Volume: {result.unadjustedVolume}</div>
              <div>Change: {result.change}</div>
              <div>Change Percent: {result.changePercent}</div>
              <div>VWAP: {result.vwap}</div>
              <div>Label: {result.label}</div>
              <div>Change Over Time: {result.changeOverTime}</div>
            </li>
          ))}
        </ul>
      </div>
      {/* <Line
            data={chartData}
            options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                title: {
                    display: true,
                    text: "Year",
                },
                },
                y: {
                title: {
                    display: true,
                    text: "Number of Artworks",
                },
                },
            },
            }}
        /> */}
    </>
  );
}
