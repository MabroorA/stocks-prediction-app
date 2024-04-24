import  { useState } from "react";
import { useNavigate  } from "react-router-dom"; // Import useHistory from react-router-dom
import "./NavBar.css";
import { CiSearch } from "react-icons/ci";


export default function NavBar() {

  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const navigate = useNavigate (); // Access history object from react-router-dom

  // Function to handle search
  const handleSearch = () => {
    // Check if search query is not empty
    if (searchQuery.trim() !== "") {
      // Navigate to FinancialSummary page with search query as URL parameter
      // navigate(`/financial-summary?query=${encodeURIComponent(searchQuery)}`);
    // hard coded to go to financial summary page
      navigate("/financial-summary")
    }
  };

  return (
    <nav className="navbar">
      <div>
        <a className="Logo" href="/">
          Home
        </a>

        <div className="search-container">
        <input
            className="menu-search-bar"
            type="text"
            placeholder=" Search..."
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
      </div>
      <div>
        <a href="/analyse">Blog</a>
        <a href="/predict">Predict</a>
        <a href="/news">News</a>
      </div>
    </nav>
  );
}
