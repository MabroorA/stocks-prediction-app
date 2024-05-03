import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { CiSearch } from "react-icons/ci";

export default function NavBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const [searchResults, setSearchResults] = useState<any>([]); // State to store search results

  const [loading, setLoading] = useState<Boolean>(false);
  
  const [error, setError] = useState<string>("");

  const navigate = useNavigate(); // Access history object from react-router-dom

  // Function to handle search
  const handleSearchIconClicked = async () => {


    //make a call to the api
    try {
      setLoading(true)
      setError("")
      const response = await fetch(`https://financialmodelingprep.com/api/v3/search-ticker?query=${searchQuery.trim().toUpperCase()}&limit=5&apikey=updJZ6J5tMLEtqk4DCy86VTUoLaxg3xF`)
      
      const jsonResponse = await response.json();
      const symbols = jsonResponse.map((company: {
        symbol: string
      }) => company.symbol)
      setSearchResults(symbols)
      setLoading(false)
    } catch (error) {
      setError("An Error occured with the search. Please try again later.");
      setLoading(false)
      console.log(error, "Error occured with search")
    }
    // Check if search query is not empty
    // if (searchQuery.trim() !== "") {
    //   // Navigate to FinancialSummary page with search query as URL parameter
    //   navigate(`/financial-summary?query=${encodeURIComponent(searchQuery)}`);
    //   // Clear error message
    //   setError("");
    // } else {
    //   // If search query is empty, set error message
    //   setError("Must Enter ticker");
    // }
  };

  // const handleDropDownSearch = (val: any) => {
  //   navigate(`/financial-summary?query=${encodeURIComponent(val)}`);
  // };

  // const setSearchData = (val: String) => {
  //   setLoading(true);
  //   if (val === "") {
  //     setSearchResults([]);
  //     setLoading(false);
  //     return;
  //   }

  //   // Send api request instead of setTimeout
  //   setTimeout(() => {
  //     const data = ["IBM", "IBMQ", "IMBH", "IMBH", "IMBH"];
  //     setSearchResults(data);
  //     setLoading(false);
  //   }, 1000);
  // };

  return (
    <nav className="navbar">
      <div>
        <a className="Logo" href="/">
          Home
        </a>

        <div className={`search-container ${error ? "error" : ""}`}>
          <input
            className="menu-search-bar"
            type="text"
            placeholder={"Type and click search icon..."}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              // setSearchData(e.target.value);
            }}
            onKeyPress={(e) => {
              // Handle search when Enter key is pressed
              if (e.key === "Enter") {
                handleSearchIconClicked();
              }
            }}
            onFocus={() => {
              setError("")
            }}
          />
          <div className="search-icon" onClick={handleSearchIconClicked}>
            <CiSearch />
          </div>

          {loading && (
            <div className="abs-menu">
              <div className="skeleton-wrapper">
                <span className="skeleton-card"></span>
                <span className="skeleton-card"></span>
                <span className="skeleton-card"></span>
              </div>
            </div>
          )}

          {searchResults?.length > 0 && !loading && (
            <div className="abs-menu">
              <h4 className="dropdown-title"> Stock </h4>
              {searchResults.map((result: String, index: any) => (
                <button
                  key={index}
                  className="dropdown-btn"
                  onClick={() => {
                    navigate(`/financial-summary?query=${encodeURIComponent(searchQuery)}`);
                    setSearchResults([])
                  }}
                >
                  {result}
                </button>
              ))}
            </div>
          )}
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
      <div>
        <a href="/predict">Predict</a>
        <a href="/news">News</a>
      </div>
    </nav>
  );
}
