import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./NavBar.css";
import { CiSearch } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";


// interface Company {
//   symbol: string;
// }

export default function NavBar() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [searchResults, setSearchResults] = useState<string[]>([]); // State to store search results

  const [loading, setLoading] = useState<boolean>(false);
  
  const [error, setError] = useState<string>("");

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const navigate = useNavigate();

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

  };



  return (
    <nav className="flex items-center justify-between py-4 text-black rounded-3xl">
      <div className="flex items-center space-x-4">
        <a className="text-lg font-bold" href="/">Finstimulate</a>
        <div className="hidden space-x-4 md:flex">
          <a className="px-2" href="/predict">Predict</a>
          <a className="px-2" href="/news">News</a>
        </div>
      </div>

      <div className="relative flex items-center space-x-4">
        <div className={`search-container relative ${error ? "error" : ""}`}>
          <div  className="flex flex-row">
            <input
              className="px-2 py-1 text-white bg-gray-700 rounded menu-search-bar"
              type="text"
              placeholder="Search ticker"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearchIconClicked();
                }
              }}
              onFocus={() => {
                setError("");
              }}
            />
            <div className="py-2 -ml-6 text-lg font-black text-teal-600" onClick={handleSearchIconClicked}>
              <CiSearch size="20"/>
            </div>
          </div>

          {loading && (
            <div className="absolute left-0 right-0 p-2 bg-gray-300 rounded shadow-lg">
              <div className="skeleton-wrapper">
                <span className="block w-full h-4 my-1 bg-gray-300 skeleton-card"></span>
                <span className="block w-full h-4 my-1 bg-gray-300 skeleton-card"></span>
                <span className="block w-full h-4 my-1 bg-gray-300 skeleton-card"></span>
              </div>
            </div>
          )}

          {searchResults?.length > 0 && !loading && (
            <div className="absolute left-0 right-0 p-2 bg-gray-300 rounded shadow-lg">
              <h4 className="text-sm font-semibold dropdown-title">Stock</h4>
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  className="w-full p-2 my-1 text-left bg-gray-400 rounded dropdown-btn hover:bg-gray-100"
                  onClick={() => {
                    navigate(`/financial-summary?query=${encodeURIComponent(searchQuery)}`);
                    setSearchResults([]);
                  }}
                >
                  {result}
                </button>
              ))}
            </div>
          )}
        </div>
        {error && <div className="text-red-500 error-message">{error}</div>}
      </div>

      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <FiMenu />
        </button>
        {menuOpen && (
          <div className="absolute right-0 w-48 mt-2 text-white bg-gray-800 rounded shadow-lg">
            <a className="block px-4 py-2" href="/predict">Predict</a>
            <a className="block px-4 py-2" href="/news">News</a>
          </div>
        )}
      </div>
    </nav>
  );
}