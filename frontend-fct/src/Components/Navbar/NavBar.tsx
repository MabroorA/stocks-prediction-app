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
  const handleSearch = () => {
    // Check if search query is not empty
    if (searchQuery.trim() !== "") {
      // Navigate to FinancialSummary page with search query as URL parameter
      navigate(`/financial-summary?query=${encodeURIComponent(searchQuery)}`);
      // Clear error message
      setError("");
    } else {
      // If search query is empty, set error message
      setError("Must Enter ticker");
    }
  };

  const handleDropDownSearch = (val: any) => {
    navigate(`/financial-summary?query=${encodeURIComponent(val)}`);
  };

  const setSearchData = (val: String) => {
    setLoading(true);
    if (val === "") {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    // Send api request instead of setTimeout
    setTimeout(() => {
      const data = ["IBM", "IBMQ", "IMBH", "IMBH", "IMBH"];
      setSearchResults(data);
      setLoading(false);
    }, 1000);
  };

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
            placeholder={" Search..."}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSearchData(e.target.value);
            }}
            onKeyPress={(e) => {
              // Handle search when Enter key is pressed
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <div className="search-icon" onClick={handleSearch}>
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
                  onClick={() => handleDropDownSearch(result)}
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
