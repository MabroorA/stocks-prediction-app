
import "./NavBar.css";
function NavBar() {
  return (
    <nav className="navbar">
      <div>
        <a className="Logo" href="/">
          FS
        </a>
        <a href="/about-us">About Us</a>
        <a href="/news">News</a>
      </div>
      <div>
      <a href="/search">Search</a>
      <a className="login-button" href="/account">
        My Account
      </a>
      </div>
    </nav>
  );
}

export default NavBar;
