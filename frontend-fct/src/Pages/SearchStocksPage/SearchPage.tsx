import React, { useState } from "react";
import "./SearchPage.css";

interface TickerInfo {
  ticker: string;
  name: string;
  market: string;
  locale: string;
  primary_exchange: string;
  type: string;
  active: boolean;
  currency_name: string;
  cik: string;
  composite_figi: string;
  share_class_figi: string;
  last_updated_utc: string;
}

function SearchPage() {
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
        `http://localhost:3000/search-ticker?ticker=${searchQuery}`
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
      
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        placeholder="Enter ticker symbol"
      />
      <button onClick={handleSearchButtonClick}>Search</button>
      {/* Display search results */}
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>
            <div>Ticker: {result.ticker}</div>
            <div>Name: {result.name}</div>
            <div>Market: {result.market}</div>
            {/* Add more fields as needed */}
          </li>
        ))}
      </ul>
    </>
  );
}

export default SearchPage;
