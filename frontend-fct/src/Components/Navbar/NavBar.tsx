import  { useState } from "react";
import { useNavigate  } from "react-router-dom";
import "./NavBar.css";
import { CiSearch } from "react-icons/ci";


export default function NavBar() {

  const [searchQuery, setSearchQuery] = useState(""); 
  const [error, setError] = useState<string>("");
  
  const navigate = useNavigate (); // Access history object from react-router-dom
  

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

  return (
    <nav className="navbar">
      <div>
        <a className="Logo" href="/">
          Home
        </a>

        <div className={`search-container ${error ? 'error' : ''}`}>
        <input
            className="menu-search-bar"
            type="text"
            placeholder={" Search..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
