import React, { useState } from "react";
import "./SearchPage.css";
import NavBar from "../../Components/Navbar/NavBar";

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
      <NavBar />
      <div className="search-page">
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
            <li key={index} className="search-result">
              <div>Ticker: {result.ticker}</div>
              <div>Name: {result.name}</div>
              <div>Market: {result.market}</div>
              <div>Locale: {result.locale}</div>
              <div>Primary Exchange: {result.primary_exchange}</div>
              <div>Type: {result.type}</div>
              <div>Active: {result.active ? "Yes" : "No"}</div>
              <div>Currency Name: {result.currency_name}</div>
              <div>CIK: {result.cik}</div>
              <div>Composite FIGI: {result.composite_figi}</div>
              <div>Share Class FIGI: {result.share_class_figi}</div>
              <div>Last Updated UTC: {result.last_updated_utc}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SearchPage;
