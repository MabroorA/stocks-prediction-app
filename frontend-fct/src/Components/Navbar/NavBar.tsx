import "./NavBar.css";
import { CiSearch } from "react-icons/ci";
import { AiOutlineStock } from "react-icons/ai";


export default function NavBar() {
  return (
    <nav className="navbar">
      <div>
        <a className="logo" href="/">
          <span className="logo-icon">
            <span className="colored-part">
              <AiOutlineStock />
            </span>
          </span>
        </a>

        <div className="search-container">
          <input className="menu-search-bar" type="text" placeholder=" Search..." />
          <div className="search-icon">
            <CiSearch />
          </div>
        </div>
      </div>
      <div>
        <a href="/predict">Predict</a>
        <a href="/analyse">Blog</a>
        <a href="/news">News</a>
      </div>
    </nav>
  );
}
