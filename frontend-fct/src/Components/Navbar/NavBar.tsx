import "./NavBar.css";
import { CiSearch } from "react-icons/ci";


export default function NavBar() {
  return (
    <nav className="navbar">
      <div>
        <a className="Logo" href="/">
          Home
        </a>

        <div className="search-container">
          <input className="menu-search-bar" type="text" placeholder=" Search..." />
          <div className="search-icon">
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
